let apiKey="751305c75f9526727cdf4f36e45a4e75";
let city= "Valencia";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

function getTemperature(response){
let temperature = Math.round(response.data.main.temp);
let currentTemp = document.querySelector("#temp");
currentTemp.innerHTML = `${temperature} °C`;
let humidity = Math.round(response.data.main.humidity);
let currentHumidity = document.querySelector("#humidity");
currentHumidity.innerHTML = `Humidity ${humidity}%`
let windSpeed = Math.round(response.data.wind.speed);
let currentSpeed = document.querySelector("#wind");
currentSpeed.innerHTML = `Wind Speed: ${windSpeed}km/h`;
let tempMax = Math.round(response.data.main.temp_max);
let currentTempMax = document.querySelector("#tempMax");
currentTempMax.innerHTML = `Temp Max ${tempMax}°C`;
let tempMin = Math.round(response.data.main.temp_min);
let currentTempMin = document.querySelector("#tempMin");
currentTempMin.innerHTML = `Temp Min ${tempMin}°C`;
}
axios.get(apiUrl).then(getTemperature);
 