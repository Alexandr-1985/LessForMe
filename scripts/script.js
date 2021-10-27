"use strict";

//Работа с Index1.html
const books = document.querySelectorAll(".books"),
    arrBook = document.querySelectorAll(".book");

console.log(books);
console.log(arrBook);

//Восстановить порядок книг.
const arr = Object.keys(arrBook).sort((prev, next) => {
    if (
        arrBook[prev].firstElementChild.innerText >
        arrBook[next].firstElementChild.innerText
    ) {
        return 1;
    }
    if (
        arrBook[prev].firstElementChild.innerText <
        arrBook[next].firstElementChild.innerText
    ) {
        return -1;
    }
});
for (let i = 0; i < arr.length; i++) {
    books[0].append(arrBook[arr[i]]);
}

//Заменить картинку заднего фона на другую из папки image
document.querySelector("body").style.background = "url(./image/open_book.jpg)";
//document.querySelector('body').style.backgroundImage = ('url(./image/open_book.jpg)');

//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
books[0].children[2].querySelector("h2").querySelector("a").textContent =
    '"Книга 3. this и Прототипы Объектов"';

//Удалить рекламу со страницы
document.querySelector(".adv").remove();

//Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const sortChapterLi = (collection) => {
    const sortElements = (arr) => {
        const arrLi = Object.keys(arr).sort((prev, next) => {
            if (arr[prev].textContent > arr[next].textContent) {
                return 1;
            }
            if (arr[prev].textContent < arr[next].textContent) {
                return -1;
            }
        });
        let arrNewLi = [];
        for (let i = 0; i < arrLi.length; i++) {
            arrNewLi.push(arr[arrLi[i]]);
        }
        return arrNewLi;
    };

    let arrChapters = [];
    let arrApp = [];

    const elem = collection.querySelectorAll("li");
    elem.forEach((elLi) => {
        if (elLi.textContent.indexOf("Введение") > 1) {
            collection.insertAdjacentElement("beforebegin", elem[0]);
        } else if (elLi.textContent.indexOf("Предисловие") > 1) {
            collection.insertAdjacentElement("beforebegin", elem[1]);
        } else if (elLi.textContent.indexOf("Глава") > -1) {
            arrChapters.push(elLi);
        } else if (elLi.textContent.indexOf("Приложение") > -1) {
            arrApp.push(elLi);
        }
    });
    arrChapters = sortElements(arrChapters);
    arrChapters.forEach((elLi) => {
        collection.append(elLi);
    });
    arrApp = sortElements(arrApp);
    arrApp.forEach((elLi) => {
        collection.append(elLi);
    });
};

sortChapterLi(books[0].children[1].querySelector("ul"));
sortChapterLi(books[0].children[4].querySelector("ul"));

//в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let chapter = document.createElement("li");
chapter.innerText = "Глава 8: За пределами ES6";
sortChapterLi.books[0].children[5].querySelector("ul").append(chapter);