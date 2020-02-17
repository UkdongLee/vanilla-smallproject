const apiKey = "fe87d2db4c789eedcaf2f90c1fa980b8";
const weather = document.getElementById("weather");

//strage key name
const coords = "coords";

function getweather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function dropPosition(position) {
    const laPosition = position.coords.latitude;
    const loPosition = position.coords.longitude;
    getweather(laPosition, loPosition);
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

function loadWeather() {
    
}

function init() {
    getLocation();
    
    // const bringInfo = localStorage.getItem(coords);
    // if (bringInfo === null){
    //     getLocation();
    // } else {

    // }
}

init();