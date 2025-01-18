export const get = {
    div: getDiv,
    button: getButton,
    canvas: getCanvas,
    input: getInput,
    el: getEl,
};
export const canvas = {
    getContext2d: getCanvasContext,
    fitToParent: CanvasFitToParentClientWH,
    drawGrid: drawGridOnCanvas,
    drawCoords: drawMouseCoordsOnCanvas,
    saveAsPng: saveCanvasAsPng,
};
export const intersection = {
    rectPoint: rectPointIntersect,
    rects: rectIntersect,
    circlePoint: circlePointIntersect,
    circles: circlesIntersect,
};
export const random = {
    withSeed: randomWithSeed,
    int: randomInt,
    boolean: random_boolean,
    asbOrNot: random_asbOrNot,
    choose: chooseRandom,
    shuffle: shuffle,
    shuffledWithWeights: shuffledWithWeights,
    color: randomColor,
};
export const fetches = {
    get: fetchGet,
    post: fetchPost,
    delete: fetchDelete,
    jsonGet: fetchJsonGet,
    jsonPost: fetchJsonPost,
    jsonDelete: fetchJsonDelete,
};
export const other = {
    square: sq,
    loadScript,
    addButtonListener,
    capitalize,
    copyText,
    downloadFile,
    openTextFile,
    wait,
    hslColor,
    rgbColor,
    lerp,
    minmax,
    dateNow,
    numNoun,
};
//get
export function getButton(id) {
    return getEl(id, HTMLButtonElement);
}
export function getDiv(id) {
    return getEl(id, HTMLDivElement);
}
export function getCanvas(id) {
    return getEl(id, HTMLCanvasElement);
}
export function getInput(id) {
    return getEl(id, HTMLInputElement);
}
export function getEl(id, type) {
    const el = document.getElementById(id);
    if (el == null)
        throw new Error(`${id} not found`);
    if (el instanceof type)
        return el;
    throw new Error(`${id} element not ${type.name}`);
}
//canvas
export function getCanvasContext(canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx == null)
        throw new Error(`Context is null`);
    return ctx;
}
export function CanvasFitToParentBCR(canvas) {
    const parent = canvas.parentElement;
    if (parent == null)
        throw new Error("Canvas parent not found");
    const bcr = parent.getBoundingClientRect();
    const w = bcr.width;
    const h = bcr.height;
    canvas.width = w;
    canvas.style.width = `${w}px`;
    canvas.height = h;
    canvas.style.height = `${h}px`;
}
export function CanvasFitToParentClientWH(canvas) {
    const parent = canvas.parentElement;
    if (parent == null)
        throw new Error("Canvas parent not found");
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    canvas.width = w;
    canvas.style.width = `${w}px`;
    canvas.height = h;
    canvas.style.height = `${h}px`;
}
export function drawGridOnCanvas(ctx, cellSize, color = "black") {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = cellSize; x < canvasWidth; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
    }
    for (let y = cellSize; y < canvasWidth; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
    }
    ctx.stroke();
    ctx.restore();
}
export function drawMouseCoordsOnCanvas(ctx, x, y) {
    const space = 2;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(x - space, y);
    ctx.moveTo(x + space, y);
    ctx.lineTo(width, y);
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y - space);
    ctx.moveTo(x, y + space);
    ctx.lineTo(x, height);
    ctx.stroke();
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    const text = `x: ${x}, y: ${y}`;
    ctx.fillText(text, width - ctx.measureText(text).width - 2, height - 3);
    ctx.restore();
}
/**
 * @param fname *.png
 */
export function saveCanvasAsPng(canvas, fname) {
    const a = document.createElement("a");
    a.setAttribute("download", fname);
    canvas.toBlob(blob => {
        if (!blob)
            return;
        const url = URL.createObjectURL(blob);
        a.setAttribute("href", url);
        a.click();
        URL.revokeObjectURL(url);
    });
}
//intersection
export function circlePointIntersect(circle, point) {
    return sq(circle.r) >= sq(circle.x - point.x) + sq(circle.y - point.y);
}
export function rectPointIntersect(rect, point) {
    normalizeRect(rect);
    return (rect.x + rect.width >= point.x &&
        point.x >= rect.x &&
        rect.y + rect.height >= point.y &&
        point.y >= rect.y);
}
export function circlesIntersect(circle1, circle2) {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    return sq(dx) + sq(dy) < sq(circle1.r + circle2.r);
}
export function rectIntersect(rect1, rect2) {
    normalizeRect(rect1);
    normalizeRect(rect2);
    return (rect1.x + rect1.width >= rect2.x &&
        rect2.x + rect2.width >= rect1.x &&
        rect1.y + rect1.height >= rect2.y &&
        rect2.y + rect2.height >= rect1.y);
}
export function normalizeRect(rect) {
    if (rect.width < 0) {
        rect.x += rect.width;
        rect.width = Math.abs(rect.width);
    }
    if (rect.height < 0) {
        rect.y += rect.height;
        rect.height = Math.abs(rect.height);
    }
}
//random
export function random_asbOrNot(num, rnd = Math.random) {
    return rnd() < 0.5 ? num : -num;
}
export function random_boolean(rnd = Math.random) {
    return rnd() < 0.5;
}
export function randomInt(maxmin, max, rnd = Math.random) {
    if (max != undefined)
        return Math.floor(rnd() * (maxmin - max)) + max;
    return Math.floor(rnd() * maxmin);
}
export function chooseRandom(array, rnd = Math.random) {
    return array[randomInt(0, array.length, rnd)];
}
/**
 * Shuffles inplace
 */
