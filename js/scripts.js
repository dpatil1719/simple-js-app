// IIFE that contains the pokemonList
let pokemonRepository = (function () {
    let pokemonList = [
        { name: "Bulbasaur", height: 7 },
        { name: "Ivysaur", height: 1 },
        { name: "Venusaur", height: 2 }
    ];

    // Function to add a new Pokémon to the list
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            pokemon !== null &&
            Object.keys(pokemon).length === 2 &&
            "name" in pokemon &&
            "height" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.error(" Invalid Pokémon. Must be an object with name and height.");
        }
    }

    // Function to return the list
    function getAll() {
        return pokemonList;
    }
    // ✅ Filters Pokémon by name (case-insensitive)
    function filterByName(name) {
        return pokemonList.filter(function (pokemon) {
            return pokemon.name.toLowerCase() === name.toLowerCase();
        });
    }
    // Public API (returned object)
    return {
        getAll: getAll,
        add: add,
        filterByName: filterByName
    };
})();



//  Loop through each Pokémon using forEach
pokemonRepository.getAll().forEach(function (pokemon) {
    let description = pokemon.name + " (height: " + pokemon.height + ")";

    if (pokemon.height > 6) {
        description += " - Wow, that’s big!";
    }

    document.write(description + "<br>");
});

//  Sample add & search test calls 
pokemonRepository.add({ name: "Pikachu", height: 4 });
pokemonRepository.add({ name: "Mewtwo", height: "tall" });
pokemonRepository.add({ name: "Onix", height: 28 });

console.log("All Pokémon:", pokemonRepository.getAll());
console.log("Search 'Pikachu':", pokemonRepository.filterByName("Pikachu"));


