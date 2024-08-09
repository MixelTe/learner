import { Sections } from "../data/sections.js";
import * as Lib from "../littleLib.js";
import { regPage, switchPage } from "./switchPage.js";
import { themes } from "../themes.js";
import { Trainer } from "../trainer.js";
const itemTemplate = Lib.getEl("template-stats-item", HTMLTemplateElement);
const markerTemplate = Lib.getEl("template-stats-marker", HTMLTemplateElement);
const subitemTemplate = Lib.getEl("template-stats-subitem", HTMLTemplateElement);
const statsEl = Lib.get.div("stats");
regPage("stats", showStats);
export function showStats(onSwitch = () => { }) {
    switchPage("stats", "Прогресс", themes.common, onSwitch);
    statsEl.innerHTML = "";
    const allStats = Trainer.getStatistics();
    for (let i = 0; i < Sections.length; i++) {
        const section = Sections[i];
        const item = itemTemplate.content.cloneNode(true);
        const input = item.querySelector("input");
        input.id = `stats_${i}`;
        const label = item.querySelector("label");
        label.htmlFor = input.id;
        const labelText = item.querySelector("label span");
        labelText.innerText = section.name;
        const markerPlaceholder = item.querySelector("#placeholder-marker");
        const listEl = item.querySelector(".stats-list");
        let score = 0;
        for (const theme of section.themes) {
            const stats = allStats.themes.find(v => v.id == theme.id);
            const subitem = subitemTemplate.content.cloneNode(true);
            const title = subitem.querySelector(".stats-subitem :nth-child(2)");
            title.innerText = theme.name;
            const markerPlaceholder = subitem.querySelector("#placeholder-marker");
            const itemScore = stats ? Trainer.calcScore(stats, theme.count) : 0;
            score += itemScore;
            markerPlaceholder.replaceWith(createMarker(itemScore));
            listEl.appendChild(subitem);
        }
        markerPlaceholder.replaceWith(createMarker(score / section.themes.length));
        if (section.themes.length > 0)
            statsEl.appendChild(item);
    }
}
function createMarker(value) {
    const value100 = Math.round(value * 100);
    const marker = markerTemplate.content.cloneNode(true);
    const text = marker.querySelector("text");
    if (value100 != 100)
        text.innerHTML = `${value100}`;
    const circle = marker.querySelector("#marker-circle-value");
    const maxV = parseInt(circle.getAttribute("stroke-dasharray")?.split(" ")[0] || "1");
    circle.setAttribute("stroke-dasharray", `${value * maxV} ${maxV * 2}`);
    return marker;
}
