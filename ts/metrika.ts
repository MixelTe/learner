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
		lessAdv: boolean,
		longestDays: number,
	}): void
	var Ya:
		{
			Context:
			{
				AdvManager: {
					render: (v: {
						blockId: string,
						renderTo?: string,
						type?: string,
						platform?: string,
						onClose?: () => void,
						onRewarded?: (isRewarded: boolean) => void,
						onError?: (data: any) => void,
						darkTheme: boolean,
					}) => void,
					getPlatform: () => string,
				}
			}
		}
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
			lessAdv: localStorage.getItem(Keys.lessAdv) == "1",
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

function tryCall(f: () => void, ef?: () => void)
{
	if (!Object.hasOwn(window, "Ya") || !Ya?.Context?.AdvManager?.render)
	{
		console.error("adv is undefined");
		return;
	}
	try { f(); }
	catch (e) { console.error(e); ef?.() }
}

let bottomAdvEnabled = false;
export function enableBottomAdv()
{
	return;
	if (bottomAdvEnabled) return;
	bottomAdvEnabled = true;

	tryCall(() =>
		Ya.Context.AdvManager.render({
			"blockId": "R-A-6760567-1",
			"renderTo": "yandex_rtb_R-A-6760567-1",
			darkTheme: isDarkTheme(),
			onError: data =>
			{
				bottomAdvEnabled = false;
				console.log(data);
			},
		})
	);
}

export function showAdvFullscreen(onClose?: () => void)
{
	return;
	tryCall(() =>
	{
		if (Ya.Context.AdvManager.getPlatform() === "desktop")
			Ya.Context.AdvManager.render({
				"blockId": "R-A-6760567-2",
				"type": "fullscreen",
				"platform": "desktop",
				darkTheme: isDarkTheme(),
				onError: data =>
				{
					console.log(data);
					onClose?.();
				},
				onClose,
			});
		else
			Ya.Context.AdvManager.render({
				"blockId": "R-A-6760567-3",
				"type": "fullscreen",
				"platform": "touch",
				darkTheme: isDarkTheme(),
				onError: data =>
				{
					console.log(data);
					onClose?.();
				},
				onClose,
			});
	}, onClose);
}

export function showAdvRewarded(onRewarded: (isRewarded: boolean) => void)
{
	return onRewarded(false);
	tryCall(() =>
	{
		if (Ya.Context.AdvManager.getPlatform() === "desktop")
			Ya.Context.AdvManager.render({
				"blockId": "R-A-6760567-4",
				"type": "rewarded",
				"platform": "desktop",
				darkTheme: isDarkTheme(),
				onError: data =>
				{
					console.log(data);
					onRewarded(false);
				},
				onRewarded,
			});
		else
			Ya.Context.AdvManager.render({
				"blockId": "R-A-6760567-5",
				"type": "rewarded",
				"platform": "touch",
				darkTheme: isDarkTheme(),
				onError: data =>
				{
					console.log(data);
					onRewarded(false);
				},
				onRewarded,
			});
	}, () => onRewarded(false));
}

function isDarkTheme()
{
	const theme = localStorage.getItem(Keys.theme) || "auto";
	return theme != "auto" ? theme == "dark" : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}