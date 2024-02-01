import { DBc } from "../docBuilder.js";
import { createFormulas } from "../formulasBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const math_0: TestItem[] = [
	new TestItemSelfCheck(0, DBc("Площадь квадрата"), createFormulas("S = a^2")),
	new TestItemSelfCheck(1, DBc("Площадь прямоугольника"), createFormulas("S = a*b")),
	new TestItemSelfCheck(2, DBc("Площадь треугольника"), createFormulas("S = {a*h}/{2}")),
	new TestItemSelfCheck(3, DBc("Площадь треугольника через радиус вписанной окружности"), createFormulas("|S = p*r", "p - полупериметр", "r - радиус вписанной окружности")),
	new TestItemSelfCheck(4, DBc("Площадь треугольника через радиус описанной окружности"), createFormulas("|S = {abc}/{4R}", "R - радиус описанной окружности")),
	new TestItemSelfCheck(5, DBc("Площадь треугольника по формуле Герона"), createFormulas("|S = \\{ p*(p - a)*(p - b)*(p - c)}", "p = {a+b+c}/{2}")),
	new TestItemSelfCheck(6, DBc("Площадь параллелограмма"), createFormulas("S = a*h")),
	new TestItemSelfCheck(7, DBc("Площадь параллелограмма по углу"), createFormulas("S = a*b*@{sin}'a")),
	new TestItemSelfCheck(8, DBc("Площадь ромба"), createFormulas("|S = {d_1*d_2}/{2}", "d - диагональ")),
	new TestItemSelfCheck(9, DBc("Площадь трапеции"), createFormulas("S = {a+b}/{2}*h")),
	new TestItemSelfCheck(10, DBc("Площадь произвольного четырехугольника"), createFormulas("|S = {d_1*d_2*@{sin}'a}/{2}", "d - диагональ", "'a - угол между диагоналями")),
	new TestItemSelfCheck(11, DBc("Длина окружности"), createFormulas("C = 2'Pr")),
	new TestItemSelfCheck(12, DBc("Длина дуги"), createFormulas("L = {'Pr}/{180}*'a")),
	new TestItemSelfCheck(13, DBc("Площадь круга"), createFormulas("S = 'Pr^2")),
	new TestItemSelfCheck(14, DBc("Площадь сектора круга"), createFormulas("S = {'Pr^2}/{360}*'a")),
	new TestItemSelfCheck(15, DBc("Объём куба"), createFormulas("V = a^3")),
	new TestItemSelfCheck(16, DBc("Объём параллелепипеда"), createFormulas("V = abc")),
	new TestItemSelfCheck(17, DBc("Площадь поверхности куба"), createFormulas("S = 6a^2")),
	new TestItemSelfCheck(18, DBc("Объём пирамиды"), createFormulas("V = {1}/{3}S_{осн}h")),
	new TestItemSelfCheck(19, DBc("Площадь боковой поверхности правильной пирамиды"), createFormulas("S_{бок} = {P_{осн}h_{бок}}/{2}")),
	new TestItemSelfCheck(20, DBc("Объём призмы"), createFormulas("V = S_{осн}h")),
	new TestItemSelfCheck(21, DBc("Объём цилиндра"), createFormulas("V = 'Pr^2*h")),
	new TestItemSelfCheck(22, DBc("Объём боковой поверхности цилиндра"), createFormulas("S_{бок} = 2'Pr*h")),
	new TestItemSelfCheck(23, DBc("Объём конуса"), createFormulas("V = {1}/{3}'Pr^2*h")),
	new TestItemSelfCheck(24, DBc("Объём боковой поверхности конуса"), createFormulas("|S_{бок} = 'Pr*l", "l - образующая")),
	new TestItemSelfCheck(25, DBc("Объём шара"), createFormulas("V = {4}/{3}'Pr^3")),
	new TestItemSelfCheck(26, DBc("Площадь поверхности сферы"), createFormulas("S = 4'Pr^2")),
];
