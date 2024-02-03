import { Div, Span, Table, TR, TD } from "./littleLib.js";
export class FormulaBuilder {
    body = Div("formula");
    text = "";
    prevEl = null;
    centerCell = false;
    a(fb) {
        this.prevEl = fb.body;
        this.body.appendChild(fb.body);
        this.text += fb.text;
        return this;
    }
    t(text, replace = true) {
        if (replace && replaceLetters.hasOwnProperty(text)) {
            this.l(replaceLetters[text]);
            return this;
        }
        if (text != " " && this.prevEl?.classList.contains("formula-text")) {
            const el = this.prevEl;
            el.innerText += text;
        }
        else {
            this.prevEl = Span("formula-text", text);
            this.body.appendChild(this.prevEl);
        }
        this.text += text;
        return this;
    }
    f(top, bottom) {
        const f = Table("formula-fraction", [
            TR([], [TD([], [top.body])]),
            TR([], [TD([], [bottom.body])]),
        ]);
        this.prevEl = f;
        this.body.appendChild(f);
        this.text += `(${top.text})/(${bottom.text})`;
        return this;
    }
    l(letter) {
        if (letter.d && letter.vb) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.style.transform = `translateY(${letter.dy}em)`;
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", letter.d);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "currentColor");
            path.setAttribute("stroke-width", "0.4");
            path.setAttribute("stroke-linecap", "round");
            svg.setAttribute("viewBox", letter.vb);
            const w = parseFloat(letter.vb.split(" ")[2]);
            const h = parseFloat(letter.vb.split(" ")[3]);
            svg.style.width = `${0.9 * w / h}em`;
            svg.appendChild(path);
            const letterEl = Div("formula-letter", [svg]);
            if (letter.chw > 0)
                letterEl.style.width = `${letter.chw}em`;
            if (letter.cha < 0)
                letterEl.style.justifyContent = "right";
            if (letter.cha > 0)
                letterEl.style.justifyContent = "left";
            this.prevEl = letterEl;
            this.body.appendChild(letterEl);
            this.text += letter.ch;
        }
        else {
            this.t(letter.ch);
        }
        return this;
    }
    up(fb) {
        if (this.prevEl?.classList.contains("formula-lower")) {
            this.prevEl.classList.remove("formula-lower");
            this.prevEl.classList.add("formula-upper-lower");
            this.prevEl.prepend(fb.body);
        }
        else {
            this.prevEl = Span("formula-upper", [fb.body]);
            this.body.appendChild(this.prevEl);
        }
        fb.smaller();
        if (fb.text.length == 1)
            this.text += "^" + fb.text;
        else
            this.text += "^(" + fb.text + ")";
        return this;
    }
    lw(fb) {
        if (this.prevEl?.classList.contains("formula-upper")) {
            this.prevEl.classList.remove("formula-upper");
            this.prevEl.classList.add("formula-upper-lower");
            this.prevEl.appendChild(fb.body);
        }
        else {
            this.prevEl = Span("formula-lower", [fb.body]);
            this.body.appendChild(this.prevEl);
        }
        fb.smaller();
        if (fb.text.length == 1)
            this.text += "_" + fb.text;
        else
            this.text += "_(" + fb.text + ")";
        return this;
    }
    sq(fb) {
        this.prevEl = Span("formula-sqrt", [fb.body]);
        this.body.appendChild(this.prevEl);
        this.text += "sqrt(" + fb.text + ")";
        return this;
    }
    vec(fb) {
        this.prevEl = Span("formula-vec", [fb.body]);
        this.body.appendChild(this.prevEl);
        if (fb.text.length == 1)
            this.text += "→" + fb.text;
        else
            this.text += "→(" + fb.text + ")";
        return this;
    }
    hat(fb) {
        this.prevEl = Span("formula-hat", [fb.body]);
        this.body.appendChild(this.prevEl);
        if (fb.text.length == 1)
            this.text += "‾" + fb.text;
        else
            this.text += "‾(" + fb.text + ")";
        return this;
    }
    sum(fb) {
        const bottom = Span("formula-sum-bottom", [fb.body]);
        this.prevEl = Span("formula-sum", [Span([], "Σ"), bottom]);
        this.body.appendChild(this.prevEl);
        this.text += "Σ(" + fb.text + ")";
        return this;
    }
    noItalic(fb) {
        fb.body.classList.add("formula-noItalic");
        this.prevEl = fb.body;
        this.body.appendChild(this.prevEl);
        this.text += fb.text;
        return this;
    }
    arc(fb) {
        this.prevEl = Span("formula-arc", [fb.body]);
        this.body.appendChild(this.prevEl);
        if (fb.text.length == 1)
            this.text += "◡" + fb.text;
        else
            this.text += "◡(" + fb.text + ")";
        return this;
    }
    br() {
        this.prevEl = document.createElement("br");
        this.body.appendChild(this.prevEl);
    }
    table(...rows) {
        const f = Table("formula-table");
        this.prevEl = f;
        this.body.appendChild(f);
        for (const el of rows) {
            f.appendChild(TR([], [TD(el.centerCell ? "formula-table-center" : [], [el.body])]));
            this.text += el.text + "\n";
        }
        return this;
    }
    centerInCell() {
        this.centerCell = true;
        return this;
    }
    union(fb) {
        this.prevEl = Span("formula-union", [fb.body]);
        this.body.appendChild(this.prevEl);
        this.text += "[" + fb.text + "]";
        return this;
    }
    system(fb) {
        this.prevEl = Span("formula-system", [fb.body]);
        this.body.appendChild(this.prevEl);
        this.text += "{" + fb.text + "}";
        return this;
    }
    bigger() {
        this.body.classList.add("formula-bigger");
        return this;
    }
    smaller() {
        this.body.classList.add("formula-smaller");
        return this;
    }
    wrap() {
        this.body.classList.add("formula-wrap");
        return this;
    }
    italic() {
        this.body.classList.add("formula-italic");
        return this;
    }
    html() {
        this.body.title = this.text;
        return this.body;
    }
}
export function FB(text) {
    if (text)
        return new FormulaBuilder().t(text);
    return new FormulaBuilder();
}
/**
 * ### Special characters:
 * symbol | desc
 * -------|--------
 * \|    | if first char - center cell
 * \\    | if first char - wrap line
 * {...} | block
 * _     | subscript
 * ^     | superscript
 * &     | vector
 * \#    | overline
 * \\    | square root
 * \@    | no italic
 * '     | control next
 * u{}   | arc
 *
 * ### Greek chars:
 * v r m n a d P l w b t s e E f O T
 * ### Special chars:
 * ch| s
 * --|--
 * Z | ℤ
 * 0 | °
 * / | ⟂
 * \| | ∥
 * < | ∠
 * u | ∪
 * i | ∩
 * \+ | ±
 * \- | ∓
 * ~ | ≈
 * = | ≠
 * ge | ≥
 * le | ≤
 * in | ∈
 * ar | ⇒
 * ab | ⇔
 */
