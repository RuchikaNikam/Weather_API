const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: { type: String, required: true },
    temperature: Number,
    description: String,
    humidity: Number,
    windSpeed: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);
