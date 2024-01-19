import { DayStatistics } from "./dayStatistics.js";
import { Keys } from "./keys.js";
const code = 96188813;
export function metrika_pageSwitch(prevPage, page, title) {
    ym(code, "hit", "#" + page, {
        params: {
            title,
            referer: "#" + prevPage,
        }
    });
}
export function metrika_event(event) {
    ym(code, "reachGoal", event);
}
export function metrika_setParams() {
    const theme = localStorage.getItem(Keys.theme) || "auto";
    const dark = theme != "auto" ? theme == "dark" : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    ym(code, "userParams", {
        darkTheme: dark,
        defaultTheme: theme == "auto",
        longestDays: DayStatistics.getLongest(),
    });
}
