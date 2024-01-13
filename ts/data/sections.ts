import { TestItem } from "../tester.js"
import { Themes, themes } from "../themes.js"
import { phy_0 } from "./phy_0.js"
import { ru_3 } from "./ru_3.js"
import { ru_4 } from "./ru_4.js"
import { ru_5 } from "./ru_5.js"
import { ru_6 } from "./ru_6.js"
import { ru_7 } from "./ru_7.js"
import { ru_8 } from "./ru_8.js"

export const Sections: Section[] = [
	{
		name: "Русский",
		themes: [
			{ id: "ru_3", name: "№3 Стили речи", color: themes.blue, items: ru_3 },
			{ id: "ru_4", name: "№4 Ударения", color: themes.blue, items: ru_4, onlyAnswerInQList: true },
			{ id: "ru_5", name: "№5 Паронимы", color: themes.blue, items: ru_5, onlyAnswerInQList: true },
			{ id: "ru_6", name: "№6 Лексические нормы", color: themes.blue, items: ru_6 },
			{ id: "ru_7", name: "№7 Формы слова", color: themes.blue, items: ru_7, onlyAnswerInQList: true },
			{ id: "ru_8", name: "№8 Грамматические нормы", color: themes.blue, items: ru_8, onlyAnswerInQList: true },
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
