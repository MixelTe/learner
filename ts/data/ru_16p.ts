import { DBc } from "../docBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemMultipleWordChoice } from "../testerItems.js";

const title = "Расставьте все знаки препинания: укажите цифру(-ы), на месте которой(-ых) в предложении должна(-ы) стоять запятая(-ые)."

export const datap: TestItem[] = [
	new TestItemMultipleWordChoice(0, "Издали [(1)|,] он увидел дом[+ (2)|,] непохожий на другие[+ (3)|,] построенный [(4)|,] каким-то итальянским архитектором.", title),
];
