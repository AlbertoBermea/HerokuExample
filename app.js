
const port = process.env.PORT || 3000

const express = require('express')

const request = require('request');

const app = express()

const mapbax_token =  'pk.eyJ1IjoiYWJlcm1lYSIsImEiOiJjazFpbHU3ZG0wNHBkM25xN2YxcHhvbDkzIn0.fdLNntVLgdoDuW5f6uSFsw'

const weather_token ='9bb95c5190098c9e453124f291b905a9'

app.get('/', function(req, res) {
    res.send({ 
      greeting: mapbax_token
    })
  })



app.listen(port, function() {
  console.log('Up and running!')
})
  



