// Liste des films
const movies = [
    { title: "cacaTerrifier 3", img: "https://i.ibb.co/CBpcPKf/image.png", src: "https://vidhidehub.com/embed/i581mc3sxmao", },
    { title: "Avatar", img: "https://i.ibb.co/LQgjGTv/image.jpg", src: "https://vidhidehub.com/embed/i581mc3sxmao", },
    { title: "Cars 2", img: "https://i.ibb.co/hFHYMKy/image.png", src: "https://vidhidehub.com/embed/ih2wdzg2dmek" },
    { title: "Cars 1", img: "https://i.ibb.co/C5C73BZ/image.png", src: "https://vidhidehub.com/embed/en0xnvdz2fb9" },
    { title: "Cars 3", img: "https://i.ibb.co/WVfVVnn/image.png", src: "https://vidhidehub.com/embed/ih2wdzg2dmek" },
    { title: "Oppenheimer", img: "https://i.ibb.co/bg5tDTn/image.png", src: "https://vidhidehub.com/embed/trtnr14ocphf" },
    { title: "Les crevettes pailletées", img: "https://i.ibb.co/wd5nS7x/image.png", src: "https://vidhidehub.com/embed/lvl6ltynis3s" },
    { title: "La revanche des crevettes pailletées", img: "https://i.ibb.co/f8Q61Ht/image.png", src: "https://vidhidehub.com/embed/10ko0pxynsyy" },
    { title: "Olga", img: "https://i.ibb.co/5TcPXr5/image.png", src: "https://vidhidehub.com/embed/mmuimqpmynja" },
    { title: "Elementaire", img: "https://i.ibb.co/0D6qcG6/image.png", src: "https://dhtpre.com/embed/faos0bmjtrrj" },
    { title: "Encanto", img: "https://i.ibb.co/LQGBtGY/image.png", src: "https://dhtpre.com/embed/rf22u7ikko28" },
    { title: "La belle et la bête le film", img: "https://i.ibb.co/nw1JfMp/image.png", src: "https://dhtpre.com/embed/1oxre4vli30i" },
    { title: "Les Choristes", img: "https://i.ibb.co/zNDYrVd/image.png", src: "https://dhtpre.com/embed/1293fhkibvij" },
    { title: "Le Royaume de Naya", img: "https://i.ibb.co/VWMWBz0/image.png", src: "https://dhtpre.com/embed/pv60n2fbq63y", new: true },
    { title: "Terrifier 3", img: "https://i.ibb.co/CBpcPKf/image.png", src: "https://vidhidehub.com/embed/i581mc3sxmao", new: true },
    { title: "Terrifier 3", img: "https://i.ibb.co/CBpcPKf/image.png", src: "https://vidhidehub.com/embed/i581mc3sxmao", new: true },
    { title: "Terrifier 3", img: "https://i.ibb.co/CBpcPKf/image.png", src: "https://vidhidehub.com/embed/i581mc3sxmao", new: true },
    { title: "Terrifier 3", img: "https://i.ibb.co/CBpcPKf/image.png", src: "https://vidhidehub.com/embed/i581mc3sxmao", new: true },
    { title: "Terrifier 3", img: "https://i.ibb.co/CBpcPKf/image.png", src: "https://vidhidehub.com/embed/i581mc3sxmao", new: true },
    { title: "Terrifier 3", img: "https://i.ibb.co/CBpcPKf/image.png", src: "https://vidhidehub.com/embed/i581mc3sxmao", new: true },
  ];

// Références des éléments
const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
const mainContent = document.querySelector('.main-content');

// Basculer la barre latérale
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('hidden');
});

// Références pour les films
const moviesContainer = document.getElementById('moviesContainer');
const movieModal = document.getElementById('movieModal');
const movieTitle = document.getElementById('movieTitle');
const movieSource = document.getElementById('movieSource');
const searchInput = document.getElementById('searchInput');

// Fonction pour gérer la visibilité des badges "Nouveau"
function toggleNewBadges(shouldHide) {
    const badges = document.querySelectorAll('.new-badge');
    badges.forEach(badge => {
        badge.style.display = shouldHide ? 'none' : 'block';
    });
}

// Générer les cartes des films
function displayMovies(filter = "") {
    moviesContainer.innerHTML = "";

    // Trier les films pour afficher ceux marqués "Nouveau" en haut
    const sortedMovies = movies.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));

    sortedMovies
        .filter(movie => movie.title.toLowerCase().includes(filter.toLowerCase()))
        .forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';

            // Image
            const img = document.createElement('img');
            img.src = movie.img;
            img.alt = movie.title;

            // Titre
            const title = document.createElement('h3');
            title.innerText = movie.title;

            // Badge "Nouveau"
            if (movie.new) {
                const badge = document.createElement('div');
                badge.className = 'new-badge';
                badge.innerText = "Nouveau";
                movieCard.appendChild(badge);
            }

            // Bouton
            const button = document.createElement('button');
            button.innerText = "Regarder";
            button.onclick = () => openModal(movie.title, movie.src);

            movieCard.appendChild(img);
            movieCard.appendChild(title);
            movieCard.appendChild(button);

            moviesContainer.appendChild(movieCard);
        });
}

// Ouvrir la modal
function openModal(title, src) {
    movieTitle.innerText = title;
    movieSource.src = src;
    movieModal.style.display = 'flex';

    // Masquer les badges "Nouveau"
    toggleNewBadges(true);
}

// Fermer la modal
function closeModal() {
    movieModal.style.display = 'none';
    movieSource.src = ""; // Réinitialiser la source

    // Réafficher les badges "Nouveau"
    toggleNewBadges(false);
}

// Événement de recherche
searchInput.addEventListener('input', (e) => displayMovies(e.target.value));

// Afficher les films au chargement
displayMovies();

// Récupérer les éléments
const filmRequestButton = document.querySelector('.film-request-button');
const filmRequestModal = document.getElementById('filmRequestModal');

// Afficher le modal lorsque le bouton est cliqué
filmRequestButton.addEventListener('click', () => {
    filmRequestModal.style.display = 'block';
});

// Fermer le modal lorsque l'on clique sur le bouton Fermer
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
        // Si le nombre de flocons est inférieur à la limite, on en crée un nouveau
        if (snowflakes.length < maxSnowflakes) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.innerText = '❄';  // Flocon de neige

            const randomX = Math.random() * 100;  // Position horizontale aléatoire
            const randomDelay = Math.random() * 5;  // Délai d'animation aléatoire
            const randomDuration = 5 + Math.random() * 10;  // Durée de chute aléatoire

            snowflake.style.left = `${randomX}%`;
            snowflake.style.animationDuration = `${randomDuration}s`;
            snowflake.style.animationDelay = `${randomDelay}s`;

            snowContainer.appendChild(snowflake);

            // Ajouter le flocon au tableau
            snowflakes.push(snowflake);

            // Retirer le flocon du tableau et du DOM une fois l'animation terminée
            snowflake.addEventListener('animationend', () => {
                // Supprimer du tableau et du DOM
                snowflakes = snowflakes.filter(flake => flake !== snowflake);
                snowflake.remove();
            });
        }
    }

    // Générer des flocons à intervalles réguliers
    setInterval(createSnowflake, 200);  // Créer un nouveau flocon toutes les 200ms
});
