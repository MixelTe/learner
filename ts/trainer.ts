import { Theme } from "./data/sections.js";
import * as Lib from "./littleLib.js";

const Len = 20;

export class Trainer
{
	public static selectTasks(theme: Theme)
	{
		Lib.random.shuffle(theme.items);
		return theme.items.slice(0, Len);
	}
}