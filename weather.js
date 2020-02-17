const apiKey = "fe87d2db4c789eedcaf2f90c1fa980b8";
const weather = document.getElementById("weather");

//strage key name
const coords = "coords";

function getweather(lat, log) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiKey}&units=metric`)
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
    }
    savePosition(positionObj);
    getweather(laPosition, loPosition);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(dropPosition);
    } else {
        weather.innerHTML = "Geolocation is not supported by this browser.";
    }

}

function init() {
    const bringInfo = localStorage.getItem(coords);
    if (bringInfo === null){
        getLocation();
    } else {
    const broughtInfo = JSON.parse(bringInfo);
    getweather(broughtInfo.laPosition, broughtInfo.loPosition);
    }
}

init();