// IIFE that contains the pokemonList
let pokemonRepository = (function () {
    let pokemonList = [
        { name: "Bulbasaur", height: 7, types: ["grass", "poison"] },
        { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
        { name: "Venusaur", height: 2, types: ["grass", "poison"] },
    ];
    // Function to return the list
    function getAll() {
        return pokemonList;
    }

    // Function to add a new Pokémon to the list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // Public API (returned object)
    return {
        getAll: getAll,
        add: add
    };
})();

//  Loop through each Pokémon using forEach
pokemonRepository.getAll().forEach(function (pokemon) {
    let description = pokemon.name + " (height: " + pokemon.height + ")" + " " +"(types:" + pokemon.types + ")";

    if (pokemon.height > 6) {
        description += " - Wow, that’s big!";
    }

    document.write(description + "<br>");
});

