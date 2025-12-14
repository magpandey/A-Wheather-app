document.addEventListener('DOMContentLoaded', () =>{
const getWeatherBtn = document.getElementById('get-weather-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const citNameDisplay = document.getElementById('city-name');
const tempreatureDisplay = document.getElementById("tempreature")
const discriptionDisplay = document.getElementById('discription')
const errorMessage = document.getElementById("error-message")

const API_KEY = 'Your api key';
getWeatherBtn.addEventListener('click',async() =>{
    const city = cityInput.value.trim()
    if(!city) return
    //It may throw an error and remember the server and database is in other continent
    try {
        const weatherData = await fetchWeatherData(city)
        displayWeatherData(weatherData)
    } catch (error) {
        showError(error)
    }
})

async function fetchWeatherData(city){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    console.log(typeof response)
    console.log("RESPONSE", response  )
    if(!response.ok){
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
}
function displayWeatherData(data){
     console.log(data);
     const {name, main, weather} = data
    citNameDisplay.textContent = name
    tempreatureDisplay.textContent = `Temperature: ${main.temp}`
    discriptionDisplay.textContent = `Weather: ${weather[0].description}`
    weatherInfo.classList.remove("hidden")     
    errorMessage.classList.add("hidden")
}

function showError(message){
    weatherInfo.classList.add('hidden')
    errorMessage.classList.remove('hidden')
}
    
});