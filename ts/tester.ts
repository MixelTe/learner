import { Theme } from "./data/sections.js";
import { switchPage } from "./switchPage.js";
import { themes } from "./themes.js";

export class Tester
{
	constructor(private theme: Theme)
	{

	}

	public start()
	{
		switchPage("tester", this.theme.name, themes.blue);
		return this;
	}
	public destroy()
	{

	}
}

export class TestItem
{
}