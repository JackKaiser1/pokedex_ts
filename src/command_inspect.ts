import { stat } from "node:fs";
import { type State} from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    const pokedex = state.pokedex;
    const pokeName: string = args[0];
    const pokemonObj = pokedex.get(pokeName);

    if (pokemonObj) {
        console.log("\n")
        console.log(`Name: ${pokemonObj.name}`);
        console.log(`Height: ${pokemonObj.height}`);
        console.log(`Weight: ${pokemonObj.weight}`);
        console.log("Stats:");

        for (const statObj of pokemonObj.stats) {
            const statName = statObj.stat.name;
            const statVal = statObj.base_stat;
            console.log(`  -${statName}: ${statVal}`);
        }

        console.log("Types:");
        for (const typeObj of pokemonObj.types) {
            const typeName = typeObj.type.name;
            console.log(`  -${typeName}`);
        } 
        console.log("\n")

    } else {
        console.log("You have not caught that Pokemon yet!");
    }
}