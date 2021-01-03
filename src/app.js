const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const app = express()

// Input Params
var city
var units

// Output Params
var temperature
var feelsLike
var weatherDesc
var weatherIcon
var imgURL
var precip
var unit

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

var day = new Date().getDay()
switch (day) {
    case 0: day = 'Sunday'
        break
    case 1: day = 'Monday'
        break
    case 2: day = 'Tuesday'
        break
    case 3: day = 'Wednesday'
        break
    case 4: day = 'Thursday'
        break
    case 5: day = 'Friday'
        break
    default: day = 'Saturday'
}

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {

    city = req.query.inpCity
    units = req.query.units

    console.log(city);

    var capCity = (city.slice(0, 1)).toUpperCase() + city.slice(1, city.length)

    if (units == 'metric') {
        unit = '\xB0C'
    }
    else if (units == 'imperial') {
        unit = '\xB0F'
    }
    else {
        unit = 'K'
    }

    // API url
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + units + '&appid=a49fc65a945d1c0a7cbe69ead28bafda'

    request({ url: url, json: true }, (error, response) => {

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

    })

    res.render('weather', {
        city: capCity,
        temp: temperature,
        feels: feelsLike,
        unit: unit,
        desc: weatherDesc,
        icon: imgURL,
        day: day
        // rain: precip
    })
})

app.get('*', (req, res) => {
    res.send('404 : Page not found...')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
})
