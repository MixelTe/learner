import * as Lib from "./littleLib.js";
import { Themes, currentTheme, setTheme, themes } from "./themes.js";

export type Page = "main" | "tester" | "stats";
const pages = {
	main: Lib.get.div("p-start"),
	tester: Lib.get.div("p-tester"),
	stats: Lib.get.div("p-stats"),
} as { [key in Page]: HTMLDivElement }
const titleEl = Lib.getEl("title", HTMLHeadingElement);

let curPage: Page = "main";
let mouse = { x: 0, y: 0 };
window.addEventListener("mousedown", e => mouse = { x: e.clientX, y: e.clientY });
const instant = false;
if (instant) console.warn("DEV: instant is enabled");

export async function switchPage(page: Page, title = "", theme: Themes = themes.common, onSwitch: () => void = () => { })
{
	if (curPage == page) return;

	if (instant)
	{
		pages[curPage].classList.remove("open");
		curPage = page;
		titleEl.innerText = title;
		pages[curPage].classList.add("open");
		onSwitch();
		if (currentTheme() != theme)
			setTheme(theme);
		return;
	}

	const anim = Lib.Div("pageSwitch");
	anim.style.left = `${mouse.x}px`;
	anim.style.top = `${mouse.y}px`;
	document.body.appendChild(anim);
	await Lib.wait(1);
	const size = Math.max(window.innerWidth, window.innerHeight) * 2 * Math.SQRT2;
	anim.style.width = `${size}px`;
	anim.style.height = `${size}px`;
	anim.classList.add("pageSwitchAnim")
	await Lib.wait(750);
	pages[curPage].classList.remove("open");
	curPage = page;
	titleEl.innerText = title;
	pages[curPage].classList.add("open");
	onSwitch();
	if (currentTheme() != theme)
	{
		setTheme(theme);
		await Lib.wait(300);
	}
	anim.classList.add("pageSwitchHide")
	await Lib.wait(400);
	document.body.removeChild(anim);
}
