document.addEventListener("DOMContentLoaded", function() {
    const favoritesList = document.getElementById('favorites-list');

    // Função para pegar os favoritos do localStorage
    function getFavorites() {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    }

    // Função para buscar detalhes do anime usando GraphQL da Anilist
    function fetchAnimeDetails(animeId) {
        const query = `
            query {
                Media(id: ${animeId}, type: ANIME) {
                    title {
                        romaji
                        english
                        native
                    }
                    description
                    coverImage {
                        large
                    }
                    genres
                }
            }
        `;

        return fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query
            })
        })
        .then(response => response.json())
        .then(data => {
            return data.data.Media;
        });
    }

    const favorites = getFavorites(); // Pega os favoritos do localStorage

    // Verifica se há favoritos para exibir
    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>Nenhum anime favorito encontrado.</p>";
        return;
    }

    // Para cada anime favoritado, busque os detalhes
    favorites.forEach(animeId => {
        fetchAnimeDetails(animeId)
            .then(anime => {
                // Cria o item de anime para exibir na página
                const animeItem = document.createElement('div');
                animeItem.classList.add('favorites-list'); // Adiciona a classe 'favorito-card' para estilizar como um card

                // card
                animeItem.innerHTML = `
                <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
                <div class="anime-info">
                <h3>${anime.title.romaji}</h3>
                </div>
                <a href="anime-details.html?id=${animeId}">Ver Detalhes</a>
                `;
                favoritesList.appendChild(animeItem);
            })
            .catch(error => {
                console.error("Erro ao buscar detalhes do anime:", error);
                // erro
                const errorMessage = document.createElement('p');
                errorMessage.textContent = "Não foi possível carregar os detalhes de alguns animes.";
                favoritesList.appendChild(errorMessage);
            });
    });
});
