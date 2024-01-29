inp = open("ru_6.txt", "r", encoding="utf8")
out = open("_ru_6.ts", "w", encoding="utf8")

lineT = 0
id = -1
task = ""
for line in inp:
    line = line.strip()
    if lineT == 0:
        id = int(line)
    if lineT == 1:
        task = line
    if lineT == 3:
        ans = line
        out.write(f'new TestItemChooseWord({id}, "{task}", "{ans}"),\n')
    lineT += 1
    lineT %= 5

inp.close()
out.close()
