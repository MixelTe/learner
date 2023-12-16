export function getOrAdd<T>(array: T[], find: (el: T) => boolean, newV: T)
{
	const v = array.find(find);
	if (v) return v;
	array.push(newV);
	return newV;
}

export function shuffledWithSeedAndWeights<T>(array: T[], seed: number, weights: number[])
{
	if (array.length != weights.length)
	{
		console.error("shuffleWithSeedAndWeights: array.length != weights.length");
	}
	const rnd = randomWithSeed(seed)
	return array.map((v, i) => ({ v, w: rnd() + weights[i] * rnd() })).sort((a, b) => b.w - a.w).map(v => v.v);
}

export function shuffleWithSeed<T>(array: T[], seed: number)
{
	const rnd = randomWithSeed(seed)
	return array.sort(() => 0.5 - rnd());
}

export function randomWithSeed(seed: number)
{
	return function ()
	{
		var t = seed += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}
}

export function sumStr(str: string)
{
	let r = 0;
	for (const ch of str)
		r += parseInt(ch)
	return r
}
