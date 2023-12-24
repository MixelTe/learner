import * as Lib from "./littleLib.js";
import { TestItem } from "./tester.js";


interface HtmlBuilder
{
	html: (imagesInPopup?: boolean) => HTMLElement,
}

export class TestItemSelfCheck extends TestItem
{
	constructor(id: number, private task: string | HtmlBuilder, private ans: string | HtmlBuilder)
	{
		super(id);
	}

	public getQuestion(): string | Node
	{
		if (typeof this.task == "string")
			return this.task;
		return this.task.html(true);
	}

	public getAnswer(): string | Node
	{
		if (typeof this.ans == "string")
			return this.ans;
		return this.ans.html(true);
	}

	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		if (typeof this.task == "string")
			taskEl.innerText = this.task;
		else
			Lib.SetContent(taskEl, this.task.html());

		Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
			Lib.Button([], "Ответ", async btn =>
			{
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

				async function answer(r: boolean, btn: HTMLButtonElement)
				{
					btn.classList.add("active");
					await Lib.wait(200);
					onAnswer(r);
				}
			}),
		]));
	}
}
