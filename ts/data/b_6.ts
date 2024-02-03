import { TestItem } from "../tester.js";
import { TestItemMultipleWordChoice } from "../testerItems.js";

export const data: TestItem[] = [
	new TestItemMultipleWordChoice(0, "Здравствуй [+1|o/]! Сколько [2] метров до луны? [+3|:)]", "Где нужно вставить смайлик?"),
];
