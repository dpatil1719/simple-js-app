// IIFE that contains the pokemonList
let pokemonRepository = (function () {
    let repository = [
        {
            name: "Bulbasaur",
            height: 0.7,
            types: ["grass", "poison"],
        },
        {
            name: "Charizard",
            height: 1.7,
            types: ["fire", "flying"],
        },
        {
            name: "Squirtle",
            height: 1,
            types: ["water"],
        },
    ];
    // Function to add a new Pokémon to the list
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
        ) {
            repository.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }
    function getAll() {
        return repository;
    }

    // Function to log details of a Pokémon to the console
    function showDetails(pokemon) {
        console.log(pokemon);
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        // Add click event listener to the button
        button.addEventListener("click", function () {
            showDetails(pokemon); // Call showDetails() when clicked
        });

        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    };
})();

pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

// ✅ Filters Pokémon by name (case-insensitive)
function filterByName(name) {
    return pokemonList.filter(function (pokemon) {
        return pokemon.name.toLowerCase() === name.toLowerCase();
    });
}
