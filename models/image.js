'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = Schema({
    title: String,
    description: String,
    url_image: String,
    id_user: String,
    category: { type: String, enum: ['illustration', '3d_model', 'photography'] },
    n_likes: Number,
    n_dislikes: Number,
    uploaded_at: Date,
    score: Number
})
module.exports = mongoose.model('Image', ImageSchema)