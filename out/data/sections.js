import { themes } from "../themes.js";
export const Sections = [
    {
        name: "Виды блоков",
        themes: [
            { id: "b_0", count: 2, name: "Самопроверка", color: themes.common, items: getItemLoader("b_0") },
            { id: "b_1", count: 1, name: "Выбор варианта", color: themes.common, items: getItemLoader("b_1") },
            { id: "b_2", count: 2, name: "Выбор буквы", color: themes.common, items: getItemLoader("b_2"), onlyAnswerInQList: true },
            { id: "b_3", count: 1, name: "Группы слов", color: themes.common, items: getItemLoader("b_3"), onlyAnswerInQList: true },
            { id: "b_4", count: 1, name: "Выбор слова", color: themes.common, items: getItemLoader("b_4"), onlyAnswerInQList: true },
            { id: "b_5", count: 2, name: "Исключение слова", color: themes.common, items: getItemLoader("b_5") },
            { id: "b_6", count: 1, name: "Выбор нескольких слова", color: themes.common, items: getItemLoader("b_6") },
        ],
    },
    {
        name: "Темы",
        themes: [
            { id: "t_0", count: 1, name: "Обычная", color: themes.common, items: getItemLoader("t_0") },
            { id: "t_1", count: 1, name: "Голубая", color: themes.blue, items: getItemLoader("t_0") },
            { id: "t_2", count: 1, name: "Зелёная", color: themes.green, items: getItemLoader("t_0") },
            { id: "t_3", count: 1, name: "Оранжевая", color: themes.orange, items: getItemLoader("t_0") },
        ],
    },
    {
        name: "Пустой раздел",
        themes: [],
    },
];
function getItemLoader(name) {
    let dataCache = { items: [], success: false };
    return async function () {
        if (dataCache.success)
            return dataCache;
        try {
            const { data } = await import("./" + name + ".js");
            dataCache.items = data;
            dataCache.success = true;
        }
        catch { }
        return dataCache;
    };
}
// checkItems()
async function checkItems() {
    console.warn("checkItems enabled");
    for (const section of Sections) {
        for (const theme of section.themes) {
            let r = true;
            let id = 0;
            const { items } = await theme.items();
            for (const item of items) {
                const c = items.filter(v => v.id == item.id).length == 1;
                if (!c) {
                    r = false;
                    id = item.id;
                }
            }
            if (!r)
                console.error(`Same ids in ${theme.id}: ${id}`);
            if (items.length != theme.count)
                console.error(`Wrong count in ${theme.id}, correct: ${items.length}`);
        }
    }
}
