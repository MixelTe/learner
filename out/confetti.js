import { Div, randomInt } from "./littleLib.js";
export function confetti(x, y, count) {
    const minSize = 5;
    const maxSize = 12;
    const speedX = 10;
    const minSpeedY = -12;
    const maxSpeedY = -22;
    const G = -1;
    const items = [];
    for (let i = 0; i < count; i++) {
        const item = Div("confetti");
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.backgroundColor = `hsl(${randomInt(360)}, 100%, ${randomInt(40, 60)}%)`;
        item.style.width = `${randomInt(minSize, maxSize)}px`;
        item.style.height = `${randomInt(minSize, maxSize)}px`;
        document.body.appendChild(item);
        items.push({ x, y, dx: randomInt(-speedX, speedX), dy: randomInt(minSpeedY, maxSpeedY), el: item });
    }
    let pt = -1;
    function loop(t) {
        if (pt == -1)
            pt = t;
        if (t - pt > 500)
            items.forEach(v => v.el.classList.add("confetti-end"));
        if (t - pt > 750) {
            items.forEach(v => document.body.removeChild(v.el));
            return;
        }
        for (const item of items) {
            item.x += item.dx;
            item.y += item.dy;
            item.dy -= G;
            item.el.style.left = `${item.x}px`;
            item.el.style.top = `${item.y}px`;
        }
        requestAnimationFrame(loop);
    }
    loop(-1);
}
