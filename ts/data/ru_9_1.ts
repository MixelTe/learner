import { DB, DBc } from "../docBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

const v1 = () => DBc().text("Перед суффиксом а: и", "В остальных случаях: е").hr();
const v2 = (a: string) => DBc().text("Зависит от ударения").hr().text(`Без ударения: ${a}`);
const v3 = (a: string) => DBc().text("Зависит от последней согласной корня").hr().text(a);
const v4 = () => DBc().text("Зависит от значения").hr();

export const ru_9_1: TestItem[] = [
	new TestItemSelfCheck(0, DBc("бер/бир"), v1().text("бир(а) - собирать", "бер - соберет")),
	new TestItemSelfCheck(1, DBc("дер/дир"), v1().text("дир(а) - обдирать", "дер - обдерет")),
	new TestItemSelfCheck(2, DBc("мер/мир"), v1().text("мир(а) - замирать", "мер - замереть").br().text("Только в значении 'мёртвый, неподвижный'", "В значении 'мирный' - всегда -мир-")),
	new TestItemSelfCheck(3, DBc("тер/тир"), v1().text("тир(а) - обтирать", "тер - обтереть")),
	new TestItemSelfCheck(4, DBc("пер/пир"), v1().text("пир(а) - запирать", "пер - запереть")),
	new TestItemSelfCheck(5, DBc("жег/жиг"), v1().text("жиг(а) - выжигать", "жег - выжег")),
	new TestItemSelfCheck(6, DBc("стел/стил"), v1().text("стил(а) - расстилать", "стел - расстелить")),
	new TestItemSelfCheck(7, DBc("блест/блист"), v1().text("блист(а) - блистать", "блест - блестеть")),
	new TestItemSelfCheck(8, DBc("чет/чит"), v1().text("чит(а) - вычитать", "чет - вычет").br().text("Исключения: сочЕтать, сочЕтание")),
	new TestItemSelfCheck(9, DBc("кос/кас"), v1().text("кас(а) - касание", "кос - коснуться")),
	new TestItemSelfCheck(10, DBc("а(я)/им(ин)"), v1().text("им(ин) - снимать, сжимать", "а(я) - снять, сжать")),
	new TestItemSelfCheck(11, DBc("гар/гор"), v2("гор - загорел, горелый").br().text("Исключения: выгАрки, изгАрь, пригАр")),
	new TestItemSelfCheck(12, DBc("зар/зор"), v2("зар - заря, озарение").br().text("Исключения: зОревать, зОрянка")),
	new TestItemSelfCheck(13, DBc("клан/клон"), v2("клон - наклонять, склонение")),
	new TestItemSelfCheck(14, DBc("твар/твор"), v2("твор - творить, творение").br().text("Исключения: утвАрь")),
	new TestItemSelfCheck(15, DBc("плав/плов"), v2("плав - поплавок, плавунец").br().text("Исключения: плОвец, плОвчиха, плОвцы, плЫвун")),
	new TestItemSelfCheck(16, DBc("лаг/лож"), v3("лаг/лож").br().text("Исключения: полОг")),
	new TestItemSelfCheck(17, DBc("скак/скоч"), v3("скак/скоч").br().text("Исключения: скАчок")),
	new TestItemSelfCheck(18, DBc("раст/ращ/рос"), v3("раст/ращ/рос").br().text("Исключения: Ростов, Ростислав, рОсток, рОстовщик, вырОст, подрОстоковый, отрАсль, отрАслевой")),
	new TestItemSelfCheck(19, DBc("мок/моч/мак"), v4().text("пропускать жидкость: мок(моч) - вымокнуть", "погружать в жидкость: мак - макать")),
	new TestItemSelfCheck(20, DBc("равн/ровн"), v4().text("одинаковый, равный: равн", "гладкий, ровный: ровн").br().text("Исключения: рОвесник, урОвень, порОвну, рАвнина, рАвняйсь, рАвнение")),
];
