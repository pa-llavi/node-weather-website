const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require("request")
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')

// console.log(__dirname)
// // used to get path of requirede folder or file
// console.log(path.join(__dirname, '../public'))

const app = express ()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handelbars and views location
    //to get handlebars setup,  Which we can use to create some dynamic templates
app.set('view engine', 'hbs')
app.set('views', viewsPath)
    //registerPartials takes a path to the directory where your partials live
hbs.registerPartials(partialsPath)

//Setup static directory to serve
    //used to costumise the server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //render is used to render one of our views
    res.render('index', {
        title: 'Weather',
        name: 'Pallavi'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name:'Pallavi'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        message:'Do you need some help?',
        name: 'Pallavi'
    })
})

/* Old code without using path

// app.com
// app.com/help
// app.com/about


// app.get('', (req, res)=>{
//     //sending html 
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     //sending json
//     res.send([{
//         name: 'Pallavi',
//     },{
//         name: 'Kanchan'
//     }])
// })

// app.get('/about', (req, res) => {
//     // //sending string
//     // res.send('About Us!')

//     res.send('<h1><u>About Us</u></h1>')
// })
*/

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
    
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })

          })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404',
        msg: 'Help article not found!',
        name:'Pallavi'
    })
})

    // * stands for everything else except the requests provided here eg. /weather, /help etc
app.get('*', (req, res) => {
    res.render('error',{
        title: '404',
        msg: 'Page not found!',
        name:'Pallavi'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})