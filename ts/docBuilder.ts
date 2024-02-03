import { FormulaBuilder } from "./formulasBuilder.js";
import { Button, Div, H1, SetContent, Span, initEl } from "./littleLib.js";
import { Popup } from "./popup.js";

export enum DBF
{
	none = 0,
	w100 = 1 << 0,
	wm100 = 1 << 1,
	center = 1 << 2,
}

export class DocBuilder
{
	private body = Div("doc");
	private images: DCImage[] = [];
	private loadImages: (() => void)[] = [];

	public center()
	{
		this.body.classList.add("doc-center");
		return this;
	}

	public title(text: string)
	{
		this.body.appendChild(initEl("h3", [], text));
		return this;
	}

	public text(...text: string[])
	{
		if (text.length != 0)
		{
			if (text.length == 1)
				this.body.appendChild(Span([], text[0]));
			else
				text.forEach(t => this.body.appendChild(Div([], t)));
		}
		return this;
	}

	public textColored(color: string, ...text: string[])
	{
		if (text.length != 0)
		{
			if (text.length == 1)
			{
				const el = Span([], text[0]);
				el.style.color = color;
				this.body.appendChild(el);
			}
			else
				text.forEach(t =>
				{
					const el = Div([], t);
					el.style.color = color;
					this.body.appendChild(el);
				});
		}
		return this;
	}

	public textErr(...text: string[])
	{
		return this.textColored("tomato", ...text);
	}

	public textCor(...text: string[])
	{
		return this.textColored("#02a102", ...text);
	}

	public ul(...lis: (string | DocBuilder)[])
	{
		this.body.appendChild(initEl("ul", [],
			lis.map(li => initEl("li", [], li instanceof DocBuilder ? li.html() : li)))
		);
		return this;
	}

	public ol(...lis: (string | DocBuilder)[])
	{
		this.body.appendChild(initEl("ol", [],
			lis.map(li => initEl("li", [], li instanceof DocBuilder ? li.html() : li)))
		);
		return this;
	}

	public br()
	{
		this.body.append(initEl("div", "br"))
		return this;
	}

	public hr()
	{
		this.body.append(initEl("hr"))
		return this;
	}

	public formula(formula: FormulaBuilder)
	{
		this.body.appendChild(formula.html());
		return this;
	}

	public svg(url: string, flags = DBF.center)
	{
		const { w100, wm100, center } = unpackFlags(flags);
		const img = Div("doc-img");
		const svgContainer = Div(["doc-svg-container", "loading", w100 && "doc-svg-w100", wm100 && "doc-svg-wm100", center && "doc-svg-center"], "Загрузка изображения");
		this.images.push({ el: img, image: svgContainer });
		img.appendChild(svgContainer);
		this.body.appendChild(img);
		this.loadImages.push(() =>
			fetch("imgs/" + url)
				.then(v => v.text())
				.then(v =>
				{
					svgContainer.innerHTML = v;
					svgContainer.classList.remove("loading");
				}));
		return this;
	}

	public html(imagesInPopup = false)
	{
		this.updateImagesInPopup(imagesInPopup);
		this.loadImages.forEach(load => load());
		this.loadImages = [];
		return this.body;
	}

	public copy()
	{
		const db = new DocBuilder();
		db.body = this.body.cloneNode(true) as HTMLDivElement;
		if (this.images.length > 0)
			throw new Error(`cant copy DocBuilder with images`);
		return db;
	}

	private updateImagesInPopup(imagesInPopup: boolean)
	{
		for (const image of this.images)
		{
			if (imagesInPopup)
				SetContent(image.el, Button("doc-img-btn", "Картинка", () =>
				{
					const popup = new Popup();
					popup.content = image.image;
					popup.cancelBtn = false;
					popup.okBtn = false;
					popup.open();
				}));
			else
				SetContent(image.el, image.image);
		}
	}
}

interface DCImage
{
	image: HTMLDivElement,
	el: HTMLDivElement,
}

function unpackFlags(flags: DBF)
{
	const w100 = (flags & DBF.w100) == DBF.w100;
	const wm100 = (flags & DBF.wm100) == DBF.wm100;
	const center = (flags & DBF.center) == DBF.center;
	return { w100, wm100, center };
}


export function DB(text = "", center = false)
{
	return new DocBuilder().text(text);
}

export function DBc(...text: string[])
{
	return DB("", true).center().text(...text);
}
