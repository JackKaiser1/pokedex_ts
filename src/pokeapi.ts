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
        return {name: "", url: ""};
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: Location[];
}

export type Location = {
    name: string;
    url: string;
}

// const poke = new PokeAPI();
// const data = await poke.fetchLocations();
// console.log(data);
