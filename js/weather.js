const API_KEY = "846c017113bfe608bbf609d85f025ebf";
const COORDS_LS = 'coords';
const weather = document.querySelector(".js-weather");

function showWeather(weatherList){
          weather.innerText = `${weatherList.name}, ${weatherList.temp}°C, ${weatherList.weather}`;

          
}

function getWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            const weatherList = {
                name: json.name,
                temp: json.main.temp,
                weather: json.weather[0].main 
            }
            console.log(weatherList);
            showWeather(weatherList);
        })

}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    getWeather(latitude, longitude);
    saveCoords(coordsObj);

    console.log(latitude, longitude);
}

function handleGeoError() {
    console.log("위치정보를 받아올수없습니다.");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS_LS);
    if (loadedCords === null) {
        askForCoords();
    } else {
        //getWeather
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();