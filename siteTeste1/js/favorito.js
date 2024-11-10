document.addEventListener("DOMContentLoaded", function() {
    const favoriteButton = document.getElementById('favorite-btn');
    const favoriteText = document.getElementById('favorite-btn-text');  
    const animeTitle = favoriteButton.getAttribute('data-anime-title');  

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let isFavorite = favorites.includes(animeTitle);  

    
    function updateFavoriteButton() {
        const svgIcon = favoriteButton.querySelector('svg');  

        if (isFavorite) {
            // Se o anime está nos favoritos, atualize para o ícone de "remover" (bi-bookmark-check-fill)
            svgIcon.setAttribute('class', 'bi bi-bookmark-check-fill');  // Atualiza a classe para o ícone de removido
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
    updateFavoriteButton();


    favoriteButton.addEventListener('click', function() {
        if (isFavorite) {
            favorites = favorites.filter(fav => fav !== animeTitle);
            isFavorite = false; 

            alert('Removido dos favoritos!');
        } else {
            favorites.push(animeTitle);
            isFavorite = true;  

            alert('Adicionado aos favoritos!');
        }


        localStorage.setItem('favorites', JSON.stringify(favorites));


        updateFavoriteButton();
    });
});