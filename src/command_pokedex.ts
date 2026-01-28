import { type State} from "./state.js";

export async function commandPokedex(state: State) {
    const pokedex = state.pokedex;
    const pokeKeys = pokedex.keys();

    console.log("\n");
    console.log("Your Pokedex:");
    let empty = true;
    for (const key of pokeKeys) {
        const pokemonObj = pokedex.get(key);
        if (pokemonObj) {
            empty = false;
            const pokeName = pokemonObj.name;
            console.log(` -${pokeName}`);
        }
    }
    if (empty) console.log(" -You have not caught any Pokemon yet");
    console.log("\n");
}