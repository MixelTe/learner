import { getOrAdd, shuffledWithSeedAndWeights, sumStr } from "./functions.js";
import * as Lib from "./littleLib.js";
const Len = 15;
const MaxHist = 5;
const statisticsKey = "learner-statistics";
const seedKey = "learner-trainerSeed";
const turnKey = "learner-trainerTurn";
const themeKey = "learner-trainerTheme";
const devSelectId = -2;
if (devSelectId >= -1)
    console.warn("DEV: devSelectId is enabled");
export class Trainer {
    static selectTasks(theme) {
        if (devSelectId >= -1) {
            const item = devSelectId == -1 ? theme.items.at(-1) : theme.items.find(v => v.id == devSelectId);
            return item ? [item] : [];
        }
        if (this.lastTheme != theme.id) {
            this.lastTheme = theme.id;
            this.turn = 0;
        }
        this.turn += 1;
        if (this.turn > 3) {
            this.turn = 0;
            this.seed = Lib.random.int(100000);
        }
        const stats = this.getStatistics();
        const statsItems = stats.themes.find(v => v.id == theme.id)?.items || [];
        if (this.turn == 0) {
            statsItems.forEach(v => v.hist_old = v.hist);
            this.setStatistics(stats);
        }
        const shuffled = shuffledWithSeedAndWeights(theme.items, this.seed, theme.items.map(v => {
            const hist = statsItems.find(el => el.id == v.id)?.hist_old || "";
            if (hist.length == 0)
                return 1;
            return (1 - sumStr(hist) / hist.length) + 0.1;
        }));
        const items = shuffled.slice(0, Len * 2);
        Lib.random.shuffle(items);
        return items.slice(0, Len);
    }
    static saveRes(themeId, itemId, res) {
        const stats = this.getStatistics();
        const theme = getOrAdd(stats.themes, v => v.id == themeId, { id: themeId, items: [] });
        const item = getOrAdd(theme.items, v => v.id == itemId, { id: itemId, hist: "", hist_old: "" });
        item.hist += res ? "1" : "0";
        if (item.hist.length > MaxHist)
            item.hist = item.hist.slice(item.hist.length - MaxHist);
        this.setStatistics(stats);
    }
    static getStatistics() {
        const stats = JSON.parse(localStorage.getItem(statisticsKey) || "{}");
        if (stats.v == undefined)
            stats.v = 1;
        if (stats.themes == undefined)
            stats.themes = [];
        return this.updateStatisticsData(stats);
    }
    static calcScore(theme) {
        let score = 0;
        for (const item of theme.items) {
            if (item.hist.length != 0)
                score += sumStr(item.hist) / item.hist.length;
        }
        return score / theme.items.length;
    }
    static setStatistics(stats) {
        localStorage.setItem(statisticsKey, JSON.stringify(stats));
    }
    static updateStatisticsData(stats) {
        if (stats.v == 1)
            return stats;
        return { v: 1, themes: [] };
    }
    static get seed() {
        return parseInt(localStorage.getItem(seedKey) || "0", 10);
    }
    static set seed(v) {
        localStorage.setItem(seedKey, `${v}`);
    }
    static get turn() {
        return parseInt(localStorage.getItem(turnKey) || "0", 10);
    }
    static set turn(v) {
        localStorage.setItem(turnKey, `${v}`);
    }
    static get lastTheme() {
        return localStorage.getItem(themeKey) || "";
    }
    static set lastTheme(v) {
        localStorage.setItem(themeKey, v);
    }
}
