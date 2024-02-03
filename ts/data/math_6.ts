import { DBc } from "../docBuilder.js";
import { FB, createFormulas } from "../formulasBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const math_6: TestItem[] = [
	new TestItemSelfCheck(0, DBc("Координаты вектора на плоскости"), DBc().svg("math_6-0.svg").formula(createFormulas("&{AB} '{x_B - x_A; y_B - y_A'}"))),
	new TestItemSelfCheck(1, DBc("Длина вектора"), createFormulas("@|&a@| = \\{x_a^2 + y_a^2 + z_a^2}")),
	new TestItemSelfCheck(2, DBc("Сложение векторов на плоскости"), DBc().title("Правило параллелограмма").svg("math_6-2_0.svg").title("Правило треугольника").svg("math_6-2_1.svg")),
	new TestItemSelfCheck(3, createFormulas("&a + &b - ?", "&a - &b - ?", "k*&a - ?"), createFormulas("(&a + &b)'{x_a + x_b; y_a + y_b; z_a + z_b'}", "(&a - &b)'{x_a - x_b; y_a - y_b; z_a - z_b'}", "(k*&a)'{k*x_a; k*y_a; k*z_a'}")),
	new TestItemSelfCheck(4, DBc("Скалярное произведение векторов"), createFormulas("&a * &b = @|&a@| * @|&b@| * @{cos}'f", "&a * &b = x_ax_b + y_ay_b + z_az_b", "", "'f - угол между векторами", "&a * &b = 0 'ab &a '/ &b")),
	new TestItemSelfCheck(5, DBc("Коллинеарность векторов"), DBc("Коллинеарными называются векторы, лежащие на одной прямой или на параллельных прямых")
	.br().text("Векторы ").formula(createFormulas("&a @и &b")).text(", коллинеарны, если существует такое число ").formula(createFormulas("'l")).text(" не равное нулю, что ").formula(createFormulas("&b = 'l&a"))
	),
	new TestItemSelfCheck(11, DBc("Середина отрезка"), createFormulas("|M({x_A + x_B}/{2}; {y_A + y_B}/{2}; {z_A + z_B}/{2})", "AB - отрезок; M - середина AB")),
	new TestItemSelfCheck(12, DBc("Точка, делящая отрезок в отношении"), createFormulas("|M({x_A + 'lx_B}/{1 + 'l}; {y_A + 'ly_B}/{1 + 'l}; {z_A + 'lz_B}/{1 + 'l})", "\\AB - отрезок; M - Точка, делящая AB в отношении 'l")),
	new TestItemSelfCheck(6, DBc("Угол между прямыми"), DBc().svg("math_6-6.svg").formula(createFormulas("@{cos'f = {|&a * &b|}/{|&a| * |&b|}}", "", "\\&a, &b - направляющие вектора прямых l и m"))),
	new TestItemSelfCheck(7, DBc("Угол между прямой и плоскостью"), DBc().svg("math_6-7.svg").formula(createFormulas("@{sin'f = {|&a * &n|}/{|&a| * |&n|}}", "", "\\&n - нормаль к плоскости", "\\&a - направляющий вектор прямой l"))),
	new TestItemSelfCheck(8, DBc("Угол между плоскостями"), createFormulas("|@{cos'f = {|&n_1 * &n_2|}/{|&n_1| * |&n_2|}}", "", "\\&n_1, &n_2 - нормали к плоскостям")),
	new TestItemSelfCheck(9, DBc("Уравнение плоскости"), createFormulas("|Ax + By + Cz + D = 0", "", "\\&n'{A; B; C'} - нормаль к плоскости")),
	new TestItemSelfCheck(10, DBc("Расстояние от точки до плоскости"), createFormulas("'r(M, 'a) = {@|Ax_M + By_M + Cz_M + D@|}/{\\{A^2 + B^2 + C^2}}")),
];
