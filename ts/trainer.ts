import { Theme } from "./data/sections.js";
import { DayStatistics } from "./dayStatistics.js";
import { getOrAdd, shuffledWithSeedAndWeights, sumStr } from "./functions.js";
import { Keys } from "./keys.js";
import * as Lib from "./littleLib.js";

const Len = 15;
const MaxHist = 5;
const devSelectId: number = -3; // -1 - last; -2 - all in same order; -3 - normal
if (devSelectId >= -2) console.warn("DEV: devSelectId is enabled");

export class Trainer
{
	public static async selectTasks(theme: Theme)
	{
		const items = await theme.items();
		if (devSelectId == -1)
		{
			const item = items.at(-1)
			return item ? [item] : [];
		}
		else if (devSelectId == -2)
		{
			return items;
		}
		else if (devSelectId >= 0)
		{
			const item = items.find(v => v.id == devSelectId)
			return item ? [item] : [];
		}

		if (this.lastTheme != theme.id)
		{
			this.lastTheme = theme.id;
			this.turn = 0;
		}
		this.turn += 1;
		if (this.turn > 2)
		{
			this.turn = 0;
			this.seed = Lib.random.int(100000);
		}
		const stats = this.getStatistics();
		const statsItems = stats.themes.find(v => v.id == theme.id)?.items || [];

		if (this.turn == 0)
		{
			statsItems.forEach(v => v.hist_old = v.hist);
			this.setStatistics(stats);
		}

		const shuffled = shuffledWithSeedAndWeights(items, this.seed, items.map(v =>
		{
			const hist = statsItems.find(el => el.id == v.id)?.hist_old || "";
			if (hist.length == 0) return 1;
			return (1 - sumStr(hist) / hist.length) + 0.1;
		}));
		const selected_items = shuffled.slice(0, Len * 2);
		Lib.random.shuffle(selected_items);
		return selected_items.slice(0, Len);
	}

	public static saveRes(themeId: string, itemId: number, res: boolean)
	{
		const stats = this.getStatistics();
		const theme = getOrAdd(stats.themes, v => v.id == themeId, { id: themeId, items: [] });
		const item = getOrAdd(theme.items, v => v.id == itemId, { id: itemId, hist: "", hist_old: "" });
		item.hist += res ? "1" : "0";
		if (item.hist.length > MaxHist)
			item.hist = item.hist.slice(item.hist.length - MaxHist);
		this.setStatistics(stats);
		DayStatistics.addOneToday();
	}

	public static getStatistics(): Statistics
	{
		const stats = JSON.parse(localStorage.getItem(Keys.statistics) || "{}") as Statistics;
		if (stats.v == undefined)
			stats.v = 1
		if (stats.themes == undefined)
			stats.themes = [];

		return this.updateStatisticsData(stats);
	}

	public static calcScore(theme: StatisticsTheme, itemCount: number)
	{
		let score = 0
		for (const item of theme.items)
		{
			if (item.hist.length != 0)
				score += sumStr(item.hist) / item.hist.length;
		}
		return score / itemCount;
	}

	private static setStatistics(stats: Statistics)
	{
		localStorage.setItem(Keys.statistics, JSON.stringify(stats));
	}

	private static updateStatisticsData(stats: Statistics): Statistics
	{
		if (stats.v == 1)
			return stats;

		return { v: 1, themes: [] };
	}


	private static get seed()
	{
		return parseInt(localStorage.getItem(Keys.trainerSeed) || "0", 10);
	}
	private static set seed(v: number)
	{
		localStorage.setItem(Keys.trainerSeed, `${v}`);
	}

	private static get turn()
	{
		return parseInt(localStorage.getItem(Keys.trainerTurn) || "0", 10);
	}
	private static set turn(v: number)
	{
		localStorage.setItem(Keys.trainerTurn, `${v}`);
	}

	private static get lastTheme()
	{
		return localStorage.getItem(Keys.trainerTheme) || "";
	}
	private static set lastTheme(v: string)
	{
		localStorage.setItem(Keys.trainerTheme, v);
	}

}

interface Statistics
{
	v: number,
	themes: StatisticsTheme[],
}

interface StatisticsTheme
{
	id: string,
	items: StatisticsItem[],
}

interface StatisticsItem
{
	id: number,
	hist: string, // string of 1 and 0
	hist_old: string,
}
