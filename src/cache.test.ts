import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
    {
        key: "url1",
        val: "data1",
        interval: 500,
    },
    {
        key: "url2",
        val: "data2",
        interval: 500,
    },
    {
        key: "url3",
        val: "data3",
        interval: 500,
    }
])("test add with wait", async ({ key, val, interval }) => {
    const newCache = new Cache(interval);

    newCache.add(key, val);
    const cacheVal = newCache.get(key);
    if (cacheVal) {
        expect(cacheVal.val).toBe(val);
    }

    await new Promise((resolve) => setTimeout(resolve, interval + 50));
    const purgedVal = newCache.get(key);
    expect(purgedVal).toBe(undefined);


    newCache.stopReapLoop();
});

test.concurrent.each([
    {
        key: "url1",
        val: "data1",
        interval: 500,
    },
    {
        key: "url2",
        val: "data2",
        interval: 500,
    },
    {
        key: "url3",
        val: "data3",
        interval: 500,
    }
])("Get invalid value", ({ key, val, interval }) => {
    const newCache = new Cache(interval);
    const invalidVal = newCache.get(key);
    expect(invalidVal).toBe(undefined);

    newCache.stopReapLoop();
});

test.concurrent.each([
    {
        key: "url1",
        val: "data1",
        interval: 500,
    },
    {
        key: "url2",
        val: "data2",
        interval: 500,
    },
    {
        key: "url3",
        val: "data3",
        interval: 500,
    }
])("Test a non purged value", async ({ key, val, interval }) => {
    const newCache = new Cache(interval);
    newCache.add(key, val);
    await new Promise((resolve) => setTimeout(resolve, interval - 500));
    const value = newCache.get(key);
    if (value) {
        expect(value.val).toBe(val);
    }

    newCache.stopReapLoop();
});