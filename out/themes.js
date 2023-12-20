export const themes = {
    common: "common",
    blue: "blue",
    green: "green",
    orange: "orange",
};
const select = document.getElementById("themeSelect");
select.addEventListener("change", () => setThemeScheme(select.value));
const themeMetaColor = document.querySelector('meta[name="theme-color"]');
let themeColors = { light: "#a52a2a", dark: "#df4545" };
const themeKey = "learner-theme";
window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => setThemeScheme());
export function initThemes() {
    setTheme("common");
    setThemeScheme();
}
function setThemeScheme(theme) {
    theme = theme || localStorage.getItem(themeKey) || "auto";
    localStorage.setItem(themeKey, theme);
    select.value = theme;
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
