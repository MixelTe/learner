import { Sections } from "./data/sections.js";
import { showDayStats } from "./pages/dayStats.js";
import * as Lib from "./littleLib.js";
import { showQlist } from "./pages/qlist.js";
import { showStats } from "./pages/stats.js";
import { curSessionKey, switchPage } from "./pages/switchPage.js";
import { Tester } from "./tester.js";
import { initThemes, themes } from "./themes.js";
import { showAbout } from "./pages/about.js";
initThemes();
const menu = Lib.get.div("menu");
const btnAbout = Lib.get.button("btn-about");
let menuOpen = false;
Lib.addButtonListener("menuBtn", () => {
    if (menuOpen) {
        closeMenu();
        history.back();
    }
    else
        openMenu();
});
window.addEventListener("popstate", e => {
    if (menuOpen)
        closeMenu();
});
function openMenu() {
    menuOpen = true;
    menu.classList.add("open");
    history.pushState({ ...history.state, back: true }, "");
    const icons = Array.from(btnAbout.children);
    icons.forEach(icon => icon.style.display = "none");
    Lib.random.choose(icons).style.display = "block";
}
function closeMenu() {
    menuOpen = false;
    menu.classList.remove("open");
}
Lib.addButtonListener("btn-index", () => switchPage("main", "", themes.common, closeMenu));
Lib.addButtonListener("btn-stats", () => showStats(closeMenu));
Lib.addButtonListener("btn-qlist", () => showQlist(closeMenu));
Lib.addButtonListener("btn-dayStats", () => showDayStats(closeMenu));
Lib.addButtonListener("btn-about", () => showAbout(closeMenu));
initMainPage();
// showStats();
// showQlist();
// showDayStats();
// showAbout();
// new Tester(Sections[0].themes[14]).start();
async function initMainPage() {
    history.pushState({ page: "main", title: "", theme: themes.common, curSessionKey }, "");
    const sections = Lib.get.div("sections");
    const sectionTemplate = Lib.getEl("template-section", HTMLTemplateElement);
    for (let i = 0; i < Sections.length; i++) {
        const s = Sections[i];
        const section = sectionTemplate.content.cloneNode(true);
        const input = section.querySelector("input");
        input.id = `section_${i}`;
        const label = section.querySelector("label");
        label.innerText = s.name;
        label.htmlFor = input.id;
        const themes = section.querySelector(".sectionSelection-list");
        for (const theme of s.themes) {
            themes.appendChild(Lib.Button([], theme.name, () => {
                sections.querySelectorAll("input").forEach(inp => inp.checked = false);
                new Tester(theme).start();
            }));
        }
        if (s.themes.length == 0) {
            themes.appendChild(Lib.Button([], "В разработке"));
        }
        sections.appendChild(section);
    }
    await Lib.wait(100);
    Lib.get.div("p-start").classList.remove("vanished");
    const beforeload = document.getElementById("beforeload");
    if (beforeload) {
        beforeload.style.opacity = "0";
        await Lib.wait(500);
        document.body.removeChild(beforeload);
    }
}
