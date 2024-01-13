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

	public ul(...lis: (string | DocBuilder)[])
	{
		this.body.appendChild(initEl("ul", [],
			lis.map(li => initEl("li", [], li instanceof DocBuilder ? li.html() : li)))
		);
		return this;
	}

	public br()
	{
		this.body.append(initEl("br"))
		return this;
	}

	public formula(formula: FormulaBuilder)
	{
		this.body.appendChild(formula.html());
		return this;
	}

	public svg(url: string, flags = DBF.none)
	{
		const { w100, wm100, center } = unpackFlags(flags);
		const img = Div("doc-img");
		const svgContainer = Div(["doc-svg-container", "doc-svg-loading", w100 && "doc-svg-w100", wm100 && "doc-svg-wm100", center && "doc-svg-center"]);
		this.images.push({ el: img, image: svgContainer });
		img.appendChild(svgContainer);
		this.body.appendChild(img);
		fetch("imgs/" + url)
			.then(v => v.text())
			.then(v =>
			{
				svgContainer.innerHTML = v;
				svgContainer.classList.remove("doc-svg-loading");
			});
		return this;
	}

	public html(imagesInPopup = false)
	{
		this.updateImagesInPopup(imagesInPopup);
		return this.body;
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

export function DBc(text = "")
{
	return DB(text, true).center();
}
