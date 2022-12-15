const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', findFilm);
const baseURL = 'http://www.omdbapi.com/?apikey=4a07d077';

function findFilm() {
  let searchInput = document.querySelector('input').value.toLowerCase();
  const filmsDisplay = document.querySelector('#films-display');
  filmsDisplay.textContent = '';

  fetch(`${baseURL}&s=${searchInput}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    })
    .then(data => {
      const imdbIDArr = data.Search.map(film => film.imdbID);

      for (let i = 0; i < imdbIDArr.length; i++) {
        fetch(`${baseURL}&i=${imdbIDArr[i]}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Second request failed!');
          })
          .then(filmInfo => {
            filmsDisplay.innerHTML += `
                <div class="film-info">
                    <img class="poster" src=${filmInfo.Poster}>
                    <div class="text">
                        <div class="row">
                            <h2>${filmInfo.Title}</h2>
                            <img src="./assets/star.svg">
                            <span>${filmInfo.imdbRating}</span>
                        </div>
                        <div class="row-2">
                            <span>${filmInfo.Runtime}</span>
                            <span>${filmInfo.Genre}</span>
                            <button id="add-watchlist">
                                <img src="./assets/add-btn.svg">Watchlist
                            </button>
                        </div>
                        <p>${filmInfo.Plot}</p>
                    </div>
                </div>`;
          })
          .catch(error => console.log(error));
      }
    })
    .catch(error => console.log(error));
}
