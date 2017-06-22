'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DuelSchema = Schema({
    id_user_challenger: String,
    id_user_challenged: String,
    likes_user_challenger: Number,
    likes_user_challenged: Number,
    id_image_challenger: String,
    id_image_challenged: String,
    created_at: Date,
    is_finalized: Boolean,
    category: { type: String, enum: ['illustration', '3d_model', 'photography'] },
    time: { type: String, enum: ['1_day', '3_days', '1_week'] },
    id_theme: String
})
module.exports = mongoose.model('Duel', DuelSchema)