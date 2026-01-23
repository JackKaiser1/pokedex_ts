export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL: string): Promise<ShallowLocations> {
        const resp = await fetch(pageURL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result: Promise<ShallowLocations> = await resp.json() 
        return result;
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
