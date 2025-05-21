const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')
const maxRecords = 151;
const limit = 10;
let offset = 0;


function loadPokemonItens(offset, limit){
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 
    const newHtml = pokemons.map((pokemon) => 
      `<li class="pokemon" data-aos="zoom-in-up" id="${pokemon.type}" onclick="showDetails(${pokemon.number})">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
            </ol>
        
            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        </li>
      `).join('')
    pokemonList.innerHTML += newHtml 
  })
}

function showDetails(pokemonNumber) {
  pokeApi.getPokemonById(pokemonNumber).then((pokemon) => {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('infoContent', 'active');
    modalContainer.setAttribute('data-aos', 'zoom-in-up');
    
    const htmlDetails = `
      <div class="infoContentPokemon">
      <div class="infoHead">
        <span class="InfoNumber">#${pokemon.number}</span>
        <div class="InfoNames">
          <h3>${pokemon.name}</h3>
          ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`)}
        </div>
        <div class="infoImage">
          <div class="imageFilter ${pokemon.type}">
            <img src="${pokemon.photo}" alt="imagem">
          </div>
        </div>
      </div>
      <div class="infoMainPokemon">
        <div class="infoList">
          <ol>
            <li>about</li>
          </ol>
        </div>
        <div class="infoAbout-content">
          <ol class="infoAbout">
            <li> <img src="./assets/icons/ruler.svg" alt="ruler">height: <span>${pokemon.height}m</span></li>
            <li> <img src="./assets/icons/weight.svg" alt="weight"> weight: <span>${pokemon.weight}kg</span></li>
            <li class="stat-item">
              <span class="stat-name">HP</span>
              <span class="stat-value">${pokemon.stats.hp}</span>
              <div class="progress-bar">
                <input class="progress" type="range" name="hp" id="hp" min="0" max="100" value="${pokemon.stats.hp}" step="1" disabled>
              </div>
            </li>
            <li class="stat-item">
              <span class="stat-name">attack</span>
              <span class="stat-value">${pokemon.stats.attack}</span>
              <div class="progress-bar">
                <input class="progress" type="range" name="attack" id="attack" min="0" max="100" value="${pokemon.stats.attack}" step="1" disabled>
              </div>
            </li>
          </ol>
        </div>
        <div class="infoButton">
            <button id="close" type="button">
              Close
            </button>
          </div>
      </div>
    </div>
    `;
    
    modalContainer.innerHTML = htmlDetails;
    document.body.appendChild(modalContainer);
  
    const closeButton = modalContainer.querySelector('#close');
    closeButton.addEventListener('click', () => {
       const modalContainer = document.querySelector('.infoContent');
       if (modalContainer) {
          modalContainer.classList.remove('active');
          document.body.removeChild(modalContainer);
       }
     });
  });
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () =>{
  offset += limit

  const qtdRecordsWithNexPage = offset + limit
  if(qtdRecordsWithNexPage >= maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)
    
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItens(offset, limit)
  }
})


AOS.init();







