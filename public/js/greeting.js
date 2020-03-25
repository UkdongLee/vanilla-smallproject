const greetingId = document.querySelector("#greeting");
const greeting_form = greetingId.querySelector(".greeting");
const greeting_input = greeting_form.querySelector("input");
const greeting = greetingId.querySelector("h2");

const Key = "GREETING" //key storage
const ACTIVE_CN = "active";

function saveName(text) {
    localStorage.setItem(Key, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = greeting_input.value;
    sayGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    greeting_form.addEventListener("submit", handleSubmit);  //should add 'form'
}

function sayGreeting(text) {
    greeting_form.removeChild(greeting_input);
    greeting.classList.add(ACTIVE_CN);
    greeting.innerHTML = `안녕하세요 ${text}님.`
}

function loadName() {
    const currentUser = localStorage.getItem(Key);
        if(currentUser === null){
            askForName(); //nobody
        } else {
            sayGreeting(currentUser); //somebody
        }
}

function init() {
    loadName();
}

init();

// 인사문구를 서버쪽에서 아예 새로만드는게 좋을듯, 로컬 스토리지는 더이상 필요가 없다 왜냐면 mysql의 데이터베이스를 
// 이용하기 때문이다. 따라서 일단 components의 클래스를 배열로 넣는게 아닌 다 따로 새로 모듈로서 만든다.
// 데이터 베이스의 아이디(유니크)로 로그인 시 해당 닉네임으로 인사를 하게 만든다. (세션을 적용시켜야 할까?)