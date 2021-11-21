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
    init: () => {
        this.addTitle();
        this.disabled();
        this.checkEmptyInputs();
        this.switchButtonDisabled();
        calcBtn.addEventListener("click", () => {
            this.start();
            this.changeDisabledStatus();
            this.hideButton(calcBtn, resetBtn);
        });
        resetBtn.addEventListener("click", () => {
            this.reset();
            this.showResult();
            this.changeDisabledStatus();
            this.hideButton(resetBtn, calcBtn);
        });
        plusBtn.addEventListener("click", () => {
            this.isError = true;
            this.addScreenBlock();
            this.switchButtonDisabled();
        });
        screensAll.addEventListener("change", () => {
            this.checkScreens();
        });
        inputRange.addEventListener("input", () => {
            this.checkRollback();
            this.showResult();
        });
    },

    //отключаем клавишу
    disabled: () => {
        calcBtn.disabled = "disabled";
    },

    addTitle: () => {
        //находим название по тегу
        // console.log(title.textContent);
        //меняем название фавикона
        document.title = title.textContent;
    },

    start: () => {
        this.addScreens();
        this.addServices();
        this.addPrices();
        //appData.getServicePercentPrices();
        //appData.logger();
        // appData.showRange();
        this.showResult();
    },
    reset: () => {
        this.screens = [];

        const allCheckbox = document.querySelectorAll("input[type=text]");

        allCheckbox.forEach((text) => {
            text.checked = false;
        });

        screens.forEach((screen, index) => {
            if (index !== 0) {
                screen.remove();
            }

            screen.querySelector("select").selectedIndex = 0;
            screen.querySelector("input").value = "";
        });
        this.isError = true;
        this.switchButtonDisabled();
    },

    checkEmptyInputs: () => {
        screens.forEach((screen) => {
            screen.closest(".element").addEventListener("input", () => {
                this.switchIsError();
                this.switchButtonDisabled();
            });
        });
    },

    switchIsError: () => {
        const selects = document.querySelectorAll(".screen select");
        const inputs = document.querySelectorAll(".screen input");
        const allInputs = [...selects, ...inputs];

        allInputs.some((input) => {
            if (input.value === "" || input.value === "0") {
                this.isError = true;
            } else {
                this.isError = false;
            }
            return this.isError;
        });
    },

    switchButtonDisabled: () => {
        if (this.isError) {
            calcBtn.setAttribute("disabled", "true");
            calcBtn.style.opacity = "0.5";
            calcBtn.style.cursor = "default";
        } else {
            calcBtn.removeAttribute("disabled");
            calcBtn.style.opacity = "1";
            calcBtn.style.cursor = "pointer";
        }
    },

    changeDisabledStatus: () => {
        const selects = document.querySelectorAll(
            'elements select[name="views-select"]'
        );
        const inputs = document.querySelectorAll('elements input[type="text"]');
        const checkbox = document.querySelectorAll(".custom-checkbox");
        const screenSelects = document.querySelectorAll(".screen select");
        const screenInputs = document.querySelectorAll(".screen input");

        const allElements = [
            ...selects,
            ...inputs,
            ...checkbox,
            ...screenSelects,
            ...screenInputs,
            plusBtn,
        ];

        allElements.forEach((element) => {
            element.hasAttribute("disabled") ?
                element.removeAttribute("disabled") :
                element.setAttribute("disabled", "true");
        });
    },

    hideButton: function(buttonShow, buttonHide) {
        buttonShow.style.display = "block";
        buttonHide.style.display = "none";
    },

    //метод для заполнения св-ва screens объектами на основе из верстки
    addScreens: () => {
        screens = document.querySelectorAll(".screen");
        screens.forEach((screen, index) => {
            let select = screen.querySelector("select");
            let input = screen.querySelector("input");
            //достаем index текст
            const selectName = select.options[select.selectedIndex].textContent;
            console.log(select);
            console.log(input);
            console.log(selectName);
            this.screens.push({
                id: index,
                name: selectName,
                sumService: +select.value * +input.value,
                count: +input.value,
            });
            console.log(this.screens);
        });
    },
    //перебираем обе коллекции достаем инфу и записать в объект services
    addServices: () => {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type = text]");
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type = text]");
            if (check.checked) {
                this.servicesNumbers[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: () => {
        //создаем переменную первого элемента в коллекции screens
        const cloneScreen = screens[0].cloneNode(true);
        cloneScreen.querySelector("input").value = "";
        screens[screens.length - 1].after(cloneScreen);
    },

    checkRollback: () => {
        spanRange.innerHTML = inputRange.value + "%";
        this.rollback = +inputRange.value;
        //метод рассчитывает доход с учетом отката посреднику
        this.servicePercentPrice =
            this.fullPrice - this.fullPrice * (this.rollback / 100);
        totalCountRollback.value = this.servicePercentPrice;
    },

    //метод который выводит все на экран
    showResult: () => {
        total.value = this.screenPrice;
        totalCount.value = this.numCount;
        totalCountOther.value =
            this.servicePricesPercent + this.servicePricesNumber;
        totalFullCount.value = this.fullPrice;
    },

    //метод будет высчитывать стоимость наших услуг и экранов
    addPrices: () => {
        //перебираем типы экранов
        for (let screen of appData.screens) {
            this.screenPrice += +screen.sumService;
        }
        //возвращает сумму всех дополнительных услуг
        for (let key in this.servicesNumbers) {
            this.servicePricesNumber += this.servicesNumbers[key];
        }
        //возвращает процентные доп услуги
        for (let key in this.servicesPercent) {
            this.servicePricesPercent +=
                this.screenPrice * (this.servicesPercent[key] / 100);
        }
        //количнство экранов
        for (let numberCount of appData.screens) {
            this.numCount += numberCount.count;
        }
        //метод рассчитывает доход с учетом отката посреднику
        appData.servicePercentPrice =
            this.fullPrice - this.fullPrice * (this.rollback / 100);

        //возвращает сумму стоимости верстки и стоимости дополнительных услуг
        appData.fullPrice =
            this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    },
    checkScreens: () => {
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
    logger: () => {
        // Для проерки что ф - я appData работает выводим два значения
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