import { DBc } from "../docBuilder.js";
import { FB, createFormulas } from "../formulasBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const math_7: TestItem[] = [
	new TestItemSelfCheck(0, createFormulas("x^2 + y^2 = c^2"), DBc().svg("math_7-0.svg").formula(createFormulas("x^2 + y^2 = R^2")).text("", "Окружность с центром в начале координат и радиусом |R|")),
	new TestItemSelfCheck(1, createFormulas("(x - a)^2 + (y - b)^2 = c^2"), DBc().svg("math_7-1.svg").formula(createFormulas("(x - a)^2 + (y - b)^2 = R^2")).text("", "Окружность с центром в в точке (a;b) и радиусом |R|")),
	new TestItemSelfCheck(2, createFormulas("(x - a)^2 + (y - b)^2 'le c^2"), DBc().svg("math_7-2.svg").formula(createFormulas("(x - a)^2 + (y - b)^2 'le R^2")).text("", "Круг с центром в в точке (a;b) и радиусом |R|")),
	new TestItemSelfCheck(3, createFormulas("y = \\{c^2 - x^2}"), DBc().svg("math_7-3.svg").formula(createFormulas("y = \\{R^2 - x^2}")).text("", "Верхняя полуокружность с центром в начале координат и радиусом |R|")),
	new TestItemSelfCheck(4, createFormulas("y = -\\{c^2 - x^2}"), DBc().svg("math_7-4.svg").formula(createFormulas("y = -\\{R^2 - x^2}")).text("", "Нижняя полуокружность с центром в начале координат и радиусом |R|")),
	new TestItemSelfCheck(5, createFormulas("y = \\{c^2 - (x - a)^2} + b"), DBc().svg("math_7-5.svg").formula(createFormulas("y = \\{R^2 - (x - a)^2} + b")).text("", "Верхняя полуокружность с центром в в точке (a;b) и радиусом |R|")),
	new TestItemSelfCheck(6, createFormulas("a@|x@| + b@|x@| = c"), DBc().svg("math_7-6.svg").formula(createFormulas("a@|x@| + b@|x@| = c")).text("", "Ромб, симметричный относительно начала координат")),
];
