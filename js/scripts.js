let pokemonRepository = (function () {
    let pokemonList = [];
  
    function add(pokemon) {
      if (
        typeof pokemon === 'object' &&
        'name' in pokemon &&
        'detailsUrl' in pokemon
      ) {
        pokemonList.push(pokemon);
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function loadList() {
      showLoadingMessage();
      return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
        .then(response => response.json())
        .then(json => {
          json.results.forEach(pokemon => {
            add({
              name: pokemon.name,
              detailsUrl: pokemon.url,
            });
          });
          hideLoadingMessage();
        })
        .catch(e => {
          console.error(e);
          hideLoadingMessage();
        });
    }
  
    function loadDetails(pokemon) {
      showLoadingMessage();
      return fetch(pokemon.detailsUrl)
        .then(response => response.json())
        .then(details => {
          // Add details to the Pokémon
          pokemon.imgUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = details.types.map(t => t.type.name).join(', ');
          hideLoadingMessage();
        })
        .catch(e => {
          console.error(e);
          hideLoadingMessage();
        });
    }
  
    function showLoadingMessage() {
      let loadingMessage = document.createElement('p');
      loadingMessage.innerText = 'Loading...';
      loadingMessage.id = 'loading-message';
      document.body.appendChild(loadingMessage);
    }
  
    function hideLoadingMessage() {
      const msg = document.querySelector('#loading-message');
      if (msg) msg.remove();
    }
  
    return {
      add,
      getAll,
      loadList,
      loadDetails,
    };
  })();
  
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }
  
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(() => {
      console.log(pokemon); // Pokémon details loaded from API
      alert(`Name: ${pokemon.name}\nHeight: ${pokemon.height}\nType(s): ${pokemon.types}`);
    });
  }
  
  // Initialize the app
  pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach(pokemon => {
      addListItem(pokemon);
    });
  });
  