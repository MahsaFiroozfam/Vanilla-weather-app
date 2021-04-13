//Function to show the current time and date
function formatCurrentDate(timestamp) {
  let date = new Date(timestamp);
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
  return `${day} ${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

// A function to repatedly show the html code for the forcast
function displayForecast(response) {
  passForecastResponse = response;

  let forecastElement = document.querySelector("#forecast");

  let maxTemp = null;
  let minTemp = null;
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      if (units == "celcius") {
        maxTemp = Math.round(forecastDay.temp.max);
        minTemp = Math.round(forecastDay.temp.min);
      } else if (units == "fahrenheit") {
        maxTemp = Math.round((forecastDay.temp.max * 9) / 5 + 32);
        minTemp = Math.round((forecastDay.temp.min * 9) / 5 + 32);
      }
      forecastHTML += `                         
        <div class="col-2">
            <div class="card"> 
                <div class="weather-forecast-date">${formatDate(
                  forecastDay.dt
                )}</div>
                <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
                />
                <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> ${maxTemp}° </span>
                <span class="weather-forecast-temperature-min"> ${minTemp}° </span>
                </div>
            </div>     
        </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//In this function, the cordination of the searched city is passed to the api. The Api is used to get the forecast temperature.
function getforcast(cordinate) {
  let apiKey = "d467c6c12588add63695214f8af05053";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinate.lat}&lon=${cordinate.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Display the current temperature in the searched city. it also called the function to get the forcasts for the city.
function displayTemperature(response) {
  passTempResponse = response;
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let fahrenheitTemperature = (celciousTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;

  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  if (units == "celcius") {
    feelsLikeElement.innerHTML = `Feels Like : ${Math.round(
      response.data.main.feels_like
    )}°`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
    celciousTemperature = Math.round(response.data.main.temp);
  } else if (units == "fahrenheit") {
    feelsLikeElement.innerHTML = `Feels Like : ${Math.round(
      (response.data.main.feels_like * 9) / 5 + 32
    )}°`;
    windElement.innerHTML = ` Wind: ${Math.round(
      (response.data.wind.speed * 9) / 5 + 32
    )} mph `;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  dateElement.innerHTML = formatCurrentDate(response.data.dt * 1000);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let imgBackground = response.data.weather[0].icon;

  switch (imgBackground) {
    case "01d":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/01d.jpg)";
      break;
    case "01n":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/01n.jpg)";
      break;
    case "02d":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/02d.jpg)";
      break;
    case "02n":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/02n.jpg)";
      break;
    case "03d":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/03d.jpg)";
      break;
    case "03n":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/03n.jpg)";
      break;
    case "04d":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/04d.jpg)";
      break;
    case "04n":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/04n.jpg)";
      break;
    case "09d":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/09d.jpg)";
      break;
    case "09n":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/09n.jpg)";
      break;
    case "10d":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/10d.jpg)";
      break;
    case "10n":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/10n.jpg)";
      break;
    case "11d":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/11d.jpg)";
      break;
    case "11n":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/11n.jpg)";
      break;
    case "13d":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/13d.jpg)";
      break;
    case "13n":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/13n.jpg)";
      break;
    case "50d":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/50d.jpg)";
      break;
    case "50n":
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/50n.jpg)";
      break;

    default:
      document.getElementById("imgtest").style.backgroundImage =
        "url(Images/sunny.jpg)";
  }

  getforcast(response.data.coord);
}

// A function to call the api by submited city name. Then  with the api call the display temperature function to update the app with data from the api.
function search(city) {
  let apiKey = "d467c6c12588add63695214f8af05053";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

// A function to get the submited city name and pass it to search function
function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function dispalyFahrenheitTemperature(event) {
  event.preventDefault();
  units = "fahrenheit";
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  displayForecast(passForecastResponse);
  displayTemperature(passTempResponse);
}

function dispalyCelciusTemperature(event) {
  event.preventDefault();
  units = "celcius";

  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  displayForecast(passForecastResponse);
  displayTemperature(passTempResponse);
}

let celciousTemperature = null; // global variable for temperature to use in different functions
let units = "celcius";
let passTempResponse = null;
let passForecastResponse = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", dispalyFahrenheitTemperature);

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", dispalyCelciusTemperature);

search("New York"); //default search
