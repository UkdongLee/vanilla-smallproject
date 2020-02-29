const form = document.querySelector(".js-greeting-form");
const input = form.querySelector("input");
const greetings = document.querySelector(".greetings");

const Key = 'GREETING' //key storage
const ACTIVE_CN = "active";

function saveName(text) {
    localStorage.setItem(Key, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    sayGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.addEventListener("submit", handleSubmit);
}

function sayGreeting(text) {
    form.removeChild(input);
    greetings.classList.add(ACTIVE_CN);
    greetings.innerHTML = `안녕하세요 ${text}님.`
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