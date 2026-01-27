// import { PokeAPI } from "./pokeapi.js";
import { type State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    const pokeapi = state.pokeapi;
    const locationObj = await pokeapi.fetchLocation(args[0]);
    const encounters = locationObj.pokemon_encounters;
    for (const encounter of encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}