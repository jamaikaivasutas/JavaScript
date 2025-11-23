const API_URL = "http://localhost:3000/api";
let currentUser = null;
let currentEditId = null;

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document
    .getElementById("register-form")
    .addEventListener("submit", handleRegister);
  document
    .getElementById("note-form")
    .addEventListener("submit", handleNoteSave);
}

function checkAuth() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (token && username) {
    currentUser = { token, username };
    showNotesPage();
  } else {
    showAuthPage();
  }
}

function showAuthPage() {
  document.getElementById("auth-page").classList.add("active");
  document.getElementById("notes-page").classList.remove("active");
}

function showNotesPage() {
  document.getElementById("auth-page").classList.remove("active");
  document.getElementById("notes-page").classList.add("active");
  document.getElementById("username-display").textContent =
    currentUser.username;
  loadNotes();
}

function showLoginForm() {
  document
    .querySelector("#auth-page .tab-btn:first-child")
    .classList.add("active");
  document
    .querySelector("#auth-page .tab-btn:last-child")
    .classList.remove("active");
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
  clearError("login-error");
}

function showRegisterForm() {
  document
    .querySelector("#auth-page .tab-btn:first-child")
    .classList.remove("active");
  document
    .querySelector("#auth-page .tab-btn:last-child")
    .classList.add("active");
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
  clearError("register-error");
}

async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      currentUser = { token: data.token, username: data.username };
      showNotesPage();
    } else {
      showError("login-error", data.error || "Bejelentkezés sikertelen");
    }
  } catch (error) {
    showError(
      "login-error",
      "Kapcsolati hiba. Ellenőrizd, hogy a szerver fut-e!"
    );
  }
}

async function handleRegister(e) {
  e.preventDefault();

  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById(
    "register-password-confirm"
  ).value;

  if (password !== confirmPassword) {
    showError("register-error", "A jelszavak nem egyeznek");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showError(
        "register-error",
        "Sikeres regisztráció! Jelentkezz be!",
        "success"
      );
      setTimeout(() => {
        showLoginForm();
        document.getElementById("register-form").reset();
      }, 2000);
    } else {
      showError("register-error", data.error || "Regisztráció sikertelen");
    }
  } catch (error) {
    showError(
      "register-error",
      "Kapcsolati hiba. Ellenőrizd, hogy a szerver fut-e!"
    );
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  currentUser = null;
  showAuthPage();
  document.getElementById("login-form").reset();
}

async function loadNotes() {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    });

    if (response.ok) {
      const notes = await response.json();
      displayNotes(notes);
    } else if (response.status === 401 || response.status === 403) {
      logout();
    }
  } catch (error) {
    console.error("Failed to load notes:", error);
  }
}

function displayNotes(notes) {
  const publicNotes = notes.filter((note) => note.is_public === 1);
  const myNotes = notes.filter(
    (note) => note.username === currentUser.username
  );

  displayNotesList(publicNotes, "public-notes-list");
  displayNotesList(myNotes, "my-notes-list");
}

function displayNotesList(notes, containerId) {
  const container = document.getElementById(containerId);

  if (notes.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <h3>Nincsenek jegyzetek</h3>
                <p>Kezdj el jegyzetelni!</p>
            </div>
        `;
    return;
  }

  container.innerHTML = notes
    .map(
      (note) => `
        <div class="note-card" onclick="viewNote(${note.id})">
            ${note.is_public ? '<span class="note-badge">Nyilvános</span>' : ""}
            <h3>${escapeHtml(note.title)}</h3>
            <p>${escapeHtml(note.content)}</p>
            <div class="note-meta">
                <span>Készítette: ${escapeHtml(note.username)}</span>
                <span>${formatDate(note.created_at)}</span>
            </div>
        </div>
    `
    )
    .join("");
}

async function viewNote(id) {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    });

    if (response.ok) {
      const note = await response.json();
      showViewModal(note);
    }
  } catch (error) {
    console.error("Failed to load note:", error);
  }
}

function showViewModal(note) {
  const modal = document.getElementById("view-modal");
  document.getElementById("view-note-title").textContent = note.title;
  document.getElementById(
    "view-note-author"
  ).textContent = `Készítette: ${note.username}`;
  document.getElementById("view-note-date").textContent = formatDate(
    note.created_at
  );
  document.getElementById("view-note-content").textContent = note.content;

  const actionsContainer = document.getElementById("view-note-actions");
  if (note.username === currentUser.username) {
    actionsContainer.innerHTML = `
            <button class="btn btn-success" onclick="editNote(${note.id})">Szerkesztés</button>
            <button class="btn btn-danger" onclick="deleteNote(${note.id})">Törlés</button>
            <button class="btn btn-secondary" onclick="closeViewModal()">Bezárás</button>
        `;
  } else {
    actionsContainer.innerHTML = `
            <button class="btn btn-secondary" onclick="closeViewModal()">Bezárás</button>
        `;
  }

  modal.classList.add("active");
}

function closeViewModal() {
  document.getElementById("view-modal").classList.remove("active");
}

function showNoteModal(noteData = null) {
  currentEditId = noteData ? noteData.id : null;

  document.getElementById("modal-title").textContent = noteData
    ? "Jegyzet szerkesztése"
    : "Új jegyzet";
  document.getElementById("note-title").value = noteData ? noteData.title : "";
  document.getElementById("note-content").value = noteData
    ? noteData.content
    : "";
  document.getElementById("note-public").checked = noteData
    ? noteData.is_public === 1
    : false;

  document.getElementById("note-modal").classList.add("active");
  clearError("note-error");
}

function closeNoteModal() {
  document.getElementById("note-modal").classList.remove("active");
  document.getElementById("note-form").reset();
  currentEditId = null;
}

async function editNote(id) {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    });

    if (response.ok) {
      const note = await response.json();
      closeViewModal();
      showNoteModal(note);
    }
  } catch (error) {
    console.error("Failed to load note for editing:", error);
  }
}

async function handleNoteSave(e) {
  e.preventDefault();

  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;
  const isPublic = document.getElementById("note-public").checked;

  const noteData = { title, content, is_public: isPublic };

  try {
    const url = currentEditId
      ? `${API_URL}/notes/${currentEditId}`
      : `${API_URL}/notes`;
    const method = currentEditId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify(noteData),
    });

    if (response.ok) {
      closeNoteModal();
      loadNotes();
    } else {
      const data = await response.json();
      showError("note-error", data.error || "Mentés sikertelen");
    }
  } catch (error) {
    showError("note-error", "Kapcsolati hiba");
  }
}

async function deleteNote(id) {
  if (!confirm("Biztosan törölni szeretnéd ezt a jegyzetet?")) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${currentUser.token}` },
    });

    if (response.ok) {
      closeViewModal();
      loadNotes();
    }
  } catch (error) {
    console.error("Failed to delete note:", error);
  }
}

function showTab(tab) {
  const tabs = document.querySelectorAll(".content-header .tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((t) => t.classList.remove("active"));
  contents.forEach((c) => c.classList.remove("active"));

  if (tab === "public") {
    tabs[0].classList.add("active");
    document.getElementById("public-notes-tab").classList.add("active");
  } else {
    tabs[1].classList.add("active");
    document.getElementById("my-notes-tab").classList.add("active");
  }
}

function showError(elementId, message, type = "error") {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.add("show");

  if (type === "success") {
    errorElement.style.background = "#e8f5e9";
    errorElement.style.color = "#2e7d32";
  } else {
    errorElement.style.background = "#ffebee";
    errorElement.style.color = "#c62828";
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = "";
  errorElement.classList.remove("show");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
