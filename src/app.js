const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));

const weatherRoutes = require('../routes/weather')
const indexRoutes = require('../routes/index')
const errorRoute = require('../routes/404')

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')


// Setup EJS engine and views location
app.set('view engine', 'ejs')
app.set('views', 'views')

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.use(weatherRoutes)

app.use(indexRoutes)

app.use(errorRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is up on port 5000!');
})