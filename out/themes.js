import { Keys } from "./keys.js";
import { setThemeInputValue } from "./pages/settings.js";
export const themes = {
    common: "common",
    blue: "blue",
    green: "green",
    orange: "orange",
};
const themeMetaColor = document.querySelector('meta[name="theme-color"]');
let themeColors = { light: "#a52a2a", dark: "#df4545" };
window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => setThemeScheme());
export function initThemes() {
    setTheme("common");
    setThemeScheme();
}
export function setThemeScheme(theme) {
    theme = theme || localStorage.getItem(Keys.theme) || "auto";
    localStorage.setItem(Keys.theme, theme);
    setThemeInputValue(theme);
    if (theme == "auto") {
        const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        themeMetaColor?.setAttribute("content", dark ? themeColors.dark : themeColors.light);
        document.body.classList.toggle("dark", dark);
    }
    else if (theme == "dark") {
        themeMetaColor?.setAttribute("content", themeColors.dark);
        document.body.classList.add("dark");
    }
    else {
        themeMetaColor?.setAttribute("content", themeColors.light);
        document.body.classList.remove("dark");
    }
}
export function setThemeColors(colors) {
    themeColors = colors;
    setThemeScheme();
}
export function setTheme(theme) {
    document.body.setAttribute("theme", theme);
}
export function currentTheme() {
    return document.body.getAttribute("theme") || themes.common;
}
