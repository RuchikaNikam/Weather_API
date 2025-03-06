const validateCity = (req, res, next) => {
    const { city } = req.params;
    
    if (!city || !/^[a-zA-Z\s]+$/.test(city)) {
        return res.status(400).json({
            success: false,
            message: "Invalid city name. Please enter a valid city.",
        });
    }

    next();
};

module.exports = validateCity;
