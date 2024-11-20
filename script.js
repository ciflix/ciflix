// Références des éléments
const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
const mainContent = document.querySelector('.main-content');
const moviesContainer = document.getElementById('moviesContainer');
const movieModal = document.getElementById('movieModal');
const movieTitle = document.getElementById('movieTitle');
const movieSource = document.getElementById('movieSource');
const searchInput = document.getElementById('searchInput');

// Basculer la barre latérale
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('hidden');
});

// Ouvrir la modal
function openModal(title, src) {
    movieTitle.innerText = title;
    movieSource.src = src;
    movieModal.style.display = 'flex';
}

// Fermer la modal
function closeModal() {
    movieModal.style.display = 'none';
    movieSource.src = ""; // Réinitialiser la source
}

// Événement de recherche
searchInput.addEventListener('input', (e) => {
    const filter = e.target.value.toLowerCase();
    const movieCards = moviesContainer.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(filter) ? 'block' : 'none';
    });
});

// Récupérer les éléments pour la demande de film
const filmRequestButton = document.querySelector('.film-request-button');
const filmRequestModal = document.getElementById('filmRequestModal');

// Afficher le modal lorsque le bouton est cliqué
filmRequestButton.addEventListener('click', () => {
    filmRequestModal.style.display = 'block';
});

// Fermer le modal de demande de film
function closeFilmRequestModal() {
    filmRequestModal.style.display = 'none';
}

// Ajouter des flocons de neige
document.addEventListener("DOMContentLoaded", function () {
    const snowContainer = document.createElement('div');
    snowContainer.style.position = 'absolute';
    snowContainer.style.top = '0';
    snowContainer.style.left = '0';
    snowContainer.style.width = '100%';
    snowContainer.style.height = '100%';
    snowContainer.style.pointerEvents = 'none';
    snowContainer.style.zIndex = '9999';
    document.body.appendChild(snowContainer);

    const maxSnowflakes = 50; // Limite du nombre de flocons en même temps
    let snowflakes = []; // Tableau pour garder une trace des flocons

    function createSnowflake() {
        if (snowflakes.length < maxSnowflakes) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.innerText = '❄';

            const randomX = Math.random() * 100; 
            const randomDelay = Math.random() * 5; 
            const randomDuration = 5 + Math.random() * 10;

            snowflake.style.left = `${randomX}%`;
            snowflake.style.animationDuration = `${randomDuration}s`;
            snowflake.style.animationDelay = `${randomDelay}s`;

            snowContainer.appendChild(snowflake);

            // Ajouter le flocon au tableau
            snowflakes.push(snowflake);

            // Retirer le flocon une fois l'animation terminée
            snowflake.addEventListener('animationend', () => {
                snowflakes = snowflakes.filter(flake => flake !== snowflake);
                snowflake.remove();
            });
        }
    }

    // Générer des flocons à intervalles réguliers
    setInterval(createSnowflake, 200);
});
