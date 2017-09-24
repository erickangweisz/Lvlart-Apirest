'use strict'

// express functions
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')
const multer = require('multer')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

// Multer config

var storage = multer.diskStorage({ // multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads/gallery/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

var upload = multer({ // multer settings
    storage: storage
}).single('file')

/** API path that will upload the files */
app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        console.log(req.file)
        if (err) {
            res.json({ error_code: 1, err_desc: err })
            return
        }
        res.json({ error_code: 0, err_desc: null })
    })
})

// END Multer config

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

// return 'no header' image
app.get('/images/noheader', (req, res) => {
    res.sendFile('C:/Users/erick/Desktop/workspace/lvlart-apirest/images/noheader.png')
})

// return 'no avatar' image
app.get('/images/noavatar', (req, res) => {
    res.sendFile('C:/Users/erick/Desktop/workspace/lvlart-apirest/images/noavatar.png')
})

module.exports = app