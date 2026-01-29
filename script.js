const apiKey = "c9f83d3fd89bb871ddad53af4e55348e";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");
    const errorMsg = document.getElementById("errorMsg");

    if (city === "") {
        errorMsg.textContent = "Please enter a city name.";
        weatherResult.classList.add("hidden");
        return;
    }

    try {
        errorMsg.textContent = "";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent =
            `🌡 Temperature: ${data.main.temp} °C`;
        document.getElementById("description").textContent =
            `☁ Weather: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent =
            `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent =
            `🌬 Wind Speed: ${data.wind.speed} m/s`;

        weatherResult.classList.remove("hidden");

    } catch (error) {
        errorMsg.textContent = error.message;
        weatherResult.classList.add("hidden");
    }
}
