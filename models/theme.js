'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ThemeSchema = Schema({
    title: String,
    description: String,
    img_theme: String,
    category: { type: String, enum: ['illustration', '3d_model', 'photography'] }
})
module.exports = mongoose.model('Theme', ThemeSchema)