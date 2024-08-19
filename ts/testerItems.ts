import * as Lib from "./littleLib.js";
import { isAnimDisabled } from "./pages/settings.js";
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
				if (!isAnimDisabled())
					await Lib.wait(200);

				if (typeof this.ans == "string")
					taskEl.innerText = this.ans;
				else
					Lib.SetContent(taskEl, this.ans.html());

				taskEl.appendChild(Lib.Button(["tester-backBtn", "material-symbols-rounded"], "arrow_back",
					() => this.show(taskEl, inputEl, onAnswer)));

				Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
					Lib.Button([], "Ошибся", btn => answer(false, btn)),
					Lib.Button([], "Помню", btn => answer(true, btn)),
				]));

				async function answer(r: boolean, btn: HTMLButtonElement)
				{
					btn.classList.add("active");
					if (!isAnimDisabled())
						await Lib.wait(200);
					onAnswer(r);
				}
			}),
		]));
	}
}

export class TestItemChoice extends TestItem
{
	private answerI = -1;
	constructor(id: number, private task: string | HtmlBuilder, private choices: string[], shuffle = true, private expl?: string | HtmlBuilder)
	{
		super(id);
		if (shuffle) Lib.shuffle(choices);
		for (let i = 0; i < choices.length; i++)
		{
			if (choices[i][0] == "+")
			{
				this.answerI = i;
				choices[i] = choices[i].slice(1);
			}
			choices[i] = choices[i].trim();
		}
		if (this.answerI < 0)
			console.error(`TestItemChoice[${id}] task dont have right choice:`, this.getQuestion(), choices);
	}

	public getQuestion(): string | Node
	{
		if (typeof this.task == "string")
			return this.task;
		return this.task.html(true);
	}

	public getAnswer(): string | Node
	{
		return this.choices[this.answerI];
	}

	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
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

		const btns = this.choices.map((v, I) => Lib.Button([], v, async () =>
		{
			right = I == this.answerI;
			for (let i = 0; i < this.choices.length; i++)
			{
				const btn = btns[i];
				btn.disabled = true;
				if (i == this.answerI)
					btn.classList.add("tester-input-many-correct")
				else if (i == I)
					btn.classList.add("tester-input-many-wrong")
				else
					btn.classList.add("tester-input-many-hidden")
			}
			btnNext.disabled = false;
			btnNext.classList.remove("tester-input-many-hidden");
			expl.classList.remove("tester-collapsible_collapsed");
		}));
		const btnNext = Lib.Button("tester-input-many-hidden", "Далее", () =>
		{
			onAnswer(right);
		})
		btnNext.disabled = true;
		btns.push(btnNext);

		Lib.SetContent(inputEl, Lib.Div("tester-input-many", btns));
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
		inputBtn.disabled = true;
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
			inputBtn.disabled = false;
			inputBtn.addEventListener("click", async () =>
			{
				inputBtn.classList.add("active");
				onAnswer(!wrong);
			});
		}
	}
}


export class TestItemWordGroup extends TestItem
{
	constructor(id: number, private group: string[], private desc: string[] = [])
	{
		super(id);
		this.group = group.map(v => Lib.capitalize(v.toLocaleLowerCase()))
	}

	public getQuestion(): string | Node
	{
		return this.group.join(" - ");
	}

	public getAnswer(): string | Node
	{
		return Lib.Div("tester-group", [
			Lib.Div([], this.group.join(" - ")),
			this.desc.length > 0 ? Lib.Div() : "",
			...this.desc.map((v, i) => Lib.Div([], this.group[i] + " - " + v))
		]);
	}

	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		Lib.SetContent(taskEl, Lib.random.choose(this.group));

