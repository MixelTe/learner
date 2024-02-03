import { DBc } from "../docBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck, TestItemWordChoice } from "../testerItems.js";

export const data: TestItem[] = [
	new TestItemSelfCheck(0, DBc("Пол-, полу"), DBc()
		.title("Через дефиз")
		.text("Если слово начинается с:")
		.ul(
			"Заглавной буквы - пол-Москвы, пол-России",
			"Гласной буквы - пол-яблока, пол-огурца",
			"Буквы л - пол-лимона, пол-литра",
		)
		.title("Слитно")
		.text("Если слово начинается с согласной", "Полгорода, полтетради")
		.br()
		.text("Исключение: поллитровка")
		.title("Раздельно")
		.text("Если словосочетание или отдельное слово", "Пол чайной ложки, покрасил пол дома")
	),
	new TestItemSelfCheck(1, DBc("Дефиз в сложных словах"), DBc()
		.title("Через дефиз")
		.text(
			"Если образовано из сочинительных словосочетаний",
			"Диван-кровать - диван и кровать",
			"Шиномонтаж - монтаж шин",
		).br()
		.text(
			"Оттенки и стороны света",
			"Желто-зелёный, тёмно-синий, юго-запад",
		).br()
		.text(
			"Звания, начинающиеся с вице-, экс-, контр-",
			"Вице-президент, экс-чемпион, контр-генерал",
			"(контригра - не звание)",
		)
	),
	new TestItemSelfCheck(2, DBc("Дефиз в наречиях"), DBc()
		.title("Через дефиз")
		.text(
			"С частицами кое-, -то, -либо, -нибудь",
			"Всё-таки, где-то, как-либо, кое-как",
		).br()
		.text(
			"По-...ому,ему,и,цки,ски",
			"По-твоЕМУ, по-туреЦКИ, по-латынИ",
		).br()
		.text(
			"в-,во-...ых,их",
			"Во-первых, в-третьих",
		).br()
		.text(
			"Образованные повтором слова или синонима",
			"тихо-тихо, еле-еле",
			"тихо-смирно, сегодня-завтра",
		)
	),
	new TestItemSelfCheck(3, DBc("тоже/то же"), DBc()
		.text("Слитно, если союз", "Он тоже придёт").br()
		.text("Раздельно, если частица", "То же задание, что и к него")
	),
	new TestItemSelfCheck(4, DBc("также/так же"), DBc()
		.text("Слитно, если союз", "Он также придёт").br()
		.text("Раздельно, если частица", "Сделал так же, как товарищ")
	),
	new TestItemSelfCheck(5, DBc("зато/за то"), DBc()
		.text("Слитно, если союз", "Мыло серо, зато моет бело").br()
		.text("Раздельно, если частица", "Спрячься за то дерево")
	),
	new TestItemSelfCheck(6, DBc("оттого/от того"), DBc()
		.text("Слитно, если союз", "Мы проспали, оттого опоздали").br()
		.text("Раздельно, если предлог", "От того дома")
	),
	new TestItemSelfCheck(7, DBc("потому/по тому"), DBc()
		.text("Слитно, если союз", "Мы проспали, потому опоздали").br()
		.text("Раздельно, если предлог", "По тому мосту")
	),
	new TestItemSelfCheck(8, DBc("поэтому/по этому"), DBc()
		.text("Слитно, если союз", "Мы проспали, поэтому опоздали").br()
		.text("Раздельно, если предлог", "По этому пути")
	),
	new TestItemSelfCheck(9, DBc("причём/при чём"), DBc()
		.text("Слитно, если союз", "Было пасмурно, причём ещё моросил дождь").br()
		.text("Раздельно, если предлог", "При чём же ты останешься?")
	),
	new TestItemSelfCheck(10, DBc("притом/при том"), DBc()
		.text("Слитно, если союз", "Было пасмурно, притом ещё моросил дождь").br()
		.text("Раздельно, если предлог", "При том здании есть аптека")
	),
	new TestItemSelfCheck(11, DBc("итак/итак"), DBc()
		.text("Слитно, если союз", "Итак=вот (следовательно)").br()
		.text("Раздельно, если предлог", "И так (таким образом)", "И так продолжалось долго")
	),
	new TestItemSelfCheck(12, DBc("зачем/за чем"), DBc()
		.text("Слитно, если союз", "Зачем вам это?").br()
		.text("Раздельно, если предлог", "За чем вы наблюдаете?")
	),
	new TestItemSelfCheck(13, DBc("отчего/от чего"), DBc()
		.text("Слитно, если союз", "Не пойму, отчего это произошло").br()
		.text("Раздельно, если предлог", "От чего это зависит?")
	),
	new TestItemSelfCheck(14, DBc("почему/по чему"), DBc()
		.text("Слитно, если союз", "Не пойму, почему это произошло").br()
		.text("Раздельно, если предлог", "По чему он проехал?")
	),
	new TestItemSelfCheck(15, DBc("чтобы/что бы"), DBc()
		.text("Слитно, если союз", "Чтобы не опоздать на поезд, нужно выехать заранее").br()
		.text("Раздельно, если частица", "Что бы приготовить на ужин?")
	),
	new TestItemWordChoice(16, "[+Из-за|Изза|Из за] поворота"),
	new TestItemWordChoice(17, "[+Из-под|Изпод|Из под] одеяла"),
	new TestItemWordChoice(18, "[+По-за|Поза|По за] рекой"),
	new TestItemWordChoice(19, "[+По-над|Понад|По над] горой"),
	new TestItemWordChoice(20, "[+Ввиду|В виду] изменений"),
	new TestItemWordChoice(21, "Имел [Ввиду|+В виду]"),
	new TestItemWordChoice(22, "[+Вместо|В место] меня"),
	new TestItemWordChoice(23, "[Вместо|+В место] на карте"),
	new TestItemWordChoice(24, "[+Вроде|В роде] сделал"),
	new TestItemWordChoice(25, "[+Вслед|В след] за ним"),
	new TestItemWordChoice(26, "[+Сверх|С верх] нормы"),
	new TestItemWordChoice(27, "[+Внутри|В нутри] здания"),
	new TestItemWordChoice(28, "[+Навстречу|На встречу] другу"),
	new TestItemWordChoice(29, "[Навстречу|+На встречу] с другом"),
	new TestItemWordChoice(30, "[+Насчет|На счет] встречи"),
	new TestItemWordChoice(31, "[Насчет|+На счет] перевели"),
	new TestItemWordChoice(32, "Выглядел [+наподобие|на подобие] статуи"),
	new TestItemWordChoice(33, "Указал [наподобие|+на подобие] статуй"),
	new TestItemWordChoice(34, "Стоял [наподобии|+на подобии] трибуны"),
	new TestItemWordChoice(35, "Выглядел наподоби[+е|и] статуи"),
	new TestItemWordChoice(36, "[+Вследствие|В следствие] ошибки"),
	new TestItemWordChoice(37, "Вследстви[+е|в следствие] ошибки"),
	new TestItemWordChoice(38, "[Вследствие|+В следствие] по делу"),
	new TestItemWordChoice(39, "[+Несмотря на|Не смотря на] трудности"),
	new TestItemWordChoice(40, "[Несмотря на|+Не смотря на] часы"),
	new TestItemWordChoice(41, "[+Невзирая на|Не взирая на] проблемы"),
	new TestItemWordChoice(42, "[Невзирая на|+Не взирая на] часы"),
	new TestItemWordChoice(43, "Голос [+свыше|с выше]"),
	new TestItemWordChoice(44, "[+Наперекор|На перекор] судьбе"),
	new TestItemWordChoice(45, "[+Поверх|По верх] земли"),
	new TestItemWordChoice(46, "[+Вблизи|В близи] моря"),
	new TestItemWordChoice(47, "[Вблизи|+В близи] с морем"),
	new TestItemWordChoice(48, "[+Напротив|На против] пекарни"),
	new TestItemWordChoice(49, "[+В виде|Ввиде] ракушки"),
	new TestItemWordChoice(50, "[+В меру|Вмеру] украшенный"),
	new TestItemWordChoice(51, "[+В связи|Всвязи] с праздником"),
	new TestItemWordChoice(52, "[+В силу|Всилу] обстоятельств"),
	new TestItemWordChoice(53, "[+В смысле|Всмысле]"),
	new TestItemWordChoice(54, "[+По мере|Помере] поступления"),
	new TestItemWordChoice(55, "[+В отношении|Вотношении] новичков"),
	new TestItemWordChoice(56, "[+По причине|Попричине] победы"),
	new TestItemWordChoice(57, "По причин[+е|и] победы"),
	new TestItemWordChoice(58, "[+По поводу|Поповоду] встречи"),
	new TestItemWordChoice(59, "[+За исключением|Заисключением] кота"),
	new TestItemWordChoice(60, "[+За счет|Засчет] упорства"),
	new TestItemWordChoice(61, "[+В целях|Вцелях] группы"),
	new TestItemWordChoice(62, "[+Со стороны|Состороны] начальства"),
	new TestItemWordChoice(63, "[+В деле|Вделе]"),
	new TestItemWordChoice(64, "[+В течение|Втечение] часа"),
	new TestItemWordChoice(65, "В течени[+е|и] часа"),
	new TestItemWordChoice(66, "[+В продолжение|Впродолжение] всей встречи"),
	new TestItemWordChoice(67, "В продолжени[+е|и] всей встречи"),
	new TestItemWordChoice(68, "В продолжени[е|+и] фильма"),
	new TestItemWordChoice(69, "[+В заключение|Взаключение] встречи"),
	new TestItemWordChoice(70, "В заключени[+е|и] встречи"),
	new TestItemWordChoice(71, "[+В отсутствие|Вотсутствие] гостей"),
	new TestItemWordChoice(72, "[+Во избежание|Воизбежание] проблем"),
	new TestItemWordChoice(73, "Во избежани[+е|и] проблем"),
	new TestItemWordChoice(74, "Молодец в отличи[+е|и] от него"),
	new TestItemWordChoice(75, "Проблема в отличи[е|+и] цветов"),
	new TestItemWordChoice(76, "По окончани[+и|е] школы"),
	new TestItemWordChoice(77, "По прибыти[+и|е] на работу"),
	new TestItemWordChoice(78, "По возвращени[+и|е] домой"),
	new TestItemWordChoice(79, "Сделал по совест[+и|е]"),
	new TestItemWordChoice(80, "По завершени[+и|е] дела"),
	new TestItemWordChoice(81, "По прошестви[+и|е] лет"),
	new TestItemWordChoice(82, "Идти по очеред[+и|е]"),
	new TestItemWordChoice(83, "По истечени[+и|е] волшебника"),
	new TestItemWordChoice(84, "По приезд[+е|у] на дачу"),
	new TestItemWordChoice(85, "По прилёт[+е|у] в Москву"),
];
