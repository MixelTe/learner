import * as Lib from "./littleLib.js";
import { isAnimDisabled } from "./pages/settings.js";
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
                if (!isAnimDisabled())
                    await Lib.wait(200);
                if (typeof this.ans == "string")
                    taskEl.innerText = this.ans;
                else
                    Lib.SetContent(taskEl, this.ans.html());
                taskEl.appendChild(Lib.Button(["tester-backBtn", "material-symbols-rounded"], "arrow_back", () => this.show(taskEl, inputEl, onAnswer)));
                Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
                    Lib.Button([], "Ошибся", btn => answer(false, btn)),
                    Lib.Button([], "Помню", btn => answer(true, btn)),
                ]));
                async function answer(r, btn) {
                    btn.classList.add("active");
                    if (!isAnimDisabled())
                        await Lib.wait(200);
                    onAnswer(r);
                }
            }),
        ]));
    }
}
export class TestItemChoice extends TestItem {
    task;
    choices;
    expl;
    answerI = -1;
    constructor(id, task, choices, shuffle = true, expl) {
        super(id);
        this.task = task;
        this.choices = choices;
        this.expl = expl;
        if (shuffle)
            Lib.shuffle(choices);
        for (let i = 0; i < choices.length; i++) {
            if (choices[i][0] == "+") {
                this.answerI = i;
                choices[i] = choices[i].slice(1);
            }
            choices[i] = choices[i].trim();
        }
        if (this.answerI < 0)
            console.error(`TestItemChoice[${id}] task dont have right choice:`, this.getQuestion(), choices);
    }
    getQuestion() {
        if (typeof this.task == "string")
            return this.task;
        return this.task.html(true);
    }
    getAnswer() {
        return this.choices[this.answerI];
    }
    async show(taskEl, inputEl, onAnswer) {
        if (typeof this.task == "string")
            taskEl.innerText = this.task;
        else
            Lib.SetContent(taskEl, this.task.html());
        const expl = Lib.Div(["tester-collapsible", "tester-collapsible_collapsed"]);
        taskEl.appendChild(expl);
        if (this.expl)
            if (typeof this.expl == "string")
                expl.appendChild(Lib.Span([], this.expl));
            else
                expl.appendChild(this.expl.html());
        let right = false;
        const btns = this.choices.map((v, I) => Lib.Button([], v, async () => {
            right = I == this.answerI;
            for (let i = 0; i < this.choices.length; i++) {
                const btn = btns[i];
                btn.disabled = true;
                if (i == this.answerI)
                    btn.classList.add("tester-input-many-correct");
                else if (i == I)
                    btn.classList.add("tester-input-many-wrong");
                else
                    btn.classList.add("tester-input-many-hidden");
            }
            btnNext.disabled = false;
            btnNext.classList.remove("tester-input-many-hidden");
            expl.classList.remove("tester-collapsible_collapsed");
        }));
        const btnNext = Lib.Button("tester-input-many-hidden", "Далее", () => {
            onAnswer(right);
        });
        btnNext.disabled = true;
        btns.push(btnNext);
        Lib.SetContent(inputEl, Lib.Div("tester-input-many", btns));
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
        const inputBtn = Lib.Button([], "Далее");
        inputBtn.disabled = true;
        const inputDiv = Lib.Div(["tester-input-one", "tester-input-one_hidden"], [inputBtn]);
        Lib.SetContent(inputEl, inputDiv);
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
            inputDiv.classList.remove("tester-input-one_hidden");
            inputBtn.disabled = false;
            inputBtn.addEventListener("click", async () => {
                inputBtn.classList.add("active");
                onAnswer(!wrong);
            });
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
            this.desc.length > 0 ? Lib.Div() : "",
            ...this.desc.map((v, i) => Lib.Div([], this.paronyms[i] + " - " + v))
        ]);
    }
    async show(taskEl, inputEl, onAnswer) {
        Lib.SetContent(taskEl, Lib.random.choose(this.paronyms));
        Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
            Lib.Button([], "Ответ", async (btn) => {
                btn.classList.add("active");
                if (!isAnimDisabled())
                    await Lib.wait(200);
                Lib.SetContent(taskEl, this.getAnswer());
                Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
                    Lib.Button([], "Ошибся", btn => answer(false, btn)),
                    Lib.Button([], "Помню", btn => answer(true, btn)),
                ]));
                async function answer(r, btn) {
                    btn.classList.add("active");
                    if (!isAnimDisabled())
                        await Lib.wait(200);
                    onAnswer(r);
                }
            }),
        ]));
    }
}
export class TestItemWordChoice extends TestItem {
    task;
    beforeTask = "";
    afterTask = "";
    choices = [];
    rightChoiceI = -1;
    /**
     * @param task "Sky are [red|+blue|green], roses are red."
     *
     * "4 [ +|+-|*|/] 1 = 3"
     */
    constructor(id, task) {
        super(id);
        this.task = task;
        const start = task.indexOf("[");
        const end = task.indexOf("]");
        if (start < 0 || end < 0) {
            console.error(`TestItemWordChoice[${id}] task dont have choices: ${task}`);
            return;
        }
        this.beforeTask = task.slice(0, start);
        this.choices = task.slice(start + 1, end).split("|");
        Lib.random.shuffle(this.choices);
        this.afterTask = task.slice(end + 1);
        for (let i = 0; i < this.choices.length; i++) {
            const choice0 = this.choices[i][0];
            if (choice0 == "+") {
                this.rightChoiceI = i;
                this.choices[i] = this.choices[i].slice(1);
            }
            this.choices[i] = this.choices[i].trim();
        }
        if (this.rightChoiceI < 0)
            console.error(`TestItemWordChoice[${id}] task dont have right choice: ${task}`);
    }
    getQuestion() {
        return this.beforeTask + "[" + this.choices.join(" | ") + "]" + this.afterTask;
    }
    getAnswer() {
        return this.beforeTask + this.choices[this.rightChoiceI] + this.afterTask;
    }
    async show(taskEl, inputEl, onAnswer) {
        const inputBtn = Lib.Button([], "Далее");
        inputBtn.disabled = true;
        const inputDiv = Lib.Div(["tester-input-one", "tester-input-one_hidden"], [inputBtn]);
        Lib.SetContent(inputEl, inputDiv);
        const btns = this.choices.map((v, i) => Lib.Button([], v, () => showAns(i)));
        const choicesEl = Lib.Div("tester-wordChoice-choices", btns);
        const el = Lib.Div("tester-wordChoice", [
            Lib.Div("tester-wordChoice-text", this.beforeTask),
            choicesEl,
            Lib.Div("tester-wordChoice-text", this.afterTask),
        ]);
        Lib.SetContent(taskEl, el);
        const showAns = (I) => {
            if (I < this.rightChoiceI)
                el.classList.add("tester-wordChoice-bottom");
            if (I > this.rightChoiceI)
                el.classList.add("tester-wordChoice-top");
            for (let i = 0; i < btns.length; i++) {
                const btn = btns[i];
                btn.disabled = true;
                if (i == this.rightChoiceI) {
                    btn.classList.add("tester-wordChoice-correct");
                    if (btn.innerText == "")
                        btn.classList.add("tester-wordChoice-correct_empty");
                }
                else if (i == I) {
                    btn.classList.add("tester-wordChoice-wrong");
                    if (btn.innerText == "")
                        btn.classList.add("tester-wordChoice-wrong_empty");
                }
                else
                    btn.classList.add("tester-wordChoice-hide");
            }
            inputDiv.classList.remove("tester-input-one_hidden");
            inputBtn.disabled = false;
            inputBtn.addEventListener("click", async () => {
                inputBtn.classList.add("active");
                onAnswer(I == this.rightChoiceI);
            });
        };
    }
}
export class TestItemChooseWord extends TestItem {
    parts = [];
    words = [];
    answerI = [];
    constructor(id, task, ans) {
        super(id);
        this.parts = task.split(" ");
        this.words = this.parts.map(part => part.replace(/[^а-яА-Я ёЁ]/g, '').trim().toLowerCase());
        this.answerI = ans.split("|").map(word => {
            const i = this.words.indexOf(word.trim().toLowerCase());
            if (i < 0)
                console.error(`TestItemChooseWord[${id}] choice does not exist: ${word}`);
            return i;
        });
        if (this.answerI.length == 0)
            console.error(`TestItemChooseWord[${id}] task dont have right choice: ${task}`);
    }
    getQuestion() {
        return this.parts.join(" ");
    }
    getAnswer() {
        return this.answerI.map(i => this.words[i]).join("|");
    }
    async show(taskEl, inputEl, onAnswer) {
        const inputBtn = Lib.Button([], "Далее");
        inputBtn.disabled = true;
        const inputDiv = Lib.Div(["tester-input-one", "tester-input-one_hidden"], [inputBtn]);
        Lib.SetContent(inputEl, inputDiv);
        const btns = this.parts.map((part, I) => Lib.Button([], part, () => {
            task.classList.add("tester-chooseWord_normal");
            for (let i = 0; i < this.parts.length; i++) {
                const btn = btns[i];
                btn.disabled = true;
                if (this.answerI.includes(i))
                    btn.classList.add("tester-chooseWord-correct");
                else if (i == I)
                    btn.classList.add("tester-chooseWord-wrong");
            }
            inputDiv.classList.remove("tester-input-one_hidden");
            inputBtn.disabled = false;
            inputBtn.addEventListener("click", async () => {
                inputBtn.classList.add("active");
                onAnswer(this.answerI.includes(I));
            });
        }));
        const task = Lib.Div("tester-chooseWord", btns);
        Lib.SetContent(taskEl, [
            Lib.initEl("h5", [], "Исправьте лексическую ошибку, исключив лишнее слово"),
            task,
        ]);
    }
}
export class TestItemMultipleWordChoice extends TestItem {
    title;
    parts = [];
    constructor(id, task, title) {
        super(id);
        this.title = title;
        let w = "";
        let s = "";
        let q = false;
        let r = false;
        for (let i = 0; i < task.length; i++) {
            const ch = task[i];
            if (ch == "[") {
                this.parts.push({ s: w, a: w, q, r });
                w = "";
                s = "";
                q = true;
                r = false;
                if (task[i + 1] == "+") {
                    i++;
                    r = true;
                }
            }
            else if (q && ch == "|") {
                s = w;
                w = "";
            }
            else if (ch == "]") {
                if (s == "")
                    s = w;
                this.parts.push({ s, a: w, q, r });
                w = "";
                s = "";
                q = false;
                r = false;
            }
            else {
                w += ch;
            }
        }
        this.parts.push({ s: w, a: w, q, r });
    }
    getQuestion() {
        return this.parts.map(v => v.s).join("");
    }
    getAnswer() {
        return this.parts.filter(v => v.r).map(v => v.s).join("");
    }
    async show(taskEl, inputEl, onAnswer) {
        this.parts.forEach(v => v.selected = false);
        let done = false;
        const els = this.parts.map((part, I) => !part.q ?
            Lib.Span([], part.s) :
            Lib.Button([], part.s, btn => {
                if (done)
                    return;
                const selected = !this.parts[I].selected;
                this.parts[I].selected = selected;
                btn.classList.toggle("tester-multipleWordChoice-btn_selected", selected);
                Lib.SetContent(selectedEl, this.parts.filter(v => v.selected).map(v => Lib.Span([], v.s)));
            }));
        const answ = Lib.Div(["tester-collapsible", "tester-collapsible_noMargin", "tester-collapsible_collapsed"], Lib.Span([], "Ответ: " + this.getAnswer()));
        const task = Lib.Div("tester-multipleWordChoice", els);
        const selectedEl = Lib.Span("tester-multipleWordChoice-selected");
        Lib.SetContent(taskEl, [
            Lib.initEl("h5", [], this.title),
            task,
            Lib.Div([], [
                Lib.Span([], "Выбрано: "),
                selectedEl,
            ]),
            answ,
        ]);
        Lib.SetContent(inputEl, Lib.Div("tester-input-one", Lib.Button([], "Ответить", btn => {
            answ.classList.remove("tester-collapsible_collapsed");
            this.parts.filter(v => v.selected).forEach((v, i) => selectedEl.children[i].classList.add("tester-multipleWordChoice-selected_" + (v.r ? "correct" : "wrong")));
            done = true;
            let correct = true;
            for (let i = 0; i < els.length; i++) {
                const el = els[i];
                const part = this.parts[i];
                if (!part.q)
                    continue;
                el.innerText = part.a;
                if (part.r)
                    el.classList.add("tester-multipleWordChoice-btn_correct");
                else if (part.selected)
                    el.classList.add("tester-multipleWordChoice-btn_wrong");
                else
                    el.classList.add("tester-multipleWordChoice-btn_hidden");
                correct = correct && (part.r && !!part.selected || !part.r && !part.selected);
            }
            btn.innerText = "Далее";
            btn.classList.add("active");
            const nbtn = btn.cloneNode(true);
            btn.replaceWith(nbtn);
            setTimeout(() => nbtn.classList.remove("active"), 1);
            nbtn.addEventListener("click", async () => {
                nbtn.classList.add("active");
                if (!isAnimDisabled())
                    await Lib.wait(150);
                onAnswer(correct);
            });
        })));
    }
}
