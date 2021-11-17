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
console.log(totalCount);
/*const mainControlsSelect = document.querySelector(".main-controls__select");
const viewsSelect = document.createElement("class");
console.log(viewsSelect);*/

//Получить все блоки с классом screen в изменяемую переменную(let) через метод querySelectorAll(далее мы будем переопределять ее значение)
let screens = document.querySelectorAll(".screen");
let screensAll = document.querySelector("div.main-controls__views");
console.log(screensAll);

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
    numCount: 0,

    //метод будет запускаться во время загрузки страницы и будет запускать метод start
    init: function() {
        appData.addTitle();
        appData.disabled();
        calcBtn.addEventListener("click", appData.start);
        plusBtn.addEventListener("click", appData.addScreenBlock);
        screensAll.addEventListener("change", appData.checkScreens);
        inputRange.addEventListener("input", appData.checkRollback);
    },

    //отключаем клавишу
    disabled: function() {
        calcBtn.disabled = "disabled";
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
        // appData.showRange();
        appData.showResult();
    },
    //метод для заполнения св-ва screens объектами на основе из верстки
    addScreens: function() {
        screens = document.querySelectorAll(".screen");
        screens.forEach(function(screen, index) {
            let select = screen.querySelector("select");
            let input = screen.querySelector("input");
            //достаем index текст
            const selectName = select.options[select.selectedIndex].textContent;
            console.log(select);
            console.log(input);
            console.log(selectName);
            appData.screens.push({
                id: index,
                name: selectName,
                sumService: +select.value * +input.value,
                count: +input.value,
            });
            console.log(appData.screens);
        });
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

    checkRollback: function() {
        spanRange.innerHTML = inputRange.value + "%";
        appData.rollback = +inputRange.value;
        //метод рассчитывает доход с учетом отката посреднику
        appData.servicePercentPrice =
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
        totalCountRollback.value = appData.servicePercentPrice;
    },

    //метод который выводит все на экран
    showResult: function() {
        total.value = appData.screenPrice;
        totalCount.value = appData.numCount;
        totalCountOther.value =
            appData.servicePricesPercent + appData.servicePricesNumber;
        totalFullCount.value = appData.fullPrice;
    },

    //метод будет высчитывать стоимость наших услуг и экранов
    addPrices: function() {
        //перебираем типы экранов
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.sumService;
        }
        //возвращает сумму всех дополнительных услуг
        for (let key in appData.servicesNumbers) {
            appData.servicePricesNumber += appData.servicesNumbers[key];
        }
        //возвращает процентные доп услуги
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent +=
                appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        //количнство экранов
        for (let numberCount of appData.screens) {
            appData.numCount += numberCount.count;
        }
        //метод рассчитывает доход с учетом отката посреднику
        appData.servicePercentPrice =
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100);

        //возвращает сумму стоимости верстки и стоимости дополнительных услуг
        appData.fullPrice =
            appData.screenPrice +
            appData.servicePricesNumber +
            appData.servicePricesPercent;
    },
    checkScreens: function() {
        screens = document.querySelectorAll(".screen");
        let arrInp = [];
        let arrSel = [];
        console.log(arrInp);
        console.log(arrSel);
        let inputCheck = document.querySelectorAll(
            "div.main-controls__input > input"
        );
        let selectCheck = document.querySelectorAll(
            "div.main-controls__select > select"
        );

        for (let inp of inputCheck) {
            if (inp.value === "") {
                arrInp.push(inp.value);
            }
        }

        for (let sel of selectCheck) {
            if (sel.value === "") {
                arrSel.push(sel.value);
            }
        }

        if (arrInp.length >= 2 || arrSel.length >= 2) {
            calcBtn.disabled = "disabled";
        } else {
            calcBtn.disabled = "";
        }
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

/*variant two -> disabled submit*/
/*checkInputs: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (item) {
      const input = item.querySelector(".screen input");
      const select = item.querySelector(".screen select");
      input.addEventListener("change", appData.checkInputs);
      select.addEventListener("change", appData.checkInputs);
    });
    for (let i = 0; i < screens.length; i++) {
      if (
        screens[i].querySelector("select").selectedIndex === 0 ||
        screens[i].querySelector("input").value === ""
      ) {
        btnStart.disabled = true;
      } else {
        btnStart.disabled = false;
      }
    }
  }*/