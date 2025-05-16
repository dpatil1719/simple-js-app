let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => {
        json.results.forEach(pokemon => {
          add({
            name: pokemon.name,
            detailsUrl: pokemon.url
          });
        });
      })
      .catch(e => console.error(e));
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(response => response.json())
      .then(details => {
        pokemon.imgUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map(t => t.type.name).join(', ');
      })
      .catch(e => console.error(e));
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    list.appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(
        pokemon.name,
        `Height: ${pokemon.height}, Type: ${pokemon.types}`,
        pokemon.imgUrl
      );
    });
  }

  function showModal(name, details, imageUrl) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = name;

    let contentElement = document.createElement('p');
    contentElement.innerText = details;

    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = imageUrl;

    modal.appendChild(closeButton);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // Modal event listeners
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  document.querySelector('#modal-container').addEventListener('click', (e) => {
    if (e.target === document.querySelector('#modal-container')) {
      hideModal();
    }
  });

  return {
    add,
    getAll,
    loadList,
    loadDetails,
    addListItem
  };
})();

// Start the app
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
  });
});
