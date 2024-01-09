import * as Lib from "./littleLib.js";
import { TestItem } from "./tester.js";
export class TestItemSelfCheck extends TestItem {
    task;
    ans;
    constructor(id, task, ans) {
        super(id);
        this.task = task;
        this.ans = ans;
    }
    getQuestion() {
        if (typeof this.task == "string")
            return this.task;
        return this.task.html(true);
    }
    getAnswer() {
        if (typeof this.ans == "string")
            return this.ans;
        return this.ans.html(true);
    }
    async show(taskEl, inputEl, onAnswer) {
        if (typeof this.task == "string")
            taskEl.innerText = this.task;
        else
            Lib.SetContent(taskEl, this.task.html());
        Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
            Lib.Button([], "Ответ", async (btn) => {
                btn.classList.add("active");
                await Lib.wait(200);
                if (typeof this.ans == "string")
                    taskEl.innerText = this.ans;
                else
                    Lib.SetContent(taskEl, this.ans.html());
                Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
                    Lib.Button([], "Ошибся", btn => answer(false, btn)),
                    Lib.Button([], "Помню", btn => answer(true, btn)),
                ]));
                async function answer(r, btn) {
                    btn.classList.add("active");
                    await Lib.wait(200);
                    onAnswer(r);
                }
            }),
        ]));
    }
}
export class TestItemStress extends TestItem {
    task;
    desc;
    static Vowels = "аяуюоеёэиы";
    /**
     * @param task слово с выделенной ударной гласной
     */
    constructor(id, task, desc = "") {
        super(id);
        this.task = task;
        this.desc = desc;
        if (!task.match(/[АЯУЮОЕЁЭИЫ]/))
            console.error(`TestItemStress[${id}] word dont have stress: ${task}`);
    }
    getQuestion() {
        return this.task.toLowerCase() + " " + this.desc;
    }
    getAnswer() {
        return this.task;
    }
    async show(taskEl, inputEl, onAnswer) {
        inputEl.innerHTML = "";
        const els = this.task.split("").map((ch, i) => {
            const chl = ch.toLocaleLowerCase();
            if (TestItemStress.Vowels.includes(chl)) {
                return Lib.Button([], chl == "ё" ? "e" : chl, () => {
                    showAnsw(i);
                });
            }
            return Lib.Span([], chl);
        });
        if (this.desc.length > 0)
            els.push(Lib.Span("tester-charSelect-desc", this.desc));
        const wordEl = Lib.Div("tester-charSelect", els);
        Lib.SetContent(taskEl, wordEl);
        const showAnsw = (I) => {
            wordEl.classList.add("tester-charSelect_selected");
            let wrong = false;
            for (let i = 0; i < this.task.length; i++) {
                const el = els[i];
                const ch = this.task[i];
                const chl = ch.toLocaleLowerCase();
                const correct = ch != chl && TestItemStress.Vowels.includes(chl);
                if (chl == "ё")
                    el.innerText = chl;
                if (correct)
                    el.classList.add("tester-charSelect-correct");
                else if (i == I) {
                    el.classList.add("tester-charSelect-wrong");
                    wrong = true;
                }
                if (el instanceof HTMLButtonElement)
                    el.disabled = true;
            }
            Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
                Lib.Button([], "Далее", async (btn) => {
                    btn.classList.add("active");
                    onAnswer(!wrong);
                }),
            ]));
        };
    }
}
export class TestItemParonyms extends TestItem {
    paronyms;
    desc;
    constructor(id, paronyms, desc = []) {
        super(id);
        this.paronyms = paronyms;
        this.desc = desc;
        this.paronyms = paronyms.map(v => Lib.capitalize(v.toLocaleLowerCase()));
    }
    getQuestion() {
        return this.paronyms.join(" - ");
    }
    getAnswer() {
        return Lib.Div("tester-paronyms", [
            Lib.Div([], this.paronyms.join(" - ")),
            ...this.desc.map((v, i) => Lib.Div([], this.paronyms[i] + " - " + v))
        ]);
    }
    async show(taskEl, inputEl, onAnswer) {
        Lib.SetContent(taskEl, Lib.random.choose(this.paronyms));
        Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
            Lib.Button([], "Ответ", async (btn) => {
                btn.classList.add("active");
                await Lib.wait(200);
                Lib.SetContent(taskEl, this.getAnswer());
                Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
                    Lib.Button([], "Ошибся", btn => answer(false, btn)),
                    Lib.Button([], "Помню", btn => answer(true, btn)),
                ]));
                async function answer(r, btn) {
                    btn.classList.add("active");
                    await Lib.wait(200);
                    onAnswer(r);
                }
            }),
        ]));
    }
}
