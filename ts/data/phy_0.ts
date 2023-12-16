import { createFormula } from "../formulasBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const phy_0: TestItem[] = [
	new TestItemSelfCheck(0, "Скорость света в вакууме", createFormula("3 * 10^8 м/с")),
	// new TestItemSelfCheck(0, createFormula(""), createFormula("")),
];
