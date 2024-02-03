const keys = [
    "theme",
    "statistics",
    "trainerSeed",
    "trainerTurn",
    "trainerTheme",
    "dayStatistic",
    "dayLongest",
    "animDisable",
    "customTheme",
    "customColors",
];
export const Keys = {};
for (const key of keys)
    Keys[key] = "learner-" + key;
