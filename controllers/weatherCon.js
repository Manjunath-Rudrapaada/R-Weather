const request = require('request')

const ForecastInputs = require('../models/weatherMod')

// Input Params
var city
var units
var capCity

// Output Params
var temperature
var feelsLike
var weatherDesc
var weatherIcon
var imgURL
var unit
var country

var day = new Date().getDay()
switch (day) {
    case 0:
        day = 'Sunday'
        break
    case 1:
        day = 'Monday'
        break
    case 2:
        day = 'Tuesday'
        break
    case 3:
        day = 'Wednesday'
        break
    case 4:
        day = 'Thursday'
        break
    case 5:
        day = 'Friday'
        break
    default:
        day = 'Saturday'
}

exports.postWeather = (req, res) => {

    const forecastInputs = new ForecastInputs(req.body.inpCity, req.body.units)

    // city = req.body.inpCity
    // units = req.body.units

    console.log(forecastInputs.city);

    capCity = (forecastInputs.city.slice(0, 1)).toUpperCase() + forecastInputs.city.slice(1, forecastInputs.city.length)

    if (forecastInputs.units == 'metric') {
        unit = '\xB0C'
    } else if (forecastInputs.units == 'imperial') {
        unit = '\xB0F'
    } else {
        unit = 'K'
    }

    // API url
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + forecastInputs.city + '&units=' + forecastInputs.units + '&appid=a49fc65a945d1c0a7cbe69ead28bafda'

    // var url1 = 'https://api.openweathermap.org/data/2.5/onecall?q=' + city + '&units=' + units + '&appid=a49fc65a945d1c0a7cbe69ead28bafda'

    request({ url: url, json: true }, (error, response) => {

            // city = response.body.city.name
            // country = response.body.city.country
            temperature = response.body.main.temp
            console.log(temperature)
            feelsLike = response.body.main.feels_like
            console.log(feelsLike);
            weatherDesc = response.body.weather[0].description
            console.log(weatherDesc)
            weatherIcon = response.body.weather[0].icon
            imgURL = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'
                // precip = response.body.list[0].pop
                // console.log(precip);
            res.redirect('/weather')
        })
        // res.redirect('/weather')

}

exports.getWeather = (req, res) => {
    res.render('weather', {
        city: capCity,
        // country: country,
        temp: temperature,
        feels: feelsLike,
        unit: unit,
        desc: weatherDesc,
        icon: imgURL,
        day: day
            // rain: precip
    })
}