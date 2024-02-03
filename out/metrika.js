import { DayStatistics } from "./dayStatistics.js";
import { Keys } from "./keys.js";
const code = 96188813;
export function metrika_pageSwitch(prevPage, page, title) {
    saveCall(() => ym(code, "hit", "#" + page, {
        params: {
            title,
            referer: "#" + prevPage,
        }
    }));
}
export function metrika_event(event) {
    saveCall(() => ym(code, "reachGoal", event));
}
export function metrika_setParams() {
    const theme = localStorage.getItem(Keys.theme) || "auto";
    const dark = theme != "auto" ? theme == "dark" : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    saveCall(() => ym(code, "userParams", {
        darkTheme: dark,
        defaultTheme: theme == "auto",
        customTheme: localStorage.getItem(Keys.customTheme) == "1",
        disableAnim: localStorage.getItem(Keys.animDisable) == "1",
        longestDays: DayStatistics.getLongest(),
    }));
}
function saveCall(f) {
    if (!Object.hasOwn(window, "ym")) {
        console.error("metrika is undefined");
        return;
    }
    try {
        f();
    }
    catch (e) {
        console.error(e);
    }
}
