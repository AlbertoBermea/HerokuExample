
const port = process.env.PORT || 3000

const express = require('express')


const request = require('request');

const app = express()


const mapbax_token = process.env.MAPBOX_TOKEN 

const weather_token = process.env.DARK_SKY_SECRET_KEY


app.get('/', function(req, res) {
    res.send({ 
      greeting: process.env.MAPBOX_TOKEN
    })
  })

  app.get('/weather', function(req, res) {

    forwardGeoCode(req.query.search,function(data){  
    
        if(data.message){
            res.send({
                primer: data
            })
        }
        else{
            forecastWeather(data.lat,data.lon,function(data){
    
                if(data.error){
                    res.send({
                        error: data
                    })
                }
                else{

                    res.send({
                        Ciudad: req.query.search,
                        Sumaryy: data.summary,
                        Temperatura: data.temp,
                        Probabilidad_de_lluvia: data.probabilidad
                    })
                }
            })
        }
    })

  })

app.listen(port, function() {
  console.log('Up and running!')
})
  

app.get('*', function(req, res) {
    res.send({
      error: 'Ruta no valida'
    })
  })


const forecastWeather = function(lat,lon,callback) {
    const url = 'https://api.darksky.net/forecast/' + weather_token + '/'+ lat + ',' + lon + '?lang=es&units=si'

    request({ url, json: true }, function(error, response) {
      if (error) {
        callback(error,undefined)
      } else {
          
        const data = response.body

        if( data.error ){
            callback(data)
        } else {
            const info = {
                summary: data.currently.summary,
                temp: data.currently.temperature,
                probabilidad: data.currently.precipProbability * 100,
                days: []
    
            }
    
    
            for (i in data.daily.data){
                const aux = {
                    auxSummary: data.daily.data[i].summary,
                    auxProbabilidad: data.daily.data[i].precipProbability * 100,
                    auxMax: data.daily.data[i].temperatureMax,
                    auxMin: data.daily.data[i].temperatureMin
                }
                
                info.days.push(aux)
            }
    
            callback(info)
        }
        
      }  
    })
  
}

const forwardGeoCode = function(place,callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=' + mapbax_token

    //console.log(url)

    request({ url, json: true }, function(error, response) {
      if (error) {
        console.log(error)
      } else {
        const data = response.body

        //console.log(data)
        
        
        if ( data.message ) {
          callback(data)
        } else {
          
            const info = {
                lon: data.features[0].geometry.coordinates[0],
                lat: data.features[0].geometry.coordinates[1]
            }

            callback(info)

        }
      }  
    })
  
}

