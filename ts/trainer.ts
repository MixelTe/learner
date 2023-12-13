import { Theme } from "./data/sections.js";
import { getOrAdd, shuffledWithSeedAndWeights } from "./functions.js";
import * as Lib from "./littleLib.js";

const Len = 15;
const statisticsKey = "statistics";
const seedKey = "trainerSeed";
const turnKey = "trainerTurn";
const themeKey = "trainerTheme";

export class Trainer
{
	public static selectTasks(theme: Theme)
	{
		if (this.lastTheme != theme.id)
		{
			this.lastTheme = theme.id;
			this.turn = 0;
		}
		this.turn += 1;
		if (this.turn > 3)
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

		const shuffled = shuffledWithSeedAndWeights(theme.items, this.seed, theme.items.map(v =>
		{
			const hist = statsItems.find(el => el.id == v.id)?.hist_old || "";
			if (hist.length == 0) return 1;
			return (hist.match(/0/g)?.length || 0) / hist.length + 0.1;
		}));
		const items = shuffled.slice(0, Len * 2);
		Lib.random.shuffle(items);
		return items.slice(0, Len);
	}

	public static saveRes(themeId: string, itemId: number, res: boolean)
	{
		const stats = this.getStatistics();
		const theme = getOrAdd(stats.themes, v => v.id == themeId, { id: themeId, items: [] });
		const item = getOrAdd(theme.items, v => v.id == itemId, { id: itemId, hist: "", hist_old: "" });
		item.hist += res ? "1" : "0";
		this.setStatistics(stats);
	}

	public static getStatistics(): Statistics
	{
		const stats = JSON.parse(localStorage.getItem(statisticsKey) || "{}") as Statistics;
		if (stats.v == undefined)
			stats.v = 1
		if (stats.themes == undefined)
			stats.themes = [];

		return this.updateStatisticsData(stats);
	}

	public static setStatistics(stats: Statistics)
	{
		localStorage.setItem(statisticsKey, JSON.stringify(stats));
	}

	private static updateStatisticsData(stats: Statistics): Statistics
	{
		if (stats.v == 1)
			return stats;

		return { v: 1, themes: [] };
	}


	public static get seed()
	{
		return parseInt(localStorage.getItem(seedKey) || "0", 10);
	}
	public static set seed(v: number)
	{
		localStorage.setItem(seedKey, `${v}`);
	}

	public static get turn()
	{
		return parseInt(localStorage.getItem(turnKey) || "0", 10);
	}
	public static set turn(v: number)
	{
		localStorage.setItem(turnKey, `${v}`);
	}

	public static get lastTheme()
	{
		return localStorage.getItem(themeKey) || "";
	}
	public static set lastTheme(v: string)
	{
		localStorage.setItem(themeKey, v);
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
