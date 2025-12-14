//TODO v případě potřeby přidá importy
//VŠECHNY doc
/**
 * Hlavní funkce, která volá aplikaci.
 * @param {object} dtoIn obsahuje počet zaměstnanců, věkový limit zaměstnanců {min, max}
 * @returns {Array} zaměstnanců ve formátu
 *                   {
 *                       gender: "male"|"female",
 *                       birthdate: "YYYY-MM-DDTHH:MM:SS.sssZ",
 *                       name: "Jan",
 *                       surname: "Novák",
 *                       workload: 40
 *                   },
 *                  kde počet zaměstnanců je určen parametrem count v dtoIn
 */
export function main(dtoIn) {
    validateDtoIn(dtoIn);
    const count = dtoIn.count;
    const minAge = dtoIn.age.min;
    const maxAge = dtoIn.age.max;
    return generateEmployees(count, minAge, maxAge);
}

// konfigurace
const Gender = Object.freeze({ MALE: "male", FEMALE: "female" });
const AllowedWorkloads = [10, 20, 30, 40];

// seznamy jmen a příjmení
const maleNames = [
    "Jan", "Petr", "Josef", "Pavel", "Martin", "Tomáš", "Jaroslav", "Lukáš", "Milan", "David",
    "Michal", "Karel", "Václav", "Jiří", "Jakub", "Adam", "Ondřej", "Filip", "Daniel", "Matěj",
    "Vojtěch", "Marek", "Ladislav", "Antonín", "František", "Dominik", "Patrik", "Roman", "Radek", "Stanislav",
    "Darek", "Bohuslav", "Ivo", "Miroslav", "Oldřich", "Zdeněk", "Oto", "Leoš", "Rostislav", "Radim",
    "Bohumil", "Libor", "Šimon", "Vladimír", "Robin", "Erik", "Marius", "Emil", "Vratislav", "Bohdan"
];
const femaleNames = [
    "Marie", "Jana", "Eva", "Hana", "Anna", "Lenka", "Kateřina", "Lucie", "Alena", "Petra",
    "Veronika", "Tereza", "Martina", "Michaela", "Zuzana", "Markéta", "Kristýna", "Barbora", "Pavla", "Štěpánka",
    "Nikola", "Karolína", "Andrea", "Jitka", "Ivana", "Monika", "Dagmar", "Božena", "Helena", "Libuše",
    "Irena", "Milena", "Simona", "Eliška", "Magdaléna", "Sára", "Dominika", "Klára", "Nela", "Viktorie",
    "Běla", "Renata", "Radka", "Luciana", "Zlata", "Alžběta", "Růžena", "Bohumila", "Adéla", "Blanka"
];
const surnames = [
    "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec",
    "Marek", "Pospíšil", "Pokorný", "Hájek", "Král", "Jelínek", "Růžička", "Beneš", "Fiala", "Sedláček",
    "Doležal", "Zeman", "Kolář", "Navrátil", "Čermák", "Urban", "Vaněk", "Blažek", "Kříž", "Kovář",
    "Šimek", "Kratochvíl", "Vlček", "Polák", "Musil", "Štěpánek", "Kopecký", "Holub", "Soukup", "Bláha",
    "Vít", "Bureš", "Kadlec", "Zbořil", "Tomášek", "Horáček", "Veverka", "Bartoš", "Benda", "Havel"
];

// pomocne funkce
function validateDtoIn(dtoIn) {
    if (!dtoIn || typeof dtoIn !== "object") {
        throw new Error("dtoIn musi byt objekt");
    }
    if (!Number.isInteger(dtoIn.count) || dtoIn.count <= 0) {
        throw new Error("dtoIn.count musi byt kladne cele cislo");
    }
    if (!dtoIn.age || typeof dtoIn.age !== "object") {
        throw new Error("dtoIn.age musi byt objekt{min, max}");
    }
    const min = dtoIn.age.min;
    const max = dtoIn.age.max;
    if (typeof min !== "number" || typeof max !== "number" || Number.isNaN(min) || Number.isNaN(max)) {
        throw new Error("dtoIn.age.min a dtoIn.age.max musi byt cisla");
    }
    if (!(min <= max)) {
        throw new Error("dtoIn.age.min musi byt mensi nebo rovno dtoIn.age.max");
    }
    if (min < 0) {
        throw new Error("dtoIn.age.min nesmi byt zaporne");
    }
}

// generovani zamestnancu
function generateEmployees(count, minAge, maxAge) {
    const employees = [];
    for (let i = 0; i < count; i++) {
        const gender = randomGender();
        const name = randomName(gender);
        const surname = randomSurname();
        const workload = randomWorkload();
        const birthdate = generateBirthdate(minAge, maxAge);

        employees.push({
            gender,
            birthdate,
            name,
            surname,
            workload
        });
    }
    return employees;
}

function randomFromArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("randomFromArray expects a non-empty array");
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomGender() {
    return Math.random() < 0.5 ? Gender.MALE : Gender.FEMALE;
}

function randomName(gender) {
    return gender === Gender.MALE ? randomFromArray(maleNames) : randomFromArray(femaleNames);
}

function randomSurname() {
    return randomFromArray(surnames);
}

function randomWorkload() {
    return randomFromArray(AllowedWorkloads);
}

/* Genereruje datum narození v rozmezí věku minAge až maxAge.
 * Pouzity prumerny pocet dnu v roce 365.25 pro zohledneni prestupnych let.
 */
function generateBirthdate(minAge, maxAge) {
    const now = new Date();
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const earliest = new Date(Math.round(now.getTime() - maxAge * msPerYear));
    const latest = new Date(Math.round(now.getTime() - minAge * msPerYear));
    const rand = Math.random();
    const randomMs = Math.round(earliest.getTime() + rand * (latest.getTime() - earliest.getTime()));
    return new Date(randomMs).toISOString();
}
