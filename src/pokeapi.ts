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

    async fetchPokemon(name: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${name}`;
        const dataObj: CacheEntry<Promise<Pokemon>> | undefined = this.pokeCache.get(url);
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
            const result: Promise<Pokemon> = await resp.json();
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

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilites: object[];
    forms: object[];
    game_indices: object[];
    held_items: object[];
    location_area_encounters: string;
    moves: object[];
    species: object;
    sprites: object;
    cries: object;
    stats: StatObject[];
    types: TypeObject[];
    past_types: object[];
    past_abilities: object[];
}

type StatObject = {
    base_stat: number;
    effort: number;
    stat: Stat;
}

type Stat = {
    name: string;
    url: string;
}

type TypeObject = {
    slot: number;
    type: Type;
}

type Type = {
    name: string;
    url: string;
}


// const poke = new PokeAPI();
// const data: Pokemon = await poke.fetchPokemon("pidgey");
// console.log(data.types);




// for (const encounter of data.pokemon_encounters) {
//     console.log(encounter.pokemon.name);
// }
// console.log(data.pokemon_encounters);
