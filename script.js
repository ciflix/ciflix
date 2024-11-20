// Toggle Sidebar
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('hidden');
});

// Modal
function openModal(title, src) {
    const modal = document.getElementById('movieModal');
    const movieTitle = document.getElementById('movieTitle');
    const movieSource = document.getElementById('movieSource');

    movieTitle.innerText = title;
    movieSource.src = src;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('movieModal');
    const movieSource = document.getElementById('movieSource');

    modal.style.display = 'none';
    movieSource.src = '';
}

// Film Request Modal
const filmRequestButton = document.querySelector('.film-request-button');
const filmRequestModal = document.getElementById('filmRequestModal');

filmRequestButton.addEventListener('click', () => {
    filmRequestModal.style.display = 'block';
});

function closeFilmRequestModal() {
    filmRequestModal.style.display = 'none';
}

// Snowflakes
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerText = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.fontSize = Math.random() * 10 + 10 +
