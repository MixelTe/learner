import { DBc } from "../docBuilder.js";
import { FB, createFormulas } from "../formulasBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const math_5: TestItem[] = [
	new TestItemSelfCheck(0, DBc("sin, cos, tg, ctg в прямоугольном треугольнике"),
		DBc().svg("math_5-0.svg").formula(createFormulas("@{sin}'<A = {a}/{c}", "@{cos}'<A = {b}/{c}", "@{tg}'<A = {a}/{b}", "@{ctg}'<A = {b}/{a}"))
	),
	new TestItemSelfCheck(1, DBc("sin, cos, tg, ctg на единичной окружности"), DBc().svg("math_5-1.svg")),
	new TestItemSelfCheck(2, DBc("Решение уравнения").br().formula(createFormulas("@{sinx = a, |a| 'le 1}")), DBc()
		.formula(FB().union(createFormulas("x = @{arcsin}a + 2'Pk, k 'in 'Z", "x = 'P - @{arcsin}a + 2'Pk, k 'in 'Z")))
		.br().br().title("Частные случаи")
		.formula(createFormulas("@{sin}x = 0 'ar x = 'Pk, k 'in 'Z", "@{sin}x = 1 'ar x = {'P}/{2} + 2'Pk, k 'in 'Z", "@{sin}x = -1 'ar x = -{'P}/{2} + 2'Pk, k 'in 'Z"))
	),
	new TestItemSelfCheck(3, DBc("Решение уравнения").br().formula(createFormulas("@{cosx = a, |a| 'le 1}")), DBc()
		.formula(createFormulas("x = '+ @{arccos}a + 2'Pk, k 'in 'Z"))
		.br().br().title("Частные случаи")
		.formula(createFormulas("@{cos}x = 0 'ar x = {'P}/{2} + 'Pk, k 'in 'Z", "@{cos}x = 1 'ar x = 2'Pk, k 'in 'Z", "@{cos}x = -1 'ar x = 'P + 2'Pk, k 'in 'Z"))
	),
	new TestItemSelfCheck(4, DBc("Решение уравнения").br().formula(createFormulas("@{tg}x = a")), createFormulas("x = @{arctg}a + 'Pk, k 'in 'Z")),
	new TestItemSelfCheck(5, DBc("Решение уравнения").br().formula(createFormulas("@{ctg}x = a")), createFormulas("x = @{arcctg}a + 'Pk, k 'in 'Z")),
	new TestItemSelfCheck(6, DBc("Основное тригонометрическое тождество"), createFormulas("@{sin}^2x + @{cos}^2x = 1")),
	new TestItemSelfCheck(7, createFormulas("@{tg}x = ?","@{ctg}x = ?"), createFormulas("@{tg}x = {@{sin}x}/{@{cos}x}", "@{ctg}x = {@{cos}x}/{@{sin}x}")),
	new TestItemSelfCheck(8, createFormulas("@{sin('a + 'b) = ?}"), createFormulas("@{sin('a + 'b) = sin'acos'b + cos'asin'b}")),
	new TestItemSelfCheck(9, createFormulas("@{sin('a - 'b) = ?}"), createFormulas("@{sin('a - 'b) = sin'acos'b - cos'asin'b}")),
	new TestItemSelfCheck(10, createFormulas("@{cos('a + 'b) = ?}"), createFormulas("@{cos('a + 'b) = cos'acos'b - sin'asin'b}")),
	new TestItemSelfCheck(11, createFormulas("@{cos('a - 'b) = ?}"), createFormulas("@{cos('a - 'b) = cos'acos'b + sin'asin'b}")),
	new TestItemSelfCheck(12, createFormulas("@{tg('a '+ 'b) = ?}"), createFormulas("@{tg('a '+ 'b) = {tg'a '+ tg'b}/{1 '- tg'atg'b}}")),
	new TestItemSelfCheck(13, createFormulas("@{sin'a + sin'b = ?}"), createFormulas("@{sin'a + sin'b = 2sin{'a+'b}/{2}cos{'a-'b}/{2}}")),
	new TestItemSelfCheck(14, createFormulas("@{sin'a - sin'b = ?}"), createFormulas("@{sin'a + sin'b = 2sin{'a-'b}/{2}cos{'a+'b}/{2}}")),
	new TestItemSelfCheck(15, createFormulas("@{cos'a + cos'b = ?}"), createFormulas("@{cos'a + cos'b = 2cos{'a+'b}/{2}cos{'a-'b}/{2}}")),
	new TestItemSelfCheck(16, createFormulas("@{cos'a - cos'b = ?}"), createFormulas("@{cos'a - cos'b = -2sin{'a-'b}/{2}2sin{'a+'b}/{2}}")),
];
