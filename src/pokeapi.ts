import { Cache , type CacheEntry} from "./pokecache.js";

export class PokeAPI{
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    pokeCache = new Cache(30_000);    
    constructor() {}

    async fetchLocations(pageURL: string): Promise<ShallowLocations> {
        const dataObj: CacheEntry<Promise<ShallowLocations>> | undefined = this.pokeCache.get(pageURL);
        if (dataObj) {
            return dataObj.val;
        } else {
            const resp = await fetch(pageURL, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const result: Promise<ShallowLocations> = await resp.json() 
            this.pokeCache.add<Promise<ShallowLocations>>(pageURL, result);
            return result;
        }       
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const dataObj: CacheEntry<Promise<Location>> | undefined = this.pokeCache.get(url);
        if (dataObj) {
            return dataObj.val;
        } else {
            const resp = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const result: Promise<Location> = await resp.json();
            this.pokeCache.add(url, result);
            return result;
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: Location[];
}

export type Location = {
    encounter_method_rates: object[];
    game_index: number;
    id: number;
    location: object;
    name: string;
    names: object[];
    pokemon_encounters: PokeEncounter[];
}

export type PokeEncounter = {
    pokemon: { name: string, url: string };
    version_details: object[];
}

// const poke = new PokeAPI();
// const data = await poke.fetchLocation("great-marsh-area-1");
// for (const encounter of data.pokemon_encounters) {
//     console.log(encounter.pokemon.name);
// }
// console.log(data.pokemon_encounters);
