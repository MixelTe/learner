import { Div, Span, initEl } from "./littleLib.js";


export class FormulaBuilder
{
	private body = Div("formula");
	public text = "";
	private prevEl: HTMLElement | SVGSVGElement | null = null;
	public a(fb: FormulaBuilder)
	{
		this.prevEl = fb.body;
		this.body.appendChild(fb.body);
		this.text += fb.text;
		return this;
	}
	public t(text: string)
	{
		this.prevEl = Span([], [], text);
		this.body.appendChild(this.prevEl);
		this.text += text;
		return this;
	}
	public f(top: FormulaBuilder, bottom: FormulaBuilder)
	{
		const f = Table("formula-fraction", [
			TR([], [TD([], [top.body])]),
			TR([], [TD([], [bottom.body])]),
		])
		this.prevEl = f;
		this.body.appendChild(f);
		this.text += `(${top.text})/(${bottom.text})`;
		return this;
	}
	public l(letter: keyof typeof formulaLetters)
	{
		const letterEl = formulaLetters[letter];
		if (!letterEl)
		{
			this.t(letter);
			return this
		}
		if (letterEl.d && letterEl.vb)
		{
			const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.classList.add("formula-letter")
			svg.style.transform = `translateY(${letterEl.dy}em)`;
			const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
			path.setAttribute("d", letterEl.d);
			path.setAttribute("fill", "none");
			path.setAttribute("stroke", "black");
			path.setAttribute("stroke-width", "0.4");
			path.setAttribute("stroke-linecap", "round");
			svg.setAttribute("viewBox", letterEl.vb);
			const w = parseFloat(letterEl.vb.split(" ")[2]);
			const h = parseFloat(letterEl.vb.split(" ")[3]);
			svg.style.width = `${w / h}em`;
			svg.appendChild(path);
			this.prevEl = svg;
			this.body.appendChild(svg);
			this.text += letterEl.ch;
		}
		else
		{
			this.t(letterEl.ch);
		}
		return this;
	}
	public up(fb: FormulaBuilder)
	{
		if (this.prevEl?.classList.contains("formula-lower"))
		{
			this.prevEl.classList.remove("formula-lower");
			this.prevEl.classList.add("formula-upper-lower");
			this.prevEl.prepend(fb.body);
		}
		else
		{
			this.prevEl = Span("formula-upper", [fb.body]);
			this.body.appendChild(this.prevEl);
		}
		if (fb.text.length == 1) this.text += "^" + fb.text;
		else this.text += "^(" + fb.text + ")";
		return this;
	}
	public lw(fb: FormulaBuilder)
	{
		if (this.prevEl?.classList.contains("formula-upper"))
		{
			this.prevEl.classList.remove("formula-upper");
			this.prevEl.classList.add("formula-upper-lower");
			this.prevEl.appendChild(fb.body);
		}
		else
		{
			this.prevEl = Span("formula-lower", [fb.body]);
			this.body.appendChild(this.prevEl);
		}
		if (fb.text.length == 1) this.text += "_" + fb.text;
		else this.text += "_(" + fb.text + ")";
		return this;
	}
	public sq(fb: FormulaBuilder)
	{
		this.prevEl = Span("formula-sqrt", [fb.body]);
		this.body.appendChild(this.prevEl);
		this.text += "sqrt(" + fb.text + ")";
		return this;
	}
	public vec(fb: FormulaBuilder)
	{
		this.prevEl = Span("formula-vec", [fb.body]);
		this.body.appendChild(this.prevEl);
		if (fb.text.length == 1) this.text += "→" + fb.text;
		else this.text += "→(" + fb.text + ")";
		return this;
	}
	public hat(fb: FormulaBuilder)
	{
		this.prevEl = Span("formula-hat", [fb.body]);
		this.body.appendChild(this.prevEl);
		if (fb.text.length == 1) this.text += "‾" + fb.text;
		else this.text += "‾(" + fb.text + ")";
		return this;
	}
	public sum(fb: FormulaBuilder)
	{
		const bottom = Span("formula-sum-bottom", [fb.body]);
		this.prevEl = Span("formula-sum", [Span([], [], "Σ"), bottom]);
		this.body.appendChild(this.prevEl);
		this.text += "Σ(" + fb.text + ")";
		return this;
	}
	public br()
	{
		this.prevEl = document.createElement("br");
		this.body.appendChild(this.prevEl);
	}
	public table(rows: FormulaBuilder[])
	{
		const f = Table("formula-table")
		this.prevEl = f;
		this.body.appendChild(f);
		for (const el of rows)
		{
			f.appendChild(TR([], [TD([], [el.body])]));
			this.text += el.text + "\n";
		}
		return this;

	}
	public html()
	{
		return this.body.outerHTML;
	}
}
export function FB(text?: string)
{
	if (text) return new FormulaBuilder().t(text);
	return new FormulaBuilder();
}

