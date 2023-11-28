function setBodyClassName(className: string) {
    if (document.body.className === className) return;
    document.body.className = className;
}

function randomInt(max: number) {
    return Math.floor(max * Math.random());
}

function rollDie() {
    return randomInt(6) + 1;
}

function filterMap<T, U>(
    callback: (value: T, index: number, array: T[]) => U | undefined
): [(prev: U[], current: T, index: number, array: T[]) => U[], U[]] {
    return [
        (prev: U[], current: T, index: number, array: T[]) => {
            const value = callback(current, index, array);
            return value === undefined ? prev : [...prev, value];
        },
        [],
    ];
}

function collectToObject<T, K extends string | number | symbol, U>(
    callback: (value: T, index: number, array: T[]) => [K, U]
): [
    (prev: Record<K, U>, current: T, index: number, array: T[]) => Record<K, U>,
    Record<K, U>,
] {
    return [
        (prev, current, index, array) => {
            const [key, value] = callback(current, index, array);
            prev[key] = value;
            return prev;
        },
        {} as Record<K, U>,
    ];
}

export { setBodyClassName, randomInt, rollDie, filterMap, collectToObject };
