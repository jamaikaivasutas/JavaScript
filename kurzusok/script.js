const coursesApi = "https://vvri.pythonanywhere.com/api/courses";
const studentsApi = "https://vvri.pythonanywhere.com/api/students";
let currentView = ""; // "course" or "student"

document.getElementById("showCourses").addEventListener("click", () => {
    currentView = "course";
    fetchData(coursesApi, "coursesList");
    toggleSections("coursesSection");
});

document.getElementById("showStudents").addEventListener("click", () => {
    currentView = "student";
    fetchData(studentsApi, "studentsList");
    toggleSections("studentsSection");
});

function fetchData(api, listId) {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById(listId);
            list.innerHTML = "";
            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.name;
                li.innerHTML += `
                    <button onclick="editItem(${item.id}, '${item.name}')">Szerkesztés</button>
                    <button onclick="deleteItem(${item.id})">Törlés</button>
                `;
                list.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

function toggleSections(visibleSectionId) {
    document.getElementById("coursesSection").classList.add("hidden");
    document.getElementById("studentsSection").classList.add("hidden");
    document.getElementById("formSection").classList.add("hidden");
    document.getElementById(visibleSectionId).classList.remove("hidden");
}

function showCreateForm(type) {
    document.getElementById("formType").value = type;
    document.getElementById("editId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("formTitle").textContent = `Új ${type === "course" ? "kurzus" : "diák"} létrehozása`;
    toggleSections("formSection");
}

function editItem(id, name) {
    document.getElementById("formType").value = currentView;
    document.getElementById("editId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("formTitle").textContent = `${currentView === "course" ? "Kurzus" : "Diák"} szerkesztése`;
    toggleSections("formSection");
}

function deleteItem(id) {
    const api = currentView === "course" ? coursesApi : studentsApi;
    fetch(`${api}/${id}`, { method: "DELETE" })
        .then(response => {
            if (response.ok) {
                fetchData(api, currentView === "course" ? "coursesList" : "studentsList");
            } else {
                console.error("Error deleting item");
            }
        })
        .catch(error => console.error("Error:", error));
}

function handleSubmit(event) {
    event.preventDefault();

    const type = document.getElementById("formType").value;
    const id = document.getElementById("editId").value;
    const name = document.getElementById("name").value;
    const api = type === "course" ? coursesApi : studentsApi;
    const method = id ? "PUT" : "POST";
    const url = id ? `${api}/${id}` : api;

    const payload = { name }; // Adat, amit elküldünk

    console.log("Mentési kérelem:", {
        url,
        method,
        payload,
    });

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
        .then(response => {
            console.log("Válasz státusz:", response.status);
            if (!response.ok) {
                return response.json().then(err => {
                    console.error("API hibaüzenet:", err);
                    alert(`Hiba történt: ${err.message || "Ismeretlen hiba"}`);
                    throw new Error(err.message || "Ismeretlen hiba");
                });
            }
            return response.json();
        })
        .then(data => {
            console.log("Sikeres válasz:", data);
            fetchData(api, type === "course" ? "coursesList" : "studentsList");
            toggleSections(`${type}sSection`);
        })
        .catch(error => {
            console.error("Hiba a mentés során:", error);
            alert(`Nem sikerült menteni: ${error.message}`);
        });
}