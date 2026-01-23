import { type State } from "./state.js";

export async function commandMapb(state: State) {
    if (state.prevLocationsURL === null) {
        console.log("you're on the first page");
        return;
    }

    const poke = state.pokeapi;
    const locationObj = await poke.fetchLocations(state.prevLocationsURL);
    const locations = locationObj.results;

    for (const location of locations) {
        console.log(location.name);
    }
    console.log("\n");
    state.nextLocationsURL = locationObj.next;
    state.prevLocationsURL = locationObj.previous ?? null;
}

