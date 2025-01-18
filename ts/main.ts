import { Sections } from "./data/sections.js";
import { showDayStats } from "./pages/dayStats.js";
import * as Lib from "./littleLib.js";
import { showItemQs, showQlist } from "./pages/qlist.js";
import { curSessionKey, regPage, setUpdateMainPage, switchPage } from "./pages/switchPage.js";
import { Tester } from "./tester.js";
import { initThemes, themes } from "./themes.js";
import { showAbout } from "./pages/about.js";
import { isAnimDisabled, showSettings } from "./pages/settings.js";
import { Trainer } from "./trainer.js";

if ("serviceWorker" in navigator)
	navigator.serviceWorker.register("./serviceworker.js");
initThemes();

const menu = Lib.get.div("menu");
const btnAbout = Lib.get.el("btn-about", HTMLAnchorElement);
const statMarkers: SVGCircleElement[] = [];

let menuOpen = false;
Lib.addButtonListener("menuBtn", () =>
{
	if (menuOpen)
	{
		closeMenu(false);
		history.back();
	}
	else
		openMenu();
});
window.addEventListener("popstate", e =>
{
	if (menuOpen)
		closeMenu(false)
});

function openMenu()
{
	menuOpen = true;
	menu.classList.add("open");
	history.pushState({ ...history.state, back: true }, "");

	const icons = Array.from(btnAbout.children) as HTMLElement[];
	icons.forEach(icon => icon.style.display = "none");
	Lib.random.choose(icons).style.display = "block";
}
function closeMenu(instant = true)
{
	menuOpen = false;
	if (instant)
	{
		menu.classList.add("instant");
		setTimeout(() => menu.classList.remove("instant"), 100);
	}
	menu.classList.remove("open");
}
Lib.addLinkListener("btn-index", () => switchPage("main", "", themes.common, closeMenu));
Lib.addLinkListener("btn-qlist", () => showQlist(closeMenu));
Lib.addLinkListener("btn-dayStats", () => showDayStats(closeMenu));
Lib.addLinkListener("btn-about", () => showAbout(closeMenu));
Lib.addLinkListener("btn-settings", () => showSettings(closeMenu));

initMainPage();
setUpdateMainPage(updateMainPage);
// showStats();
// showQlist();
// showItemQs("", Sections[0].themes[15]);
// showDayStats();
// showAbout();
// showSettings();
// new Tester(Sections[0].themes[16]).start();


async function initMainPage()
{
	history.pushState({ page: "main", title: "", theme: themes.common, curSessionKey }, "");

	const sections = Lib.get.div("sections");
	const sectionTemplate = Lib.getEl("template-section", HTMLTemplateElement);
	const allStats = Trainer.getStatistics();
	for (let i = 0; i < Sections.length; i++)
	{
		const s = Sections[i];
		const section = sectionTemplate.content.cloneNode(true) as HTMLDivElement;
		const input = section.querySelector("input")!;
		input.id = `section_${i}`;
		const label = section.querySelector("label")!;
		label.innerText = s.name;
		label.htmlFor = input.id;
		const themes = section.querySelector(".sectionSelection-list")!;
		for (const theme of s.themes)
		{
			const stats = allStats.themes.find(v => v.id == theme.id);
			const itemScore = stats ? Trainer.calcScore(stats, theme.count) : 0;
			themes.appendChild(Lib.A([], [
				theme.name,
				createMarker(itemScore),
			], `#tester/${theme.id}`, () =>
			{
				sections.querySelectorAll("input").forEach(inp => inp.checked = false);
				new Tester(theme).start();
			}));
		}
		if (s.themes.length == 0)
		{
			themes.appendChild(Lib.A([], "В разработке"));
		}
		sections.appendChild(section);
	}

	if (!isAnimDisabled())
		await Lib.wait(100);
	Lib.get.div("p-start").classList.remove("vanished");

	const beforeload = document.getElementById("beforeload");
	if (beforeload)
	{
		beforeload.style.opacity = "0";
		await Lib.wait(500);
		document.body.removeChild(beforeload);
	}
}

regPage("tester", null, themeId =>
{
	for (const section of Sections)
		for (const theme of section.themes)
			if (theme.id == themeId)
				new Tester(theme).start();
});

export function updateMainPage()
{
	const allStats = Trainer.getStatistics();
	let i = 0;
	for (const s of Sections)
		for (const theme of s.themes)
		{
			const stats = allStats.themes.find(v => v.id == theme.id);
			const itemScore = stats ? Trainer.calcScore(stats, theme.count) : 0;
			const circle = statMarkers[i++];
			const maxV = 57;
			circle.setAttribute("stroke-dasharray", `${itemScore * maxV} ${maxV * 2}`);
		}
}

function createMarker(value: number)
{
	const marker = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	marker.setAttribute("viewbox", "0 0 20 20")
	const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	marker.appendChild(circle);
	circle.setAttribute("stroke", "var(--c-title)")
	circle.setAttribute("cx", "10")
	circle.setAttribute("cy", "10")
	circle.setAttribute("r", "9")
	circle.setAttribute("stroke-width", "1.5")
	circle.setAttribute("fill", "transparent")
	circle.setAttribute("transform", "rotate(-90 10 10)")
	const maxV = 57;
	circle.setAttribute("stroke-dasharray", `${value * maxV} ${maxV * 2}`);
	statMarkers.push(circle)
	return marker;
}
