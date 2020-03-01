const clock = document.querySelector('#clock');
const clockTitle = clock.querySelector('.clock');

function runClock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    runClock();
    setInterval(runClock, 1000);
}

init();