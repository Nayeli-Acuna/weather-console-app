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
  console.log(response.data);
  let mainCityName = document.querySelector("#main-city-name");
  let mainCityTemp = document.querySelector("#main-temperature");
  let mainCityMaxTemp = document.querySelector("#max-temp");
  let mainCityMinTemp = document.querySelector("#min-temp");
  let mainCityHumidity = document.querySelector("#humidity");
  let mainCityWind = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  let mainIconAlt = document.querySelector("#main-weather-icon");

  mainCityName.innerHTML = response.data.name;
  mainCityTemp.innerHTML = Math.round(response.data.main.temp);
  mainCityMaxTemp.innerHTML = Math.round(response.data.main.temp_max);
  mainCityMinTemp.innerHTML = Math.round(response.data.main.temp_min);
  mainCityHumidity.innerHTML = response.data.main.humidity;
  mainCityWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  weatherDescription.innerHTML = response.data.weather[0].description;
  mainIconAlt.setAttribute("alt", response.data.weather[0].description);

  let mainWeatherIcon = response.data.weather[0].icon;
  if (mainWeatherIcon === "01d") {
    document
      .querySelector("#main-weather-icon")
      .setAttribute("src", "images/clear-d.svg");
    document.getElementById("weather-card").style.background =
      "var(--card-bkg-clear-d)";
    document.querySelector("#motiv-phrase").innerHTML =
      "Do not forget to wear some sunscreen!";
  }
  if (mainWeatherIcon === "01n") {
    document
      .querySelector("#main-weather-icon")
      .setAttribute("src", "images/clear-n.svg");
    document.getElementById("weather-card").style.background =
      "var(--card-bkg-clear-n)";
    document.querySelector(
      "#motiv-phrase"
    ).innerHTML = `"A certain darkness is needed to see the stars!"`;
  }
  if (
    mainWeatherIcon === "02d" ||
    mainWeatherIcon === "02n" ||
    mainWeatherIcon === "03d" ||
    mainWeatherIcon === "03n"
  ) {
    document
      .querySelector("#main-weather-icon")
      .setAttribute("src", "images/few-clouds.svg");
    document.getElementById("weather-card").style.background =
      "var(--card-bkg-few-clouds)";
    document.querySelector(
      "#motiv-phrase"
    ).innerHTML = `"How sweet to be a cloud. Floating in the blue!"`;
  }
  if (mainWeatherIcon === "04d" || mainWeatherIcon === "04n") {
    document
      .querySelector("#main-weather-icon")
      .setAttribute("src", "images/broken-clouds.svg");
    document.getElementById("weather-card").style.background =
      "var(--card-bkg-broken-clouds)";
    document.querySelector(
      "#motiv-phrase"
    ).innerHTML = `"The darkest clouds precede the loveliest rain!"`;
  }
  if (
    mainWeatherIcon === "09d" ||
    mainWeatherIcon === "09n" ||
    mainWeatherIcon === "10d" ||
    mainWeatherIcon === "10n"
  ) {
    document
      .querySelector("#main-weather-icon")
      .setAttribute("src", "images/rain.svg");
    document.getElementById("weather-card").style.background =
      "var(--card-bkg-rain)";
    document.querySelector(
      "#motiv-phrase"
    ).innerHTML = `"You can stand under my umbrella, ella, ella, eh, eh, eh..."`;
  }
  if (mainWeatherIcon === "11d" || mainWeatherIcon === "11n") {
    document
      .querySelector("#main-weather-icon")
      .setAttribute("src", "images/thunderstorm.svg");
    document.getElementById("weather-card").style.background =
      "var(--card-bkg-thunderstorm)";
    document.querySelector(
      "#motiv-phrase"
    ).innerHTML = `"Thunder is good, thunder is impressive; but it is lightning that does the work"`;
  }
  if (mainWeatherIcon === "13d" || mainWeatherIcon === "13n") {
    document
      .querySelector("#main-weather-icon")
      .setAttribute("src", "images/snow.svg");
    document.getElementById("weather-card").style.background =
      "var(--card-bkg-snow)";
    document.querySelector(
      "#motiv-phrase"
    ).innerHTML = `"The cold never bothered me anyway"`;
  }
  if (mainWeatherIcon === "50d" || mainWeatherIcon === "50n") {
    document
      .querySelector("#main-weather-icon")
      .setAttribute("src", "images/mist.svg");
    document.getElementById("weather-card").style.background =
      "var(--card-bkg-mist)";
    document.querySelector(
      "#motiv-phrase"
    ).innerHTML = `"I tried to catch some fog but I mist"`;
  }

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
