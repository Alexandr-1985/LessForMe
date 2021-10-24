"use strict";
//isFinite - проверка на число
const isNumber = function(num) {
    return (!isNaN(parseFloat(num)) && isFinite(num)) || num.trim() === " ";
};

function isString(s) {
    return !(!isNumber(s) || s === undefined || s === null || s.trim() === " ");
}

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
                name = prompt("Какой дополнительный тип услуги нужен?", " ");
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