function displayTemperature(response){
    
    let cityElement = document.querySelector("#city");
    let temperatureElement =document.querySelector("#temperature");
    let descriptionElement =document.querySelector("#description");
    let feelsLikeElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    descriptionElement.innerHTML=response.data.weather[0].description;
    feelsLikeElement.innerHTML=`Feels Like : ${Math.round(response.data.main.feels_like)}`;
    humidityElement.innerHTML =`Humidity: ${response.data.main.humidity}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
}
let apiKey = "d467c6c12588add63695214f8af05053";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`; 
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);