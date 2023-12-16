import { Div, Span } from "./littleLib.js";


export class DocBuilder
{
	private body = Div("doc");

	public center()
	{
		this.body.classList.add("doc-center");
		return this;
	}

	public text(text: string)
	{
		if (text != "")
			this.body.appendChild(Span([], [], text));
		return this;
	}

	public html()
	{
		return this.body.outerHTML;
	}
}


export function DB(text = "", center = false)
{
	return new DocBuilder().text(text);
}

export function DBc(text = "")
{
	return DB(text, true).center();
}
