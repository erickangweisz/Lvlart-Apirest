'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    baja: Boolean,
    username: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    firstname: String,
    lastname: String,
    birthday: Date,
    avatar: String,
    score: Number,
    visits: Number,
    email: { type: String, unique: true, lowercase: true },
    signupDate: { type: Date, default: Date.now() },
    category: { type: String, enum: ['illustration', '3d_model', 'photography'] },
    experience: Number,
    n_challenges: Number,
    n_victories: Number,
    n_defeats: Number,
    profile_facebook: String,
    profile_twitter: String,
    profile_pinterest: String,
    last_visits: Array,
    img_head: String,
    last_login: Date
})

// pre load before to save the password
UserSchema.pre('save', (next) => {
    let user = this

    // if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next()

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.gravatar = function() {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)