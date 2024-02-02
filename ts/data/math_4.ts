import { DBc } from "../docBuilder.js";
import { createFormulas } from "../formulasBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

function df(f: string)
{
	return DBc("Производная от:").br().formula(createFormulas(f))
}

export const math_4: TestItem[] = [
	new TestItemSelfCheck(0, DBc("Геометрический смысл производной"), DBc()
		.svg("math_4-0.svg")
		.text("Производная функции ").formula(createFormulas("f(x)")).text(" в точке ").formula(createFormulas("x_0")).text(" равна угловому коэффициенту касательной, проведенной к графику функции в точке")
		.br()
		.formula(createFormulas("f'(x_0) = @{tg}'a = k"))
	),
	new TestItemSelfCheck(1,
		DBc().text("Уравнение касательной к графику функции ").formula(createFormulas("y = f(x)")).text(" в точке ").formula(createFormulas("x_0")),
		createFormulas("y = f(x_0) + f'(x_0)(x - x_0)")
	),
	new TestItemSelfCheck(2, df("C (константа)"), createFormulas("C' = 0")),
	new TestItemSelfCheck(3, df("x"), createFormulas("x' = 1")),
	new TestItemSelfCheck(4, df("x^n"), createFormulas("(x^n)' = n*x^{n-1}")),
	new TestItemSelfCheck(5, df("@{sin} x"), createFormulas("(@{sin} x)' = @{cos} x")),
	new TestItemSelfCheck(6, df("@{cos} x"), createFormulas("(@{cos} x)' = -@{sin} x")),
	new TestItemSelfCheck(7, df("@{tg} x"), createFormulas("(@{tg} x)' = {1}/{@{cos}^2 x}")),
	new TestItemSelfCheck(8, df("@{ctg} x"), createFormulas("(@{ctg} x)' = - {1}/{@{sin}^2 x}")),
	new TestItemSelfCheck(9, df("e^x"), createFormulas("(e^x)' = e^x")),
	new TestItemSelfCheck(10, df("a^x"), createFormulas("(a^x)' = a^x * @l@na")),
	new TestItemSelfCheck(11, df("@l@nx"), createFormulas("(@l@nx)' = {1}/{x}")),
	new TestItemSelfCheck(12, df("@{@log}_ax"), createFormulas("(@{@log}_ax)' = {1}/{x * @l@na}")),
	new TestItemSelfCheck(13, df("u + v"), createFormulas("@{(u + v)' = u' + v'}")),
	new TestItemSelfCheck(14, df("u - v"), createFormulas("@{(u - v)' = u' - v'}")),
	new TestItemSelfCheck(15, df("u * v"), createFormulas("@{(u * v)' = u'@v + v''u}")),
	new TestItemSelfCheck(16, df("{u}/{v}"), createFormulas("@{({u}/{v})' = {u'@v - v''u}/{v^2}}")),
	new TestItemSelfCheck(17, df("u(v(x))"), createFormulas("@{(u(v(x)))' = u'(v(x)) * v'(x)}")),
];
