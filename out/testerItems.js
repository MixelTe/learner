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
    async show(taskEl, inputEl, onAnswer) {
        if (typeof this.task == "string")
            taskEl.innerText = this.task;
        else
            Lib.SetContent(taskEl, this.task.html());
        Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
            Lib.Button([], "Ошибся", btn => showAns(false, btn)),
            Lib.Button([], "Помню", btn => showAns(true, btn)),
        ]));
        const showAns = async (r, btn) => {
            btn.classList.add("active");
            await Lib.wait(150);
            if (typeof this.ans == "string")
                taskEl.innerText = this.ans;
            else
                Lib.SetContent(taskEl, this.ans.html());
            Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
                Lib.Button([], "Далее", async (btn) => {
                    btn.classList.add("active");
                    await Lib.wait(100);
                    onAnswer(r);
                }),
            ]));
        };
    }
}
