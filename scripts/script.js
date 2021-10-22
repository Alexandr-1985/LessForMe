"use strict";

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/////////////////////////////////////////////////
let nNumber;

function gameBot() {
    nNumber = getRandomInt(1, 100);

    function start() {
        let num = prompt("Угадай число от 1 до 100");
        console.log(num);
        if (num > 100) {
            console.log(num);
            alert("Введенное число больше 100");
            start();
        }
        if (num <= 0 || num == null) {
            alert("Введите число от 1 до 100");
            start();
        }

        if (isNumber(num)) {
            if (num > nNumber) {
                alert("Загаданное число больше");
                start();
            } else if (num < nNumber) {
                alert("Загаданное число меньше");
                start();
            } else if (num === nNumber) {
                alert("Поздравляю, вы угадали");
            } else {
                if (confirm("Отмена")) {
                    alert("Игра окончена");
                    return;
                } else {
                    start();
                }
            }
        } else {
            alert("Введите число 333!");
            start();
        }
        //  }
        // start();
    }
    start();
}
gameBot();