import type { CommandRegistry } from "./command_registry";

export function commandHelp(commandRegistry: CommandRegistry) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const command in commandRegistry) {
        const description = commandRegistry[command].description;
        console.log(`${command}: ${description}`);
    }
    // console.log("\n");
}