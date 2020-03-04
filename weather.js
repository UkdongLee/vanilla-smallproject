const apiKey = "fe87d2db4c789eedcaf2f90c1fa980b8";
const weather = document.getElementById("weather");

//strage key name
const coords = "coords";

function getweather(broughtInfo) {
    const lat = broughtInfo.laPosition;
    const log = broughtInfo.loPosition;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiKey}&units=metric`; 

    fetch(url)
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function savePosition(coord) {
    localStorage.setItem(coords, JSON.stringify(coord));
}

function dropPosition(position) {
    const laPosition = position.coords.latitude;
    const loPosition = position.coords.longitude;
    const positionObj = {
        laPosition,
        loPosition
    };
    savePosition(positionObj);
    console.log('this is dropPosition');
    getweather(laPosition, loPosition); // 내 생각엔 여기가 문제야. 매개변수가 2개인데 getweather함수에서 매개변수 1개로 받는중임... 이게 정상적으로 위치값이 전달되는걸까?
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(dropPosition);
        console.log('this is getLocation')
    } else {
        weather.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function init() {
    const bringInfo = localStorage.getItem(coords);
    if (bringInfo === null){
        console.log('this is bringInfo')
        getLocation();
    } else {
    const broughtInfo = JSON.parse(bringInfo);
    getweather(broughtInfo);
    }
}

init();