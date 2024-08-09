import * as Lib from "../littleLib.js";
import { enableBottomAdv, metrika_pageSwitch } from "../metrika.js";
import { currentTheme, setTheme, setThemeColors, themes } from "../themes.js";
import { checkCustomTheme, isAnimDisabled } from "./settings.js";
const pages = {
    main: Lib.get.div("p-start"),
    tester: Lib.get.div("p-tester"),
    stats: Lib.get.div("p-stats"),
    qlists: Lib.get.div("p-qlists"),
    qlist: Lib.get.div("p-qlist"),
    dayStats: Lib.get.div("p-dayStats"),
    about: Lib.get.div("p-about"),
    settings: Lib.get.div("p-settings"),
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
let prevPage = "main";
let mouse = { x: 0, y: 0 };
let disableAnimForRegPage = false;
window.addEventListener("mousedown", e => mouse = { x: e.clientX, y: e.clientY });
const instant = false;
if (instant)
    console.warn("DEV: instant is enabled");
let updateMainPage = () => { };
export function setUpdateMainPage(f) {
    updateMainPage = f;
}
export async function switchPage(page, title = "", theme = themes.common, onSwitch = () => { }, subtitle = "", dontPushState = false) {
    const pagePath = typeof page == "string" ? page : page.page + "/" + page.subpath;
    page = typeof page == "string" ? page : page.page;
    if (curPage == page)
        return;
    const documentTitle = typeof title == "string" ? (title == "" ? "ЛЯРО" : "ЛЯРО | " + title) : "ЛЯРО" + title.title;
    title = typeof title == "string" ? title : title.display;
    metrika_pageSwitch(prevPage, pagePath, documentTitle);
    prevPage = pagePath;
    if (page == "main")
        updateMainPage();
    const url = new URL(location.href);
    url.hash = pagePath == "main" ? "" : pagePath;
    if (instant || isAnimDisabled() || disableAnimForRegPage) {
        pages[curPage].classList.remove("open");
        curPage = page;
        titleEl.innerText = title;
        subtitleEl.innerText = subtitle;
        setThemeColors(themeColors[theme]);
        pages[curPage].classList.add("open");
        onSwitch();
        enableBottomAdv();
        checkCustomTheme();
        if (!dontPushState)
            if (history.state?.back)
                history.replaceState({ page, title, theme, curSessionKey }, "", url);
            else
                history.pushState({ page, title, theme, curSessionKey }, "", url);
        document.title = documentTitle;
        if (currentTheme() != theme)
            setTheme(theme);
        return;
    }
    const anim = Lib.Div("pageSwitch");
    anim.style.left = `${mouse.x}px`;
    anim.style.top = `${mouse.y}px`;
    document.body.appendChild(anim);
    await Lib.wait(50);
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
    enableBottomAdv();
    checkCustomTheme();
    if (!dontPushState)
        if (history.state?.back)
            history.replaceState({ page, title, theme, curSessionKey }, "", url);
        else
            history.pushState({ page, title, theme, curSessionKey }, "", url);
    document.title = documentTitle;
    if (currentTheme() != theme) {
        setThemeColors(themeColors[theme]);
        setTheme(theme);
        await Lib.wait(300);
    }
    anim.classList.add("pageSwitchHide");
    await Lib.wait(400);
    document.body.removeChild(anim);
}
export const curSessionKey = Lib.randomInt(10000);
window.addEventListener("popstate", e => {
    const state = e.state;
    if (state) {
        const page = state.page;
        const title = state.title;
        const theme = state.theme;
        const back = state.back;
        const sessionKey = state.curSessionKey;
        if (curSessionKey != sessionKey)
            return;
        if (!back && Object.keys(pages).includes(page)) {
            switchPage(page, title, theme, undefined, undefined, true);
        }
    }
});
export function regPage(path, basicOpenFn, openFn) {
    setTimeout(() => {
        const hash = new URL(location.href).hash.slice(1);
        if (hash.startsWith(path)) {
            disableAnimForRegPage = true;
            if (basicOpenFn)
                basicOpenFn();
            else if (hash.startsWith(path + "/"))
                openFn?.(hash.slice((path + "/").length));
            disableAnimForRegPage = false;
        }
    });
}
