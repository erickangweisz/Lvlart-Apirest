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
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
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

// return cyclope image
app.get('/images/cyclops', (req, res) => {
    res.sendFile('C:/Users/erick/Desktop/workspace/lvlart-apirest/images/cyclops.png')
})

// return spiderman image
app.get('/images/spiderman', (req, res) => {
    res.sendFile('C:/Users/erick/Desktop/workspace/lvlart-apirest/images/spiderman.png')
})

// return superman image
app.get('/images/superman', (req, res) => {
    res.sendFile('C:/Users/erick/Desktop/workspace/lvlart-apirest/images/superman.png')
})

// return 'no image' image
app.get('/images/noimage', (req, res) => {
    res.sendFile('C:/Users/erick/Desktop/workspace/lvlart-apirest/images/noimage.png')
})

module.exports = app