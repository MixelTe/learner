import { DBc } from "../docBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const ru_10: TestItem[] = [
	new TestItemSelfCheck(0, DBc("Неизменяемые"), DBc("о, у, до, по, про, пра, на, за, над, под, от, об, в, вы, пред, пере, с, дез, контр, транс, пост, суб, супер, пан")),
	new TestItemSelfCheck(1, DBc("Приставки на –З, -С"), DBc("Перед звонкой согласной З", "Перед глухим С")),
	new TestItemSelfCheck(2, DBc("ПРЕ/ПРИ"), DBc()
		.title("ПРЕ").ul("= очень (преумножить, преинтересный", "= пере (прервать)", "Торжественность (препоручить, престарелый, преклоняться(уважать), преподнести, препроводить")
		.title("ПРИ").ul("Близость, приближение, присоединение (приморский, привязать, пригнать)", "Неполнота действия (приоткрыть)", "Доведение действия до конца (приучить)")
	),
	new TestItemSelfCheck(3, DBc("прЕбывать/прИбывать"), DBc("прЕбывать = находиться", "прИбывать = приезжать")),
	new TestItemSelfCheck(4, DBc("прЕемник/прИёмник"), DBc("прЕемник = наследник", "прИёмник = радиоаппарат")),
	new TestItemSelfCheck(5, DBc("прЕзирать/прИзирать"), DBc("прЕзирать = ненавидеть", "прИзирать = заботиться")),
	new TestItemSelfCheck(6, DBc("прЕступить/прИступить"), DBc("прЕступить = нарушить", "прИступить = начать")),
	new TestItemSelfCheck(7, DBc("прЕтворить/прИтворить"), DBc("прЕтворить = осуществить", "прИтворить = закрыть")),
	new TestItemSelfCheck(8, DBc("прЕдать/прИдать"), DBc("прЕдать = изменить (предать друга)", "прИдать = добавить (придать форму)")),
	new TestItemSelfCheck(9, DBc("прЕдание/прИдание"), DBc("прЕдание = легенда (предание старины)", "прИдание = изменение (придание формы)")),
	new TestItemSelfCheck(10, DBc("прИдел/прЕдел"), DBc("прИдел = пристройка", "прЕдел = конец")),
	new TestItemSelfCheck(11, DBc("прИходящий/прЕходящее"), DBc("прИходящий = тот, кто приходит", "прЕходящее = временное (преходящая слава)")),
	new TestItemSelfCheck(12, DBc("прИклоняться/прЕклоняться"), DBc("прИклоняться = наклоняться (п. под веткой)", "прЕклоняться = уважать (п. перед героем)")),
	new TestItemSelfCheck(13, DBc("прИтерпеться/прЕтерпеть"), DBc("прИтерпеться = привыкнуть (п. к боли)", "прЕтерпеть = пережить (п. трудности)")),
	new TestItemSelfCheck(14, DBc("И/Ы после приставок"), DBc()
		.title("Ы").ul("После русских приставок на согласную", "небезЫнтересный, подЫтожить, изЫмать, подЫмать", "Исключение: взИмать")
		.title("И").ul("После приставок СВЕРХ, МЕЖ - межИнститутский", "После приставок на гласную: проИграть", "После иноязычных приставок ДЕЗ, СУПЕР, ТРАНС: дезИнформация", "После корня в сложных словах: медИнститут")
	),
	new TestItemSelfCheck(15, DBc("Ь и Ъ разделительные"), DBc()
		.title("Ь").ul("Перед Е,Ё,Ю,Я,И в середине слова: вьются, льют", "В некоторых  заимствованных  словах  перед О: батальон, бульон, павильон", "Запомнить: подьячий, интерьер, арьергард, нюанс")
		.title("Ъ").ul("Перед Е,Ё,Ю,Я после приставок на согласную: ПОДЪЕЗД, ОБЪЯСНЕНИЕ, ПОДЪЕМ", "Запомнить: Адъютант, фельдъегерь, конъюктура, инъекция, субъект", "В сложных словах после корней ДВУХ, ТРЁХ, ЧЕТЫРЕХ перед Е,Ё,Ю,Я: двухЪярусный", "После других корней и перед другими гласными Ъ не пишется: двухактная пьеса, иняз")
	),
];