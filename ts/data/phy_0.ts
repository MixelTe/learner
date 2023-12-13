import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const phy_0: TestItem[] = [
	new TestItemSelfCheck(0, "Скорость света в вакууме", "3 * 10^8 м/с"),
];


for (let i = 1; i < 50; i++)
	phy_0.push(new TestItemSelfCheck(i, `Вопрос ${i}`, `Ответ ${i}`));
