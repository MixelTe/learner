import { Sections, Theme } from "../data/sections.js";
import * as Lib from "../littleLib.js";
import { switchPage } from "./switchPage.js";
import { themes } from "../themes.js";
import { Trainer } from "../trainer.js";


const qlistsTemplate = Lib.getEl("template-qlists", HTMLTemplateElement);
const qlistsEl = Lib.get.div("qlists");
const qlistEl = Lib.get.div("qlist");

export function showQlist(onSwitch: () => void = () => { })
{
	switchPage("qlists", "Вопросы", themes.common, onSwitch);
	qlistsEl.innerHTML = "";

	for (let i = 0; i < Sections.length; i++)
	{
		const section = Sections[i];
		const item = qlistsTemplate.content.cloneNode(true) as HTMLDivElement;
		const input = item.querySelector("input")!;
		input.id = `qlists_${i}`;
		const label = item.querySelector("label")!;
		label.htmlFor = input.id;
		const labelText = item.querySelector("label span")! as HTMLSpanElement;
		labelText.innerText = section.name;

		const themes = item.querySelector(".qlists-list")!;
		let c = 0;
		for (const theme of section.themes)
		{
			c += theme.items.length;
			themes.appendChild(Lib.Button([], [
				Lib.Span([], theme.name),
				Lib.Span([], `${theme.items.length}`),
			], () =>
			{
				showItemQs(section.name, theme);
			}));
		}
		if (section.themes.length == 0)
		{
			themes.appendChild(Lib.Button([], "В разработке"));
		}

		(item.querySelector(".qlist-count") as HTMLSpanElement).innerText = `${c}`;

		qlistsEl.appendChild(item);
	}
}

function showItemQs(sectionName: string, theme: Theme)
{
	switchPage("qlist", theme.name, theme.color, () => { }, sectionName);
	qlistEl.innerHTML = "";
	qlistEl.classList.toggle("qlist_single", !!theme.onlyAnswerInQList);
	const stats = Trainer.getStatistics().themes.find(v => v.id == theme.id);
	for (const item of theme.items)
	{
		const stat = stats?.items?.find?.(v => v.id == item.id)?.hist || "";
		const marker = createMarker(stat);
		Lib.AppendContent(qlistEl, [
			Lib.Div([], [
				Lib.Div("qlist-id", `${theme.id}-${item.id}`),
				Lib.Div("qlist-cell", item.getQuestion()),
				marker,
			]),
			Lib.Div([], Lib.Div("qlist-cell", item.getAnswer())),
		]);
	}
}

function createMarker(hist: string)
{
	return Lib.Div("qlist-marker", [
		createDot(hist.at(-5)),
		createDot(hist.at(-4)),
		createDot(hist.at(-3)),
		createDot(hist.at(-2)),
		createDot(hist.at(-1)),
	]);
}
function createDot(v: string | undefined)
{
	return v == "1" ? Lib.Span("qlist-marker-1") :
		v == "0" ? Lib.Span("qlist-marker-0") :
			Lib.Span("qlist-marker-u")
}
