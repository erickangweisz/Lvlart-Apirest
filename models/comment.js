'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = Schema({
    comment: String,
    id_user_receiver: String,
    id_user_sender: String,
    created_at: Date
})
module.exports = mongoose.model('Comment', CommentSchema)