import { type State } from "./state.js";
import { type Pokemon} from "./pokeapi.js";



export async function commandCatch(state: State, ...args: string[]) {
    const pokeapi = state.pokeapi;
    const pokemonName = args[0];
    const pokeObj = await pokeapi.fetchPokemon(pokemonName);

    if (pokeObj) {
        console.log(`Throwing a Pokeball at ${pokemonName}...\n`);
    } else {
        console.log(`-${pokemonName} is invalid-`);
    }

    const [catchNum, randNum, catchLow, catchHigh] = getRand(pokeObj.base_experience);

    // console.log("\n");
    // console.log(pokeObj.base_experience);
    // console.log(catchNum);
    // console.log(randNum);

    if (randNum >= catchNum - catchLow && randNum < catchNum + catchHigh) {
        console.log(`${pokemonName} was caught!`);
        state.pokedex.set(pokemonName, pokeObj);
    } else {
        console.log(`${pokemonName} escaped`);
    }
}

function getRand(max: number): [number, number, number, number] {
    const min = max / 2; 
    const range = max - min;
    const randNum = Math.round(Math.random() * (range) + min);
    const catchNum = Math.round(min / 1.5);
    const catchLow = Math.floor(max / 7);
    const catchHigh = Math.ceil(max / 3);

    return [catchNum, randNum, catchLow, catchHigh];
}