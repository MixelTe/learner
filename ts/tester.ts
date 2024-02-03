import * as Lib from "./littleLib.js";
import { Theme } from "./data/sections.js";
import { switchPage } from "./pages/switchPage.js";
import { Trainer } from "./trainer.js";
import { confetti } from "./confetti.js";
import { metrika_event } from "./metrika.js";
import { isAnimDisabled } from "./pages/settings.js";

const pageEl = Lib.get.div("t-page");
const idEl = Lib.get.div("t-id");
const taskEl = Lib.get.div("t-task");
const inputEl = Lib.get.div("t-input");

export class Tester
{
	private items: TestItem[] = [];
	private cur = 0;
	private cor = 0;

	constructor(private theme: Theme) { }

	public async start()
	{
		switchPage({ page: "tester", title: "tester/" + this.theme.id }, { display: this.theme.name, title: " |> " + this.theme.name }, this.theme.color);
		this.loading();
		this.items = await Trainer.selectTasks(this.theme);
		this.next();
		metrika_event("tester_start");
	}

	private loading()
	{
		pageEl.innerText = "";
		idEl.innerText = "";
		inputEl.innerHTML = "";
		Lib.SetContent(taskEl, Lib.Div("loading", "Загрузка заданий"));
	}

	private next()
	{
		if (this.cur >= this.items.length)
		{
			this.showEnd();
			return;
		}

		const item = this.items[this.cur];
		pageEl.innerText = `${this.cur + 1}/${this.items.length}`;
		idEl.innerText = `${this.theme.id}-${item.id}`;
		item.show(taskEl, inputEl, r =>
		{
			if (r) this.cor++;
			Trainer.saveRes(this.theme.id, item.id, r);
			this.next();
		});
		this.cur++;
	}

	private async showEnd()
	{
		pageEl.innerText = "";
		idEl.innerText = "";
		const text = `Результат: ${this.cor}/${this.items.length} (${Math.floor(this.cor / this.items.length * 100)}%)`;
		Lib.SetContent(taskEl, Lib.initEl("h2", [], text));
		Lib.SetContent(inputEl, Lib.Div("tester-input-two", [
			Lib.Button([], "Вернуться", () => switchPage("main")),
			Lib.Button([], "Ещё раз", async btn =>
			{
				btn.classList.add("active");
				if (!isAnimDisabled())
					await Lib.wait(200);
				new Tester(this.theme).start();
			}),
		]));
		if (this.cor == this.items.length)
		{
			for (let i = 0; i < 3; i++)
			{
				if (!isAnimDisabled())
					await Lib.wait(200);
				confetti(window.innerWidth / 2, window.innerHeight / 2, 20);
			}
		}
		else
		{
			confetti(window.innerWidth / 2, window.innerHeight / 2, 15);
		}
		metrika_event("tester_done");
	}
}

export abstract class TestItem
{
	constructor(public id: number) { }

	public abstract show(taskEl: HTMLDivElement, inputEl: HTMLDivElement, onAnswer: (r: boolean) => void): void;

	public abstract getQuestion(): Node | string;
	public abstract getAnswer(): Node | string;
}
