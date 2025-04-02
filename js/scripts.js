let pokemonList = [
  { name: "Bulbasaur", height: 7, types: ["grass", "poison"] },
  { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
  { name: "Venusaur", height: 2, types: ["grass", "poison"] },
];

// Loop through each Pokémon in the list
for (let i = 0; i < pokemonList.length; i++) {
  //Store the output of name & height
  let output = pokemonList[i].name + " (height: " + pokemonList[i].height + ")";

  //Check if the height is more than 10
  if (pokemonList[i].height > 6) output += " - Wow, that’s big!";

  //Print output to webpage
  document.write(output + "<br>");
}
