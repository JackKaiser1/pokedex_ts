export function cleanInput(string) {
    const words = string.toLowerCase().trim().split("");
    return words;
}
cleanInput("Hello there guys     ");
