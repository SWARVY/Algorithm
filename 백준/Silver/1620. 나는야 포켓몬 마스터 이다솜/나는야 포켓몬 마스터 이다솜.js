const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [size, problems] = input.shift().split(" ").map(Number);
const pokemons = new Map();
const pokemonArray = [];

function solve() {
  for (let i = 0; i < size; i++) {
    pokemons.set(input[i], i + 1);
    pokemonArray.push(input[i]);
  }

  for (let i = size; i < input.length; i++)
    if (Number.isNaN(+input[i]))
      console.log(pokemons.get(input[i]));
    else
      console.log(pokemonArray[+input[i] - 1]);
}

solve();