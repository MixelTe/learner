import { DBc } from "../docBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const data: TestItem[] = [
	new TestItemSelfCheck(0, DBc("Это вопрос карточки"), DBc("Это ответ карточки")),
];
