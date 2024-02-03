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
		customTheme: boolean,
		disableAnim: boolean,
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

type MetrikaEvents = "tester_done" | "tester_start" | "data_export" | "data_import" | "data_reset_progress" | "data_reset_full";

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
			customTheme: localStorage.getItem(Keys.customTheme) == "1",
			disableAnim: localStorage.getItem(Keys.animDisable) == "1",
			longestDays: DayStatistics.getLongest(),
		})
	);
}

function saveCall(f: () => void)
{
	if (!Object.hasOwn(window, "ym"))
	{
		console.error("metrika is undefined");
		return;
	}
	try { f(); }
	catch (e) { console.error(e); }
}
