import { themes } from "../themes.js";
import { regPage, switchPage } from "./switchPage.js";


regPage("about", showAbout);
export function showAbout(onSwitch: () => void = () => { })
{
	switchPage("about", { title: " | About", display: "" }, themes.common, onSwitch);
}