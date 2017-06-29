'use strict'

// express functions
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
app.use('/api', api)

// return lvlart header
app.get('/images/lvlart', (req, res) => {
    res.sendFile('C:/Users/erick/Desktop/workspace/lvlart-apirest/images/lvlart.png')
})

// return 'vs' image
app.get('/images/vs', (req, res) => {
    res.sendFile('C:/Users/erick/Desktop/workspace/lvlart-apirest/images/vs.png')
})

module.exports = app