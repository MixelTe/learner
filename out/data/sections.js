import { themes } from "../themes.js";
import { phy_0 } from "./phy_0.js";
export const Sections = [
    {
        name: "Русский",
        themes: [
        // { id: "ru_0", name: "Тема 1", color: themes.blue, items: [] },
        // { id: "ru_1", name: "Тема 2", color: themes.blue, items: [] },
        ],
    },
    {
        name: "Математика",
        themes: [
        // { id: "math_0", name: "Тема 1", color: themes.green, items: [] },
        // { id: "math_1", name: "Тема 2", color: themes.green, items: [] },
        ],
    },
    {
        name: "Физика",
        themes: [
            { id: "phy_0", name: "Формулы", color: themes.orange, items: phy_0 },
        ],
    },
];
checkIds();
function checkIds() {
    for (const section of Sections) {
        for (const theme of section.themes) {
            let r = true;
            let id = 0;
            for (const item of theme.items) {
                const c = theme.items.filter(v => v.id == item.id).length == 1;
                if (!c) {
                    r = false;
                    id = item.id;
                }
            }
            if (!r)
                console.error(`Same ids in ${theme.id}: ${id}`);
        }
    }
}
