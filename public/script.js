async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherCard = document.getElementById('weatherResult');
    const loader = document.getElementById('loading');

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    // Show loading text
    loader.style.display = 'block';
    weatherCard.style.display = 'none';

    try {
        const response = await fetch(`http://localhost:5000/api/weather/${city}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        let weatherIcon;
        switch (data.description) {
            case 'clear sky': weatherIcon = '☀️'; break;
            case 'few clouds': weatherIcon = '🌤'; break;
            case 'scattered clouds': weatherIcon = '☁️'; break;
            case 'broken clouds': weatherIcon = '⛅'; break;
            case 'shower rain': weatherIcon = '🌧'; break;
            case 'rain': weatherIcon = '🌦'; break;
            case 'thunderstorm': weatherIcon = '⛈'; break;
            case 'snow': weatherIcon = '❄️'; break;
            case 'mist': weatherIcon = '🌫'; break;
            default: weatherIcon = '🌍';
        }

        document.getElementById('cityName').innerHTML = `📍 ${data.city}`;
        document.getElementById('temperature').innerHTML = `🌡 ${data.temperature}°C`;
        document.getElementById('description').innerHTML = `${weatherIcon} ${data.description}`;
        document.getElementById('humidity').innerHTML = `💧 Humidity: ${data.humidity}%`;
        document.getElementById('windSpeed').innerHTML = `💨 Wind Speed: ${data.windSpeed} m/s`;

        loader.style.display = 'none';
        weatherCard.style.display = 'block';

    } catch (error) {
        loader.style.display = 'none';
        alert(error.message);
    }
}
