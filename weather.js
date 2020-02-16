const weather = document.getElementById("weather");


function dropPosition(position) {
    weather.innerHTML = "lat" + position.coords.latitude + "log" + position.coords.longitude;

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(dropPosition);
    } else {
        weather.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function paintWeather() {

}

function init() {
    getLocation();
}

init();