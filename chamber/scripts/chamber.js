const lat = 16.7666;
const lon = -3.0026;
const key = "0159ed7ce9546157a5d0c55c79056e3e";

const url =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

async function getWeather() {

const response = await fetch(url);

const data = await response.json();

displayWeather(data);

}

function displayWeather(data){

const current = data.list[0];

document.querySelector("#current-weather").innerHTML=`

<p><strong>${current.main.temp}°C</strong></p>

<p>${current.weather[0].description}</p>

`;

const labels = ["Tomorrow", "Day 2", "Day 3"];

days.forEach((day, index) => {

    const weather = data.list[day];

    const card = document.createElement("p");

    card.innerHTML = `
        <strong>${labels[index]}</strong><br>
        ${weather.main.temp}°C
    `;

    forecast.appendChild(card);

});

}

getWeather();