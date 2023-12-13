import { TestItem } from "../tester.js"
import { Themes, themes } from "../themes.js"
import { phy_0 } from "./phy_0.js"

export const Sections: Section[] = [
	{
		name: "Русский",
		themes: [
			{ id: "ru_0", name: "Тема 1", color: themes.blue, items: [] },
			{ id: "ru_1", name: "Тема 2", color: themes.blue, items: [] },
		],
	},
	{
		name: "Математика",
		themes: [
			{ id: "math_0", name: "Тема 1", color: themes.green, items: [] },
			{ id: "math_1", name: "Тема 2", color: themes.green, items: [] },
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
}
