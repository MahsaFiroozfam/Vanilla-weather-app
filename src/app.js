function formatDate(timestamp) {
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
// A function to repatedly show the html code for the forcast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//In this function, the cordination of the searched city is passed to the api. The Api is used to get the forecast temperature.
function getforcast(cordinate) {
  console.log(cordinate);
  let apiKey = "d467c6c12588add63695214f8af05053";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinate.lat}&lon=${cordinate.lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

// Display the current temperature in the searched city. it also called the function to get the forcasts for the city.
function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celciousTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = `Feels Like : ${Math.round(
    response.data.main.feels_like
  )}`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

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
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciousTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function dispalyCelciusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciousTemperature);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celciousTemperature = null; // global variable for temperature to use in different functions

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", dispalyFahrenheitTemperature);

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", dispalyCelciusTemperature);

search("New York"); //default search
