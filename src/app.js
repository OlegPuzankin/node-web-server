const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { forecast, geocode } = require('../utils/functions')
const app = express();


const publicDirPath = path.join(__dirname, '../public');

// const reactAppPath=path.join(__dirname, '../build')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
app.set('views', viewsPath)

app.use(express.static(publicDirPath))
// app.use(express.static(reactAppPath))

// app.get('', (req,res)=>{
//     res.send('index')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app WTF',
        name: 'Oleg Pzzz',

    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help page',
        helpText: 'some text will be here',
        name: 'Oleg Pzzz',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorText: 'Help page not found'
    })
})


app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About page',
        name: 'Oleg Pzzz',
    })
})

app.get('/weather', (req, res) => {


    if (!req.query.location) {
        return res.send({
            errorMsg: 'No location'
        })
    }

    geocode(req.query.location, (error, { latitude, longitude, place }={}) => {

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (err, forecast) => {

            if(err)
            return res.send({
                err
            })

            return res.send({
                forecast,
                place

            })
        })

    })


    // res.send({
    //     forecast: 'It is raining',
    //     location: req.query.location,
    // })


})

app.get('*', (req, res) => {
    res.render('404', {
        errorText: 'Page not found'
    })
})

app.listen(3000, () => console.log('server is up'));