export function shuffle(array, rnd = Math.random) {
    return array.sort(() => 0.5 - rnd());
}
/**
 * Keep array untouched
 * @returns new shuffled array
 */
export function shuffledWithWeights(array, weights, rnd = Math.random) {
    if (array.length != weights.length)
        console.error("LittleLib.shuffledWithWeights: array.length != weights.length");
    return array.map((v, i) => ({ v, w: rnd() * 0.5 + weights[i] * rnd() })).sort((a, b) => b.w - a.w).map(v => v.v);
}
export function randomColor(rnd = Math.random) {
    return hslColor(randomInt(0, 360, rnd), randomInt(80, 100, rnd), randomInt(40, 80, rnd));
}
export function randomWithSeed(seed) {
    return function () {
        var t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
//other
export function sq(num) {
    return num * num;
}
export const square = sq;
export function loadScript(scriptPath) {
    const el = document.createElement("script");
    el.src = scriptPath;
    document.head.appendChild(el);
}
export function addButtonListener(id, f) {
    const button = getButton(id);
    button.addEventListener("click", f);
}
export function capitalize(text) {
    return text.slice(0, 1).toUpperCase() + text.slice(1);
}
export const toCapitalCase = capitalize;
export function copyText(text) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
export function downloadFile(filename, text) {
    var el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    el.setAttribute('download', filename);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}
export function openTextFile(accept = "*") {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = accept;
        input.onchange = () => {
            if (!input.files) {
                reject();
                return;
            }
            const file = input.files[0];
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = readerEvent => {
                if (!readerEvent.target) {
                    reject();
                    return;
                }
                const content = readerEvent.target.result;
                resolve(content);
            };
            reader.onerror = reject;
        };
        input.click();
    });
}
export async function wait(t) {
    return new Promise(res => setTimeout(res, t));
}
/**
 *
 * @param h in range [0; 360]
 * @param s in range [0; 100]
 * @param l in range [0; 100]
 * @returns `hsl(${h}, ${s}%, ${l}%)`
 */
export function hslColor(h, s, l) {
    return `hsl(${h}, ${s}%, ${l}%)`;
}
/**
 *
 * @param r in range [0; 255]
 * @param g in range [0; 255]
 * @param b in range [0; 255]
 * @returns `hsl(${h}, ${s}%, ${l}%)`
 */
export function rgbColor(r, g, b) {
    return `hsl(${r}, ${g}%, ${b}%)`;
}
export function lerp(v1, v2, t) {
    return (v2 - v1) * t + v1;
}
export function minmax(v, min, max) {
    return Math.min(Math.max(v, min), max);
}
export function dateNow(split = ".") {
    const date = new Date();
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join(split);
}
export function numNoun(num, one, two, five) {
    num = Math.abs(num);
    num %= 100;
    if (num >= 5 && num <= 20)
        return five;
    num %= 10;
    if (num == 1)
        return one;
    if (num >= 2 && num <= 4)
        return two;
    return five;
}
export function SetContent(parent, children) {
    parent.innerHTML = "";
    AppendContent(parent, children);
}
export function AppendContent(parent, children) {
    if (children instanceof Array)
        children.forEach(ch => parent.append(ch));
    else
        parent.append(children);
}
export function Div(classes, children) {
    return initEl("div", classes, children);
}
export function Span(classes, children) {
    return initEl("span", classes, children);
}
export function H1(classes, children) {
    return initEl("h1", classes, children);
}
export function Table(classes, children) {
    return initEl("table", classes, children);
}
export function TR(classes, children) {
    return initEl("tr", classes, children);
}
export function TD(classes, children) {
    return initEl("td", classes, children);
}
export function Input(classes, type, placeholder) {
    const input = initEl("input", classes, undefined);
    if (type)
        input.type = type;
    if (placeholder)
        input.placeholder = placeholder;
    return input;
}
export function Button(classes, children, clickListener) {
    const button = initEl("button", classes, children);
    if (clickListener)
        button.addEventListener("click", clickListener.bind(button, button));
    return button;
}
export function initEl(tagName, classes, children) {
    const el = document.createElement(tagName);
    if (classes) {
        if (typeof classes == "string")
            el.classList.add(classes);
        else
            classes.forEach(cs => cs && el.classList.add(cs));
    }
    if (children) {
        if (children instanceof Array)
            children.forEach(ch => el.append(ch));
        else
            el.append(children);
    }
    return el;
}
export function createSvgEl(qualifiedName, parent) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
    if (parent)
        parent.appendChild(el);
    return el;
}
export class FetchError extends Error {
}
async function fetchWithJson(method, input, body) {
    const res = await fetch(input, {
        method,
        headers: body === undefined ? {} : {
            "Content-Type": "application/json"
        },
        body: body === undefined ? null : JSON.stringify(body),
    });
    if (!res.ok)
        throw new FetchError((await res.json()).msg);
    return res;
}
export function fetchGet(input) {
    return fetchWithJson("GET", input);
}
export function fetchPost(input, body) {
    return fetchWithJson("POST", input, body);
}
export function fetchDelete(input, body) {
    return fetchWithJson("DELETE", input, body);
}
async function fetchJson(method, input, body) {
    const res = await fetchWithJson(method, input, body);
    const data = await res.json();
    return data;
}
export function fetchJsonGet(input) {
    return fetchJson("GET", input);
}
export function fetchJsonPost(input, body) {
    return fetchJson("POST", input, body);
}
export function fetchJsonDelete(input, body) {
    return fetchJson("DELETE", input, body);
}
