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
