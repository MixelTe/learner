import * as Lib from "./littleLib.js";
import { FormulaBuilder } from "./formulasBuilder.js";
import { TestItem } from "./tester.js";


export class TestItemSelfCheck extends TestItem
{
	constructor(id: number, private task: string | FormulaBuilder, private ans: string | FormulaBuilder)
	{
		super(id);
	}


	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		if (this.task instanceof FormulaBuilder)
			taskEl.innerHTML = this.task.html();
		else
			taskEl.innerText = this.task;
		Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
			Lib.Button([], "Ошибся", btn => showAns(false, btn)),
			Lib.Button([], "Помню", btn => showAns(true, btn)),
		]));

		const showAns = async (r: boolean, btn: HTMLButtonElement) =>
		{
			btn.classList.add("active");
			await Lib.wait(150);
			if (this.ans instanceof FormulaBuilder)
				taskEl.innerHTML = this.ans.html();
			else
				taskEl.innerText = this.ans;
			Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
				Lib.Button([], "Далее", async btn =>
				{
					btn.classList.add("active");
					await Lib.wait(100);
					onAnswer(r)
				}),
			]));
		}
	}
}
