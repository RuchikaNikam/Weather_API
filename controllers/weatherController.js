const axios = require("axios");
const Weather = require("../models/weatherModel"); // Ensure your model is correctly imported

const getWeather = async (req, res, next) => {
    try {
        const { city } = req.params;
        const API_KEY = process.env.WEATHER_API_KEY;

        if (!API_KEY) {
            console.error("API Key is missing! Check .env file.");
            return res.status(500).json({ error: "Server error: API Key is missing" });
        }

        // Fetch weather data from WeatherAPI.com
        const response = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );

        console.log("API Response:", response.data); // Debugging

        // Extract data based on WeatherAPI.com structure
        const data = response.data;

        if (!data || !data.current) {
            return res.status(404).json({ error: "Weather data not found for this city" });
        }

        const weatherData = {
            city: data.location.name,
            temperature: data.current.temp_c, // Corrected for WeatherAPI
            description: data.current.condition.text,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_kph, // Wind speed in kph
        };

        // Save data to MongoDB (optional)
        await Weather.create(weatherData);

        res.json(weatherData);
    } catch (error) {
        console.error("Weather API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

module.exports = { getWeather };
