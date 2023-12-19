import { Div, Span, initEl } from "./littleLib.js";
export class DocBuilder {
    body = Div("doc");
    center() {
        this.body.classList.add("doc-center");
        return this;
    }
    text(...text) {
        if (text.length != 0) {
            if (text.length == 1)
                this.body.appendChild(Span([], [], text[0]));
            else
                text.forEach(t => this.body.appendChild(Div([], [], t)));
        }
        return this;
    }
    br() {
        this.body.append(initEl("br"));
        return this;
    }
    formula(formula) {
        this.body.appendChild(formula.html());
        return this;
    }
    svg(url, w100 = false, center = false) {
        const svgContainer = Div(["doc-svg", "doc-svg-loading", w100 && "doc-svg-w100", center && "doc-svg-center"]);
        this.body.appendChild(svgContainer);
        fetch("imgs/" + url)
            .then(v => v.text())
            .then(v => {
            svgContainer.innerHTML = v;
            svgContainer.classList.remove("doc-svg-loading");
        });
        return this;
    }
    html() {
        return this.body;
    }
}
export function DB(text = "", center = false) {
    return new DocBuilder().text(text);
}
export function DBc(text = "") {
    return DB(text, true).center();
}
