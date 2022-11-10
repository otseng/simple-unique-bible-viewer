import { bibleBooks } from "../data/bibleBooks"

export function preloadData() {
    globalThis.bookNames = bibleBooks.map((entry) => entry.n).slice(0, 66)
    globalThis.bookNameHash = bibleBooks.reduce(function(map, obj) {
        map[obj.n] = obj.i;
        return map;
    }, {});
}

export function range(size:number, startAt:number = 0):ReadonlyArray<number> {
    return [...Array(size).keys()].map(i => i + startAt);
}