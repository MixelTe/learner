import { Sections } from "./data/sections.js";
import { showDayStats } from "./pages/dayStats.js";
import * as Lib from "./littleLib.js";
import { showQlist } from "./pages/qlist.js";
import { showStats } from "./pages/stats.js";
import { switchPage } from "./pages/switchPage.js";
import { Tester } from "./tester.js";
import { initThemes, themes } from "./themes.js";

initThemes();

const menu = Lib.get.div("menu");

Lib.addButtonListener("menuBtn", () =>
{
	menu.classList.toggle("open");
});

function closeMenu() { menu.classList.remove("open"); }
Lib.addButtonListener("btn-index", () => switchPage("main", "", themes.common, closeMenu));
Lib.addButtonListener("btn-stats", () => showStats(closeMenu));
Lib.addButtonListener("btn-qlist", () => showQlist(closeMenu));
Lib.addButtonListener("btn-dayStats", () => showDayStats(closeMenu));

initMainPage();
// showStats();
// showQlist();
// showDayStats();
// new Tester(Sections[0].themes[5]).start();


async function initMainPage()
{
	const sections = Lib.get.div("sections");
	const sectionTemplate = Lib.getEl("template-section", HTMLTemplateElement);
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
		(themes as HTMLElement).style.setProperty("--max-height", `${s.themes.length * 3 + 2}rem`);
		for (const theme of s.themes)
		{
			themes.appendChild(Lib.Button([], theme.name, () =>
			{
				input.checked = false;
				new Tester(theme).start();
			}));
		}
		if (s.themes.length == 0)
		{
			themes.appendChild(Lib.Button([], "В разработке"));
		}
		sections.appendChild(section);
	}

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