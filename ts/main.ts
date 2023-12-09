import * as Lib from "./littleLib.js";
import { initThemes } from "./themes.js";

initThemes();

const menu = Lib.get.div("menu");

Lib.addButtonListener("menuBtn", () =>
{
	menu.classList.toggle("open");
});