import * as Lib from "./littleLib.js";
import { TestItem } from "./tester.js";


interface HtmlBuilder
{
	html: () => string,
}

export class TestItemSelfCheck extends TestItem
{
	constructor(id: number, private task: string | HtmlBuilder, private ans: string | HtmlBuilder)
	{
		super(id);
	}


	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		if (typeof this.task == "string")
			taskEl.innerText = this.task;
		else
			taskEl.innerHTML = this.task.html();
		Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
			Lib.Button([], "Ошибся", btn => showAns(false, btn)),
			Lib.Button([], "Помню", btn => showAns(true, btn)),
		]));

		const showAns = async (r: boolean, btn: HTMLButtonElement) =>
		{
			btn.classList.add("active");
			await Lib.wait(150);
			if (typeof this.ans == "string")
				taskEl.innerText = this.ans;
			else
				taskEl.innerHTML = this.ans.html();
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
