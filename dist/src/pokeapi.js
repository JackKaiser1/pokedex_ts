export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        const resp = await fetch(pageURL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await resp.json();
        return result;
    }
    async fetchLocation(locationName) {
        return { name: "", url: "" };
    }
}
// const poke = new PokeAPI();
// const data = await poke.fetchLocations();
// console.log(data);
