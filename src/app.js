const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//console.log(__dirname)
//console.log(__filename)

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()

// Define path for Express config
const public_dir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup status directory to serve
app.use(express.static(public_dir))

app.get('', (req, res)=> {
    res.render('index',{
        title: 'Weather App',
        name: 'Govind'
    })
})

app.get('/help', (req, res)=> {
    res.render('help',{
        title: 'help',
        name: 'Govind',
        Company: 'One.Com'
    })
})

app.get('/about', (req, res)=> {
    res.render('about',{
        title: 'About me1',
        name: 'Govind'
    })
})

// app.com
// app.com/help
// app.com/about

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res)=> {
//     res.send([{
//         name: 'Govind',
//         Company: 'One.Com'
//     }, {
//         name: 'Roshni',
//     }
// ])
// })

// app.get('/about', (req, res)=> {
//     res.send('<h1>About Me</h1>')
// })


app.get('/weather', (req, res)=> {
    if (!req.query.address){
        return res.send({
            error: 'You must provide a Location!'
        })
    }
    console.log()
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send ( {
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
        })
    
    })


app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a serch term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'govind',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req, res) =>{
    res.render('404', {
        title: '404',
        name: 'govind',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000.')
})