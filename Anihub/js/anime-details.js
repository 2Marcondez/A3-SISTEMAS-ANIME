document.addEventListener("DOMContentLoaded", async () => {
    const animeId = new URLSearchParams(window.location.search).get("id");
    if (animeId) {
        const animeDetails = await fetchAnimeDetails(animeId);
        renderAnimeDetails(animeDetails);
    }
});

async function fetchAnimeDetails(id) {
    try {
        const response = await fetch(`https://graphql.anilist.co/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query ($id: Int) {
                        Media(id: $id) {
                            title {
                                romaji
                            }
                            coverImage {
                                large
                            }
                            bannerImage
                            description
                            episodes
                            status
                            season
                            startDate {
                                year
                                month
                                day
                            }
                            characters {
                                nodes {
                                    name {
                                        full
                                    }
                                    image {
                                        large
                                    }
                                }
                            }
                            trailer {
                                id
                                site
                                thumbnail
                            }
                            studios {
                                nodes {
                                    name
                                }
                            }
                        }
                    }
                `,
                variables: { id: parseInt(id) },
            }),
        });

        const data = await response.json();
        console.log("Resposta da API:", data); // Verifique a resposta da API aqui
        if (data.data && data.data.Media) {
            return data.data.Media;
        } else {
            console.error("Dados não encontrados na resposta da API");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar detalhes do anime:", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const animeId = new URLSearchParams(window.location.search).get("id");
    if (animeId) {
        const animeDetails = await fetchAnimeDetails(animeId);
        renderAnimeDetails(animeDetails);
        initializeCharacterCarousel();
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const animeId = new URLSearchParams(window.location.search).get("id");
    console.log("Anime ID da URL:", animeId); // Verifique o valor do ID aqui
    if (animeId) {
        const animeDetails = await fetchAnimeDetails(animeId);
        renderAnimeDetails(animeDetails);
    }
});


function renderAnimeDetails(anime) {
    if (!anime) {
        console.error("Não foi possível renderizar os detalhes do anime: dados ausentes");
        return;
    }

    // Atualiza o banner
    if (anime.bannerImage) {
        document.querySelector('.anime-banner img').src = anime.bannerImage;
    }

    // Atualiza a capa e descrição
    document.querySelector('.anime-cover-image img').src = anime.coverImage ? anime.coverImage.large : '';
    document.querySelector('.anime-description h1').textContent = anime.title ? anime.title.romaji : 'Título não disponível';
    document.querySelector('.anime-description p').innerHTML = anime.description || 'Descrição não disponível';

    // Atualiza informações triviais
    const infoList = document.querySelector('.anime-info-list');
    infoList.innerHTML = `
        <li><strong>Status:</strong> ${anime.status || 'Não disponível'}</li>
        <li><strong>Temporada:</strong> ${anime.season || 'Não disponível'}</li>
        <li><strong>Data de Início:</strong> ${anime.startDate ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` : 'Não disponível'}</li>
        <li><strong>Episódios:</strong> ${anime.episodes || 'Não disponível'}</li>
        <li><strong>Estúdio:</strong> ${anime.studios ? anime.studios.nodes.map(studio => studio.name).join(', ') : 'Não disponível'}</li>
    `;

    // Renderiza personagens no carrossel
    const charactersCarousel = document.querySelector('.characters-carousel');
    if (anime.characters && anime.characters.nodes) {
        charactersCarousel.innerHTML = anime.characters.nodes.map(character => `
            <div class="character-card">
                <img src="${character.image.large}" alt="${character.name.full}">
                <p>${character.name.full}</p>
            </div>
        `).join('');
    }

    // Adiciona o trailer com iframe
    const trailerContainer = document.querySelector('.anime-trailer');
    if (anime.trailer && anime.trailer.id) {
        let trailerUrl = `https://www.youtube.com/embed/${anime.trailer.id}`;

        // Renderiza o iframe do trailer
        trailerContainer.innerHTML = `
            <h2>Trailer</h2>
            <div class="trailer-video">
                <iframe src="${trailerUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    } else {
        trailerContainer.innerHTML = `<h2>Trailer não disponível</h2>`;
    }
}

function initializeCharacterCarousel() {
    const carousel = document.querySelector('.characters-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < carousel.children.length - 4) { // Ajuste para quantos personagens são visíveis ao mesmo tempo
            currentIndex++;
            updateCarousel();
        }
    });

    function updateCarousel() {
        const offset = currentIndex * 110; // Ajuste a largura (100px) + margin (10px)
        carousel.style.transform = `translateX(-${offset}px)`;
    }
}
