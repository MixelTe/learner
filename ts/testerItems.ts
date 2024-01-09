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

export class TestItemStress extends TestItem
{
	private static Vowels = "аяуюоеёэиы";
	/**
	 * @param task слово с выделенной ударной гласной
	 */
	constructor(id: number, private task: string, private desc = "")
	{
		super(id);
		if (!task.match(/[АЯУЮОЕЁЭИЫ]/))
			console.error(`TestItemStress[${id}] word dont have stress: ${task}`);
	}

	public getQuestion(): string | Node
	{
		return this.task.toLowerCase() + " " + this.desc;
	}

	public getAnswer(): string | Node
	{
		return this.task;
	}

	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		inputEl.innerHTML = "";
		const els = this.task.split("").map((ch, i) =>
		{
			const chl = ch.toLocaleLowerCase();
			if (TestItemStress.Vowels.includes(chl))
			{
				return Lib.Button([], chl == "ё" ? "e" : chl, () =>
				{
					showAnsw(i);
				});
			}
			return Lib.Span([], chl);
		});
		if (this.desc.length > 0)
			els.push(Lib.Span("tester-charSelect-desc", this.desc));

		const wordEl = Lib.Div("tester-charSelect", els);
		Lib.SetContent(taskEl, wordEl);

		const showAnsw = (I: number) =>
		{
			wordEl.classList.add("tester-charSelect_selected");
			let wrong = false;
			for (let i = 0; i < this.task.length; i++)
			{
				const el = els[i];
				const ch = this.task[i]
				const chl = ch.toLocaleLowerCase();
				const correct = ch != chl && TestItemStress.Vowels.includes(chl);
				if (chl == "ё")
					el.innerText = chl;
				if (correct)
					el.classList.add("tester-charSelect-correct");
				else if (i == I)
				{
					el.classList.add("tester-charSelect-wrong");
					wrong = true;
				}

				if (el instanceof HTMLButtonElement)
					el.disabled = true;
			}
			Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
				Lib.Button([], "Далее", async btn =>
				{
					btn.classList.add("active");
					onAnswer(!wrong);
				}),
			]));
		}
	}
}


export class TestItemParonyms extends TestItem
{
	constructor(id: number, private paronyms: string[], private desc: string[] = [])
	{
		super(id);
		this.paronyms = paronyms.map(v => Lib.capitalize(v.toLocaleLowerCase()))
	}

	public getQuestion(): string | Node
	{
		return this.paronyms.join(" - ");
	}

	public getAnswer(): string | Node
	{
		return Lib.Div("tester-paronyms", [
			Lib.Div([], this.paronyms.join(" - ")),
			...this.desc.map((v, i) => Lib.Div([], this.paronyms[i] + " - " + v))
		]);
	}

	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		Lib.SetContent(taskEl, Lib.random.choose(this.paronyms));

		Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
			Lib.Button([], "Ответ", async btn =>
			{
				btn.classList.add("active");
				await Lib.wait(200);

				Lib.SetContent(taskEl, this.getAnswer());

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
