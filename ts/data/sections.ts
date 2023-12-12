import { TestItem } from "../tester"

export const Sections: Section[] = [
	{
		name: "Русский",
		themes: [
			{ name: "Тема 1", items: [] },
			{ name: "Тема 2", items: [] },
		],
	},
	{
		name: "Математика",
		themes: [
			{ name: "Тема 1", items: [] },
			{ name: "Тема 2", items: [] },
		],
	},
	{
		name: "Физика",
		themes: [
			{ name: "Формулы", items: [] },
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
	name: string,
	items: TestItem[],
}
