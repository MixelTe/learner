# learner / ЛЯРО

A user-friendly and beautiful web platform for learning theory and solving tests

Удобная и красивая веб-платформа для изучения теории и решения тестов

# How to create your own learner

1. View [example](https://mixelte.github.io/learner)
1. [Fork repo](https://github.com/MixelTe/learner/fork)
2. [Add data](#adding-data)
3. Config titles
4. (opt) Config metrika

## Adding data

### Sections
Open `ts/data/sections.ts` and edit Sections

```ts
export const Sections: Section[] = [
	{
		name: "Example section",
		themes: [
{ id: "example", count: 2, name: "Example theme", color: themes.common, items: getItemLoader("example") },
		],
	},
]
```

### Theme:
 field             | description
-------------------|--------------
id                 | unique string for each theme
name               | display name
color              | color of ui for this theme (one of **themes** obj values)
count              | count of questions in theme for fast display (can be set using **checkItems()**)
items              | loader of file with questions (use **getItemLoader**)
onlyAnswerInQList? | optional, set **true** to show only answers in questions list
disableRepeat?     | optional, set **true** to disable question repeating (by default, each question is displayed 2-3 times in a row)

### getItemLoader:
```ts
getItemLoader("filename")
```
Will load questions from variable `data` in file `ts/data/filename.ts`

### Data file
Create file for theme questions in `ts/data/`

For example `ts/data/example.ts`

```ts
import { DBc, DBF } from "../docBuilder.js";
import { createFormulas } from "../formulasBuilder.js";
import { TestItem } from "../tester.js";
import { } from "../testerItems.js";

export const data: TestItem[] = [

];
```

Add questions

```ts
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const data: TestItem[] = [
	new TestItemSelfCheck(0, "Question", "Answer"),
];
```
Each TestItem must have a unique id (first parameter) for all questions in the same theme

Some TestItems can display any html inside themselves, you can use [DocBuilder](#docbuilder) and [FormulaBuilder](#formulabuilder) to generate html

### TestItems
 TestItem                                                 | description
----------------------------------------------------------|-------------
[TestItemSelfCheck](#testitemselfcheck)                   | user chooses for himself whether he knows the answer
[TestItemChoice](#testitemchoice)                         | user chooses one of the options
[TestItemWordChoice](#testitemwordchoice)                 | user chooses which word to insert into the text
[TestItemChooseWord](#testitemchooseword)                 | user chooses one word of the text
[TestItemMultipleWordChoice](#testitemmultiplewordchoice) | user chooses several words of the text
[TestItemStress](#testitemstress)                         | user chooses one vowel letter of the word
[TestItemWordGroup](#testitemwordgroup)                   | displayed one word of the group, user have to recall full group

#### TestItemSelfCheck
User chooses for himself whether he knows the answer
```ts
new TestItemSelfCheck(
		id: number,
		task: string | HtmlBuilder,
		ans: string | HtmlBuilder
);
```

Example:
```ts
new TestItemSelfCheck(0, "Chemical formula of water", "H2O"),
```

#### TestItemChoice
User chooses one of the options
```ts
new TestItemChoice(
		id: number,
		task: string | HtmlBuilder,
		choices: string[],
		shuffle = true,
		expl?: string | HtmlBuilder
);
```
* choices - answer options, the correct answer must start with the symbol **+**
* shuffle - shuffle the answers
* expl - explanation for the answer

Example:
```ts
new TestItemChoice(0,
	"2 + 2 = ",
	["22", "+4", "6"],
	true,
	"This is how plus works",
),
```

#### TestItemWordChoice
User chooses which word to insert into the text
```ts
new TestItemWordChoice(
		id: number,
		task: string,
);
```
* task - text with special symbols: `text [wrong opt|+right opt1|+right opt2] text`

Example:
```ts
new TestItemWordChoice(0, "The skies are [+blue|red|green] as we know."),
```


#### TestItemChooseWord
User chooses one word of the text
```ts
new TestItemChooseWord(
		id: number,
		task: string,
		ans: string,
		title: string,
);
```
* ans - word for answer, for several correct answers, separate them using |
* title - question to display

Example:
```ts
new TestItemChooseWord(0, "Blue, green, soft, red", "soft", "Select the extra word"),
new TestItemChooseWord(1, "One, two, three, four", "two|four", "Select even number"),
```

#### TestItemMultipleWordChoice
User chooses several words of the text
```ts
new TestItemMultipleWordChoice(
		id: number,
		task: string,
		title: string,
		hideWrong = false,
);
```
* task - text where words inside `[word]` can be selected, to mark word as correct start it with **+** symbol: `[+word]`, to change the word when answer is shown add new word after **|** symbol: `[question word|answer word]`
* title - question to display
* hideWrong - hide unselected incorrect answers after the user's response

Example:
```ts
new TestItemMultipleWordChoice(0, "Hi [+1|o/]! How far is it [2] to the moon? [+3|:)]", "Where to insert a smiley face?"),
```


#### TestItemStress
User chooses one vowel letter of the word
```ts
new TestItemStress(
		id: number,
		task: string,
		desc = "",
);
```
* task - word where one of vowel letter is uppercase - marked as answer
* desc - small description for word

Example:
```ts
new TestItemStress(0, "hOspital"),
new TestItemStress(1, "presEnt", "(verb)"),
new TestItemStress(2, "prEsent", "(noun)"),
```

#### TestItemWordGroup
Displayed one word of the group, user have to recall full group
```ts
new TestItemWordGroup(
		id: number,
		group: string[],
		desc: string[] = [],
);
```
* group - words that need to be remembered as one group
* desc - descriptions of each word displayed with the answer

Example:
```ts
new TestItemWordGroup(0, ["Word 1", "Word 2", "Word 3"], ["description", "", "description for the third"]),
```

### DocBuilder

`ts/docBuilder.ts` has the following exports:
* class DocBuilder - html builder
* function DB(...text) - short for `new DocBuilder().text(...text);`
* function DBc(...text) - short for `DB(...text).center();`
* enum DBF - flags for `.svg()` method

Base example:
```ts
import { DBc } from "../docBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const data: TestItem[] = [
	new TestItemSelfCheck(0, DBc("Question"), DBc("Answer")),
];
```

#### DocBuilder methods:
 method                                       | description
----------------------------------------------|-------------
center()                                      | align center resulting html
title(text: string)                           | append title
text(...text: string[])                       | append text: span if single string, divs if several
textColored(color: string, ...text: string[]) | append text with the specified color
textCor(...text: string[])                    | append text with green color
textErr(...text: string[])                    | append text with red color
ul(...lis: (string \| DocBuilder)[])          | append unordered list of strings or any html
ol(...lis: (string \| DocBuilder)[])          | append ordered list of strings or any html
br()                                          | append space
hr()                                          | append horisontal line
formula(formula: FormulaBuilder)              | append formula generated by FormulaBuilder
svg(url: string, flags = DBF.center)          | append svg loaded from `wwwroot/imgs/<url>`

Full example:
```ts
import { DBc } from "../docBuilder.js";
import { TestItem } from "../tester.js";
import { TestItemSelfCheck } from "../testerItems.js";

export const data: TestItem[] = [
	new TestItemSelfCheck(0, DBc()
		.title("Title")
		.text("Text", "Second row")
		.ul("List", "of three", "elements")
		.text("Text ").textCor("correct").text(" and ").textErr("incorrect")
		.text("", "")
		.text("Text with").textColored("orange", "different").textColored("blue", " colors").br()
		.hr().text("Separator")
		.ol("Ordered", "list")
		.text("Formula", "")
		.formula(createFormulas("y = {x}/{2} + 10"))
		.text("Svg image", "")
		.svg("data/turtle.svg")
		,
		DBc("Answer").br()
			.text("Formula inside ").formula(createFormulas("2^{0.5} = \\{2}")).text(" text")
	),
];
```

### FormulaBuilder