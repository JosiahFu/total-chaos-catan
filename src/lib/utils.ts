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

export { setBodyClassName, randomInt, rollDie, filterMap };