		Lib.SetContent(inputEl, Lib.Div("tester-input-one", [
			Lib.Button([], "Ответ", async btn =>
			{
				btn.classList.add("active");
				if (!isAnimDisabled())
					await Lib.wait(200);

				Lib.SetContent(taskEl, this.getAnswer());

				Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
					Lib.Button([], "Ошибся", btn => answer(false, btn)),
					Lib.Button([], "Помню", btn => answer(true, btn)),
				]));

				async function answer(r: boolean, btn: HTMLButtonElement)
				{
					btn.classList.add("active");
					if (!isAnimDisabled())
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
	private choices: { s: string, r: boolean }[] = [];
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
		this.afterTask = task.slice(end + 1);
		this.choices = [];
		let rightExist = false;
		for (let choice of task.slice(start + 1, end).split("|"))
		{
			let r = false;
			if (choice[0] == "+")
			{
				r = true;
				rightExist = true;
				choice = choice.slice(1);
			}
			choice = choice.trim();
			this.choices.push({ s: choice, r });
		}
		if (!rightExist)
			console.error(`TestItemWordChoice[${id}] task dont have right choice: ${task}`);
	}

	public getQuestion(): string | Node
	{
		return this.beforeTask + "[" + this.choices.map(v => v.s).join(" | ") + "]" + this.afterTask;
	}

	public getAnswer(): string | Node
	{
		return this.beforeTask + this.choices.find(v => v.r)?.s + this.afterTask;
	}

	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		Lib.random.shuffle(this.choices);
		const inputBtn = Lib.Button([], "Далее");
		inputBtn.disabled = true;
		const inputDiv = Lib.Div(["tester-input-one", "tester-input-one_hidden"], [inputBtn]);
		Lib.SetContent(inputEl, inputDiv);

		const btns = this.choices.map((v, i) => Lib.Button([], v.s, () => showAns(i)));
		const choicesEl = Lib.Div("tester-wordChoice-choices", btns);
		const beforeTask = this.beforeTask.split(" ");
		const el = Lib.Div("tester-wordChoice", [
			...beforeTask.map((v, i) => Lib.Div("tester-wordChoice-text", v + (i < beforeTask.length - 1 ? " " : ""))),
			// Lib.Div("tester-wordChoice-text", this.beforeTask),
			choicesEl,
			...this.afterTask.split(" ").map(v => Lib.Div("tester-wordChoice-text", v + " ")),
			// Lib.Div("tester-wordChoice-text", this.afterTask),
		])
		Lib.SetContent(taskEl, el);

		const showAns = (I: number) =>
		{
			const rightChoiceI = this.choices[I].r ? I : this.choices.findIndex(v => v.r);
			if (I < rightChoiceI)
				el.classList.add("tester-wordChoice-bottom")
			if (I > rightChoiceI)
				el.classList.add("tester-wordChoice-top")
			if (I == rightChoiceI)
				choicesEl.classList.add("tester-wordChoice-choices-correct");

			for (let i = 0; i < btns.length; i++)
			{
				const btn = btns[i];
				btn.disabled = true;
				if (i == rightChoiceI)
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
			inputBtn.disabled = false;
			inputBtn.addEventListener("click", async () =>
			{
				inputBtn.classList.add("active");
				onAnswer(I == rightChoiceI);
			});
		}
	}
}

export class TestItemChooseWord extends TestItem
{
	private parts: string[] = [];
	private words: string[] = [];
	private answerI: number[] = [];
	constructor(id: number, task: string, ans: string, private title: string)
	{
		super(id);
		this.parts = task.split(" ");
		this.words = this.parts.map(part => part.replace(/[^а-яА-Я ёЁ]/g, '').trim().toLowerCase());
		this.answerI = ans.split("|").map(word =>
		{
			const i = this.words.indexOf(word.trim().toLowerCase())
			if (i < 0)
				console.error(`TestItemChooseWord[${id}] choice does not exist: ${word}`);
			return i;
		});
		if (this.answerI.length == 0)
			console.error(`TestItemChooseWord[${id}] task dont have right choice: ${task}`);
	}

	public getQuestion(): string | Node
	{
		return this.parts.join(" ");
	}

	public getAnswer(): string | Node
	{
		return this.answerI.map(i => this.words[i]).join("|");
	}

	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		const inputBtn = Lib.Button([], "Далее");
		inputBtn.disabled = true;
		const inputDiv = Lib.Div(["tester-input-one", "tester-input-one_hidden"], [inputBtn]);
		Lib.SetContent(inputEl, inputDiv);

		const btns = this.parts.map((part, I) => Lib.Button([], part, () =>
		{
			task.classList.add("tester-chooseWord_normal");
			for (let i = 0; i < this.parts.length; i++)
			{
				const btn = btns[i];
				btn.disabled = true;
				if (this.answerI.includes(i))
					btn.classList.add("tester-chooseWord-correct")
				else if (i == I)
					btn.classList.add("tester-chooseWord-wrong")
			}

			inputDiv.classList.remove("tester-input-one_hidden")
			inputBtn.disabled = false;
			inputBtn.addEventListener("click", async () =>
			{
				inputBtn.classList.add("active");
				onAnswer(this.answerI.includes(I));
			});
		}));
		const task = Lib.Div("tester-chooseWord", btns);
		Lib.SetContent(taskEl, [
			Lib.initEl("h5", [], this.title),
			task,
		]);
	}
}

export class TestItemMultipleWordChoice extends TestItem
{
	private parts: { s: string, a: string, q: boolean, r: boolean, selected?: boolean }[] = [];
	constructor(id: number, task: string, private title: string, private hideWrong = false)
	{
		super(id);
		let w = "";
		let s = "";
		let q = false;
		let r = false;
		for (let i = 0; i < task.length; i++)
		{
			const ch = task[i];
			if (ch == "[")
			{
				this.parts.push({ s: w, a: w, q, r });
				w = "";
				s = "";
				q = true;
				r = false;
				if (task[i + 1] == "+")
				{
					i++;
					r = true;
				}
			}
			else if (q && ch == "|")
			{
				s = w;
				w = "";
			}
			else if (ch == "]")
			{
				if (s == "") s = w;
				this.parts.push({ s, a: w, q, r });
				w = "";
				s = "";
				q = false;
				r = false;
			}
			else
			{
				w += ch;
			}
		}
		this.parts.push({ s: w, a: w, q, r });
		if (this.parts.length == 1)
			console.error(`TestItemMultipleWordChoice[${id}] task dont have choices: ${task}`);
	}

