export const themes = {
	common: "common",
	blue: "blue",
	green: "green",
	orange: "orange",
} as { [theme in Themes]: Themes }
export type Themes = "common" | "blue" | "green" | "orange";
const select = document.getElementById("themeSelect") as HTMLSelectElement;
select.addEventListener("change", () => setThemeScheme(select.value));

const themeKey = "learner-theme";

window.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", () => setThemeScheme());

export function initThemes()
{
	setTheme("common");
	setThemeScheme();
}

function setThemeScheme(theme?: string)
{
	theme = theme || localStorage.getItem(themeKey) || "auto";
	localStorage.setItem(themeKey, theme);
	select.value = theme;

	if (theme == "auto")
	{
		const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		document.body.classList.toggle("dark", dark);
	}
	else if (theme == "dark")
	{
		document.body.classList.add("dark");
	}
	else
	{
		document.body.classList.remove("dark");
	}
}

export function setTheme(theme: Themes)
{
	document.body.setAttribute("theme", theme);
}

export function currentTheme()
{
	return document.body.getAttribute("theme") || themes.common;
}