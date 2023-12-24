import * as Lib from "./littleLib.js";
import { currentTheme, setTheme, setThemeColors, themes } from "./themes.js";
const pages = {
    main: Lib.get.div("p-start"),
    tester: Lib.get.div("p-tester"),
    stats: Lib.get.div("p-stats"),
    qlists: Lib.get.div("p-qlists"),
    qlist: Lib.get.div("p-qlist"),
};
const themeColors = {
    common: { light: "#a52a2a", dark: "#df4545" },
    blue: { light: "#2a2ca5", dark: "#43c8df" },
    green: { light: "#2ba64a", dark: "#43df6a" },
    orange: { light: "#a6562b", dark: "#df7a43" },
};
const titleEl = Lib.getEl("title", HTMLHeadingElement);
const subtitleEl = Lib.getEl("subtitle", HTMLHeadingElement);
let curPage = "main";
let mouse = { x: 0, y: 0 };
window.addEventListener("mousedown", e => mouse = { x: e.clientX, y: e.clientY });
const instant = false;
if (instant)
    console.warn("DEV: instant is enabled");
export async function switchPage(page, title = "", theme = themes.common, onSwitch = () => { }, subtitle = "") {
    if (curPage == page)
        return;
    if (instant) {
        pages[curPage].classList.remove("open");
        curPage = page;
        titleEl.innerText = title;
        subtitleEl.innerText = subtitle;
        setThemeColors(themeColors[theme]);
        pages[curPage].classList.add("open");
        onSwitch();
        if (currentTheme() != theme)
            setTheme(theme);
        return;
    }
    const anim = Lib.Div("pageSwitch");
    anim.style.left = `${mouse.x}px`;
    anim.style.top = `${mouse.y}px`;
    document.body.appendChild(anim);
    await Lib.wait(1);
    const size = Math.max(window.innerWidth, window.innerHeight) * 2 * Math.SQRT2;
    anim.style.width = `${size}px`;
    anim.style.height = `${size}px`;
    anim.classList.add("pageSwitchAnim");
    await Lib.wait(750);
    pages[curPage].classList.remove("open");
    curPage = page;
    titleEl.innerText = title;
    subtitleEl.innerText = subtitle;
    pages[curPage].classList.add("open");
    onSwitch();
    if (currentTheme() != theme) {
        setTheme(theme);
        await Lib.wait(300);
    }
    anim.classList.add("pageSwitchHide");
    await Lib.wait(400);
    document.body.removeChild(anim);
}
