import { DB, DBc } from "../docBuilder.js";
import { createFormulas } from "../formulasBuilder.js";
import { TestItemChoice } from "../testerItems.js";
export const data = [
    new TestItemChoice(0, DBc("Это вопрос карточки").hr().ul("Можно", DB().textCor("и список"), "вставить"), ["Вариант 1", "+Правильный вариант", "Ещё вариант"], true, DBc("Пояснение ").formula(createFormulas("'r_{\\{x}} '= 'd'l")).br()),
];
