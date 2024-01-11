import { TestItem } from "../tester.js"
import { Themes, themes } from "../themes.js"
import { phy_0 } from "./phy_0.js"
import { ru_0 } from "./ru_0.js"
import { ru_1 } from "./ru_1.js"
import { ru_2 } from "./ru_2.js"

export const Sections: Section[] = [
	{
		name: "Русский",
		themes: [
			{ id: "ru_0", name: "№4 Ударения", color: themes.blue, items: ru_0, onlyAnswerInQList: true },
			{ id: "ru_1", name: "№5 Паронимы", color: themes.blue, items: ru_1, onlyAnswerInQList: true },
			{ id: "ru_2", name: "№7 Формы слова", color: themes.blue, items: ru_2, onlyAnswerInQList: true },
		],
	},
	{
		name: "Математика",
		themes: [
				// { id: "math_0", name: "Тема 1", color: themes.green, items: [] },
				// { id: "math_1", name: "Тема 2", color: themes.green, items: [] },
		],
	},
	{
		name: "Физика",
		themes: [
			{ id: "phy_0", name: "Формулы", color: themes.orange, items: phy_0 },
		],
	},
]


export interface Section
{
	name: string,
	themes: Theme[],
}

export interface Theme
{
	id: string,
	name: string,
	color: Themes,
	items: TestItem[],
	onlyAnswerInQList?: true,
}

checkIds()
function checkIds()
{
	for (const section of Sections)
	{
		for (const theme of section.themes)
		{
			let r = true;
			let id = 0;
			for (const item of theme.items)
			{
				const c = theme.items.filter(v => v.id == item.id).length == 1;
				if (!c)
				{
					r = false;
					id = item.id;
				}
			}
			if (!r)
				console.error(`Same ids in ${theme.id}: ${id}`);
		}
	}
}
