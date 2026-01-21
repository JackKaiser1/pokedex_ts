import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type CommandRegistry = Record<string, CLICommand>;

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: CommandRegistry) => void;
}


export function getCommands(): CommandRegistry {
    return {
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
    }
}