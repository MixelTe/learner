import { DBc } from "../docBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemChoice, TestItemSelfCheck } from "../testerItems.js";

const ans = {} as { [key in (typeof vars)[number]]: () => string[] };
const vars = ["nauch", "offdel", "public", "hudozh", "rasgov"] as const;
for (let i = 0; i < vars.length; i++)
{
	ans[vars[i]] = () =>
	{
		const a = ["Научный", "Официально-деловой", "Публицистический", "Художественный", "Разговорный"];
		a[i] = "+" + a[i];
		return a;
	};
}
const q = {
	task: {
		nauch: "Сообщить информацию, объяснить ее, представив систему аргументации. Характеризуется точностью, логичностью, объективностью",
		offdel: "Сообщить информацию, дать инструкцию. Характеризуется точностью, неличным характером, стандартизированностью построения текста",
		public: "Воздействие на массовое сознание. Характеризуется логичностью, образностью, эмоциональностью, оценочностью, призывностью",
		hudozh: "Воздействовать на чувства и воображение читателя. Характеризуется образностью, эмоциональностью.",
		rasgov: "Общение, обмена впечатлениями. Характеризуется неофициальностью, эмоциональностью, использованием мимики и жестов",
	},
	leks: {
		nauch: ["Насыщенность терминами", "Использование слов с абстрактным значением", "Употребление слов в прямых значениях"],
		offdel: ["Употребление полных наименований, точных дат", "Книжная лексика", "Употребление слов в прямых значениях", "Отсутствие экспрессивной и оценочной лексики", "Наличие стандартизированных оборотов"],
		public: ["Экспрессивная и оценочная лексика", "Использование образных средств", "Частая языковая игра, каламбуры, пародирование"],
		hudozh: ["Использование образных средств", "Книжная лексика"],
		rasgov: ["Экспрессивная и оценочная лексика", "Использование просторечной лексики, жаргона"],
	},
	morph: {
		nauch: ["Редкое использование личных местоимений", "неопределенно-личные и безличные конструкции", "Использование причастий и деепричастий и оборотов с ними."],
		offdel: ["Отсутствие личных местоимений", "используются специальные обозначения"],
		hudozh: "Использование личных местоимений",
		rasgov: ["Использование личных местоимений", "Употребление частиц, междометий"],
	},
	sint: {
		nauch: ["Употребление сложных предложений", "Неупотребление восклицательных предложений", "Частые цитаты, ссылки"],
		offdel: ["Использование обособленных оборотов, однородных членов", "Четкое членение текста на смысловые блоки"],
		public: ["Неиспользование причастных и деепричастных оборотов", "Употребление побудительных и восклицательных предложений", "Использование обращений"],
		hudozh: "Фигуры речи: анафора, антитеза, градация, инверсия, параллелизм, риторический вопрос",
		rasgov: ["Отсутствие сложных предложений", "Употребление побудительных и восклицательных предложений", "Использование обращений"],
	},
	tipu: {
		nauch: ["Рассуждение, описание", "учебник, статья, доклад"],
		offdel: "Приказ, служебное распоряжение, инструкция",
		public: "Речь, доклад, дискуссия, репортаж, интервью, статья",
	}
}

