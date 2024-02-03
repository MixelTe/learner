import { DBc } from "../docBuilder.js";
import { TestItemSelfCheck } from "../testerItems.js";
export const data = [
    new TestItemSelfCheck(0, DBc("Это вопрос карточки"), DBc("Это ответ карточки")),
];
