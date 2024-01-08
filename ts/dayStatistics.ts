import { getMonthEndDate, getOrAdd } from "./functions.js";
import { Keys } from "./keys.js";

export class DayStatistics
{
	public static addOneToday()
	{
		const stats = this.getStats();
		const today = new Date();
		const todayYear = today.getFullYear();
		const todayMonth = today.getMonth();
		const todayDate = today.getDate();

		const month = getOrAdd(stats, m => m.y * 12 + m.i == todayYear * 12 + todayMonth, { i: todayMonth, y: todayYear, days: [] });
		const day = getOrAdd(month.days, d => d.i == todayDate, { i: todayDate, c: 0 });
		day.c++;

		const longest = this.getLongest();
		const current = this.getCurrent(stats);
		if (current > longest)
			this.setLongest(current);

		this.setStats(stats);
	}

	public static getStats(): DayStatisticsMonth[]
	{
		return JSON.parse(localStorage.getItem(Keys.dayStatistic) || "[]");
	}

	private static setStats(stats: DayStatisticsMonth[])
	{
		localStorage.setItem(Keys.dayStatistic, JSON.stringify(stats));
	}

	public static getLongest(): number
	{
		return JSON.parse(localStorage.getItem(Keys.dayLongest) || "0");
	}

	private static setLongest(v: number)
	{
		localStorage.setItem(Keys.dayLongest, JSON.stringify(v));
	}

	public static getCurrent(stats: DayStatisticsMonth[])
	{
		const today = new Date();
		const todayYear = today.getFullYear();
		const todayMonth = today.getMonth();
		const todayDate = today.getDate();

		let month = stats.find(m => m.y * 12 + m.i == todayYear * 12 + todayMonth);
		if (!month) return 0;
		let date = todayDate;
		let endDate = getMonthEndDate(todayYear, todayMonth - 1);
		let v = 0;
		while (true)
		{
			const day = month.days.find(d => d.i == date);
			if (!day || day.c == 0) return v;
			v++;
			date--;
			if (date < 1)
			{
				date = endDate;
				const next: number = month.i == 0 ? (month.y - 1) * 12 + 11 : month.y * 12 + (month.i - 1);
				month = stats.find(m => m.y * 12 + m.i == next);
				if (!month) return v;
				endDate = getMonthEndDate(month.y, month.i - 1);
			}
		}
	}
}

interface DayStatisticsMonth
{
	y: number,
	i: number,
	days: DayStatisticsDay[],
}

interface DayStatisticsDay
{
	i: number,
	c: number,
}