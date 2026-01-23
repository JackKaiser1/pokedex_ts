import type { CLICommand, State } from "./state.js";


export function cleanInput(string: string): string[] {
    const words = string.toLowerCase().split(" ");
    const finalWords = [];
    for (const word of words) {
        if (word !== "") {
            finalWords.push(word);
        }
    }    
    return finalWords;
}


export function startREPL(state: State) {
    const rl = state.interface;

    rl.prompt();

    rl.on("line", async (input) => {
        const parsedWords = cleanInput(input);
        if (!parsedWords.length) {
            rl.prompt();
            return;
        }

        const userCommand = parsedWords[0];
        const registry = state.registry;
        const command = registry[userCommand];

        if (command) {
            try {
                await command.callback(state);
            } catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("Unknown error");
                }
            }
        } else {
            console.log("Unknown command");
        }
        
        rl.prompt();
        
    });
}