const formulaLetters = {
	"V": { ch: "ν", dy: 0, vb: "-2 -5 4 5", d: "M -1.8 -3.5 C -1.261 -4.945 -1.066 -4.653 -0.437 -1.919 L 0 0 L 0.365 -1.806 C 0.897 -4.721 1.226 -4.945 1.781 -3.552" },
	"p": { ch: "ρ", dy: 0, vb: "0 -5 4.5 5", d: "M 0.283 -1.392 C 0.43 -0.444 1.294 -0.065 1.628 -1.26 L 2.245 -3.983 A 1 1 0 1 1 2.287 -3.278" },
	"m": { ch: "μ", dy: 0.1, vb: "0 -4.5 5 4.5", d: "M.256-.799C.272-.085.878.16 1.308-1.26L1.957-3.772C1.993-3.92 2.039-3.914 2.053-3.826L2.513-1.92Q2.69-1.114 2.982-1.789L3.925-3.855C4.024-4.039 4.029-3.891 4.032-3.856L4.202-1.805Q4.294-1.037 4.862-1.582" },
	"n": { ch: "η", dy: 0, vb: "0 -5.5 3.2 5.7", d: "M 0.3 -2 C 0.913 -1.911 1.45 -0.658 1.532 -0.08 C 2.134 -0.237 2.967 -1.425 2.819 -2.613 C 2.662 -3.932 1.969 -4.873 0.773 -5.162" },
	"a": { ch: "ⲁ", dy: 0, vb: "-0.2 -4.5 4.4 5.1", d: "M3.5-3.7C3.5-2.3 2.3-1.3 1.3-.3.7.3-.2-.5.4-1.1 1.1-1.6 1.2-.7 1.8-.4 2.6.1 3.6 0 3.9-.4" },
	"d": { ch: "Δ", dy: 0, vb: null, d: null },
	"P": { ch: "π", dy: 0, vb: null, d: null },
	"l": { ch: "λ", dy: 0, vb: null, d: null },
	"w": { ch: "ω", dy: 0, vb: null, d: null },
	"b": { ch: "β", dy: 0, vb: null, d: null },
	"t": { ch: "τ", dy: 0, vb: null, d: null },
	"s": { ch: "ϭ", dy: 0, vb: null, d: null },
	"e": { ch: "ϵ", dy: 0, vb: null, d: null },
	"E": { ch: "ε", dy: 0, vb: null, d: null },
	"f": { ch: "φ", dy: 0, vb: null, d: null },
	"O": { ch: "Ω", dy: 0, vb: null, d: null },
}

export function createFormula(formula: string)
{
	const fb = new FormulaBuilder();
	let bracketsOpen = 0;
	let bracketsStart = 0;
	let fractionTop: FormulaBuilder | null = null;
	for (let i = 0; i < formula.length; i++)
	{
		const ch = formula[i];
		if (ch == "{")
		{
			if (bracketsOpen == 0) bracketsStart = i;
			bracketsOpen += 1;
		}
		else if (ch == "}")
		{
			bracketsOpen -= 1;
			if (bracketsOpen == 0)
			{
				const inBrackets = formula.slice(bracketsStart + 1, i);
				if (i + 1 < formula.length && formula[i + 1] == "/")
				{
					fractionTop = createFormula(inBrackets);
					i++;
				}
				else if (fractionTop)
				{
					const fractionBottom = createFormula(inBrackets);
					fb.f(fractionTop, fractionBottom);
					fractionTop = null;
				}
				else
				{
					if (bracketsStart - 1 >= 0)
					{
						if (formula[bracketsStart - 1] == "_") fb.lw(createFormula(inBrackets));
						else if (formula[bracketsStart - 1] == "^") fb.up(createFormula(inBrackets));
						else if (formula[bracketsStart - 1] == "\\") fb.sq(createFormula(inBrackets));
						else if (formula[bracketsStart - 1] == "&") fb.vec(createFormula(inBrackets));
						else if (formula[bracketsStart - 1] == "#") fb.hat(createFormula(inBrackets));
						else fb.a(createFormula(inBrackets));
					}
					else
					{
						fb.a(createFormula(inBrackets));
					}
				}
			}
		}
		if (bracketsOpen > 0 || ch == "{" || ch == "}" || ch == "\\") continue;
		if (ch == "_")
		{
			if (formula[i + 1] != "{") fb.lw(FB(formula[++i]))
		}
		else if (ch == "^")
		{
			if (formula[i + 1] != "{") fb.up(FB(formula[++i]))
		}
		else if (ch == "&")
		{
			if (formula[i + 1] != "{") fb.vec(FB(formula[++i]))
		}
		else if (ch == "#")
		{
			if (formula[i + 1] != "{") fb.hat(FB(formula[++i]))
		}
		else if (ch == "'")
		{
			if (formulaLetters.hasOwnProperty(formula[i + 1]))
				fb.l(<any>formula[++i])
			else
				fb.t(ch)
		}
		else if (ch == "\n")
		{
			fb.br();
		}
		else if (ch == "*")
		{
			fb.t("×")
		}
		else if (ch == "!" && formula[i + 1] == "=")
		{
			fb.t("≠")
			i++
		}
		else if (ch == ">" && formula[i + 1] == "=")
		{
			fb.t("≥")
			i++
		}
		else if (ch == "<" && formula[i + 1] == "=")
		{
			fb.t("≤")
			i++
		}
		else
		{
			fb.t(ch)
		}
	}
	return fb;
}


function Table(classes: string | string[], children: HTMLElement[] = [])
{
	return initEl("table", classes, children, undefined)
}

function TR(classes: string | string[], children: HTMLElement[] = [])
{
	return initEl("table", classes, children, undefined)
}

function TD(classes: string | string[], children: HTMLElement[] = [])
{
	return initEl("table", classes, children, undefined)
}
