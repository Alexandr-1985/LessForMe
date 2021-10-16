"use strict";

let title, screens, screenPrice, fullPrice, adaptive;
let rollback = 6;

//metods and properties
console.log(typeof title, typeof fullPrice, typeof adaptive);

console.log(
    "Стоимость верстки экранов " + screenPrice + " юани.",
    "Стоимость разработки сайта  " + fullPrice + " долларов!"
);

console.log(Math.round(fullPrice * (rollback / 100)));

title = prompt("Как называется ваш проект?");
console.log(title);

screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
);
console.log(screens);

console.log(screens.length);
console.log(screens.toLocaleLowerCase().split(" "));

screenPrice = +prompt("Сколько будет стоить данная работа?", 12000);
console.log(screenPrice);

adaptive = confirm("Нужен ли адаптив на сайте?");
console.log(adaptive);

let service1 = prompt("Какой дополнительный тип услуги нужен?", " ");
let servicePrice1 = +prompt("Сколько это будет стоить?", " ");
let service2 = prompt("Какой дополнительный тип услуги нужен?", " ");
let servicePrice2 = +prompt("Сколько это будет стоить?", " ");

//итоговую стоимость работы
fullPrice = +(screenPrice + servicePrice1 + servicePrice2);
console.log("итоговую стоимость работы: ", fullPrice);

//занести в нее итоговую стоимость за вычетом отката посреднику
let n = "Откат посреднику";
n = 3000;
let servicePercentPrice = console.log(Math.ceil(fullPrice - n));

//Конструктор условий
if (fullPrice > 30000) {
    console.log("Даем скидку в 10%");
} else if (15000 < fullPrice && fullPrice < 30000) {
    console.log("Даем скидку в 5 %");
} else if (15000 > fullPrice && fullPrice > 0) {
    console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
    console.log("Что то пошло не так");
} else if (fullPrice === 30000) {
    console.log("Вам он точно нужен?");
} else if (fullPrice === 15000) {
    console.log("Оптимальная цена");
} else if (fullPrice === 0) {
    console.log("Указать цену");
} else {
    console.log("обратиться к рукаводству");
}