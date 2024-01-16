import { Button, Div, SetContent, Span, initEl } from "./littleLib.js";
import { Popup } from "./popup.js";
export var DBF;
(function (DBF) {
    DBF[DBF["none"] = 0] = "none";
    DBF[DBF["w100"] = 1] = "w100";
    DBF[DBF["wm100"] = 2] = "wm100";
    DBF[DBF["center"] = 4] = "center";
})(DBF || (DBF = {}));
export class DocBuilder {
    body = Div("doc");
    images = [];
    center() {
        this.body.classList.add("doc-center");
        return this;
    }
    title(text) {
        this.body.appendChild(initEl("h3", [], text));
        return this;
    }
    text(...text) {
        if (text.length != 0) {
            if (text.length == 1)
                this.body.appendChild(Span([], text[0]));
            else
                text.forEach(t => this.body.appendChild(Div([], t)));
        }
        return this;
    }
    textColored(color, ...text) {
        if (text.length != 0) {
            if (text.length == 1) {
                const el = Span([], text[0]);
                el.style.color = color;
                this.body.appendChild(el);
            }
            else
                text.forEach(t => {
                    const el = Div([], t);
                    el.style.color = color;
                    this.body.appendChild(el);
                });
        }
        return this;
    }
    textErr(...text) {
        return this.textColored("tomato", ...text);
    }
    textCor(...text) {
        return this.textColored("#02a102", ...text);
    }
    ul(...lis) {
        this.body.appendChild(initEl("ul", [], lis.map(li => initEl("li", [], li instanceof DocBuilder ? li.html() : li))));
        return this;
    }
    br() {
        this.body.append(initEl("div", "br"));
        return this;
    }
    hr() {
        this.body.append(initEl("hr"));
        return this;
    }
    formula(formula) {
        this.body.appendChild(formula.html());
        return this;
    }
    svg(url, flags = DBF.none) {
        const { w100, wm100, center } = unpackFlags(flags);
        const img = Div("doc-img");
        const svgContainer = Div(["doc-svg-container", "doc-svg-loading", w100 && "doc-svg-w100", wm100 && "doc-svg-wm100", center && "doc-svg-center"]);
        this.images.push({ el: img, image: svgContainer });
        img.appendChild(svgContainer);
        this.body.appendChild(img);
        fetch("imgs/" + url)
            .then(v => v.text())
            .then(v => {
            svgContainer.innerHTML = v;
            svgContainer.classList.remove("doc-svg-loading");
        });
        return this;
    }
    html(imagesInPopup = false) {
        this.updateImagesInPopup(imagesInPopup);
        return this.body;
    }
    updateImagesInPopup(imagesInPopup) {
        for (const image of this.images) {
            if (imagesInPopup)
                SetContent(image.el, Button("doc-img-btn", "Картинка", () => {
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
function unpackFlags(flags) {
    const w100 = (flags & DBF.w100) == DBF.w100;
    const wm100 = (flags & DBF.wm100) == DBF.wm100;
    const center = (flags & DBF.center) == DBF.center;
    return { w100, wm100, center };
}
export function DB(text = "", center = false) {
    return new DocBuilder().text(text);
}
export function DBc(text = "") {
    return DB(text, true).center();
}
