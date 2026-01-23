import { createInterface } from "readline";
import { stdin, stdout } from "node:process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
export function initState() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > ",
    });
    const reg = {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays 20 location areas",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays 20 previous location areas",
            callback: commandMapb,
        }
    };
    return {
        interface: rl,
        registry: reg,
        pokeapi: new PokeAPI(),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area",
        prevLocationsURL: null,
    };
}
