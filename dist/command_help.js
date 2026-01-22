export async function commandHelp(state) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    const commandRegistry = state.registry;
    for (const command in commandRegistry) {
        const description = commandRegistry[command].description;
        console.log(`${command}: ${description}`);
    }
}
