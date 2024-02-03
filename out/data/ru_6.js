import { TestItemChooseWord } from "../testerItems.js";
const title = "Исправьте лексическую ошибку, исключив лишнее слово";
export const data = [
    new TestItemChooseWord(1, "Новенький, вероятно, плохо сходился с людьми: в общих чаепитиях не участвовал, работал всегда молча, без слов.", "молча", title),
    new TestItemChooseWord(2, "Орешник почти отпылил, а берёза еще робеет зеленеть, не доверяя наступившей теплыни, а лес совсем прозрачный, без теней, словно после сна щурится спросонья.", "спросонья", title),
    new TestItemChooseWord(3, "Они казались спокойны и смелы; однако ж при моем приближении обе потупили опущенные головы и закрылись своими изодранными чадрами.", "опущенные", title),
    new TestItemChooseWord(5, "Не существует существенной разницы в нравственных приоритетах мировых религий.", "существенной", title),
    new TestItemChooseWord(6, "К ужину Марья Сергеевна испекла яблочную шарлотку из яблок и пригласила на чай соседей.", "яблочную", title),
    new TestItemChooseWord(7, "Вот какими речевыми шедеврами изобилуют даже очень популярные газеты: На этот сегодняшний день уборка риса завершена во всех рисоводческих хозяйствах района.", "сегодняшний|этот", title),
    new TestItemChooseWord(8, "Наконец мы видим лес, хмурое небо в мохнатых тучах, меж которыми лишь кое-где видна чернеющая чернота.", "чернеющая", title),
    new TestItemChooseWord(9, "Шёл проливной ливень, так что на крыльцо нельзя было выйти.", "проливной", title),
    new TestItemChooseWord(10, "Стол напоминал сад: на нём было расставлено так много цветущих цветов, что блюда с закусками терялись в их таинственной чаще.", "цветущих", title),
    new TestItemChooseWord(11, "Стало ясно, что мы неверно определили основную суть эксперимента теперь нам придётся проводить исследование сначала.", "основную", title),
    new TestItemChooseWord(12, "В прейскуранте цен мы не обнаружили товара, который был нам необходим для завершения ремонта.", "цен", title),
    new TestItemChooseWord(13, "И даже когда из-за череды неудач, которые произошли в последние несколько месяцев, Лариса ушла на предприятие, где неожиданно появилась свободная вакансия, девушка ещё некоторое время продолжала дежурить в клинике.", "свободная", title),
    new TestItemChooseWord(14, "Режиссёр нашёл и отразил грань между эпохами, отчего, как мне кажется, фильм смотрится на одном дыхании, несмотря на его немалый хронометраж времени.", "времени", title),
    new TestItemChooseWord(15, "С бодрыми восклицаниями вперемешку с неуместной робостью мы вошли в двери театра и стали подниматься вверх по лестнице с медными прутьями и красовавшейся на ней красной ковровой дорожкой.", "вверх", title),
    new TestItemChooseWord(16, "Можно говорить о разных типах молодёжных театров, среди них традиционный реалистический театр (тяготеющий к психологической драме), театр на основе народного фольклора, игровой праздничный театр, театр абсурда.", "народного", title),
    new TestItemChooseWord(17, "На экзамене по биологии ответы отвечающих были сбивчивы больше тройки никто не получил.", "отвечающих", title),
    new TestItemChooseWord(18, "Вниз по лестнице спускаться было ещё сложнее: мышцы напрягались, ноги не слушались.", "вниз", title),
    new TestItemChooseWord(19, "Температура атмосферного воздуха в феврале была выше нормы, поэтому первоцветы распустились раньше обычного.", "атмосферного", title),
    new TestItemChooseWord(20, "Я увлекаюсь лингвистикой, языкознанием, поэтому хочу поступать на филфак.", "лингвистикой|языкознанием", title),
    new TestItemChooseWord(21, "В научной диссертации молодой учёный привёл результаты проведённых им исследований новой вакцины.", "научной", title),
    new TestItemChooseWord(22, "Чтобы написать недописанное сочинение, учитель дал нам время на уроке литературы.", "недописанное", title),
    new TestItemChooseWord(23, "«Дальнейшее совместное сотрудничество наших стран будет развиваться», ─ сказал на встрече президент.", "совместное", title),
    new TestItemChooseWord(24, "Он хорошо разбирался в тонких нюансах промышленного строительства.", "тонких", title),
    new TestItemChooseWord(25, "Маршрут движения автобуса с тех пор не менялся.", "движения", title),
    new TestItemChooseWord(26, "Промышленная фабрично-заводская индустрия развивается всё стремительнее наш город превращается в крупный экономический центр.", "промышленная", title),
    new TestItemChooseWord(27, "На собрание товарищества собственников квартир пришли тридцать человек жителей ближайших многоэтажек.", "человек", title),
    new TestItemChooseWord(28, "В такой благоприятной среде могли возникать различные всевозможные микроорганизмы.", "всевозможные|различные", title),
    new TestItemChooseWord(29, "Петька стал бойко рассказывать вслух, как ему удалось поймать щуку размером с него самого.", "вслух", title),
    new TestItemChooseWord(30, "Максим заранее предчувствовал, что встреча не сулит ему ничего хорошего: очень уж агрессивно выглядел его собеседник.", "заранее", title),
    new TestItemChooseWord(31, "Профессор помог, поспособствовал в продвижении его разработки.", "помог|поспособствовал", title),
    new TestItemChooseWord(32, "Миновали те грустные времена, когда поиск нужного слова сопровождался длительной работой с огромными объемами сведений, информации.", "сведений|информации", title),
    new TestItemChooseWord(33, "Важно, что на ресурсе собрана полная и актуальная база синонимов, доступная совершенно даром, бесплатно каждому посетителю сайта.", "бесплатно|даром", title),
    new TestItemChooseWord(34, "Вам нужно выбрать одно из двух альтернативных решений.", "альтернативных|двух", title),
    new TestItemChooseWord(35, "Опираясь на огромную базу синонимичных значений, сайт выдаст все возможные поисковые вариативные версии.", "вариативные", title),
    new TestItemChooseWord(36, "Площадь исследования, поиска достаточно обширна, а потому некоторые варианты могут быть приведены, но на практике не всегда использоваться в том значении, которое дано в словаре.", "поиска|исследования", title),
    new TestItemChooseWord(37, "Обогащение языка синонимами осуществляется непрерывно, и так же непрерывно происходит дифференциация, разграничение синонимов вплоть до полной утраты ими синонимичности.", "разграничение|дифференциация", title),
    new TestItemChooseWord(38, "Сложное предложение тесно связано с простым, но отличается от него как структурным составом, так и характером сообщения.", "структурным", title),
    new TestItemChooseWord(39, "Сергей был крайне взволнован: через час он впервые будет дебютировать перед такой огромной аудиторией.", "впервые", title),
    new TestItemChooseWord(40, "Объектом исследования является процесс анализа, разбора произведений различных жанров в старшей школе.", "анализа|разбора", title),
    new TestItemChooseWord(41, "Возвращаться обратно он очень не хотел, однако сердце неумолимо подсказывало, что сделать это нужно.", "обратно", title),
    new TestItemChooseWord(42, "Он взглянул взглядом вокруг и замолчал.", "взглядом", title),
    new TestItemChooseWord(43, "Берега рек нуждаются в нашей защите они замусорены мусором.", "мусором", title),
    new TestItemChooseWord(44, "Снова и опять всё повторялось: уговоры, обещания, слёзы.", "снова|опять", title),
    new TestItemChooseWord(45, "Критик Загорский критиковал спектакль за очень смелую трактовку образа Евгения Онегина.", "критик", title),
    new TestItemChooseWord(46, "Точка и прямая это основные, ключевые геометрические фигуры, расположенные на плоскости.", "ключевые|основные", title),
    new TestItemChooseWord(47, "Подобное оружие делали и коренные аборигены Австралии, только они закрепляли зубы на дубинке не жгутом, а воском, вырабатываемым особыми пчёлами, которые не имели жала.", "коренные", title),
    new TestItemChooseWord(48, "Он мог бы всего этого избежать, если бы только отступил назад, если бы только захотел себя спасти и не завершить того дела, ради которого он пришёл.", "назад", title),
    new TestItemChooseWord(51, "Когда я писал этот рассказ, я всё время старался сохранить ощущение холодного ветра с ночных гор, это было как бы основным лейтмотивом рассказа.", "основным", title),
    new TestItemChooseWord(53, "В этом пейзаже не было ни одной кричащей краски, ни одной острой черты в рельефе, но его скупые озёрца, наполненные тёмной и спокойной водой, кажется, выражали главную суть воды больше, чем все моря и океаны.", "главную", title),
    new TestItemChooseWord(60, "Понятие в философии это отвлечённая абстракция, представляющая собой обобщённое знание о предмете или явлении.", "отвлечённая", title),
    new TestItemChooseWord(61, "Младшая дочь, регулярно навещавшая родителей, заметила, что с годами у матери, которой было за шестьдесят, стали появляться необоснованные вспышки негодования, иногда отдающие высокомерной спесью.", "высокомерной", title),
    new TestItemChooseWord(65, "На семинар собрались молодые физики будущий передовой авангард отечественной науки.", "передовой", title),
    new TestItemChooseWord(67, "В своей автобиографии Юрий Владимирович Никулин с благодарностью вспоминает талантливых артистов, с которыми ему довелось работать в цирке и на съёмочной площадке.", "своей", title),
    new TestItemChooseWord(69, "Минут через десять к памятному мемориалу подъехал бежевый автомобиль, из которого вышел учитель местной школы, представившийся Николаем Сергеевичем.", "памятному", title),
    new TestItemChooseWord(74, "Первый тур стартовавшего в Швеции чемпионата мира по хоккею не принёс никаких неожиданных сюрпризов.", "неожиданных", title),
    new TestItemChooseWord(75, "Стоит отметить, что некоторые горячие гейзеры фонтанируют каждые двадцать минут, а есть и такие извержения, которые надо ждать часами.", "горячие", title),
    new TestItemChooseWord(76, "Я поначалу расстроился и даже поинтересовался у этого тайного анонима, кто же заказчик статьи.", "тайного", title),
    new TestItemChooseWord(77, "Он прихватил снятыми рукавицами горячий котелок, мягко снял его с огня и сразу крепко угнездил в камнях; потом быстро нарезал перочинным ножом крупные и ровные ломти хлеба и разложил их на какой-то фанерной дощечке, то есть как будто не только приготовил рыбную уху, но и стол накрыл.", "рыбную", title),
    new TestItemChooseWord(80, "Дело было не только в дядюшкиной эрудиции, романтическом прошлом и безупречном вкусе Колюня восхищался его привычками, жестами, словечками, мимикой лица, смесью грубоватости и изысканности, ловил каждое слово, а умного взрослого человека это обожание забавляло.", "лица", title),
    new TestItemChooseWord(83, "Я искусственно заикался, как бы подыскивая формулировки, оговаривался, жестикулировал руками, украшая свои экспромты афоризмами Гуковского и Щёголева.", "руками", title),
    new TestItemChooseWord(84, "Не только подвал дома и чердак, но и комнаты были забиты ветхой рухлядью, которую, говоря откровенно, давно следовало бы пустить на растопку камина.", "ветхой", title),
    new TestItemChooseWord(85, "Но часть его души навсегда соединилась с моей: нам было суждено стать самыми близкими друзьями ближе, чем братья, и долго прожить рядом, развиваясь в магнитном поле революции, приближение которой мы тогда заранее не предчувствовали, хотя она уже стояла у наших дверей.", "заранее", title),
    new TestItemChooseWord(88, "Стоит сказать о том, что именно в нашей стране впервые изобрели аппарат искусственного кровообращения, без которого было бы невозможно развитие трансплантологии.", "впервые", title),
    new TestItemChooseWord(91, "Стёкла в современном строительстве это уже не только материал для рам и стеклопакетов, но и элемент дизайна фасадов и внутренних интерьеров здания.", "внутренних", title),
    new TestItemChooseWord(98, "Многие ощущают настоятельную потребность в метких и запоминающихся обзорах новинок, в предварительных анонсах, которые позволяют читателю осознанно выбрать нужную ему книгу.", "предварительных", title),
    new TestItemChooseWord(99, "Текст, о котором идёт речь, послужил отправной точкой формирования в общественном сознании вымышленного мифа, связанного с фигурой Ивана Грозного.", "вымышленного", title),
    new TestItemChooseWord(111, "Все мои друзья ясно видят перспективы будущего, связанные с получением образования и овладением профессией.", "будущего", title),
    new TestItemChooseWord(114, "А потом был скрежет трамваев, огибающих бульвары кольца А и тогда ещё не вырубленные палисадники кольца Б, в которых весной гнездились соловьи, будя на утреннем рассвете разоспавшихся москвичей, и где рядом с садом Аквариум возвышался громадный доходный дом, принадлежавший до революции крупному московскому домовладельцу по фамилии Эльпит.", "утреннем", title),
    new TestItemChooseWord(115, "Водитель ждал людей, увидев, что они бегут к остановке, и рад был, что успели, ведь, согласитесь, бессмысленное дело вести пустой автобус, тормозя на остановках, где никто не выходит и не заходит, будто не существует и никогда не существовало твоего маршрута движения.", "движения", title),
];
