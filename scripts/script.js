"use strict";

//console.dir(document);

//Получить заголовок "Калькулятор верстки"через метод getElementsByTagName.(тэг h1, получить именно элемент, а не коллекцию)
const title = document.getElementsByTagName("h1")[0];

//Получить кнопки "Рассчитать" и "Сброс" через метод getElementsByClassName.(класс handler_btn)
const calcBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

// Получить кнопку "+" под выпадающим списком через метод querySelector.(класс screen - btn)
const plusBtn = document.querySelector(".screen-btn");

//Получить все элементы с классом other - items в две разные переменные.В первую элементы у которых так же присутствует класс percent, во вторую элементы у которых так же присутствует класс number через метод querySelectorAll.
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

//Получить input type = range через его родителя с классом rollback одним запросом через метод querySelector.
const inputRange = document.querySelector(".rollback input");

//Получить span с классом range - value через его родителя с классом rollback одним запросом через метод querySelector.
const spanRange = document.querySelector(".rollback .range-value");

//Получить все инпуты с классом total - input справа через метод getElementsByClassName.(класс total - input, получить именно элементы, а не коллекции)
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const totalFullCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

/*const mainControlsSelect = document.querySelector(".main-controls__select");
const viewsSelect = document.createElement("class");
console.log(viewsSelect);*/

//Получить все блоки с классом screen в изменяемую переменную(let) через метод querySelectorAll(далее мы будем переопределять ее значение)
const screens = document.querySelectorAll(".screen");

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    rollback: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0, //все услуги с процентным соотношение
    servicePricesNumber: 0, //все услуги с фиксированной суммой
    servicesPercent: {}, //кладем цену ввиде процента
    servicesNumbers: {}, //кладем фиксированную стоимость

    //метод будет запускаться во время загрузки страницы и будет запускать метод start
    init: function() {
        appData.addTitle();

        //вешаем событие
        document
            .getElementsByClassName("handler_btn")
            .calcBtn.addEventListener("click", appData.start);
        if (calcBtn.length === "" && calcBtn.length === null) {
            calcBtn.style.display = "none";
        }
        plusBtn.addEventListener("click", appData.addScreenBlock);
    },

    addTitle: function() {
        //находим название по тегу
        // console.log(title.textContent);
        //меняем название фавикона
        document.title = title.textContent;
    },

    start: function() {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        //appData.getServicePercentPrices();
        //appData.logger();
        appData.showRange();
        appData.showResult();
    },

    showRange: function() {
        const logger = function(event) {
            spanRange.textContent = event.target.value;
        };
        inputRange.addEventListener("input", logger);
        // inputRange.addEventListener("change", logger);

        appData.rollback = spanRange.textContent;
    },

    //метод который выводит все на экран
    showResult: function() {
        total.value = appData.screenPrice;
        totalCount.value = appData.screens;
        totalCountOther.value =
            appData.servicePricesPercent + appData.servicePricesNumber;
        totalFullCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },

    //метод для заполнения св-ва screens объектами на основе из верстки
    addScreens: function() {
        //переопределяем коллекцию перед каждым расчетом
        const screens = document.querySelectorAll(".screen");

        screens.forEach(function(screen, index) {
            // console.log(screen);
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            //достаем index текст
            const selectName = select.options[select.selectedIndex].textContent;
            //console.log(select.value);
            //console.log(input.value);
            appData.screens.push({
                id: index,
                name: selectName,
                sumService: +select.value * +input.value,
                count: input,
            });
        });
        console.log(appData.screens);
    },

    //перебираем обе коллекции достаем инфу и записать в объект services
    addServices: function() {
        otherItemsPercent.forEach(function(item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type = text]");

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNumber.forEach(function(item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type = text]");

            if (check.checked) {
                appData.servicesNumbers[label.textContent] = +input.value;
            }
        });
    },

    addScreenBlock: function() {
        //создаем переменную первого элемента в коллекции screens
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },

    //метод будет высчитывать стоимость наших услуг и экранов
    addPrices: function() {
        //перебираем типы экранов
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.sumService;
        }
        //количнство экранов
        for (let screen of appData.screens) {
            appData.screens += screen * appData.addScreenBlock;
        }
        //возвращает сумму всех дополнительных услуг
        for (let key in appData.servicesNumbers) {
            appData.servicePricesNumber += appData.servicesNumbers[key];
        }
        //возвращает ghjwtyn
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent +=
                appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        //возвращает сумму стоимости верстки и стоимости дополнительных услуг
        appData.fullPrice =
            appData.screenPrice +
            appData.servicePricesNumber +
            appData.servicePricesPercent;

        //метод рассчитывает доход с учетом отката посреднику
        appData.servicePercentPrice =
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
    },

    //метод будет выводить в консоль необходимую информацию
    logger: function() {
        // Для проерки что ф - я appData работает выводим два значения
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    },
};

appData.init();