	public getQuestion(): string | Node
	{
		return this.parts.map(v => v.s).join("");
	}

	public getAnswer(onlyAnswer = false): string | Node
	{
		if (onlyAnswer)
			return this.parts.filter(v => v.r).map(v => v.s).join("");
		return this.parts.map(v => v.a).join("");
	}

	public async show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void)
	{
		this.parts.forEach(v => v.selected = false);
		let done = false;
		const els = this.parts.map((part, I) => !part.q ?
			Lib.Span([], part.s) :
			Lib.Button([], part.s, btn =>
			{
				if (done) return;
				const selected = !this.parts[I].selected;
				this.parts[I].selected = selected;
				btn.classList.toggle("tester-multipleWordChoice-btn_selected", selected);
				Lib.SetContent(selectedEl, this.parts.filter(v => v.selected).map(v => Lib.Span([], v.s)))
			}));

		const answEl = Lib.Span("tester-multipleWordChoice-answer", "Ответ: " + this.getAnswer(true));
		const answ = Lib.Div(["tester-collapsible", "tester-collapsible_noMargin", "tester-collapsible_collapsed"], answEl);

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

		Lib.SetContent(inputEl, Lib.Div("tester-input-one", Lib.Button([], "Ответить", btn =>
		{
			answ.classList.remove("tester-collapsible_collapsed");
			Lib.SetContent(answEl, [
				Lib.Span([], "Ответ: "),
				...this.parts.filter(v => v.r).map(v =>
					Lib.Span(v.selected ? [] : "tester-multipleWordChoice-notSelected", v.s)
				),
			])
			this.parts.filter(v => v.selected).forEach((v, i) => selectedEl.children[i].classList.add("tester-multipleWordChoice-selected_" + (v.r ? "correct" : "wrong")));
			done = true;
			let correct = true;
			for (let i = 0; i < els.length; i++)
			{
				const el = els[i];
				const part = this.parts[i];
				if (!part.q) continue;
				el.innerText = part.a;
				if (part.r)
					el.classList.add("tester-multipleWordChoice-btn_correct")
				else
					if (part.selected)
						el.classList.add("tester-multipleWordChoice-btn_wrong")
					else
						if (this.hideWrong)
							el.classList.add("tester-multipleWordChoice-btn_hidden")
						else
							el.classList.add("tester-multipleWordChoice-btn_disabled")

				correct = correct && (part.r && !!part.selected || !part.r && !part.selected);
			}

			btn.innerText = "Далее";
			btn.classList.add("active")
			const nbtn = btn.cloneNode(true) as HTMLButtonElement;
			btn.replaceWith(nbtn);
			setTimeout(() => nbtn.classList.remove("active"), 1);
			nbtn.addEventListener("click", async () =>
			{
				nbtn.classList.add("active");
				if (!isAnimDisabled())
					await Lib.wait(150);
				onAnswer(correct);
			});
		})));
	}
}
