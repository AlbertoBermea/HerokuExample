
const port = process.env.PORT || 3000

const express = require('express')

const app = express()


app.get('/', function(req, res) {
    res.send({
      greeting: 'Hola Mundo!'
    })
  })

app.listen(port, function() {
  console.log('Up and running!')
})
  