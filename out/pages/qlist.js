import { Sections } from "../data/sections.js";
import * as Lib from "../littleLib.js";
import { switchPage } from "./switchPage.js";
import { themes } from "../themes.js";
import { Trainer } from "../trainer.js";
const qlistsTemplate = Lib.getEl("template-qlists", HTMLTemplateElement);
const qlistsEl = Lib.get.div("qlists");
const qlistEl = Lib.get.div("qlist");
const qlistPage = Lib.get.div("p-qlist");
export function showQlist(onSwitch = () => { }) {
    switchPage("qlists", "Вопросы", themes.common, onSwitch);
    qlistsEl.innerHTML = "";
    for (let i = 0; i < Sections.length; i++) {
        const section = Sections[i];
        const item = qlistsTemplate.content.cloneNode(true);
        const input = item.querySelector("input");
        input.id = `qlists_${i}`;
        const label = item.querySelector("label");
        label.htmlFor = input.id;
        const labelText = item.querySelector("label span");
        labelText.innerText = section.name;
        const themes = item.querySelector(".qlists-list");
        let c = 0;
        for (const theme of section.themes) {
            c += theme.count;
            themes.appendChild(Lib.Button([], [
                Lib.Span([], theme.name),
                Lib.Span([], `${theme.count}`),
            ], () => {
                showItemQs(section.name, theme);
            }));
        }
        if (section.themes.length == 0) {
            themes.appendChild(Lib.Button([], "В разработке"));
        }
        item.querySelector(".qlist-count").innerText = `${c}`;
        qlistsEl.appendChild(item);
    }
}
export async function showItemQs(sectionName, theme) {
    switchPage("qlist", theme.name, theme.color, () => qlistPage.scroll(0, 0), sectionName);
    Lib.SetContent(qlistEl, Lib.Div("loading", "Загрузка заданий"));
    qlistEl.classList.toggle("qlist_single", !!theme.onlyAnswerInQList);
    const stats = Trainer.getStatistics().themes.find(v => v.id == theme.id);
    const items = await theme.items();
    qlistEl.innerHTML = "";
    for (const item of items) {
        const stat = stats?.items?.find?.(v => v.id == item.id)?.hist || "";
        const marker = createMarker(stat);
        Lib.AppendContent(qlistEl, [
            Lib.Div([], [
                Lib.Div("qlist-id", `${theme.id}-${item.id}`),
                Lib.Div("qlist-cell", item.getQuestion()),
                marker,
            ]),
            Lib.Div([], Lib.Div("qlist-cell", item.getAnswer())),
        ]);
    }
}
function createMarker(hist) {
    return Lib.Div("qlist-marker", [
        createDot(hist.at(-5)),
        createDot(hist.at(-4)),
        createDot(hist.at(-3)),
        createDot(hist.at(-2)),
        createDot(hist.at(-1)),
    ]);
}
function createDot(v) {
    return v == "1" ? Lib.Span("qlist-marker-1") :
        v == "0" ? Lib.Span("qlist-marker-0") :
            Lib.Span("qlist-marker-u");
}
