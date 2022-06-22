// import "./style.css";

// Date & Time
function formatDate(date) {
  let hours = date.getHours(1);
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

let dateHour = document.querySelector("#date-hour");
let currentTime = new Date();

dateHour.innerHTML = formatDate(currentTime);

// Weather info
function showCityWeather(response) {
  let mainCityName = document.querySelector("#main-city-name");
  mainCityName.innerHTML = response.data.name;
  let mainCityTemp = document.querySelector("#main-temperature");
  mainCityTemp.innerHTML = Math.round(response.data.main.temp);
  let mainCityMaxTemp = document.querySelector("#max-temp");
  mainCityMaxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let mainCityMinTemp = document.querySelector("#min-temp");
  mainCityMinTemp.innerHTML = Math.round(response.data.main.temp_min);

  let mainCityHumidity = document.querySelector("#humidity");
  mainCityHumidity.innerHTML = response.data.main.humidity;
  let mainCityWind = document.querySelector("#wind-speed");
  mainCityWind.innerHTML = Math.round(response.data.wind.speed * 3.6);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  changeFahrenheit.classList.remove("active");
  changeCelcius.classList.add("active");
}

// Default City
function searchDefaultCity(city) {
  let apiKey = "bc1ee19a8e4836fa1d21a31e1295ce51";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityWeather);
}

// Search input city
function searchInputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;

  searchDefaultCity(city);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchInputCity);

searchDefaultCity("Guadalajara");

// Geolocation
function searchCurrentLocation(position) {
  let apiKey = "bc1ee19a8e4836fa1d21a31e1295ce51";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlGeolocation = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  changeFahrenheit.classList.remove("active");
  changeCelcius.classList.add("active");

  axios.get(apiUrlGeolocation).then(showCityWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let btnCurrentPosition = document.querySelector("#current-location-weather");
btnCurrentPosition.addEventListener("click", getCurrentLocation);

// Degrees conversion
function displayFahrenheit(event) {
  event.preventDefault();

  let fahrenheitTemperature = document.querySelector("#main-temperature");
  let temperature = fahrenheitTemperature.innerHTML;
  temperature = Number(temperature);
  fahrenheitTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);

  let maxFahrenheitTemperature = document.querySelector("#max-temp");
  let maxTemperature = maxFahrenheitTemperature.innerHTML;
  maxTemperature = Number(maxTemperature);
  maxFahrenheitTemperature.innerHTML = Math.round(
    (maxTemperature * 9) / 5 + 32
  );

  let minFahrenheitTemperature = document.querySelector("#min-temp");
  let minTemperature = minFahrenheitTemperature.innerHTML;
  minTemperature = Number(minTemperature);
  minFahrenheitTemperature.innerHTML = Math.round(
    (minTemperature * 9) / 5 + 32
  );

  changeCelcius.classList.remove("active");
  changeFahrenheit.classList.add("active");
}

function displayCelcius(event) {
  event.preventDefault();

  let CelciusTemperature = document.querySelector("#main-temperature");
  let temperature = CelciusTemperature.innerHTML;
  temperature = Number(temperature);
  CelciusTemperature.innerHTML = Math.round(((temperature - 32) * 5) / 9);

  let maxCelciusTemperature = document.querySelector("#max-temp");
  let maxTemperature = maxCelciusTemperature.innerHTML;
  maxTemperature = Number(maxTemperature);
  maxCelciusTemperature.innerHTML = Math.round(((maxTemperature - 32) * 5) / 9);

  let minCelciusTemperature = document.querySelector("#min-temp");
  let minTemperature = minCelciusTemperature.innerHTML;
  minTemperature = Number(minTemperature);
  minCelciusTemperature.innerHTML = Math.round(((minTemperature - 32) * 5) / 9);

  changeFahrenheit.classList.remove("active");
  changeCelcius.classList.add("active");
}

let changeFahrenheit = document.querySelector("#change-fahrenheit");
changeFahrenheit.addEventListener("click", displayFahrenheit);

let changeCelcius = document.querySelector("#change-celcius");
changeCelcius.addEventListener("click", displayCelcius);
