export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        // const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        let url;
        if (pageURL) {
            url = pageURL;
        }
        else {
            url = `${PokeAPI.baseURL}/location-area`;
        }
        const resp = await fetch(url, {
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
