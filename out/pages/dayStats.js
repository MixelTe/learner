import { DayStatistics } from "../dayStatistics.js";
import { getMonthEndDate } from "../functions.js";
import * as Lib from "../littleLib.js";
import { switchPage } from "./switchPage.js";
import { themes } from "../themes.js";
const scale = Lib.get.el("dayStats-scale", HTMLSpanElement);
const scale_min = Lib.get.el("dayStats-scale_min", HTMLSpanElement);
const days = Lib.get.div("dayStats-days");
const current = Lib.get.div("dayStats-current");
const longest = Lib.get.div("dayStats-longest");
const dgap = 2;
const mgap = 8;
const size = 12;
const tsize = 15;
const r = 3;
export function showDayStats(onSwitch = () => { }) {
    switchPage("dayStats", "Статистика", themes.common, onSwitch);
    const stats = getStats();
    scale_min.innerText = `${stats.min}`;
    scale.innerText = `${stats.max}`;
    current.innerText = `${stats.current}`;
    longest.innerText = `${DayStatistics.getLongest()}`;
    drawDays(stats);
}
function getStats() {
    const months = DayStatistics.getStats();
    const max = Math.max(...months.map(m => Math.max(...m.days.map(d => d.c))), 0);
    const min = Math.min(...months.map(m => Math.min(...m.days.map(d => d.c))), max);
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    const needed = months.filter(m => m.y * 12 + m.i > todayYear * 12 + todayMonth - 12);
    const monthFull = [];
    for (let i = 0; i < 12; i++) {
        const m = (todayMonth - i + 12) % 12;
        const existingDays = needed.find(v => v.i == m)?.days || [];
        const month = {
            i: m,
            weeks: []
        };
        monthFull.push(month);
        const startDay = new Date(todayYear, todayMonth - i, 1).getDay();
        const endDate = getMonthEndDate(todayYear, todayMonth - i);
        let day = (startDay + 6) % 7;
        let week = day > 0 ? new Array(day).fill(-1) : [];
        for (let j = 1; j <= endDate; j++) {
            week.push(existingDays.find(d => d.i == j)?.c || (i == 0 && j > todayDate ? -1 : 0));
            day++;
            if (day > 6) {
                day = 0;
                month.weeks.push(week);
                week = [];
            }
        }
        if (week.length != 0)
            month.weeks.push(week);
        while (week.length < 7)
            week.push(-1);
    }
    return {
        months: monthFull.reverse(),
        current: DayStatistics.getCurrent(months),
        max,
        min,
    };
}
function drawDays(stats) {
    const svg = Lib.createSvgEl("svg");
    Lib.SetContent(days, svg);
    const dx = (size + dgap) * 7 + mgap;
    const dy = (size + dgap) * 6 + tsize;
    const columns = window.innerWidth < dx * 3 + mgap + 8 ? 2 : 3;
    svg.style.width = `${dx * columns + mgap / 2}px`;
    svg.style.height = `${dy * (12 / columns) + tsize}px`;
    for (let i = 0; i < stats.months.length; i++) {
        const month = drawMonth(stats.months[i], stats.min, stats.max, dx * (i % columns) + mgap, dy * Math.floor(i / columns) + tsize);
        svg.appendChild(month);
    }
}
function drawMonth(month, min, max, dx, dy) {
    const g = Lib.createSvgEl("g");
    const text = Lib.createSvgEl("text", g);
    text.innerHTML = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
    ][month.i] || "";
    text.setAttribute("x", `${dx}px`);
    text.setAttribute("y", `${dy - 2}px`);
    text.setAttribute("fill", "var(--c-text)");
    text.setAttribute("font-size", `${tsize}px`);
    for (let y = 0; y < month.weeks.length; y++) {
        const week = month.weeks[y];
        for (let x = 0; x < week.length; x++) {
            const v = week[x];
            if (v < 0)
                continue;
            const cv = (v - min) / max;
            const color = v == 0 ? "#8080804d" : `rgb(${Lib.lerp(50, 0, cv)}, ${Lib.lerp(100, 255, cv)}, ${Lib.lerp(255, 50, cv)})`;
            const rect = Lib.createSvgEl("rect", g);
            rect.setAttribute("x", `${(size + dgap) * x + dx}px`);
            rect.setAttribute("y", `${(size + dgap) * y + dy}px`);
            rect.setAttribute("width", `${size}px`);
            rect.setAttribute("height", `${size}px`);
            rect.setAttribute("fill", color);
            rect.setAttribute("rx", `${r}px`);
        }
    }
    return g;
}
