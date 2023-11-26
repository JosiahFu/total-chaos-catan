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

export { setBodyClassName, randomInt, rollDie }
