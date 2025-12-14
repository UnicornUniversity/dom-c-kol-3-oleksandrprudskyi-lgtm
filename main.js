//TODO v případě potřeby přidá importy
//VŠECHNY doc

/**
 * Hlavní funkce, která volá aplikaci. 
 * Zde prosím přidejte konkrétní popis pro účely aplikace.
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

// pomocné funkce

/**
 * Validuje vstupní parametry
 * @param {object} dtoIn - vstupní parametry
 * @throws {Error} pokud parametry nejsou platné
 */
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

/**
 * Generuje seznam zaměstnanců
 * @param {number} count - počet zaměstnanců
 * @param {number} minAge - minimální věk
 * @param {number} maxAge - maximální věk
 * @returns {Array} seznam zaměstnanců
 */
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

/**
 * Vrací náhodné pohlaví (male/female)
 * @returns {string} náhodné pohlaví
 */
function randomGender() {
    return Math.random() < 0.5 ? Gender.MALE : Gender.FEMALE;
}

/**
 * Vybírá náhodný prvek z pole
 * @param {Array} arr - pole prvků
 * @returns {*} náhodný prvek z pole
 */
function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Vrací náhodné jméno podle pohlaví
 * @param {string} gender - pohlaví (male/female)
 * @returns {string} náhodné jméno
 */
function randomName(gender) {
    return gender === Gender.MALE 
        ? randomFromArray(maleNames) 
        : randomFromArray(femaleNames);
}

/**
 * Vrací náhodné příjmení
 * @returns {string} náhodné příjmení
 */
function randomSurname() {
    return randomFromArray(surnames);
}

/**
 * Vrací náhodnou pracovní zátěž
 * @returns {number} náhodná pracovní zátěž
 */
function randomWorkload() {
    return randomFromArray(AllowedWorkloads);
}

/**
 * Generuje datum narození v rozmezí věku minAge až maxAge.
 * Použit průměrný počet dní v roce 365.25 pro zohlednění přestupných let.
 * @param {number} minAge - minimální věk
 * @param {number} maxAge - maximální věk
 * @returns {string} datum narození ve formátu ISO
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
