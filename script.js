// script.js

const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');
const movieModal = document.getElementById('movieModal');
const movieTitle = document.getElementById('movieTitle');
const movieSource = document.getElementById('movieSource');
const filmRequestModal = document.getElementById('filmRequestModal');

// Toggle Sidebar
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

// Open Modal
function openModal(title, src) {
    movieTitle.textContent = title;
    movieSource.src = src;
    movieModal.style.display = 'flex';
}

// Close Modal
function closeModal() {
    movieModal.style.display = 'none';
    movieSource.src = '';
}

// Search Movies
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const movies = moviesContainer.querySelectorAll('.movie-card');

    movies.forEach(movie => {
        const title = movie.querySelector('h3').textContent.toLowerCase();
        movie.style.display = title.includes(query) ? 'block' : 'none';
    });
});

// Open Film Request Modal
document.querySelector('.film-request-button').addEventListener('click', () => {
    filmRequestModal.style.display = 'block';
});

// Close Film Request Modal
function closeFilmRequestModal() {
    filmRequestModal.style.display = 'none';
}
