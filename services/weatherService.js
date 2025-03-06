const axios = require('axios');
require('dotenv').config();

const getWeatherFromAPI = async (city) => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
        return response.data;
    } catch (error) {
        throw new Error("Could not fetch weather data");
    }
};

module.exports = { getWeatherFromAPI };
