const queto = document.querySelector(".queto");
var input2 = queto.querySelector("input");
const quetoSen = queto.querySelector(".quetoSen");

let arrSen = [
    '박상균은 작다.',
    '박상균은 여자를 좋아한다.',
    '박상균은 사랑을 아는 남자다.',
    '상균이'
];

function paintQueto() {
    textNum = genNum();
    quetoSen.innerHTML = arrSen[textNum];
}

function genNum() {
    return Math.floor(Math.random() * arrSen.length);
}

function openTextFile(){
    input2.
}



function init() {
    input2.addEventListener("click", paintQueto);
}


init();