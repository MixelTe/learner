import * as Lib from "./littleLib.js";
import { switchPage } from "./pages/switchPage.js";
import { Trainer } from "./trainer.js";
import { confetti } from "./confetti.js";
import { metrika_event, showAdvFullscreen } from "./metrika.js";
import { isAnimDisabled } from "./pages/settings.js";
import { Keys } from "./keys.js";
const pageEl = Lib.get.div("t-page");
const idEl = Lib.get.div("t-id");
const taskEl = Lib.get.div("t-task");
const inputEl = Lib.get.div("t-input");
export class Tester {
    theme;
    items = [];
    cur = 0;
    cor = 0;
    constructor(theme) {
        this.theme = theme;
    }
    async start() {
        switchPage({ page: "tester", subpath: this.theme.id }, { display: this.theme.name, title: " |> " + this.theme.name }, this.theme.color);
        this.loading();
        const items = await Trainer.selectTasks(this.theme);
        if (!items) {
            this.loadingError();
            return;
        }
        this.items = items;
        this.next();
        metrika_event("tester_start");
    }
    loading() {
        pageEl.innerText = "";
        idEl.innerText = "";
        inputEl.innerHTML = "";
        Lib.SetContent(taskEl, Lib.Div("loading", "Загрузка заданий"));
    }
    loadingError() {
        Lib.SetContent(taskEl, Lib.Div("loading-error", "Ошибка загрузки :("));
    }
    next() {
        if (this.cur >= this.items.length) {
            this.showEnd();
            return;
        }
        const item = this.items[this.cur];
        pageEl.innerText = `${this.cur + 1}/${this.items.length}`;
        idEl.innerText = `${this.theme.id}-${item.id}`;
        item.show(taskEl, inputEl, r => {
            if (r)
                this.cor++;
            Trainer.saveRes(this.theme.id, item.id, r);
            this.next();
        });
        this.cur++;
    }
    async showEnd() {
        runAdv(this.cor == this.items.length);
        pageEl.innerText = "";
        idEl.innerText = "";
        const text = `Результат: ${this.cor}/${this.items.length} (${Math.floor(this.cor / this.items.length * 100)}%)`;
        Lib.SetContent(taskEl, Lib.initEl("h2", [], text));
        Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
            Lib.Button([], "Вернуться", btn => {
                btn.classList.add("active");
                switchPage("main");
            }),
            Lib.Button([], "Ещё раз", async (btn) => {
                btn.classList.add("active");
                if (!isAnimDisabled())
                    await Lib.wait(200);
                new Tester(this.theme).start();
            }),
        ]));
        if (this.cor == this.items.length) {
            for (let i = 0; i < 3; i++) {
                if (!isAnimDisabled())
                    await Lib.wait(200);
                confetti(window.innerWidth / 2, window.innerHeight / 2, 20);
            }
        }
        else {
            confetti(window.innerWidth / 2, window.innerHeight / 2, 15);
        }
        metrika_event("tester_done");
    }
}
function runAdv(long) {
    let completeCount = parseInt(localStorage.getItem(Keys.completeCount) || "0", 10);
    if (isNaN(completeCount))
        completeCount = 0;
    const lessAdv = localStorage.getItem(Keys.lessAdv) == "1";
    const reqCount = lessAdv ? 4 : 2;
    completeCount++;
    let show = false;
    if (completeCount >= reqCount) {
        completeCount = 0;
        show = true;
    }
    localStorage.setItem(Keys.completeCount, `${completeCount}`);
    if (show)
        setTimeout(showAdvFullscreen, long ? 1250 : 750);
}
export class TestItem {
    id;
    constructor(id) {
        this.id = id;
    }
}
