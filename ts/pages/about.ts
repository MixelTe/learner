import { themes } from "../themes.js";
import { switchPage } from "./switchPage.js";

export function showAbout(onSwitch: () => void = () => { })
{
	switchPage("about", { title: " | About", display: "" }, themes.common, onSwitch);

}