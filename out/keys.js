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
    "completeCount",
    "lessAdv",
    "lastAwr",
];
export const Keys = {};
for (const key of keys)
    Keys[key] = "learner-" + key;
