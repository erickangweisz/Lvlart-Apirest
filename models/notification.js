'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = Schema({
    id_user_receiver: String,
    id_user_sender: String,
    message: String,
    type_notification: { type: String, enum: ['duel', 'admin', 'user'] },
    state: { type: String, enum: ['launched', 'accepted', 'denied', 'canceled'] }
})
module.exports = mongoose.model('Notification', NotificationSchema)