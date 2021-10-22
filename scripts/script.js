"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;
let rollback = 6;
let fullPrice;
let servicePercentPrice;
let allServicePrices;

//isFinite - проверка на число
const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
    title = prompt("Как называется ваш проект?");
    screens = prompt(
        "Какие типы экранов нужно разработать?",
        "Простые, Сложные, Интерактивные"
    );
    screenPrice = prompt("Сколько будет стоить данная работа?");

    //while (isNaN(screenPrice) || screenPrice.trim() === "" || screenPrice === null)
    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(screenPrice));

    adaptive = confirm("Нужен ли адаптив на сайте?");
};

const showTypeOf = (variable) => {
    console.log(variable, typeof variable);
};

//Функция возвращает сумму всех дополнительных услуг
const getAllServicePrices = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        let sumService = 0;
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?", " ");
        }
        if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?", " ");
        }
        do {
            sumService = prompt("Сколько это будет стоить?");
        } while (!isNumber(sumService));
        sum += +sumService;
    }

    return sum;
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

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(servicePercentPrice);
console.log(getRollbackMessage(fullPrice));
console.log(
    "Стоимость верстки экранов " + screenPrice + " юани.",
    "Стоимость разработки сайта  " + fullPrice + " долларов!"
);