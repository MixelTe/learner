import { TestItem } from "../tester.js";
import { TestItemWordGroup } from "../testerItems.js";

export const data: TestItem[] = [
	new TestItemWordGroup(0, ["Слово 1", "Слово 2", "Слово 3"], ["пояснение", "", "пояснение к третьему"]),
];
