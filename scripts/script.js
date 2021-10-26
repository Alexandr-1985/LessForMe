"use strict";
//isFinite - проверка на число
const isNumber = function(num) {
    return (!isNaN(parseFloat(num)) && isFinite(num)) || num.trim() === " ";
};

function isString(s) {
    return !(!isNumber(s) || s === undefined || s === null || s.trim() === " ");
}

//console.dir(document);

//Получить заголовок "Калькулятор верстки"через метод getElementsByTagName.(тэг h1, получить именно элемент, а не коллекцию)
const title = document.getElementsByTagName("h1")[0];
console.log(title);

//Получить кнопки "Рассчитать" и "Сброс" через метод getElementsByClassName.(класс handler_btn)
const calcBtn = document.getElementsByClassName("handler_btn")[0];
console.log(calcBtn);
const resetBtn = document.getElementsByClassName("handler_btn")[1];
console.log(resetBtn);

// Получить кнопку "+" под выпадающим списком через метод querySelector.(класс screen - btn)
const plusBtn = document.querySelector(".screen-btn");
console.log(plusBtn);

//Получить все элементы с классом other - items в две разные переменные.В первую элементы у которых так же присутствует класс percent, во вторую элементы у которых так же присутствует класс number через метод querySelectorAll.
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
console.log(otherItemsPercent);
const otherItemsNumber = document.querySelectorAll(".other-items.number");
console.log(otherItemsNumber);

//Получить input type = range через его родителя с классом rollback одним запросом через метод querySelector.
const inputRange = document.querySelector(".rollback input");
console.log(inputRange);

//Получить span с классом range - value через его родителя с классом rollback одним запросом через метод querySelector.
const spanRange = document.querySelector(".rollback .range-value");
console.log(spanRange);

//Получить все инпуты с классом total - input справа через метод getElementsByClassName.(класс total - input, получить именно элементы, а не коллекции)
const total = document.getElementsByClassName("total-input")[0];
console.log(total);
const totalCount = document.getElementsByClassName("total-input")[1];
console.log(totalCount);
const totalCountOther = document.getElementsByClassName("total-input")[2];
console.log(totalCountOther);
const totalFullCount = document.getElementsByClassName("total-input")[3];
console.log(totalFullCount);

const totalCountRollback = document.getElementsByClassName("total-input")[4];
console.log(totalCountRollback);

//Получить все блоки с классом screen в изменяемую переменную(let) через метод querySelectorAll(далее мы будем переопределять ее значение)
const screens = document.querySelectorAll(".screen");
console.log(screens);

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    rollback: 6,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,

    asking: function() {
        do {
            appData.title = prompt("Как называется ваш проект?");
        } while (isString(appData.title) || appData.title.trim() === "");

        for (let i = 0; i < 2; i++) {
            let name;
            let sumService = 0;

            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (isString(name) || name.trim() === "");

            do {
                sumService = prompt("Сколько будет стоить данная работа");
            } while (!isNumber(sumService) || sumService.trim() === "");

            //ответы сохраняем в массиве объекта
            appData.screens.push({ id: 1, name: name, sumService: sumService });
        }

        for (let i = 0; i < 2; i++) {
            let name;
            let sumService = 0;

            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
            } while (isString(name) || name.trim() === "");

            do {
                sumService = prompt("Сколько это будет стоить?");
            } while (!isNumber(sumService) || sumService.trim() === "");
            //выводим ключь значение
            appData.services[name] = +sumService;
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    //метод будет высчитывать стоимость наших услуг и экранов
    addPrices: function() {
        //перебираем типы экранов
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.sumService;
        }
        //возвращает сумму всех дополнительных услуг
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    //Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
    getFullPrice: function() {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },

    //Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой".
    getTitle: function() {
        appData.title =
            appData.title.trim()[0].toUpperCase() +
            appData.title.trim().substr(1).toLowerCase();
    },

    //Функция возвращает итоговую стоимость за вычетом процента отката.
    getServicePercentPrices: function() {
        appData.servicePercentPrice =
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
    },

    //Конструктор условий
    getRollbackMessage: function(price) {
        if (price >= 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку в 5 %";
        } else if (price >= 0 && price < 15000) {
            return "Скидка не предусмотрена";
        } else {
            return "Что то пошло не так";
        }
    },

    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getTitle();
        appData.getServicePercentPrices();

        appData.logger();
    },

    //метод будет выводить в консоль необходимую информацию
    logger: function() {
        // Для проерки что ф - я appData работает выводим два значения
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    },
};

appData.start();