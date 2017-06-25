'use strict'

const User = require('../models/user')
const service = require('../services')
const config = require('../config')

// multer
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
var upload = multer({ storage: storage }).single('avatar')

function signUp(req, res) {
    const user = new User({
        baja: req.body.baja,
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        avatar: req.body.avatar,
        score: 0,
        visits: 0,
        email: req.body.email,
        signupDate: new Date(),
        category: req.body.category,
        experience: 0,
        n_challenges: 0,
        n_victories: 0,
        n_defeats: 0,
        profile_facebook: req.body.profile_facebook,
        profile_twitter: req.body.profile_twitter,
        profile_pinterest: req.body.profile_pinterest,
        last_visits: req.body.last_visits,
        img_head: req.body.img_head
    })

    user.save((err) => {
        if (err) res.status(500).send({ message: `error creating the user: ${err}` })

        return res.status(201).send({ token: service.createToken(user) })
    })
}

function signIn(req, res) {
    User.count({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (user > 0) {
            res.status(200).send({
                token: service.createToken(user)
            })
        } else {
            if (err) return res.status(500).send({ message: `request error: ${err}` })
            if (!user) return res.status(404).send({ message: 'the user dont exist' })
        }
    })
}

function uploadAvatar(req, res) {
    upload(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
        }
        // Everything went fine
        let userId = req.params.userId
        let update = { avatar: config.DIRNAME + req.file.path.replace('\\', '/') }

        User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
            if (err) res.status(500).send({ message: `error updating user: ${err}` })

            res.status(200).send({ user: userUpdated })
        })
    })
}

function uploadImgHead(req, res) {
    upload(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
        }
        // Everything went fine
        let userId = req.params.userId
        let update = { img_head: config.DIRNAME + req.file.path.replace('\\', '/') }

        User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
            if (err) res.status(500).send({ message: `error updating user: ${err}` })

            res.status(200).send({ user: userUpdated })
        })
    })
}

function getUsers(req, res) {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!users) return res.status(404).send({ message: 'users do not exist' })

        res.status(200).send({ users })
    })
}

function setLikeScoreByUserId(req, res) {
    let userId = req.params.userId

    // get user by id and increase score (by likes).
    User.findOneAndUpdate({ _id: userId }, { $inc: { score: 16, experience: 48 } }, (err, user) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!user) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ user }) // == user: user 
    })
}

function setDislikeScoreByUserId(req, res) {
    let userId = req.params.userId

    // get user by id and increase score (by likes).
    User.findOneAndUpdate({ _id: userId }, { $inc: { score: -5 } }, (err, user) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!user) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ user })
    })
}

function setVictoryScoreByUserId(req, res) {
    let userId = req.params.userId

    // get user by id and increase score (by likes).
    User.findOneAndUpdate({ _id: userId }, { $inc: { n_challenges: 1, n_victories: 1, score: 50, experience: 150 } }, (err, user) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!user) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ user })
    })
}

function setDefeatScoreByUserId(req, res) {
    let userId = req.params.userId

    // get user by id and increase score (by likes).
    User.findOneAndUpdate({ _id: userId }, { $inc: { n_challenges: 1, n_defeats: 1, score: -25, experience: 20 } }, (err, user) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!user) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ user })
    })
}

function updateUser(req, res) {
    let userId = req.params.userId
    let update = req.body

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) res.status(500).send({ message: `error updating user: ${err}` })

        res.status(200).send({ user: userUpdated })
    })
}

function getUsersOrderByScore(req, res) {
    User.find({}).sort({ score: 'desc' }).exec(function(err, users) {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!users) return res.status(404).send({ message: 'users do not exist' })

        res.status(200).send({ users })
    })
}

function getXusersOrderByScore(req, res) {
    // get 'x' number from request params.
    let xNumber = Number(req.params.number)

    User.find({}).sort({ score: 'desc' }).limit(xNumber).exec(function(err, users) {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!users) return res.status(404).send({ message: 'users do not exist' })

        res.status(200).send({ users })
    })
}

function getXusersOrderByVisits(req, res) {
    // get 'x' number from request params.
    let xNumber = Number(req.params.number)

    User.find({}).sort({ visits: 'desc' }).limit(xNumber).exec(function(err, users) {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!users) return res.status(404).send({ message: 'users do not exist' })

        res.status(200).send({ users })
    })
}

function getUserById(req, res) {
    let userId = req.params.userId

    // get user by id and increase visits one to one.
    User.findOneAndUpdate({ _id: userId }, { $inc: { visits: 1 } }, (err, user) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!user) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ user }) // == user: user 
    })
}

function getUserByUsername(req, res) {
    let username = req.params.username

    // get user by username.
    User.find({ username: username.toString() }, (err, user) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!user) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ user })
    })
}

function getXusersOrderByCategory(req, res) {
    // get 'x' number from request params.
    let xNumber = Number(req.params.number)

    // get categories from request params.
    let categories = req.params.categories

    User.find({ categories: categories }).sort({ score: 'desc' }).limit(xNumber).exec(function(err, users) {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!users) return res.status(404).send({ message: 'users do not exist' })

        res.status(200).send({ users })
    })
}

function getImageHeaderByUserId(req, res) {
    let userId = req.params.userId

    User.findById(userId, (err, imageHeader) => {
        res.status(200).sendFile(imageHeader.img_head)
    })
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    setLikeScoreByUserId,
    setDislikeScoreByUserId,
    setVictoryScoreByUserId,
    setDefeatScoreByUserId,
    updateUser,
    getUsersOrderByScore,
    getXusersOrderByScore,
    getXusersOrderByVisits,
    getUserById,
    getUserByUsername,
    getXusersOrderByCategory,
    uploadAvatar,
    uploadImgHead,
    getImageHeaderByUserId
}