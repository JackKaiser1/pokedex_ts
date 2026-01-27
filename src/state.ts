import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
    interface: Interface;
    registry: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
}

export function initState(): State {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > ",
    });

    const reg: Record<string, CLICommand> = {
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
            },
            explore: {
                name: "explore",
                description: "Displays the names of all of the pokemon in the specified area, takes one parameter",
                callback: commandExplore,
            }
        }

    return {
        interface: rl,
        registry: reg,
        pokeapi: new PokeAPI(),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area",
        prevLocationsURL: null,
    }
}