export const themes = {
    common: "common",
    blue: "blue",
    green: "green",
    orange: "orange",
};
const select = document.getElementById("themeSelect");
select.addEventListener("change", () => setThemeScheme(select.value));
window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => setThemeScheme());
export function initThemes() {
    setTheme("common");
    setThemeScheme();
}
function setThemeScheme(theme) {
    theme = theme || localStorage.getItem("theme") || "auto";
    localStorage.setItem("theme", theme);
    select.value = theme;
    if (theme == "auto") {
        const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.body.classList.toggle("dark", dark);
    }
    else if (theme == "dark") {
        document.body.classList.add("dark");
    }
    else {
        document.body.classList.remove("dark");
    }
}
export function setTheme(theme) {
    document.body.setAttribute("theme", theme);
}
export function currentTheme() {
    return document.body.getAttribute("theme") || themes.common;
}
