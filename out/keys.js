const keys = [
    "theme",
    "statistics",
    "trainerSeed",
    "trainerTurn",
    "trainerTheme",
    "dayStatistic",
    "dayLongest",
];
export const Keys = {};
for (const key of keys)
    Keys[key] = "learner-" + key;
