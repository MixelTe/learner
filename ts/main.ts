import { Sections } from "./data/sections.js";
import * as Lib from "./littleLib.js";
import { showStats } from "./stats.js";
import { switchPage } from "./switchPage.js";
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

initMainPage();
// showStats();
// new Tester(Sections[2].themes[0]).start();


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
		for (const theme of s.themes)
		{
			themes.appendChild(Lib.Button([], theme.name, () =>
			{
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