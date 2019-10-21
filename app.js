
const port = process.env.PORT || 3000

const express = require('express')

const app = express()


app.get('/', function(req, res) {
    res.send({ 
      greeting: process.env.MAPBOX_TOKEN
    })
  })

app.listen(port, function() {
  console.log('Up and running!')
})
  