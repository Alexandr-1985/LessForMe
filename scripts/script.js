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
let screenPerNum = [...otherItemsPercent, ...otherItemsNumber];
console.log(screenPerNum);
let appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    screensCount: 0,
    adaptive: true,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0, //все услуги с процентным соотношение
    servicePricesNumber: 0, //все услуги с фиксированной суммой
    rollback: 0,
    servicesPercent: {}, //кладем цену ввиде процента
    servicesNumber: {}, //кладем фиксированную стоимость
    //метод будет запускаться во время загрузки страницы и будет запускать метод start
    init: function() {
        this.addTitle();
        plusBtn.addEventListener("click", () => {
            this.addScreenBlock();
        });
        calcBtn.addEventListener("click", () => {
            screensAll = document.querySelectorAll(".screen");
            let count = 0;

            screensAll.forEach((screen) => {
                const select = screen.querySelector("select");
                const input = screen.querySelector("input");

                if (select.value && input.value) {
                    count++;
                }
            });
            if (count === screensAll.length) {
                this.start();
                calcBtn.style.display = "none";
                resetBtn.style.display = "";
                this.switcher();
            } else alert("Заполните поля!");
        });

        inputRange.addEventListener("input", (e) => {
            spanRange.textContent = e.target.value;
            this.rollback = +e.target.value;
            if (this.fullPrice) {
                this.servicePercentPrice =
                    this.fullPrice - (this.fullPrice * this.rollback) / 100;
                totalCountRollback.value = this.servicePercentPrice;
            }
        });

        resetBtn.addEventListener("click", () => this.reset());
    },
    //находим название по тегу
    // console.log(title.textContent);
    //меняем название фавикона
    addTitle: function() {
        document.title = title.textContent;
    },
    //метод для заполнения св-ва screens объектами на основе из верстки
    addScreens: function() {
        screensAll = document.querySelectorAll(".screen");
        screensAll.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            //достаем index текст
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                screenCount: +input.value,
            });
        });
    },
    //создаем переменную первого элемента в коллекции screens
    addScreenBlock: function() {
        screensAll = document.querySelectorAll(".screen");
        const cloneScreen = screensAll[0].cloneNode(true);
        cloneScreen.querySelector("input").value = "";
        screensAll[screensAll.length - 1].after(cloneScreen);
    },
    //перебираем обе коллекции достаем инфу и записать в объект services
    addServices: function() {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    //метод будет высчитывать стоимость наших услуг и экранов
    addPrices: function() {
        //перебираем типы экранов
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
            this.screensCount += +screen.screenCount;
        }
        //возвращает сумму всех дополнительных услуг
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        //возвращает процентные доп услуги
        for (let key in this.servicesPercent) {
            this.servicePricesPercent +=
                this.screenPrice * (this.servicesPercent[key] / 100);
        }
        //возвращает сумму стоимости верстки и стоимости дополнительных услуг
        this.fullPrice =
            this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        //метод рассчитывает доход с учетом отката посреднику
        this.servicePercentPrice =
            this.fullPrice - (this.fullPrice * this.rollback) / 100;
    },
    //метод который выводит все на экран
    showResult: function() {
        total.value = this.screenPrice;
        totalCount.value = this.screensCount;
        totalCountOther.value =
            this.servicePricesNumber + this.servicePricesPercent;
        totalFullCount.value = this.fullPrice;
        totalCountRollback.value = Number(this.servicePercentPrice);
    },
    resetScreens: function() {
        screensAll = document.querySelectorAll(".screen");
        screensAll.forEach((value, key) => {
            if (key !== 0) {
                value.remove();
            } else {
                const resetSelect = value.querySelector("select");
                resetSelect.value = "";
                const resetInput = value.querySelector("input");
                resetInput.value = "";
            }
        });
    },
    resetCheckBoxes: function() {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");

            if (check.checked) {
                check.checked = false;
            }
        });

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");

            if (check.checked) {
                check.checked = false;
            }
        });
    },
    resetResults: function() {
        total.value = 0;
        totalCount.value = 0;
        totalCountOther.value = 0;
        totalFullCount.value = 0;
        totalCountRollback.value = 0;
        inputRange.value = 0;
        spanRange.textContent = "0";
        this.fullPrice = 0;
        this.screens = [];
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.screensCount = 0;
        this.screenPrice = 0;
        this.rollback = 0;
        this.servicePercentPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
    },
    switcher: function() {
        const allSelects = document.querySelectorAll(".screen select");
        allSelects.forEach((value) => {
            value.disabled = !value.disabled;
        });
        const allInputs = document.querySelectorAll(".screen input[type='text']");
        allInputs.forEach((value) => {
            value.disabled = !value.disabled;
        });
        const allCheckboxes = document.querySelectorAll(".custom-checkbox");
        allCheckboxes.forEach((value) => {
            value.disabled = !value.disabled;
        });
    },
    reset: function() {
        this.resetScreens();
        this.resetCheckBoxes();
        this.resetResults();
        this.switcher();
        calcBtn.style.display = "";
        resetBtn.style.display = "none";
    },
    start: function() {
        this.addServices();
        this.addScreens();
        this.addPrices();
        this.showResult();
        //     this.logger();
    },
    logger: function() {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);
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