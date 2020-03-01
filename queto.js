const queto = document.querySelector("#queto");
const queto_input = queto.querySelector("input");
const quetoSen = queto.querySelector(".queto");

function paintQueto() {
    textNum = genNum();
    quetoSen.innerHTML = arrSen[textNum];
}

function genNum() {
    return Math.floor(Math.random() * arrSen.length);
}

function init() {
    queto_input.addEventListener("click", paintQueto);
}

init();