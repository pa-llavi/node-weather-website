const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2235655b6fe96e23b0e0dc1b0bcf98fd&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&units=f'

    request( {url: url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        }else if (body.error) {
            callback('Unable to find location.', undefined)
        }else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.Humidity is ${body.current.humidity}.`)
        }
        
    } )
} 

module.exports = forecast