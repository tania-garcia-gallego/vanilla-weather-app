
function getCoordForecast(coordinates){
    console.log(coordinates);
    let apiKey="751305c75f9526727cdf4f36e45a4e75";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function getTemperature(response){
    let temp = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#temp");
    currentTemp.innerHTML = `${temp}°C`;
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
    let weatherIcon = response.data.weather[0].icon;
    let icon = document.querySelector("#icon");
    icon.setAttribute("src" , `http://openweathermap.org/img/wn/${weatherIcon}@2x.png `); 
    let weatherDescription = response.data.weather[0].description;
    let currentWeatherDescription = document.querySelector("#weatherDescription");
    currentWeatherDescription.innerHTML =  `It's a ${weatherDescription} day!`;

    getCoordForecast(response.data.coord);
}

function formatForecastDay(timestamp){
let date = new Date (timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function displayForecast(response) {
    let forecastArray = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = ` <div class="row"> ` ;
    
    forecastArray.forEach(function(forecastDay, index){
        if (index < 5) {
forecastHTML = forecastHTML + ` 
    
    <div class= "col-2 card" >
      <div class= "forecastDate">${formatForecastDay(forecastDay.dt)}</div>
      <div class="forecastIcon"><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class= "forecastIcon" id="forecastIcon"/></div>
      <div class="forecastTemp">
        <span class="forecastTempMax">${Math.round(forecastDay.temp.max)}°C</span>
        <span class="forecastTempMin">${Math.round(forecastDay.temp.min)}°C</span>
      </div>

    </div>`;
        }
    });

    

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;


}

function getCity(response){
    let city = response.data.name;
    let apiKey = "751305c75f9526727cdf4f36e45a4e75";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getTemperature);

}

function getCityName(event){
    event.preventDefault();
    let cityName = document.querySelector("#search-input").value;
    let apiKey = "751305c75f9526727cdf4f36e45a4e75";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getTemperature);
}

function getPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "751305c75f9526727cdf4f36e45a4e75";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCity);
}


let formInput = document.querySelector("form");
formInput.addEventListener("submit", getCityName);

navigator.geolocation.getCurrentPosition(getPosition);

