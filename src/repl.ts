import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./command_registry.js";


export function cleanInput(string: String): String[] {
    const words = string.toLowerCase().split(" ");
    const finalWords = [];
    for (const word of words) {
        if (word !== "") {
            finalWords.push(word);
        }
    }    
    return finalWords;
}


export function startREPL() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();

    rl.on("line", (input) => {
        const parsedWords = cleanInput(input);
        if (!parsedWords.length) {
            rl.prompt();
            return;
        }
        const registry = getCommands();
        const userCommand = parsedWords[0];
        for (const command in registry) {
            if (userCommand === command) {
                try {
                    registry[command].callback(registry);
                } catch (err) {
                    if (err instanceof Error) {
                        console.log(err.message);
                    } else {
                        console.log("Unknown error");
                    }
                }
            } 
        }
        console.log("Unknown command");
        rl.prompt();


    });
}