export function createFormulas(...rows) {
    if (rows.length == 1)
        return rows[0][0] == "\\" ? createFormula(rows[0].slice(1), true).wrap() : createFormula(rows[0], true);
    return new FormulaBuilder().table(...rows.map(v => v[0] == "|" ? createFormula(v.slice(1), true).centerInCell() :
        v[0] == "\\" ? createFormula(v.slice(1), true).wrap() :
            createFormula(v, true)));
}
const formulaLetters = {
    "v": { ch: "ν", cha: 1, chw: 0.5, dy: -0.1, vb: "-2.4 -5.2 4.4 5", d: "M -1.6 -3.7 C -0.9 -5.1 -0.7 -4.6 -0.6 -0.4 C 0.5 -4.6 1.1 -4.8 1.5 -3.5" },
    "r": { ch: "ρ", cha: 1, chw: 0.6, dy: 0, vb: "0 -5 4.5 5", d: "M 0.3 -1.4 C 0.4 -0.4 1.3 -0.1 1.6 -1.3 L 2.2 -4 A 1 1 0 1 1 2.3 -3.3" },
    "m": { ch: "μ", cha: 0, chw: 0.55, dy: 0.22, vb: "0 -4.5 5 5", d: "M 0.51 -0.96 C 0.27 -0.09 0.81 0.38 1.38 -1.22 L 2.32 -3.77 C 2.38 -3.92 2.43 -3.91 2.42 -3.83 L 2.22 -1.86 Q 2.16 -1.08 2.65 -1.78 L 3.92 -3.85 C 4.03 -4.04 4.04 -3.9 4.03 -3.86 L 3.52 -1.83 Q 3.31 -1.05 4.14 -1.8" },
    "n": { ch: "𝜈", cha: 1, chw: 0.35, dy: -0.05, vb: "0 -5.5 3.2 5.7", d: "M 0.4 -2.06 C 1.01 -1.94 1.48 -0.66 1.05 -0.12 C 3.97 -2.56 2.22 -4.84 1.04 -5.19" },
    "a": { ch: "α", cha: 0, chw: 0.7, dy: 0, vb: "-0.2 -4.5 4.4 5.1", d: "M3.5-3.7C3.5-2.3 2.3-1.3 1.3-.3.7.3-.2-.5.4-1.1 1.1-1.6 1.2-.7 1.8-.4 2.6.1 3.6 0 3.9-.4" },
    "d": { ch: "Δ", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "P": { ch: "π", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "l": { ch: "λ", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "w": { ch: "ω", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "b": { ch: "β", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "t": { ch: "τ", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "s": { ch: "ϭ", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "e": { ch: "ϵ", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "E": { ch: "ε", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "f": { ch: "φ", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "O": { ch: "Ω", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "T": { ch: "η", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "Z": { ch: "ℤ", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "0": { ch: "°", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "/": { ch: "⟂", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "|": { ch: "∥", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "<": { ch: "∠", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "u": { ch: "∪", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "i": { ch: "∩", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "+": { ch: "±", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "-": { ch: "∓", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "~": { ch: "≈", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "=": { ch: "≠", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "ge": { ch: "≥", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "le": { ch: "≤", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "in": { ch: "∈", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "ar": { ch: "⇒", cha: 0, chw: 0, dy: 0, vb: null, d: null },
    "ab": { ch: "⇔", cha: 0, chw: 0, dy: 0, vb: null, d: null },
};
const replaceLetters = {
    "I": { ch: "I", cha: 0, chw: 0.25, dy: -0.1, vb: "-0.2 -4.7 3 5", d: "M 0.1 -0.1 l 1.7 0 M 0.8 -4 l 1.7 0 M 0.8 -0.1 L 1.8 -4" },
    "l": { ch: "l", cha: 0, chw: 0.25, dy: -0.05, vb: "-0.5 -4.7 3 5", d: "M 1.8 -4 L 0.8 -0.3 C 0.67 0.16 1.21 -0.03 1.91 -0.8" },
};
/**
 * ### Special characters:
 * symbol | desc
 * -------|--------
 * {...} | block
 * _     | subscript
 * ^     | superscript
 * &     | vector
 * \#    | overline
 * \\    | square root
 * \@    | no italic
 * '     | control next
 * u{}   | arc
 *
 * ### Greek chars:
 * v r m n a d P l w b t s e E f O T
 * ### Special chars:
 * ch| s
 * --|--
 * Z | ℤ
 * 0 | °
 * / | ⟂
 * \| | ∥
 * < | ∠
 * u | ∪
 * i | ∩
 * \+ | ±
 * \- | ∓
 * ~ | ≈
 * = | ≠
 * ge | ≥
 * le | ≤
 * in | ∈
 * ar | ⇒
 * ab | ⇔
 */
export function createFormula(formula, italic = false) {
    const fb = new FormulaBuilder();
    let bracketsOpen = 0;
    let bracketsStart = 0;
    let fractionTop = null;
    for (let i = 0; i < formula.length; i++) {
        const ch = formula[i];
        if (ch == "{") {
            if (bracketsOpen == 0)
                bracketsStart = i;
            bracketsOpen += 1;
        }
        else if (ch == "}") {
            bracketsOpen -= 1;
            if (bracketsOpen == 0) {
                const inBrackets = formula.slice(bracketsStart + 1, i);
                if (i + 1 < formula.length && formula[i + 1] == "/") {
                    fractionTop = createFormula(inBrackets);
                    i++;
                }
                else if (fractionTop) {
                    const fractionBottom = createFormula(inBrackets);
                    fb.f(fractionTop, fractionBottom);
                    fractionTop = null;
                }
                else {
                    if (bracketsStart - 1 >= 0) {
                        if (formula[bracketsStart - 1] == "_")
                            fb.lw(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "^")
                            fb.up(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "\\")
                            fb.sq(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "&")
                            fb.vec(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "#")
                            fb.hat(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "@")
                            fb.noItalic(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "u")
                            fb.arc(createFormula(inBrackets));
                        else
                            fb.a(createFormula(inBrackets));
                    }
                    else {
                        fb.a(createFormula(inBrackets));
                    }
                }
            }
        }
        if (bracketsOpen > 0 && ch == "'")
            i++;
        if (bracketsOpen > 0 || ch == "{" || ch == "}" || ch == "\\")
            continue;
        if (ch == "_") {
            if (formula[i + 1] != "{")
                fb.lw(FB(formula[++i]));
        }
        else if (ch == "^") {
            if (formula[i + 1] != "{")
                fb.up(FB(formula[++i]));
        }
        else if (ch == "&") {
            if (formula[i + 1] != "{")
                fb.vec(FB(formula[++i]));
        }
        else if (ch == "#") {
            if (formula[i + 1] != "{")
                fb.hat(FB(formula[++i]));
        }
        else if (ch == "@") {
            if (formula[i + 1] != "{")
                fb.noItalic(FB().t(formula[++i], false));
        }
        else if (ch == "u" && formula[i + 1] == "{") {
            // use u as marker
        }
        else if (ch == "'") {
            const next2 = formula[i + 1] + formula[i + 2];
            if (formulaLetters.hasOwnProperty(next2)) {
                fb.noItalic(FB().l(formulaLetters[next2]));
                i += 2;
            }
            else if (formulaLetters.hasOwnProperty(formula[i + 1]))
                if (["|", "/", "<", "i", "u"].includes(formula[i + 1]))
                    fb.noItalic(FB().l(formulaLetters[formula[++i]]));
                else
                    fb.l(formulaLetters[formula[++i]]);
            else {
                i += 1;
                fb.t(formula[i]);
            }
        }
        else if (ch == "\n") {
            fb.br();
        }
        else if (ch == "*") {
            // fb.t("×")
            fb.t("·");
        }
        else if (ch == "-") {
            fb.t("−");
        }
        else if (ch == "!" && formula[i + 1] == "=") {
            fb.t("≠");
            i++;
        }
        else if (ch == ">" && formula[i + 1] == "=") {
            fb.t("≥");
            i++;
        }
        else if (ch == "<" && formula[i + 1] == "=") {
            fb.t("≤");
            i++;
        }
        else {
            fb.t(ch);
        }
    }
    if (italic)
        fb.italic();
    return fb;
}
