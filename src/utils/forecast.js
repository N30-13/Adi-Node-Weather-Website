const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=f17f2172fa9e06e4b8c30194c25efc11&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&units=f'

  request({ url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (body.error) {
      callback(body.error.code, undefined)
    } else {
      callback(undefined, {
        temp: body.current.temperature,
        real_feel: body.current.feelslike
      })
    }
  })
}

module.exports = forecast
