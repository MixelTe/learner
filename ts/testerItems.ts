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
		const inputBtn = Lib.Button([], "Далее");
		const inputDiv = Lib.Div(["tester-input-one", "tester-input-one_hidden"], [inputBtn]);
		Lib.SetContent(inputEl, inputDiv);

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

			inputDiv.classList.remove("tester-input-one_hidden")
			inputBtn.addEventListener("click", async () =>
			{
				inputBtn.classList.add("active");
				onAnswer(!wrong);
			});
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
			this.desc.length > 0 ? Lib.Div() : "",
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


export class TestItemWordChoice extends TestItem
{
	private beforeTask = "";
	private afterTask = "";
	private choices: string[] = [];
	private rightChoiceI = -1;
	/**
	 * @param task "Sky are [red|+blue|green], roses are red."
	 *
	 * "4 [ +|+-|*|/] 1 = 3"
	 */
	constructor(id: number, private task: string)
	{
		super(id);
		const start = task.indexOf("[")
		const end = task.indexOf("]")
		if (start < 0 || end < 0)
		{
			console.error(`TestItemWordChoice[${id}] task dont have choices: ${task}`);
			return;
		}
		this.beforeTask = task.slice(0, start);
		this.choices = task.slice(start + 1, end).split("|");
		Lib.random.shuffle(this.choices);
		this.afterTask = task.slice(end + 1);
		for (let i = 0; i < this.choices.length; i++)
		{
			const choice0 = this.choices[i][0]
			if (choice0 == "+")
			{
				this.rightChoiceI = i;
				this.choices[i] = this.choices[i].slice(1);
			}
			this.choices[i] = this.choices[i].trim();
		}
		if (this.rightChoiceI < 0)
			console.error(`TestItemWordChoice[${id}] task dont have right choice: ${task}`);
	}

	public getQuestion(): string | Node
	{
		return this.beforeTask + "[" + this.choices.join(" | ") + "]" + this.afterTask;
	}

	public getAnswer(): string | Node
	{
		return this.beforeTask + this.choices[this.rightChoiceI] + this.afterTask;
	}

	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		const inputBtn = Lib.Button([], "Далее");
		const inputDiv = Lib.Div(["tester-input-one", "tester-input-one_hidden"], [inputBtn]);
		Lib.SetContent(inputEl, inputDiv);

		const btns = this.choices.map((v, i) => Lib.Button([], v, () => showAns(i)));
		const choicesEl = Lib.Div("tester-wordChoice-choices", btns);
		const el = Lib.Div("tester-wordChoice", [
			Lib.Div("tester-wordChoice-text", this.beforeTask),
			choicesEl,
			Lib.Div("tester-wordChoice-text", this.afterTask),
		])
		Lib.SetContent(taskEl, el);

		const showAns = (I: number) =>
		{
			if (I < this.rightChoiceI)
				el.classList.add("tester-wordChoice-bottom")
			if (I > this.rightChoiceI)
				el.classList.add("tester-wordChoice-top")

			for (let i = 0; i < btns.length; i++)
			{
				const btn = btns[i];
				btn.disabled = true;
				if (i == this.rightChoiceI)
				{
					btn.classList.add("tester-wordChoice-correct")
					if (btn.innerText == "")
						btn.classList.add("tester-wordChoice-correct_empty")
				}
				else if (i == I)
				{
					btn.classList.add("tester-wordChoice-wrong")
					if (btn.innerText == "")
						btn.classList.add("tester-wordChoice-wrong_empty")
				}
				else
					btn.classList.add("tester-wordChoice-hide")
			}

			inputDiv.classList.remove("tester-input-one_hidden")
			inputBtn.addEventListener("click", async () =>
			{
				inputBtn.classList.add("active");
				onAnswer(I == this.rightChoiceI);
			});
		}
	}
}
