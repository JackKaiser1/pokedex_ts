import { ShallowLocations } from "./pokeapi.js";
import { type State } from "./state.js";

export async function commandMap(state: State) {
    if (state.nextLocationsURL === null) {
        console.log("You are on the last page. Use mapb to move back.");
        return;
    }
    const poke = state.pokeapi;

    const locationObj = state.prevLocationsURL === null ? await poke.fetchLocations() : await poke.fetchLocations(state.nextLocationsURL);

    const locations = locationObj.results;
    for (const location of locations) {
        console.log(location.name);
    }
    state.nextLocationsURL = locationObj.next ?? null;
    state.prevLocationsURL = locationObj.previous ?? "https://pokeapi.co/api/v2/location-area";
}