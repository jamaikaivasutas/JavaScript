const form = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const cardsContainer = document.getElementById('cards-container');
const toggleModeBtn = document.querySelector('.toggle-mode');
const clearBtn = document.querySelector('.clear-btn');

const API_BASE = 'https://www.codewars.com/api/v1/users';
const STORAGE_KEY = 'codewarsTheme';

function fetchUserData(username) {
    fetch(`${API_BASE}/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                addUserCard(data);
            } else {
                alert('User not found!');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function addUserCard(user) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h2>${user.username}</h2>
        <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
        <p><strong>Clan:</strong> ${user.clan || 'N/A'}</p>
        <p><strong>Languages:</strong> ${user.ranks.languages.javascript ? 'JavaScript' : 'N/A'}</p>
        <p><strong>Rank:</strong> ${user.ranks.overall.name}</p>
    `;
    cardsContainer.appendChild(card);
}

function toggleDarkMode() {
    const currentTheme = document.body.style.getPropertyValue('--background-color');
    if (currentTheme === '#fff') {
        setTheme('#121212', '#f9f9f9', '#000');
        localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
        setTheme('#fff', '#121212', '#f9f9f9');
        localStorage.setItem(STORAGE_KEY, 'light');
    }
}

function setTheme(backgroundColor, cardBackground, textColor) {
    document.body.style.setProperty('--background-color', backgroundColor);
    document.body.style.setProperty('--card-background', cardBackground);
    document.body.style.setProperty('--text-color', textColor);
}

function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'dark') {
        setTheme('#121212', '#f9f9f9', '#000');
    } else {
        setTheme('#fff', '#121212', '#f9f9f9');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
        fetchUserData(username);
        usernameInput.value = '';
    }
});

toggleModeBtn.addEventListener('click', toggleDarkMode);

clearBtn.addEventListener('click', () => {
    cardsContainer.innerHTML = '';
});

loadTheme();
