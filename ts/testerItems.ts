import * as Lib from "./littleLib.js";
import { TestItem } from "./tester.js";


export class TestItemSelfCheck extends TestItem
{
	constructor(id: number, private task: string, private ans: string)
	{
		super(id);
	}


	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		taskEl.innerText = this.task;
		Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
			Lib.Button([], "Ошибся", btn => showAns(false, btn)),
			Lib.Button([], "Помню", btn => showAns(true, btn)),
		]));

		const showAns = async (r: boolean, btn: HTMLButtonElement) =>
		{
			btn.classList.add("active");
			await Lib.wait(100);
			taskEl.innerText = this.ans;
			Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
				Lib.Button([], "Далее", () => onAnswer(r)),
			]));
		}
	}
}
