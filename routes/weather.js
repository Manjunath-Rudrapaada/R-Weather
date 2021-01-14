const express = require('express');


const router = express.Router();

const weatherController = require('../controllers/weatherCon')

router.post('/weather', weatherController.postWeather)

router.get('/weather', weatherController.getWeather)

module.exports = router;