export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(num: number) {
        this.#interval = num;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, {createdAt: Date.now(), val: val});
    }

    get<T>(key: string) {
        return this.#cache.get(key);
    }

    #reap() {
        const keys = this.#cache.keys();
        for (const key of keys) {
            const cacheObj = this.#cache.get(key);
            if (!cacheObj) continue;
            else if (cacheObj.createdAt - this.#interval > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}