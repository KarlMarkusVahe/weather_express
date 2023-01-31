const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const {response} = require("express");
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.set('set', path.join(__dirname, 'views'))

const key = 'a315ce8c5b7b9fd848b10c1a8a61c162'
let city = 'Tartu'

app.get('/', (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.post('/', function (req, res) {
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => {
        return response.json()
    })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.listen(3050)