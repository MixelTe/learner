import { DayStatistics } from "./dayStatistics.js";
import { Keys } from "./keys.js";

declare global
{
	function ym(code: number, event: "hit", page: string, options?: {
		params?: {
			referer?: string,
			title?: string,
		}
	}): void
	function ym(code: number, event: "reachGoal", target: string): void
	function ym(code: number, event: "userParams", params: {
		darkTheme: boolean,
		defaultTheme: boolean,
		longestDays: number,
	}): void
}

const code = 96188813;

export function metrika_pageSwitch(prevPage: string, page: string, title: string)
{
	saveCall(() =>
		ym(code, "hit", "#" + page, {
			params: {
				title,
				referer: "#" + prevPage,
			}
		})
	);
}

type MetrikaEvents = "tester_done" | "tester_start";

export function metrika_event(event: MetrikaEvents)
{
	saveCall(() =>
		ym(code, "reachGoal", event)
	)
}

export function metrika_setParams()
{
	const theme = localStorage.getItem(Keys.theme) || "auto";
	const dark = theme != "auto" ? theme == "dark" : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

	saveCall(() =>
		ym(code, "userParams", {
			darkTheme: dark,
			defaultTheme: theme == "auto",
			longestDays: DayStatistics.getLongest(),
		})
	);
}

function saveCall(f: () => void)
{
	try { f(); }
	catch (e) { console.error(e); }
}
