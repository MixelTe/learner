import { TestItemChooseWord } from "../testerItems.js";
export const data = [
    new TestItemChooseWord(0, "Из всех слов, одно здесь лишнее! Но какое же?", "лишнее", "Исключите лишнее слово"),
    new TestItemChooseWord(1, "Здесь есть лишнее слово! Например, это - точно нужное", "лишнее|это", "Исключите лишнее слово"),
];
