document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const city = document.getElementById("search-input").value;
  fetchWeather(city);
});

function fetchWeather(city) {
  const apiKey = "1e5fa537b74a26d413a71c7ee7072412";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then((response) => {
      const data = response.data;
      document.getElementById("current-city").textContent = data.name;
      document.getElementById("current-temperature").textContent = Math.round(
        data.main.temp
      );
      document.getElementById(
        "humidity"
      ).textContent = `${data.main.humidity}%`;
      document.getElementById(
        "wind-speed"
      ).textContent = `${data.wind.speed} km/h`;
      document.getElementById("weather-description").textContent =
        data.weather[0].description;
      document.getElementById("weather-icon").textContent = getWeatherIcon(
        data.weather[0].icon
      );
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function getWeatherIcon(iconCode) {
  const iconMap = {
    "01d": "☀️",
    "01n": "🌕",
    "02d": "🌤️",
    "02n": "🌥️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "🌥️",
    "04n": "🌥️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌦️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return iconMap[iconCode] || "❓";
}
