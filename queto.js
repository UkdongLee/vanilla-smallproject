const queto = document.querySelector(".queto");
var input2 = queto.querySelector("input");
const quetoSen = queto.querySelector(".quetoSen");

function paintQueto() {
    textNum = genNum();
    quetoSen.innerHTML = arrSen[textNum];
}

function genNum() {
    return Math.floor(Math.random() * arrSen.length);
}

function init() {
    input2.addEventListener("click", paintQueto);
}

init();