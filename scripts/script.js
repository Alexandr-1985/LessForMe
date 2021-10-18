"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?", 12000);
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?", " ");
let servicePrice1 = +prompt("Сколько это будет стоить?", " ");
let service2 = prompt("Какой дополнительный тип услуги нужен?", " ");
let servicePrice2 = +prompt("Сколько это будет стоить?", " ");
let rollback = 6;
let fullPrice;
let servicePercentPrice;
let allServicePrices;

const showTypeOf = (variable) => {
    console.log(variable, typeof variable);
};

//Функция возвращает сумму всех дополнительных услуг
const getAllServicePrices = function() {
    return servicePrice1 + servicePrice2;
};

//Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getFullPrice = function() {
    return screenPrice + allServicePrices;
};

//Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой".
const getTitle = function() {
    return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
    // return title.trim().toLocaleLowerCase().split(" ");
};

//Функция возвращает итоговую стоимость за вычетом процента отката.
const getServicePercentPrices = function() {
    return fullPrice - fullPrice * (rollback / 100);
};

//Конструктор условий
const getRollbackMessage = function(price) {
    if (price >= 30000) {
        return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
        return "Даем скидку в 5 %";
    } else if (price >= 0 && price < 15000) {
        return "Скидка не предусмотрена";
    } else {
        return "Что то пошло не так";
    }
};

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(servicePercentPrice);
console.log(getRollbackMessage(fullPrice));
console.log(
    "Стоимость верстки экранов " + screenPrice + " юани.",
    "Стоимость разработки сайта  " + fullPrice + " долларов!"
);