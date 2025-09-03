//js alone can't make the fetch request you need node or browser environment for that 
document.addEventListener("DOMContentLoaded",()=>{
    const cityName = document.getElementById("city-input");
    const weatherButton = document.getElementById("get-weather-btn");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessageDisplay = document.getElementById("error-message");
    const outputDiv = document.getElementById("weather-info");

    const API_KEY = "ea4d19888717e4acadcb4265114801eb";

    //let get the input
    weatherButton.addEventListener('click',async ()=>{
        const city = cityName.value.trim();
        if(city === '') return;

        

        try {
            const response = await fetchWeatherDetail(city);
            displayWeatherData(response);
        } catch (error) {
            showError(error);
        }
    })

    async function fetchWeatherDetail(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(" City Not found");
            }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data){
        console.log(data);
        outputDiv.classList.remove("hidden");
        errorMessageDisplay.classList.add("hidden");
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
    }
    function showError(error){
        errorMessageDisplay.classList.remove("hidden");
        outputDiv.classList.add("hidden");
        errorMessageDisplay.textContent = `${cityName.value.trim()} City Not Found`;
    }
})
