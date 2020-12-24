//core modules
const path = require('path')
//npm modules
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) =>{
  res.render('index', {
    title: 'Weather App',
    name: 'Adi C'
  })
})

app.get('/about',(req,res) =>{
  res.render('about', {
    title: 'About Me',
    name: 'Adi C'
  })
})

app.get('/help',(req,res) =>{
  res.render('help', {
    title: 'Help Page',
    response: 'I am happy to help...Your Truly, Sreedi',
    name: 'Adi C'
  })
})

app.get('/products',(req,res) =>{
  if (!req.query.search) {
    return res.send({
      error: 'search term is mandatory'
    })
  }

  res.send( {
    products:[]
  })
})

app.get('/weather',(req,res) =>{
  if (!req.query.address) {
    return res.send({
      error: 'Address is required'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, {temp, real_feel}) => {
      if (error) {
        return res.send({error})
      }
      return res.send({
        location: location,
        temperature: temp,
        feels_like: real_feel
      })
    })


  })
})

app.get('/help/*', (req, res) => {
  res.render('ERROR 404', {
    title: 'ERROR 404',
    msg: 'Help article not found',
    name: 'Adi C'
  })
})

app.get('*', (req, res) => {
  res.render('ERROR 404', {
    title: 'ERROR 404',
    msg: 'Page not found',
    name: 'Adi C'
  })
})

app.listen(port,()=>{
  console.log('Server is up on port ' + port)
})

//hi