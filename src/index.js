// import "./style.css";

// Date & Time
function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
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

  return `Last updated: ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

// Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row g-2">`;
  forecast.forEach(function (forecastDay, index) {
    let forecastIcon = forecastDay.weather[0].icon;
    if (forecastIcon === "01d") {
      forecastIcon = `images/min-clear-d.svg`;
    }
    if (forecastIcon === "01n") {
      forecastIcon = `images/min-clear-n.svg`;
    }
    if (
      forecastIcon === "02d" ||
      forecastIcon === "02n" ||
      forecastIcon === "03d" ||
      forecastIcon === "03n"
    ) {
      forecastIcon = `images/min-few-clouds.svg`;
    }
    if (forecastIcon === "04d" || forecastIcon === "04n") {
      forecastIcon = `images/min-broken-clouds.svg`;
    }
    if (
      forecastIcon === "09d" ||
      forecastIcon === "09n" ||
      forecastIcon === "10d" ||
      forecastIcon === "10n"
    ) {
      forecastIcon = `images/min-rain.svg`;
    }
    if (forecastIcon === "11d" || forecastIcon === "11n") {
      forecastIcon = `images/min-thunderstorm.svg`;
    }
    if (forecastIcon === "13d" || forecastIcon === "13n") {
      forecastIcon = `images/min-snow.svg`;
    }
    if (forecastIcon === "50d" || forecastIcon === "50n") {
      forecastIcon = `images/min-mist.svg`;
    }

    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
            <div class="forecast-details">
             <img src=${forecastIcon} alt=${forecastDay.weather[0].main} />
             <h6>${formatDay(forecastDay.dt)}</h6>
              <h5>
               <strong>${Math.round(forecastDay.temp.max)}˚ </strong>
               ${Math.round(forecastDay.temp.min)}˚
              </h5>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Forecast
function getForecast(coordinates) {
  let apiKey = "bc1ee19a8e4836fa1d21a31e1295ce51";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

// Weather info
function showCityWeather(response) {
  let dateHour = document.querySelector("#date-hour");
  let mainCityName = document.querySelector("#main-city-name");
  let mainCityTemp = document.querySelector("#main-temperature");
  let mainCityMaxTemp = document.querySelector("#max-temp");
  let mainCityMinTemp = document.querySelector("#min-temp");
  let mainCityHumidity = document.querySelector("#humidity");
  let mainCityWind = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  let mainIconAlt = document.querySelector("#main-weather-icon");

  celciusTemperature = Math.round(response.data.main.temp);
  maxCelciusTemperature = Math.round(response.data.main.temp_max);
  minCelciusTemperature = Math.round(response.data.main.temp_min);

  dateHour.innerHTML = formatDate(response.data.dt * 1000);
  mainCityName.innerHTML = response.data.name;
  mainCityTemp.innerHTML = celciusTemperature;
  mainCityMaxTemp.innerHTML = maxCelciusTemperature;
  mainCityMinTemp.innerHTML = minCelciusTemperature;
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

  getForecast(response.data.coord);

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
  let mainTemperature = document.querySelector("#main-temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  mainTemperature.innerHTML = Math.round(fahrenheitTemperature);

  let maxTemperature = document.querySelector("#max-temp");
  let maxFahrenheitTemperature = (maxCelciusTemperature * 9) / 5 + 32;
  maxTemperature.innerHTML = Math.round(maxFahrenheitTemperature);

  let minTemperature = document.querySelector("#min-temp");
  let minFahrenheitTemperature = (minCelciusTemperature * 9) / 5 + 32;
  minTemperature.innerHTML = Math.round(minFahrenheitTemperature);

  changeCelcius.classList.remove("active");
  changeFahrenheit.classList.add("active");
}

function displayCelcius(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#main-temperature");
  mainTemperature.innerHTML = celciusTemperature;

  let mainMaxTemperature = document.querySelector("#max-temp");
  mainMaxTemperature.innerHTML = maxCelciusTemperature;

  let mainMinTemperature = document.querySelector("#min-temp");
  mainMinTemperature.innerHTML = minCelciusTemperature;

  changeFahrenheit.classList.remove("active");
  changeCelcius.classList.add("active");
}

let celciusTemperature = null;
let maxCelciusTemperature = null;
let minCelciusTemperature = null;

let changeFahrenheit = document.querySelector("#change-fahrenheit");
changeFahrenheit.addEventListener("click", displayFahrenheit);

let changeCelcius = document.querySelector("#change-celcius");
changeCelcius.addEventListener("click", displayCelcius);

searchDefaultCity("Guadalajara");
