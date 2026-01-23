import { cleanInput } from "../src/repl.js";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    {
        input: "    hey there    guys!    ",
        expected: ["hey", "there", "guys!"],
    },
    {
        input: "watch out    down    there!",
        expected: ["watch", "out", "down", "there!"],
    },
    {
        input: "    ",
        expected: [],
    }
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});