import { DB, DBF, DBc } from "../docBuilder.js";
import { FB, createFormulas } from "../formulasBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const phy_0: TestItem[] = [
	new TestItemSelfCheck(0, DBc("Перемещение через радиус-вектор"), createFormulas("'d&r = &r_2 - &r_1")),
	new TestItemSelfCheck(1, DBc("Скорость имея ур-е перемещения"), createFormulas("'v(t) = S''(t)")),
	new TestItemSelfCheck(2, DBc("Ускорение имея ур-е перемещения или скорости"), createFormulas("a(t) = 'v ''(t) = S''''(t)")),
	new TestItemSelfCheck(3, DBc("Равномерное движение"), createFormulas("x(t) = x_0 + 'v_{0x}t")),
	new TestItemSelfCheck(4, DBc("Равноускоренное движение"), createFormulas("x(t) = x_0 + 'v_{0x}t + {a_xt^2}/{2}", "x(t) = {'v^2_x - 'v^2_{0x}}/{2a_x}", "x(t) = {'v_x + 'v_{0x}}/{2}t")),
	new TestItemSelfCheck(5, DBc("Движение тела, брошенного под углом"), createFormulas("x(t) = x_0 + 'v_0cos'a * t", "y(t) = y_0 + 'v_0sin'a * t - {gt^2}/{2}")),
	new TestItemSelfCheck(114, DBc("Тормозной путь и время торможения"), createFormulas("|l = {m'v_0^2}/{2F_{тр}}", "|t = {m'v_0}/{F_{тр}}", "_{Нет в кодификаторе}")),
	new TestItemSelfCheck(6, DBc("Угловая скорость"), createFormulas("'w = {2'P}/{T} = 2'P'n = {'n}/{R} [{рад}/{с}]")),
	new TestItemSelfCheck(7, DBc("Центростремительное ускорение"), createFormulas("a_{цс} = {'v^2}/{R} = 'w^2R")),
	new TestItemSelfCheck(8, DBc("Плотность"), createFormulas("'r = {m}/{V}")),
	new TestItemSelfCheck(9, DBc("Равнодействующая сил"), createFormulas("&F = &F_1 + &F_2 + ...")),
	new TestItemSelfCheck(10, DBc("Второй закон Ньютона"), createFormulas("&F = m&a", "'d&p = &F'dt")),
	new TestItemSelfCheck(11, DBc("Третий закон Ньютона"), createFormulas("&F_{12} = -&F_{21}")),
	new TestItemSelfCheck(12, DBc("Закон всемирного тяготения"), createFormulas("F = G{m_1m_2}/{R^2}")),
	new TestItemSelfCheck(13, DBc("Сила тяжести над поверхностью планеты"), createFormulas("mg = G{Mm}/{(R_0 + h)^2}")),
	new TestItemSelfCheck(14, DBc("Закон Гука"), createFormulas("F = -kx")),
	new TestItemSelfCheck(15, DBc("Сила трения"), createFormulas("F_{тр} = 'mN")),
	new TestItemSelfCheck(16, DBc("Давление"), createFormulas("p = {F}/{S} [Па]")),
	new TestItemSelfCheck(17, DBc("Момент силы"), createFormulas("M = Fl")),
	new TestItemSelfCheck(18, DBc("Центр масс системы материальных точек"), createFormulas("&r_{ц.с.} = {m_1&r_1 + m_2&r_2 + ...}/{m_1 + m_2 + ...}")),
	new TestItemSelfCheck(19, DBc("Условие равновесия тела"), FB().system(createFormulas("M_1 + M_2 + ... = 0", "&F_1 + &F_2 + ... = 0"))),
	new TestItemSelfCheck(20, DBc("Давление жидкости"), createFormulas("p = 'r_жgh [Па]")),
	new TestItemSelfCheck(21, DBc("Закон Архимеда"), createFormulas("F_{Арх} = 'r_жgV_т")),
	new TestItemSelfCheck(22, DBc("Импульс"), createFormulas("&p = m&{'v} [{кг*м}/{с}]")),
	new TestItemSelfCheck(23, DBc("Импульс системы"), createFormulas("&p = &p_1 + &p_2 + ...")),
	new TestItemSelfCheck(24, DBc("Закон сохранения ипульса"), createFormulas("'d&p = 0")),
	new TestItemSelfCheck(25, DBc("Работа силы"), createFormulas("A = |&F|*|'d&r|*@{cos}'a = F_x * 'dx [Дж]")),
	new TestItemSelfCheck(115, DBc("Работа через кинетическую энергию"), createFormulas("A = 'dE_к [Дж]")),
	new TestItemSelfCheck(26, DBc("Мощность силы"), createFormulas("P = F*'v*@{cos}'a [Вт]")),
	new TestItemSelfCheck(27, DBc("Кинетическая энергия"), createFormulas("E_к = {m'v^2}/{2} = {p^2}/{2m} [Дж]")),
	new TestItemSelfCheck(28, DBc("Потенциальная энергия поднятого тела"), createFormulas("E_п = mgh [Дж]")),
	new TestItemSelfCheck(29, DBc("Потенциальная энергия деформированного тела"), createFormulas("E_п = {kx^2}/{2} [Дж]")),
	new TestItemSelfCheck(30, DBc("Закон сохранения полной механической энергии"), createFormulas("E_{мех} = E_к + E_п", "'dE_{мех} = 0")),
	new TestItemSelfCheck(31, DBc("Гармонические колебания"), createFormulas("x(t) = Asin('wt + 'f_0)", "'v_x(t) = x''(t)", "a_x(t) = 'v_x''(t) = x''''(t) = -'w^2x(t)", "A - амплитуда")),
	new TestItemSelfCheck(32, DBc("Связь амплитуды колебаний с амплитудами колебаний её скорости и ускорения"), createFormulas("'v_{max} = 'wA", "a_{max} = 'w^2A")),
	new TestItemSelfCheck(33, DBc("Период и частота колебаний"), createFormulas("T = {2'P}/{'w} = {1}/{'n}")),
	new TestItemSelfCheck(34, DBc("Период математического маятника"), createFormulas("T = 2'P\\{{l}/{g}}")),
	new TestItemSelfCheck(35, DBc("Период пружинного маятника"), createFormulas("T = 2'P\\{{m}/{k}}")),
	new TestItemSelfCheck(36, DBc("Условие резонанса"), createFormulas("'w_0 = 'w_1")),
	new TestItemSelfCheck(37, DBc("Длина волны"), createFormulas("'l = 'vT = {'v}/{'n}")),
	new TestItemSelfCheck(38, DBc("Скорость звука"), createFormulas("v_{возд} = 300 м/с", "v_{вода} = 1400 м/с", "v_{металл} = 5000 м/с")),
	new TestItemSelfCheck(39, DBc("Количество вещества"), createFormulas("|'n = {N}/{N_A} = {m}/{'m} [моль]", "N - кол-во молекул", "N_A - число Авогадро", "m - масса вещества", "\\'m - молярная масса вещества")),
	new TestItemSelfCheck(40, DBc("основное уравнение МКТ"), createFormulas("|p = {1}/{3}m_0{#{'v}}^2n = {2}/{3}#En", "p - давление", "n - концентрация", "m_0 - масса молекулы", "\\#E - средняя кинетическая энергия")),
	new TestItemSelfCheck(41, DBc("Концентрация молекул"), createFormulas("n = {N}/{V}")),
	new TestItemSelfCheck(42, DBc("Абсолютная температура"), createFormulas("T = t'0 + 273К")),
	new TestItemSelfCheck(43, DBc("Связь температуры газа со средней кинетической энергией"), createFormulas("|#E = {2}/{3}kT", "k - постоянная Больцмана")),
	new TestItemSelfCheck(44, DBc("Закон Авогадро"), createFormulas("|p = nkT", "p - давление", "n - концентрация", "k - постоянная Больцмана")),
	new TestItemSelfCheck(45, DBc("Уравнение Менделеева-Клапейрона"), createFormulas("pV = {m}/{'m}RT", "{pV}/{T} = const")),
	new TestItemSelfCheck(46, DBc("Внутренняя энергии одноатомного идеального газа"), createFormulas("U = {3}/{2}'nRT")),
	new TestItemSelfCheck(146, DBc("Внутренняя энергии двухатомного идеального газа"), createFormulas("U = {5}/{2}'nRT")),
	new TestItemSelfCheck(47, DBc("Закон Дальтона"), createFormulas("p = p_1 + p_2 + ...", "p - давление смеси газов")),
	new TestItemSelfCheck(48, DBc("Закон Бойля-Мариотта"), createFormulas("pV = @{const}", "При T = @{const}", "изотерма")),
	new TestItemSelfCheck(49, DBc("Закон Гей-Люссака"), createFormulas("{p}/{T} = @{const}", "При V = @{const}", "изохора")),
	new TestItemSelfCheck(50, DBc("Закон Шарля"), createFormulas("{V}/{T} = @{const}", "При p = @{const}", "изобара")),
	new TestItemSelfCheck(51, DBc("Давление насыщенного пара"), createFormulas("p = nkT", "n - концентрация молекул")),
	new TestItemSelfCheck(52, DBc("Относительная влажность воздуха"), createFormulas("'f = {p_{пара}}/{p_{насыщ. пара}} = {'r_{пара}}/{'r_{насыщ. пара}}")),
	new TestItemSelfCheck(53, DBc("Количество теплоты при нагреве"), createFormulas("|Q = cm'dT", "\\c - удельная теплоёмкость вещества")),
	new TestItemSelfCheck(54, DBc("Количество теплоты при парообразовании"), createFormulas("|Q = Lm", "\\L - удельная теплота парообразования")),
	new TestItemSelfCheck(55, DBc("Количество теплоты при плавлении"), createFormulas("|Q = 'lm", "\\'l - удельная теплота плавления")),
	new TestItemSelfCheck(56, DBc("Количество теплоты при сгорании"), createFormulas("|Q = qm", "\\q - удельная теплота сгорания топлива")),
	new TestItemSelfCheck(57, DBc("Работа в термодинамике"), createFormulas("A = p'dV")),
	new TestItemSelfCheck(58, DBc("Первый закон термодинамики"), createFormulas("Q = 'dU + A", "Адиабата: 'dU = -A, Q=0")),
	new TestItemSelfCheck(59, DBc("КПД тепловых машин"), createFormulas("'T = {A_{за цикл}}/{Q_{нагр}} = {Q_{нагр} - |Q_{хол}|}/{Q_{нагр}} = 1 - {|Q_{хол}|}/{Q_{нагр}}")),
	new TestItemSelfCheck(60, DBc("Максимальное значение КПД"), createFormulas("max 'T = 'T_{Карно} = {T_{нагр} - T_{хол}}/{T_{нагр}} = 1 - {T_{хол}}/{T_{нагр}}")),
	new TestItemSelfCheck(61, DBc("Цикл Карно"), DBc().svg("phy_0-61.svg", DBF.wm100)),
	new TestItemSelfCheck(62, DBc("Уравнение теплового баланса"), createFormulas("Q_1 + Q_2 + Q_3 + ... = 0")),
	new TestItemSelfCheck(63, DBc("Закон Кулона"), createFormulas("|F = k {|q_1| * |q_2|}/{'Er^2}", "|k = {1}/{4'P'E_0}", "\\k - коэффициент пропорциональности", "\\'E - диэлектрическая проницаемость среды", "\\'E_0 - электрическая постоянная")),
	new TestItemSelfCheck(64, DBc("Напряжённость электрического поля"), createFormulas("&E = {&F}/{q} [В/м] [Н/Кл]")),
	new TestItemSelfCheck(65, DBc("Поле точечного заряда"), createFormulas("|E = k {|q|}/{r^2} [В/м] [Н/Кл]", "k - коэффициент пропорциональности")),
	new TestItemSelfCheck(66, DBc("Направление на схеме от/на себя"), createFormulas("@ⓧ - от нас", "@⊙ - к нам")),
	new TestItemSelfCheck(67, DBc("Работа по перемещению электрического заряда"), createFormulas("|A = -q'd'f = qU = -'dW", "\\'f - потенциал электростатического поля")),
	new TestItemSelfCheck(68, DBc("Потенциальная электростатическая энергия"), createFormulas("|W_p = q'f = qEd", "\\'f - потенциал электростатического поля", "\\E - напряжённость электрического поля", "d - расстояние до заряда")),
	new TestItemSelfCheck(69, DBc("Потенциал электростатического поля"), createFormulas("'f = {W_p}/{q}")),
	new TestItemSelfCheck(70, DBc("Разность потенциалов"), createFormulas("|U = Ed = {A}/{|q|} [В] (Вольт)", "\\E - напряжённость электрического поля", "d - расстояние до заряда", "\\A - работа по перемещению электрического заряда")),
	new TestItemSelfCheck(71, DBc("Принцип суперпозиции электрических полей"), createFormulas("&E = &E_1 = &E_2 + ...", "'f = 'f_1 + 'f_2 + ...")),
	new TestItemSelfCheck(72, DBc("Ёмкость конденсатора"), createFormulas("C = {q}/{U} [1 Ф] (фарад)")),
	new TestItemSelfCheck(73, DBc("Электроёмкость плоского конденсатора"), createFormulas("|C = {'E*'E_0S}/{d}", "\\'E - диэлектрическая проницаемость", "S - площадь обкладок", "\\d - расстояние между обкладками")),
	new TestItemSelfCheck(74, DBc("Последовательное соединение"), createFormulas("|I = I_1 = I_2", "|U = U_1 + U_2", "|R = R_1 + R_2", "|{1}/{C} = {1}/{C_1} + {1}/{C_2}")),
	new TestItemSelfCheck(75, DBc("Параллельное соединение"), createFormulas("|I = I_1 + I_2", "|U = U_1 = U_2", "|{1}/{R} = {1}/{R_1} + {1}/{R_2}", "|C = C_1 + C_2")),
	new TestItemSelfCheck(76, DBc("Энергия заряженного конденсатора"), createFormulas("W_c = {qU}/{2} = {CU^2}/{2} = {q^2}/{2C}")),
	new TestItemSelfCheck(77, DBc("Сила тока"), createFormulas("I = {'dq}/{'dt} [А] (Ампер)")),
	new TestItemSelfCheck(78, DBc("Закон Ома для участка цепи"), createFormulas("I = {U}/{R}")),
	new TestItemSelfCheck(79, DBc("Cопротивление проводника"), createFormulas("|R = 'r{l}/{S}", "\\'r - удельное сопротивление вещества", "l - длина проводника", "\\S - площадь поперечного сечения")),
	new TestItemSelfCheck(80, DBc("ЭДС источника тока"), createFormulas("'E = {A}/{|q|} [1 В] (вольт)")),
	new TestItemSelfCheck(81, DBc("Закон Ома для полной (замкнутой) цепи"), createFormulas("|I = {U}/{R + r}", "\\r - внутреннее сопротивление источника тока")),
	new TestItemSelfCheck(82, DBc("Работа электрического тока"), createFormulas("A = IUt [Дж]")),
	new TestItemSelfCheck(83, DBc("Закон Джоуля-Ленца"), createFormulas("Q = I^2Rt")),
	new TestItemSelfCheck(84, DBc("Мощность электрического тока"), createFormulas("P = {A}/{t} = I^2R = {U^2}/{R} = IU [Вт]")),
	new TestItemSelfCheck(85, DBc("Магнитные поля полосового и подковообразного постоянных магнитов"), DBc().svg("phy_0-85.svg", DBF.wm100)),
	new TestItemSelfCheck(86, DBc("Линий индукции магнитного поля прямого проводника, кольцевого проводника, катушки с током "), DBc().svg("phy_0-86.svg", DBF.wm100)),
	new TestItemSelfCheck(87, DBc("Правило правого буравчика"), DBc("Если поступательные движения буравчика совпадают с направление тока в проводнике, то направление вращения его рукоятки укажет направление линий магнитной индукции вокруг проводника.")),
	new TestItemSelfCheck(88, DBc("Сила Ампера"), createFormulas("|F_А = IBl @{sin}'a", "\\'a - угол между направлением проводника и вектором &B")),
	new TestItemSelfCheck(89, DBc("Правило левой руки для силы Ампера"), DBc("Ладонь левой руки надо расположить так, чтобы линии магнитной индукции входили в неё, а четыре вытянутых пальца были направлены по направлению тока в проводнике, то отставленный большой палец укажет направление силы Ампера.")),
	new TestItemSelfCheck(90, DBc("Сила Лоренца"), createFormulas("|F_л = q'vB@{sin}'a", "'a - угол между векторами &{'v} и &B")),
	new TestItemSelfCheck(91, DBc("Правило левой руки для силы Лоренца"), DBc("Ладонь левой руки надо расположить так, чтобы линии магнитной индукции входили в неё, а четыре вытянутых пальца были направлены по направлению движения положительно заряженных частиц, то отставленный большой палец укажет направление силы Лоренца.")),
	new TestItemSelfCheck(92, DBc("Поток вектора магнитной индукции"), createFormulas("|Ф = B_nS = BS@{cos}'a [1 Вб] (вебер)", "\\B - магнитная индукция [1 Тл] (тесла)")),
	new TestItemSelfCheck(93, DBc("Закон электромагнитной индукции Фарадея"), createFormulas("'E_i = -{'dФ}/{'dt} = -Ф'(t)", "'E_i - ЭДС индукции", "Ф - магнитный поток")),
	new TestItemSelfCheck(94, createFormulas("\\ЭДС индукции в прямом проводнике длиной l, движущемся со скоростью &{'v} (&{'v} '/ &l) в однородном магнитном поле B"), createFormulas("||'E_i| = Bl'v@{cos}'a", "\\'a - угол между вектором B и нормалью &n к плоскости, в которой лежат векторы &l и &{'v}", "\\B - магнитная индукция [1 Тл] (тесла)")),
	new TestItemSelfCheck(95, DBc("Правило Ленца"), DBc("Возникающий в замкнутом контуре индукционный ток противодействует всякому изменению магнитного потока, в котором он вызван.")),
	new TestItemSelfCheck(96, DBc("Индуктивность"), createFormulas("Ф = LI", "L - [1 Гн] (генри)", "Ф - магнитный поток")),
	new TestItemSelfCheck(97, DBc("ЭДС самоиндукции"), createFormulas("'E_{is} = -L{'dI}/{'dt} = -LI'(t)")),
	new TestItemSelfCheck(98, DBc("Энергия магнитного поля катушки с током"), createFormulas("W_L = {LI^2}/{2}")),
	new TestItemSelfCheck(99, DBc("Колебательный контур"), DBc("Система, состоящая из конденсатора и катушки индуктивности.")),
	new TestItemSelfCheck(100, DBc("Заряд и сила тока в колебательном контуре"), createFormulas("q(t) = q_{max}@{sin}('wt + 'f_0)", "I(t) = q''(t) = 'wq_{max}@{cos}('wt + 'f_0) = I_{max}@{cos}('wt + 'f_0)")),
	new TestItemSelfCheck(101, DBc("Формула Томсона"), createFormulas("T = 2'P\\{LC}")),
	new TestItemSelfCheck(102, DBc("Частота в колебательном контуре"), createFormulas("'w = {2'P}/{T} = {1}/{\\{LC}}")),
	new TestItemSelfCheck(103, DBc("Связь амплитуды заряда конденсатора с амплитудой силы тока при свободных электромагнитных колебаниях в идеальном колебательном контуре"), createFormulas("q_{max} = {I_{max}}/{'w}")),
	new TestItemSelfCheck(104, DBc("Закон сохранения энергии в идеальном колебательном контуре"), createFormulas("{CU^2}/{2} + {LI^2}/{2} = {CU^2_{max}}/{2} = {LI^2_{max}}/{2} = @{const}")),
	new TestItemSelfCheck(105, DBc("Условие резонанса в электрической цепи"), createFormulas("'w = 'w_0 = {1}/{\\{LC}}")),
	new TestItemSelfCheck(106, DBc("Точечный источник"), DBc("Источник, размеры которого оказываются во много раз меньше чем радиус его действия. Пример: звёзды, свеча")),
	new TestItemSelfCheck(107, DBc("Скорость света в вакууме"), createFormulas("3 * 10^8 м/с")),
	new TestItemSelfCheck(108, DBc("Закон отражения"), DBc().formula(createFormulas("\\Угол падения равен углу отражения", "|'<'a = '<'b")).svg("phy_0-108.svg", DBF.wm100)),
	new TestItemSelfCheck(109, DBc("Закон преломления"), DBc().formula(createFormulas("{@{sin}'a}/{@{sin}'b} = {'v_1}/{'v_2} = n")).svg("phy_0-109.svg", DBF.wm100)),
	new TestItemSelfCheck(110, DBc("Соотношение частот и соотношение длин волн при переходе монохроматического света через границу раздела двух оптических сред"), createFormulas("'n_1 = 'n_2", "n_1'l_1 = n_2'l_2")),
	new TestItemSelfCheck(111, DBc("Абсолютный показатель преломления"), createFormulas("n_{абс} = {c}/{'v}")),
	new TestItemSelfCheck(112, DBc("Относительный показатель преломления"), createFormulas("n_{отн} = {n_2}/{n_1} = {'v_1}/{'v_2}")),
	new TestItemSelfCheck(113, DBc("Предельный угол полного внутреннего отражения"), DBc().formula(createFormulas("@{sin}'a_{пр} = {1}/{n_{отн}} = {n_2}/{n_1}")).svg("phy_0-113.svg", DBF.wm100)),
	new TestItemSelfCheck(116, DBc("Фокусное расстояние и оптическая сила тонкой линзы"), createFormulas("D = {1}/{F} [дптр]")),
	new TestItemSelfCheck(117, DBc("Формула тонкой линзы"), createFormulas("{1}/{F} = {1}/{d} + {1}/{f}", "F - [м]")),
	new TestItemSelfCheck(118, DBc("Увеличение, даваемое линзой"), createFormulas("Г = {h}/{H} = {@|f @|}/{d}")),
	new TestItemSelfCheck(119, DBc("Ход луча, прошедшего собирающую линзу"), DBc().svg("phy_0-119.svg")),
	new TestItemSelfCheck(120, DBc("Ход луча, прошедшего рассеивающую линзу"), DBc().svg("phy_0-120.svg")),
	new TestItemSelfCheck(121, DBc("Максимумы и минимумы в интерференционной картине"), createFormulas("'dd_{max} = k'l", "'dd_{min} = (2k' + 1){'l}/{2}", "k 'in 'Z")),
	new TestItemSelfCheck(122, DBc("Условие максимума для дифракционной решётки"), createFormulas("d*@{sin}'f = k'l", "k 'in 'Z")),
	// new TestItemSelfCheck(1, DBc(""), createFormulas("")),
];
