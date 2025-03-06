const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherController');
const validateCity = require('../middleware/validateCity');

router.get('/weather/:city', validateCity, getWeather);

module.exports = router;
