import { themes } from "../themes.js";
import { phy_0 } from "./phy_0.js";
import { ru_10 } from "./ru_10.js";
import { ru_11 } from "./ru_11.js";
import { ru_12 } from "./ru_12.js";
import { ru_3 } from "./ru_3.js";
import { ru_4 } from "./ru_4.js";
import { ru_5 } from "./ru_5.js";
import { ru_6 } from "./ru_6.js";
import { ru_7 } from "./ru_7.js";
import { ru_8 } from "./ru_8.js";
import { ru_9_1 } from "./ru_9_1.js";
import { ru_9_2 } from "./ru_9_2.js";
export const Sections = [
    {
        name: "Русский",
        themes: [
            { id: "ru_3", name: "№3 Стили речи", color: themes.blue, items: ru_3 },
            { id: "ru_4", name: "№4 Ударения", color: themes.blue, items: ru_4, onlyAnswerInQList: true },
            { id: "ru_5", name: "№5 Паронимы", color: themes.blue, items: ru_5, onlyAnswerInQList: true },
            { id: "ru_6", name: "№6 Лексические нормы", color: themes.blue, items: ru_6 },
            { id: "ru_7", name: "№7 Формы слова", color: themes.blue, items: ru_7, onlyAnswerInQList: true },
            { id: "ru_8", name: "№8 Грамматические нормы", color: themes.blue, items: ru_8 },
            { id: "ru_9_1", name: "№9 Чередующиеся корни", color: themes.blue, items: ru_9_1 },
            { id: "ru_9_2", name: "№9 Словарные слова", color: themes.blue, items: ru_9_2, onlyAnswerInQList: true },
            { id: "ru_10", name: "№10 Правописание приставок", color: themes.blue, items: ru_10 },
            { id: "ru_11", name: "№11 Правописание суффиксов", color: themes.blue, items: ru_11 },
            { id: "ru_12", name: "№12 Пра­во­пи­са­ние глаголов", color: themes.blue, items: ru_12 },
            // { id: "ru_13", name: "№13 Правописание НЕ и НИ", color: themes.blue, items: ru_13 },
            // { id: "ru_14", name: "№14 Слитное, дефисное, раздельное написание слов", color: themes.blue, items: ru_14 },
            // { id: "ru_15", name: "№15 Н и НН в суффиксах", color: themes.blue, items: ru_15 },
            // { id: "ru_16", name: "№16-21 Пунктуация", color: themes.blue, items: ru_16 },
            // { id: "ru_26", name: "№26 Cредства выразительности", color: themes.blue, items: ru_21 },
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
