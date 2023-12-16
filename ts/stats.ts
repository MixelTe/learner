import { Sections } from "./data/sections.js";
import * as Lib from "./littleLib.js";
import { switchPage } from "./switchPage.js";
import { themes } from "./themes.js";
import { Trainer } from "./trainer.js";


const itemTemplate = Lib.getEl("template-stats-item", HTMLTemplateElement);
const markerTemplate = Lib.getEl("template-stats-marker", HTMLTemplateElement);
const subitemTemplate = Lib.getEl("template-stats-subitem", HTMLTemplateElement);
const statsEl = Lib.get.div("stats");

export function showStats(onSwitch: () => void = () => { })
{
	switchPage("stats", "Статистика", themes.common, onSwitch);
	statsEl.innerHTML = ""
	const allStats = Trainer.getStatistics();
	for (let i = 0; i < Sections.length; i++)
	{
		const section = Sections[i];
		const item = itemTemplate.content.cloneNode(true) as HTMLDivElement;
		const input = item.querySelector("input")!;
		input.id = `stats_${i}`;
		const label = item.querySelector("label")!;
		label.htmlFor = input.id;
		const labelText = item.querySelector("label span")! as HTMLSpanElement;
		labelText.innerText = section.name;

		const markerPlaceholder = item.querySelector("#placeholder-marker") as HTMLDivElement;

		const listEl = item.querySelector(".stats-list")!;
		let score = 0;
		for (const theme of section.themes)
		{
			const stats = allStats.themes.find(v => v.id == theme.id);
			const subitem = subitemTemplate.content.cloneNode(true) as HTMLDivElement;

			const title = subitem.querySelector(".stats-subitem :nth-child(2)") as HTMLDivElement;
			title.innerText = theme.name;

			const markerPlaceholder = subitem.querySelector("#placeholder-marker") as HTMLDivElement;
			const itemScore = stats ? Trainer.calcScore(stats) : 0;
			score += itemScore;
			markerPlaceholder.replaceWith(createMarker(itemScore));

			listEl.appendChild(subitem);
		}

		markerPlaceholder.replaceWith(createMarker(score / section.themes.length));

		statsEl.appendChild(item);
	}
}

function createMarker(value: number)
{
	const value100 = Math.round(value * 100);
	const marker = markerTemplate.content.cloneNode(true) as SVGSVGElement;
	const text = marker.querySelector("text") as SVGTextElement;
	if (value100 != 100)
		text.innerHTML = `${value100}`;
	const circle = marker.querySelector("#marker-circle-value") as SVGCircleElement;
	const maxV = parseInt(circle.getAttribute("stroke-dasharray")?.split(" ")[0] || "1");
	circle.setAttribute("stroke-dasharray", `${value * maxV} ${maxV * 2}`);
	return marker
}

