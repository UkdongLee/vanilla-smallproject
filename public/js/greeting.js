const greetingId = document.querySelector("#greeting");
const greeting_form = greetingId.querySelector(".greeting_form");
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