document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');

    if (!animeId) {
        console.error('Anime ID não encontrado na URL');
        return;
    }

    function getFavorites() {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    }

    function updateFavorites(animeId, add) {
        const favorites = getFavorites();
        if (add) {
            if (!favorites.includes(animeId)) {
                favorites.push(animeId);
            }
        } else {
            const index = favorites.indexOf(animeId);
            if (index !== -1) {
                favorites.splice(index, 1);
            }
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function updateFavoriteButton(favoriteButton, animeId) {
        const favoriteText = favoriteButton.querySelector('#favorite-btn-text');
        const svgIcon = favoriteButton.querySelector('svg');

        const favorites = getFavorites();
        const isFavorite = favorites.includes(animeId);

        if (isFavorite) {
            svgIcon.setAttribute('class', 'bi bi-bookmark-check-fill');
            svgIcon.innerHTML = `
                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            `;
            favoriteText.textContent = "Remover dos Favoritos";
            favoriteButton.classList.remove('add-to-favorites');
            favoriteButton.classList.add('remove-from-favorites');
        } else {
            svgIcon.setAttribute('class', 'bi bi-bookmark-plus');
            svgIcon.innerHTML = `
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4"/>
            `;
            favoriteText.textContent = "Adicionar aos Favoritos";
            favoriteButton.classList.remove('remove-from-favorites');
            favoriteButton.classList.add('add-to-favorites');
        }
    }

    const favoriteButton = document.getElementById('favorite-btn');
    if (!favoriteButton) {
        console.error('Botão de favorito não encontrado');
        return;
    }

    updateFavoriteButton(favoriteButton, animeId);

    favoriteButton.addEventListener('click', function() {
        const isFavorite = getFavorites().includes(animeId);

        updateFavorites(animeId, !isFavorite);

        if (isFavorite) {
            alert('Removido dos favoritos!');
        } else {
            alert('Adicionado aos favoritos!');
        }

        updateFavoriteButton(favoriteButton, animeId);
    });
});


function updateFavorites(animeId, add) {
    const favorites = getFavorites();
    if (add) {
        if (!favorites.includes(animeId)) {
            favorites.push(animeId);
        }
    } else {
        const index = favorites.indexOf(animeId);
        if (index !== -1) {
            favorites.splice(index, 1);
        }
    }
    console.log('Atualizando favoritos:', favorites);  // Adicione isso para verificar
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