export const data: TestItem[] = [
	new TestItemChoice(0, DBc().title("Задача стиля").text(q.task.nauch), ans.nauch(), false),
	new TestItemChoice(1, DBc().title("Задача стиля").text(q.task.offdel), ans.offdel(), false),
	new TestItemChoice(2, DBc().title("Задача стиля").text(q.task.public), ans.public(), false),
	new TestItemChoice(3, DBc().title("Задача стиля").text(q.task.hudozh), ans.hudozh(), false),
	new TestItemChoice(4, DBc().title("Задача стиля").text(q.task.rasgov), ans.rasgov(), false),
	new TestItemChoice(5, DBc().title("Средства на уровне лексики").ul(...q.leks.nauch), ans.nauch(), false),
	new TestItemChoice(6, DBc().title("Средства на уровне лексики").ul(...q.leks.offdel), ans.offdel(), false),
	new TestItemChoice(7, DBc().title("Средства на уровне лексики").ul(...q.leks.public), ans.public(), false),
	new TestItemChoice(8, DBc().title("Средства на уровне лексики").ul(...q.leks.hudozh), ans.hudozh(), false),
	new TestItemChoice(9, DBc().title("Средства на уровне лексики").ul(...q.leks.rasgov), ans.rasgov(), false),
	new TestItemChoice(10, DBc().title("Средства на уровне морфологии").ul(...q.morph.nauch), ans.nauch(), false),
	new TestItemChoice(11, DBc().title("Средства на уровне морфологии").ul(...q.morph.offdel), ans.offdel(), false),
	new TestItemChoice(13, DBc().title("Средства на уровне морфологии").ul(...q.morph.rasgov), ans.rasgov(), false),
	new TestItemChoice(14, DBc().title("Средства на уровне синтаксиса").ul(...q.sint.nauch), ans.nauch(), false),
	new TestItemChoice(15, DBc().title("Средства на уровне синтаксиса").ul(...q.sint.offdel), ans.offdel(), false),
	new TestItemChoice(16, DBc().title("Средства на уровне синтаксиса").ul(...q.sint.public), ans.public(), false),
	new TestItemChoice(17, DBc().title("Средства на уровне синтаксиса").text(q.sint.hudozh), ans.hudozh(), false),
	new TestItemChoice(18, DBc().title("Средства на уровне синтаксиса").ul(...q.sint.rasgov), ans.rasgov(), false),
	new TestItemChoice(19, DBc().title("Основные типы речи и жанры").ul(...q.tipu.nauch), ans.nauch(), false),
	new TestItemChoice(20, DBc().title("Основные типы речи и жанры").text(q.tipu.offdel), ans.offdel(), false),
	new TestItemChoice(21, DBc().title("Основные типы речи и жанры").text(q.tipu.public), ans.public(), false),
	new TestItemSelfCheck(22, DBc().title("Задача стиля").text("Научный стиль"), DBc(q.task.nauch)),
	new TestItemSelfCheck(23, DBc().title("Задача стиля").text("Официально-деловой стиль"), DBc(q.task.offdel)),
	new TestItemSelfCheck(24, DBc().title("Задача стиля").text("Публицистический стиль"), DBc(q.task.public)),
	new TestItemSelfCheck(25, DBc().title("Задача стиля").text("Художественный стиль"), DBc(q.task.hudozh)),
	new TestItemSelfCheck(26, DBc().title("Задача стиля").text("Разговорный стиль"), DBc(q.task.rasgov)),
	new TestItemSelfCheck(27, DBc().title("Средства на уровне лексики").text("Научный стиль"), DBc().ul(...q.leks.nauch)),
	new TestItemSelfCheck(28, DBc().title("Средства на уровне лексики").text("Официально-деловой стиль"), DBc().ul(...q.leks.offdel)),
	new TestItemSelfCheck(29, DBc().title("Средства на уровне лексики").text("Публицистический стиль"), DBc().ul(...q.leks.public)),
	new TestItemSelfCheck(30, DBc().title("Средства на уровне лексики").text("Художественный стиль"), DBc().ul(...q.leks.hudozh)),
	new TestItemSelfCheck(31, DBc().title("Средства на уровне лексики").text("Разговорный стиль"), DBc().ul(...q.leks.rasgov)),
	new TestItemSelfCheck(32, DBc().title("Средства на уровне морфологии").text("Научный стиль"), DBc().ul(...q.morph.nauch)),
	new TestItemSelfCheck(33, DBc().title("Средства на уровне морфологии").text("Официально-деловой стиль"), DBc().ul(...q.morph.offdel)),
	new TestItemSelfCheck(35, DBc().title("Средства на уровне морфологии").text("Разговорный стиль"), DBc().ul(...q.morph.rasgov)),
	new TestItemSelfCheck(36, DBc().title("Средства на уровне синтаксиса").text("Научный стиль"), DBc().ul(...q.sint.nauch)),
	new TestItemSelfCheck(37, DBc().title("Средства на уровне синтаксиса").text("Официально-деловой стиль"), DBc().ul(...q.sint.offdel)),
	new TestItemSelfCheck(38, DBc().title("Средства на уровне синтаксиса").text("Публицистический стиль"), DBc().ul(...q.sint.public)),
	new TestItemSelfCheck(39, DBc().title("Средства на уровне синтаксиса").text("Художественный стиль"), DBc().text(q.sint.hudozh)),
	new TestItemSelfCheck(40, DBc().title("Средства на уровне синтаксиса").text("Разговорный стиль"), DBc().ul(...q.sint.rasgov)),
	new TestItemSelfCheck(41, DBc().title("Основные типы речи и жанры").text("Научный стиль"), DBc().ul(...q.tipu.nauch)),
	new TestItemSelfCheck(42, DBc().title("Основные типы речи и жанры").text("Официально-деловой стиль"), DBc().text(q.tipu.offdel)),
	new TestItemSelfCheck(43, DBc().title("Основные типы речи и жанры").text("Публицистический стиль"), DBc().text(q.tipu.public)),
];
