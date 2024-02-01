import { DBc } from "../docBuilder.js";
import { createFormulas } from "../formulasBuilder.js";
import { TestItemSelfCheck } from "../testerItems.js";
export const math_3 = [
    new TestItemSelfCheck(0, createFormulas("a^2 - b^2 = ?"), createFormulas("a^2 - b^2 = (a - b)(a + b)")),
    new TestItemSelfCheck(1, createFormulas("(a + b)^2 = ?"), createFormulas("(a + b)^2 = a^2 + b^2 + 2ab")),
    new TestItemSelfCheck(2, createFormulas("(a - b)^2 = ?"), createFormulas("(a - b)^2 = a^2 + b^2 - 2ab")),
    new TestItemSelfCheck(3, createFormulas("a^3 + b^3 = ?"), createFormulas("a^3 + b^3 = (a + b)(a^2 + b^2 - ab)")),
    new TestItemSelfCheck(4, createFormulas("a^3 - b^3 = ?"), createFormulas("a^3 - b^3 = (a - b)(a^2 + b^2 + ab)")),
    new TestItemSelfCheck(5, DBc("Признак делимости на 2"), DBc("Последняя цифра числа четная")),
    new TestItemSelfCheck(6, DBc("Признак делимости на 3"), DBc("Сумма цифр числа делится на 3")),
    new TestItemSelfCheck(7, DBc("Признак делимости на 4"), DBc("Число, составленное из двух последних цифр числа, делится на 4")),
    new TestItemSelfCheck(8, DBc("Признак делимости на 5"), DBc("Число оканчивается на 0 или на 5")),
    new TestItemSelfCheck(9, DBc("Признак делимости на 8"), DBc("Число, составленное из трех последних цифр числа, делится на 8")),
    new TestItemSelfCheck(10, DBc("Признак делимости на 9"), DBc("Сумма цифр числа делится на 9")),
    new TestItemSelfCheck(11, DBc("Признак делимости на 10"), DBc("Последняя цифра числа равна 0")),
    new TestItemSelfCheck(12, DBc("Признак делимости на 11"), DBc("Суммы цифр на четных и нечетных позициях числа равны или их разность кратна 11")),
    new TestItemSelfCheck(13, DBc("Натуральные числа"), DBc().title("Натуральные числа").text("1,2,3...", "Ноль не является натуральным числом", "Множество натуральных чисел обозначается ℕ")),
    new TestItemSelfCheck(14, DBc("Целые числа"), DBc().title("Целые числа").text("0, ±1, ±2, ±3...", "Множество целых чисел обозначается ℤ")),
    new TestItemSelfCheck(15, DBc("Рациональные числа"), DBc().title("Рациональные числа").text("Числа, которые можно записать в виде дроби ").formula(createFormulas("{p}/{q}")).text(", где p - целое, а q - натуральное").br().formula(createFormulas("Например, 3; {1}/{2}; {7}/{15}; 0,12")).text("", "Множество рациональных чисел обозначается ℚ")),
    new TestItemSelfCheck(16, DBc("Иррациональные числа"), DBc().title("Иррациональные числа").text("Числа, которые нельзя записать в виде дроби ").formula(createFormulas("{p}/{q}")).br().formula(createFormulas("Например, 'P и e, \\{2}, @{@log}_35")).text("", "Множества рациональных и иррациональных чисел вместе образуют множество действительных чисел ℝ")),
    new TestItemSelfCheck(17, DBc("Линейная функция"), DBc().svg("math_3-17.svg").title("Прямая").formula(createFormulas("y = kx + b", "k = @{tg}'a", "\\k - угловой коэффициент прямой"))),
    new TestItemSelfCheck(18, DBc("Квадратичная функция"), DBc().svg("math_3-18.svg").title("Парабола").formula(createFormulas("y = ax^2 + bx + c", "x_0 = -{b}/{2a}", "Если a > 0, ветви вверх", "Если a < 0, ветви вниз"))),
    new TestItemSelfCheck(19, DBc("Квадратное уравнение"), DBc().formula(createFormulas("y = ax^2 + bx + c", "ax^2 + bx + c = a(x - x_1)(x - x_2)")).hr().formula(createFormulas("D = b^2 - 4ac", "Если D > 0, x = {-b '+ \\{D}}/{2a}", "Если D = 0, x = {-b}/{2a}", "Если D < 0, нет действительных корней"))),
    new TestItemSelfCheck(20, DBc("Теорема Виета"), DBc().formula(createFormulas("ax^2 + bx + c = 0", "x_1 и x_2 - корни", "x_1 + x_2 = -{b}/{a}, x_1*x_2 = {c}/{a}"))),
    new TestItemSelfCheck(21, DBc("Метод интервалов"), DBc()
        .text("Применяется для решения неравенств вида ")
        .formula(createFormulas("{(x - a)(x - b)}/{(x - c)(x - d)} 'ge 0")).text(" (c любым знаком: >, <, ≤, ≥)").br()
        .title("Метод интервалов")
        .ol("Найдём нули числителя и знаменателя: a, b, c, d", "Отметим их на оси x", "Определяем знак функции на каждом из промежутков между точками. Для определения знака берем любую точку, принадлежащую интервалу", "Записываем в ответ подходящие по знаку интервалы")
        .title("Пример")
        .formula(createFormulas("{(x - 5)(x + 2)}/{(x - 2)^2} 'le 0"))
        .ul("Нули числителя: x=5, x=-2", "Нули знаменателя: x=2")
        .svg("math_3-21.svg")
        .formula(createFormulas("@{Ответ: x 'in [-2; 2)'u(2; 5]}"))),
    new TestItemSelfCheck(22, DBc("Арифметическая прогрессия"), DBc().formula(createFormulas("a_n = a_1 + (n - 1)d", "S_n = {a_1 + a_n}/{2} * n", "a_n = {a_{n-1} + a_{n+1}}/{2}"))),
    new TestItemSelfCheck(23, DBc("Геометрическая прогрессия"), DBc().formula(createFormulas("b_n = b_1q^{n-1}", "S_n = b_1{q^n - 1}/{q - 1}", "b_n^2 = b_{n-1}*b_{n+1}"))),
    new TestItemSelfCheck(24, DBc("Правила действий со степенями"), createFormulas("a^m*a^n = a^{m+n}", "{a^m}/{a^n} = a^{m-n}", "(a^m)^n = (a^n)^m = a^{mn}", "a^nb^n = (ab)^n", "{a^n}/{b^n} = ({a}/{b})^n")),
    new TestItemSelfCheck(25, DBc("Основное логарифмическое тождество"), createFormulas("|a^{@{@log}_ab} = b", "", "b > 0, a > 0, a '= 1", "@{@log}_ab = c 'ab a^c = b")),
    new TestItemSelfCheck(26, DBc()
        .text("Основные формулы для логарифмов", "")
        .formula(createFormulas("@{@log}_ab + @{@log}_ac = ?", "@{@log}_ab - @{@log}_ac = ?", "@{@log}_{a^n}b^m = ?"))
        .text("", "Формула перехода к новому основанию")
        .formula(createFormulas("@{@log}_ab = ?")), DBc()
        .text("Основные формулы для логарифмов", "")
        .formula(createFormulas("@{@log}_ab + @{@log}_ac = @{@log}_a(bc)", "@{@log}_ab - @{@log}_ac = @{@log}_a{b}/{c}", "@{@log}_{a^n}b^m = {m}/{n}@{@log}_ab"))
        .text("", "Формула перехода к новому основанию")
        .formula(createFormulas("@{@log}_ab = {@{@log}_cb}/{@{@log}_ca}"))),
    new TestItemSelfCheck(27, DBc("Десятичный и натуральный логарифм"), createFormulas("@{@log}_{10}b = @l@gb", "@{@log}_{e}b = @l@nb", " e '~ 2,71828...")),
    new TestItemSelfCheck(28, DBc("Метод рационализации"), DBc()
        .text("На всей ОДЗ знак выражения F(x) совпадает со знаком выражния G(x)")
        .hr()
        .formula(createFormulas("F(x) = @{@log}_af(x) - @{@log}_ag(x)", "G(x) = (a - 1)(f(x) - g(x))"))
        .hr()
        .formula(createFormulas("F(x) = h(x)^{f(x)} - h(x)^{g(x)}", "G(x) = (h(x) - 1)(f(x) - g(x))"))),
];
