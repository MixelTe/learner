# learner / ЛЯРО

A user-friendly and beautiful web platform for learning theory and solving tests

Удобная и красивая веб-платформа для изучения теории и решения тестов

# How to create your own learner

1. View [example](https://mixelte.github.io/learner)
1. [Fork repo](https://github.com/MixelTe/learner/fork)
2. [Add data](#adding-data)
3. [Configure titles](#config-titles)
4. [Configure or disable metrika](#config-metrika)

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
`ts/formulasBuilder.ts` has the following exports:
* class FormulaBuilder - formula builder
* function FB(text?: string) - short for `new FormulaBuilder().t(text)`
* function createFormula(formula: string, italic = false) - parses the string and generates a FormulaBuilder
* function createFormulas(...rows: string[]) - generates (with `createFormula(row, true)`) a table with one formula per row

#### FormulaBuilder methods:
 method                                        | description
-----------------------------------------------|-------------
a(fb: FormulaBuilder)                          | append another FormulaBuilder content
t(text: string, replace = true)                | append text, replaces some letters to svg
f(top: FormulaBuilder, bottom: FormulaBuilder) | append fraction
l(letter: CustomLetter)                        | append letter from CustomLetters collection (svg or utf8 char)
up(fb: FormulaBuilder)                         | append superscript
lw(fb: FormulaBuilder)                         | append sublinear text
sq(fb: FormulaBuilder)                         | append formula under the root sign
vec(fb: FormulaBuilder)                        | append formula under the vector sign
hat(fb: FormulaBuilder)                        | append formula under the hat sign
arc(fb: FormulaBuilder)                        | append formula under the arc sign
sum(fb: FormulaBuilder)                        | append sum sign with the formula below
union(fb: FormulaBuilder)                      | append formula with union symbol before it
system(fb: FormulaBuilder)                     | append formula with system symbol before it
noItalic(fb: FormulaBuilder)                   | append formula with disabled italic style
alignRight(fb: FormulaBuilder)                 | append formula with right align
table(...rows: FormulaBuilder[])               | append table of formulas
centerInCell()                                 | center current formula in table cell
bigger()                                       | make current formula bigger font size
smaller()                                      | make current formula smaller font size
wrap()                                         | allow text wrap for current formula
italic()                                       | make current formula italic


Example:
```ts
import { FB, formulaLetters } from "../formulasBuilder.js";
// y = (x)/(2) + 10
FB("y = ").f(FB("x"), FB("2")).t(" + 10");

// S_(x_1) = x_0 + V_x * t + (a_x * t^2)/(2)
FB("S").lw(FB("x").lw(FB("1"))).t(" = x").lw(FB("0")).t(" + V").lw(FB("x")).t("t + ").f(FB("a").lw(FB("x")).t("t").up(FB("2")), FB("2"));

// x ≥ 10 and x < 20
FB().system(FB().table(FB("x ").l(formulaLetters["ge"]).t(" 10"), FB("x < 20")))
```

#### createFormula:
Significantly simplifies the writing of formulas

Example:
```ts
import { createFormulas } from "../formulasBuilder.js";
// y = (x)/(2) + 10
createFormulas("y = {x}/{2} + 10")

// S_(x_1) = x_0 + V_x * t + (a_x * t^2)/(2)
createFormulas("S_{x_1} = x_0 + V_xt + {a_xt^2}/{2}")

// x ≥ 10 and x < 20
createFormulas("").system(createFormulas("x 'ge 10", "x < 20"))
```

The special character is applied to the following letter or block

Special characters in `createFormulas()`:

symbol | desc
-------|--------
\|     | if first char - center cell
\\     | if first char - wrap line
{...}  | block
_      | subscript
^      | superscript
&      | vector
\#     | overline
\\     | square root
\@     | no italic
\>     | align right
u{}    | arc (only for block)
'      | transform next character

Character transformations:

ch | result
---|--------
v  | ν
r  | ρ
m  | μ
n  | 𝜈
a  | α
d  | Δ
P  | π
l  | λ
w  | ω
b  | β
t  | τ
s  | ϭ
e  | ϵ
E  | ε
f  | φ
O  | Ω
T  | η
Z  | ℤ
N  | ℕ
0  | °
/  | ⟂
\| | ∥
<  | ∠
u  | ∪
i  | ∩
\+ | ±
\- | ∓
~  | ≈
=  | ≠
ge | ≥
le | ≤
in | ∈
ar | ⇒
ab | ⇔

## Config titles

1. Edit app name on main page: `index.html: #p-start > h4`
2. Set app version on main page: `index.html: #p-start > .version`
3. Edit about page: `index.html: #p-about`, css: `styles/p-about.css`
4. If you change the page title, be sure to sync it with the app name in `manifest.json`.


## Config metrika

App is using Yandex metrika

### Disable metrika
Remove all code inside these tags in the `index.html` file.
```html
<!-- Yandex.Metrika counter -->
	...
<!-- /Yandex.Metrika counter -->
```
If you want to get rid of the "metrika is undefined" messages in the console, remove the logging call in the `ts/metrika.ts: saveCall()` function.

### Configure metrika

1. Do not delete the code mentioned in the previous section, but replace the metrika id with your own in two places.
2. Replace the metrika id in variable `ts/metrika.ts: const code`
3. Set the following goals in the metrika console:
	* tester_done
	* tester_start
	* data_export
	* data_import
	* data_reset_progress
	* data_reset_full

### Adv
You can add yandex adv

1. Uncomment Yandex.RTB code in `index.html` head
2. Edit block id in `index.html` footer
3. Comment `return` and edit block id in `ts/metrika.ts: function enableBottomAdv()`
4. Comment `return` and edit block ids in `ts/metrika.ts: function showAdvFullscreen()`