import { DBc } from "../docBuilder.js";
import { createFormulas } from "../formulasBuilder.js";
import { TestItemSelfCheck } from "../testerItems.js";
export const data = [
    new TestItemSelfCheck(0, DBc("Это вопрос карточки"), DBc("Это ответ карточки")),
    new TestItemSelfCheck(1, DBc()
        .title("Заголовок")
        .text("Просто текст", "Вторая строка")
        .ul("Cписок", "из трёх", "элементов")
        .text("Текст ").textCor("правильный").text(" и ").textErr("неправильный")
        .text("", "")
        .text("Текст ").textColored("orange", "разных").textColored("blue", " цветов").br()
        .hr().text("Разделитель")
        .ol("Нумерованный", "список")
        .text("Формула", "")
        .formula(createFormulas("y = {x}/{2} + 10"))
        .text("Svg картинка", "")
        .svg("data/turtle.svg")
        .text("Имеет цвета темы", ""), DBc("Это ответ карточки").br()
        .formula(createFormulas("&M'{{a_x + b_x}/{2}; {a_y + b_y}/{2}'}", "#{AB}^{x + {1}/{2}}_2; u{CB} = @{sin}'f '+ kx", "'<'a 'le 45'0")).br()
        .text("Можно вставлять формулы ").formula(createFormulas("2^{0.5} = \\{2}")).text(" в текст")),
];
