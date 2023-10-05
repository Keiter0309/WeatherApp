let api_key = "aa0138bac187af0a3cc531d2f8680e29";
let form = document.querySelector("#form") as HTMLFormElement;
let cityInput = document.querySelector("#input") as HTMLInputElement;
let resultContainer = document.querySelector("#result") as HTMLDivElement;
let container = document.querySelector("#container") as HTMLDivElement;

form.addEventListener("submit", async(e)=> {
    e.preventDefault();
    const city = cityInput.value;
    const weatherData = await getWeatherData(city);
    displayWeather(weatherData);
});

async function getWeatherData(city:string) {
    const respone = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    );
    const data = await respone.json();
    return data;
}

const displayWeather = (data: any) => {
    const {name, main} = data;
    const temperature = (main.temp).toFixed(0);

    resultContainer.innerHTML =  `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temperature}°C</p>
    `

    if(parseInt(temperature)<16) {
        container.classList.add("cold");
        resultContainer.style.color = "steelblue"
        container.style.color = "steelblue"
    }else {
        container.classList.remove("cold");
        resultContainer.style.color = "bisque"
        container.style.color ="bisque"
    }
}