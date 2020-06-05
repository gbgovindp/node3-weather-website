const request = require('request')

const forecast = (lat, long ,callback) => {
    const url = 'https://api.climacell.co/v3/weather/realtime?lat=' +encodeURIComponent(lat)+ '&lon=' +encodeURIComponent(long)+ '&unit_system=si&fields=temp,precipitation&apikey=RcbcNTnPqzPeAB25GVgFzO4yrCXdhktb'
    request({ url , json: true}, (error , { body }) => {
       if(error) {
           callback('Unable to connect', undefined)
       } else if (body.errorCode){
           callback('Location does not exist',undefined)
       } else {
           callback(undefined, "It is currently "+ body.temp.value  +" degrees out. There is a "+ body.precipitation.value +"% chance of rain")
       }
    })
}

module.exports = forecast