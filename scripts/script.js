let title = "les02";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 12;
let rollback = 6;
let fullPrice = 55000;
let adaptive = true;

//metods and properties

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(
    "Стоимость верстки экранов " + screenPrice + " юани.",
    "Стоимость разработки сайта  " + fullPrice + " долларов!"
);
console.log(screens.toLocaleLowerCase().split(" "));

console.log(Math.round(fullPrice * (rollback / 100)));