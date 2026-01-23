export async function commandExit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    state.interface.close();
    process.exit(0);
}
