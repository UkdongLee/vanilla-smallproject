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


/*
<div id="queto">
    <div id="container">
        <form class="queto_form">
            <input type="button" value="button"></input>
        </form>
        <h2 class="queto">This is Queto</h2>
    </div>
</div>
main.js에서 랜덤으로 숫자를 발행하여 db에서 가져올때부터 하나식 가져오게?
-> '클릭'하는 이벤트가 queto.js에 들어가있다. 서버에서 request는 서버를 redirection할때마다 데이터를 갖고오겠지만 '클릭'이라는 이벤트를 갖지는 못한다. 


아니면 queto.js에서 함수로 랜덤 숫자를 만들고 
-> 데이터가 필요하다. 데이터를 main.js에서 받아와야한다. 
*/  

