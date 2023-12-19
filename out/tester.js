import * as Lib from "./littleLib.js";
import { switchPage } from "./switchPage.js";
import { Trainer } from "./trainer.js";
import { confetti } from "./confetti.js";
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
    start() {
        switchPage("tester", this.theme.name, this.theme.color);
        this.items = Trainer.selectTasks(this.theme);
        this.next();
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
        pageEl.innerText = "";
        idEl.innerText = "";
        const text = `Результат: ${this.cor}/${this.items.length} (${Math.floor(this.cor / this.items.length * 100)}%)`;
        Lib.SetContent(taskEl, Lib.initEl("h2", [], [], text));
        Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
            Lib.Button([], "Вернуться", () => switchPage("main")),
            Lib.Button([], "Ещё раз", async () => {
                await Lib.wait(150);
                new Tester(this.theme).start();
            }),
        ]));
        if (this.cor == this.items.length) {
            for (let i = 0; i < 3; i++) {
                await Lib.wait(200);
                confetti(window.innerWidth / 2, window.innerHeight / 2, 20);
            }
        }
        else {
            confetti(window.innerWidth / 2, window.innerHeight / 2, 15);
        }
    }
}
export class TestItem {
    id;
    constructor(id) {
        this.id = id;
    }
}
