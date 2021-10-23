"use strict";
//isFinite - проверка на число
const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const appData = {
    title: "",
    screens: "",
    screenPrice: 0,
    adaptive: true,
    service1: "",
    service2: "",
    rollback: 6,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,

    asking: function() {
        appData.title = prompt("Как называется ваш проект?");
        appData.screens = prompt(
            "Какие типы экранов нужно разработать?",
            "Простые, Сложные, Интерактивные"
        );

        //while (isNaN(screenPrice) || screenPrice.trim() === "" || screenPrice === null)
        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
        } while (!isNumber(appData.screenPrice));

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    //Функция возвращает сумму всех дополнительных услуг
    getAllServicePrices: function() {
        let sum = 0;

        for (let i = 0; i < 2; i++) {
            let sumService = 0;
            if (i === 0) {
                appData.service1 = prompt(
                    "Какой дополнительный тип услуги нужен?",
                    " "
                );
            }
            if (i === 1) {
                appData.service2 = prompt(
                    "Какой дополнительный тип услуги нужен?",
                    " "
                );
            }
            do {
                sumService = prompt("Сколько это будет стоить?");
            } while (!isNumber(sumService));
            sum += +sumService;
        }

        return sum;
    },

    //Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
    getFullPrice: function() {
        return appData.screenPrice + appData.allServicePrices;
    },

    //Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой".
    getTitle: function() {
        return (
            appData.title.trim()[0].toUpperCase() +
            appData.title.trim().substr(1).toLowerCase()
        );
        // return title.trim().toLocaleLowerCase().split(" ");
    },

    //Функция возвращает итоговую стоимость за вычетом процента отката.
    getServicePercentPrices: function() {
        return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
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
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.title = appData.getTitle();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.logger();
    },

    //метод будет выводить в консоль необходимую информацию
    logger: function() {
        for (let elem in appData) {
            console.log("Свойства: " + elem + ", Методы объекта: " + appData[elem]);
        }
        // Для проерки что ф - я appData работает выводим два значения
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
    },
};

appData.start();