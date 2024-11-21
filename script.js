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

// Affichage des films en fonction de la recherche
function displayMovies(filter = "") {
    const movieCards = document.querySelectorAll('.movie-card');
    
    // Parcourt toutes les cartes et les filtre
    movieCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        // Masque ou affiche la carte en fonction de la recherche
        card.style.display = title.includes(filter.toLowerCase()) ? "block" : "none";
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

// Ajouter un écouteur d'événements aux boutons "Regarder"
document.querySelectorAll('.watch-btn').forEach(button => {
    button.addEventListener('click', () => {
        const title = button.closest('.movie-card').querySelector('h3').innerText; // Récupère le titre du film
        const src = button.getAttribute('data-src'); // Récupère la source du film à partir de l'attribut data-src
        openModal(title, src);
    });
});

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

// Webhook Discord
const discordWebhookURL = "https://discord.com/api/webhooks/1307769219068334232/VFWM308HqGj2naUX32gOyvPBOMKV0sTCPGAYQr4Bwri4KedbpqH-9OETEfgHRRkvgVG8";

// Gestionnaire de soumission du formulaire
document.getElementById('filmRequestForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    const filmTitle = document.getElementById('filmTitle').value.trim();
    const filmDetails = document.getElementById('filmDetails').value.trim();

    if (!filmTitle) {
        alert("Veuillez entrer un titre de film.");
        return;
    }

    // Préparer les données pour Discord
    const requestData = {
        content: `🎥 **Nouvelle demande de film**\n**Titre :** ${filmTitle}\n**Détails :** ${filmDetails || "Aucun détail fourni."}`
    };

    // Envoyer la demande via fetch
    fetch(discordWebhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => {
        if (response.ok) {
            alert("Votre demande a été envoyée avec succès !");
            closeFilmRequestModal();
            document.getElementById('filmRequestForm').reset();
        } else {
            alert("Une erreur s'est produite. Veuillez réessayer.");
        }
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi au webhook Discord :", error);
        alert("Impossible d'envoyer votre demande. Vérifiez votre connexion.");
    });
});
