export function cleanInput(string: String): String[] {
    const words = string.toLowerCase().split(" ");
    const finalWords = [];
    for (const word of words) {
        if (word !== "") {
            finalWords.push(word);
        }
    }    
    // console.log(finalWords);
    return finalWords;
}

