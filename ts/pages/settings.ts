import { Keys } from "../keys.js";
import * as Lib from "../littleLib.js";
import { metrika_setParams } from "../metrika.js";
import { setThemeScheme, themes } from "../themes.js";
import { switchPage } from "./switchPage.js";

const theme_light = Lib.getInput("settings-theme-light");
const theme_dark = Lib.getInput("settings-theme-dark");
const theme_auto = Lib.getInput("settings-theme-auto");

const anim = Lib.getInput("settings-anim");

const theme = Lib.getDiv("settings-theme");
const customTheme = Lib.getInput("settings-customTheme");
const customTheme_inputs = Lib.getDiv("settings-customTheme-inputs");

const color_back1 = Lib.getInput("settings-color-back1");
const color_back2 = Lib.getInput("settings-color-back2");
const color_text = Lib.getInput("settings-color-text");
const color_title = Lib.getInput("settings-color-title");

theme_light.addEventListener("change", () => setThemeScheme("light"));
theme_dark.addEventListener("change", () => setThemeScheme("dark"));
theme_auto.addEventListener("change", () => setThemeScheme("auto"));

color_back1.addEventListener("change", setCustomColors);
color_back2.addEventListener("change", setCustomColors);
color_text.addEventListener("change", setCustomColors);
color_title.addEventListener("change", setCustomColors);
color_back1.addEventListener("input", () => updateThemeColors);
color_back2.addEventListener("input", () => updateThemeColors);
color_text.addEventListener("input", () => updateThemeColors);
color_title.addEventListener("input", () => updateThemeColors);

anim.addEventListener("change", () =>
{
	const v = anim.checked ? "0" : "1";
	localStorage.setItem(Keys.animDisable, v);
	document.body.setAttribute("disableanim", v);
	animDisabled = v == "1";
});

let animDisabled = localStorage.getItem(Keys.animDisable) == "1";
if (animDisabled)
	document.body.setAttribute("disableanim", "1");
anim.checked = !animDisabled;


customTheme.addEventListener("change", () =>
{
	const v = customTheme.checked ? "1" : "0";
	localStorage.setItem(Keys.customTheme, v);
	document.body.setAttribute("customTheme", v);
	theme.classList.toggle("settings-theme_dim", customTheme.checked);
	customTheme_inputs.classList.toggle("settings-customTheme-inputs_open", customTheme.checked);
	updateThemeColors(customTheme.checked);
});


const colors = JSON.parse(localStorage.getItem(Keys.customColors) || "{}");
color_back1.value = colors.back1 || "#f1e6d1";
color_back2.value = colors.back2 || "#e9d6b2";
color_text.value = colors.text || "#000000";
color_title.value = colors.title || "#a52a2a";

if (localStorage.getItem(Keys.customTheme) == "1")
{
	document.body.setAttribute("customTheme", "1");
	customTheme.checked = true;
	theme.classList.add("settings-theme_dim");
	customTheme_inputs.classList.add("settings-customTheme-inputs_open");
	updateThemeColors();
}


function setCustomColors()
{
	const colors = {
		back1: color_back1.value,
		back2: color_back2.value,
		text: color_text.value,
		title: color_title.value,
	}
	localStorage.setItem(Keys.customColors, JSON.stringify(colors));
}

function updateThemeColors(useCustom = true)
{
	document.body.style.setProperty("--c-back1", useCustom ? color_back1.value : "");
	document.body.style.setProperty("--c-back2", useCustom ? color_back2.value : "");
	document.body.style.setProperty("--c-text", useCustom ? color_text.value : "");
	document.body.style.setProperty("--c-title", useCustom ? color_title.value : "");
}

export function isAnimDisabled()
{
	return animDisabled;
}

export function showSettings(onSwitch: () => void = () => { })
{
	switchPage("settings", "Настройки", themes.common, onSwitch);
}

export function setThemeInputValue(theme: string)
{
	theme_light.checked = theme == "light";
	theme_dark.checked = theme == "dark";
	theme_auto.checked = theme == "auto";
	metrika_setParams();
}

