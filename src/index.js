
function getTemperature(response){
    let temp = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#temp");
    currentTemp.innerHTML = `${temp} °C`;
    let cityName = response.data.name;
    let h1 = document.querySelector("h1");
    h1.innerHTML = cityName;
    let humidity = Math.round(response.data.main.humidity);
    let currentHum = document.querySelector("#humidity");
    currentHum.innerHTML = `Humidity: ${humidity}%`;
    let windSpeed = response.data.wind.speed;
    let currentWind = document.querySelector("#wind");
    currentWind.innerHTML = `Wind Speed: ${windSpeed} km/h`;
    let maxTemp = Math.round(response.data.main.temp_max);
    let todayMaxTemp = document.querySelector("#tempMax");
    todayMaxTemp.innerHTML = `Max Temp: ${maxTemp}°C`;
    let minTemp = Math.round(response.data.main.temp_min);
    let todayMinTemp = document.querySelector("#tempMin");
    todayMinTemp.innerHTML = `Min Temp: ${minTemp}°C`;
}

function getCity(response){
    let city = response.data.name;
    let apiKey = "751305c75f9526727cdf4f36e45a4e75";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getTemperature);

}

function getPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "751305c75f9526727cdf4f36e45a4e75";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCity);
}

navigator.geolocation.getCurrentPosition(getPosition);