import { Sections } from "./data/sections.js";
import * as Lib from "./littleLib.js";
import { switchPage } from "./switchPage.js";
import { Tester } from "./tester.js";
import { initThemes, themes } from "./themes.js";

initThemes();

const menu = Lib.get.div("menu");

Lib.addButtonListener("menuBtn", () =>
{
	menu.classList.toggle("open");
});
Lib.addButtonListener("btn-index", async () =>
{
	switchPage("main", "", themes.common, () =>
	{
		menu.classList.remove("open");
	});
});

initMainPage();
new Tester(Sections[2].themes[0]).start();

function initMainPage()
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
			const btn = Lib.Button([], theme.name, () =>
			{
				new Tester(theme).start();
			});
			themes.appendChild(btn);
		}
		sections.appendChild(section);
	}
}