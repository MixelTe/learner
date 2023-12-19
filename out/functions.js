export function getOrAdd(array, find, newV) {
    const v = array.find(find);
    if (v)
        return v;
    array.push(newV);
    return newV;
}
export function shuffledWithSeedAndWeights(array, seed, weights) {
    if (array.length != weights.length) {
        console.error("shuffleWithSeedAndWeights: array.length != weights.length");
    }
    const rnd = randomWithSeed(seed);
    return array.map((v, i) => ({ v, w: rnd() + weights[i] * rnd() })).sort((a, b) => b.w - a.w).map(v => v.v);
}
export function shuffleWithSeed(array, seed) {
    const rnd = randomWithSeed(seed);
    return array.sort(() => 0.5 - rnd());
}
export function randomWithSeed(seed) {
    return function () {
        var t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
export function sumStr(str) {
    let r = 0;
    for (const ch of str)
        r += parseInt(ch);
    return r;
}
