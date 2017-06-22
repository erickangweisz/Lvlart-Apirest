'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) return console.log(`failed to connect to database: ${err}`)

    app.listen(config.port, () => {
        console.log(`API REST running in http://localhost: ${config.port}`)
    })
})