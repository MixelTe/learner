import * as Lib from "../littleLib.js";
import { metrika_pageSwitch } from "../metrika.js";
import { ThemeColors, Themes, currentTheme, setTheme, setThemeColors, themes } from "../themes.js";
import { isAnimDisabled } from "./settings.js";

export type Page = "main" | "tester" | "stats" | "qlists" | "qlist" | "dayStats" | "about" | "settings";
const pages = {
	main: Lib.get.div("p-start"),
	tester: Lib.get.div("p-tester"),
	stats: Lib.get.div("p-stats"),
	qlists: Lib.get.div("p-qlists"),
	qlist: Lib.get.div("p-qlist"),
	dayStats: Lib.get.div("p-dayStats"),
	about: Lib.get.div("p-about"),
	settings: Lib.get.div("p-settings"),
} as { [key in Page]: HTMLDivElement }
const themeColors = {
	common: { light: "#a52a2a", dark: "#df4545" },
	blue: { light: "#2a2ca5", dark: "#43c8df" },
	green: { light: "#2ba64a", dark: "#43df6a" },
	orange: { light: "#a6562b", dark: "#df7a43" },
} as { [theme in Themes]: ThemeColors }
const titleEl = Lib.getEl("title", HTMLHeadingElement);
const subtitleEl = Lib.getEl("subtitle", HTMLHeadingElement);

let curPage: Page = "main";
let prevPage: string = "main";
let mouse = { x: 0, y: 0 };
window.addEventListener("mousedown", e => mouse = { x: e.clientX, y: e.clientY });
const instant = false;
if (instant) console.warn("DEV: instant is enabled");

export async function switchPage(page: Page | { page: Page, title: string }, title: string | { display: string, title: string } = "", theme: Themes = themes.common, onSwitch: () => void = () => { }, subtitle = "", dontPushState = false)
{
	const pageTitle = typeof page == "string" ? page : page.title;
	page = typeof page == "string" ? page : page.page;
	if (curPage == page) return;

	const documentTitle = typeof title == "string" ? (title == "" ? "ЛЯРО" : "ЛЯРО | " + title) : "ЛЯРО" + title.title;
	title = typeof title == "string" ? title : title.display;

	metrika_pageSwitch(prevPage, pageTitle, documentTitle)
	prevPage = pageTitle;

	if (instant || isAnimDisabled())
	{
		pages[curPage].classList.remove("open");
		curPage = page;
		titleEl.innerText = title;
		subtitleEl.innerText = subtitle;
		setThemeColors(themeColors[theme]);
		pages[curPage].classList.add("open");
		onSwitch();
		if (!dontPushState)
			if (history.state?.back)
				history.replaceState({ page, title, theme, curSessionKey }, "");
			else
				history.pushState({ page, title, theme, curSessionKey }, "");
		document.title = documentTitle;
		if (currentTheme() != theme)
			setTheme(theme);
		return;
	}

	const anim = Lib.Div("pageSwitch");
	anim.style.left = `${mouse.x}px`;
	anim.style.top = `${mouse.y}px`;
	document.body.appendChild(anim);
	await Lib.wait(50);
	const size = Math.max(window.innerWidth, window.innerHeight) * 2 * Math.SQRT2;
	anim.style.width = `${size}px`;
	anim.style.height = `${size}px`;
	anim.classList.add("pageSwitchAnim")
	await Lib.wait(750);
	pages[curPage].classList.remove("open");
	curPage = page;
	titleEl.innerText = title;
	subtitleEl.innerText = subtitle;
	pages[curPage].classList.add("open");
	onSwitch();
	if (!dontPushState)
		if (history.state?.back)
			history.replaceState({ page, title, theme, curSessionKey }, "");
		else
			history.pushState({ page, title, theme, curSessionKey }, "");
	document.title = documentTitle;
	if (currentTheme() != theme)
	{
		setThemeColors(themeColors[theme]);
		setTheme(theme);
		await Lib.wait(300);
	}
	anim.classList.add("pageSwitchHide")
	await Lib.wait(400);
	document.body.removeChild(anim);
}

export const curSessionKey = Lib.randomInt(10000);
window.addEventListener("popstate", e =>
{
	const state = e.state;
	if (state)
	{
		const page = state.page;
		const title = state.title;
		const theme = state.theme;
		const back = state.back;
		const sessionKey = state.curSessionKey;

		if (curSessionKey != sessionKey)
			return;

		if (!back && Object.keys(pages).includes(page))
		{
			switchPage(page, title, theme, undefined, undefined, true);
		}
	}
});
