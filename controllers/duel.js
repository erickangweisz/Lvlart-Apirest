'use strict'

const Duel = require('../models/duel')
const config = require('../config')

// multer
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/duels')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
var upload = multer({ storage: storage }).single('id_image_challenged')
var upld = multer({ storage: storage }).single('id_image_challenger')

//const Theme = require('../controllers/theme')
//var idsThemes = Theme.getIds // return: [Function: getIds]
var idsThemes = ['59424c110c2a141ac8be04d9', '59424db50c2a141ac8be04da', '5942537c3a67a815a4ecd8e5']

function createDuel(req, res) {
    let duel = new Duel()
    duel.id_user_challenger = req.body.id_user_challenger
    duel.id_user_challenged = req.body.id_user_challenged
    duel.likes_user_challenger = 0
    duel.likes_user_challenged = 0
    duel.id_image_challenger = null
    duel.id_image_challenged = null
    duel.created_at = new Date()
    duel.is_finalized = false
    duel.category = req.body.category
    duel.time = req.body.time
    duel.id_theme = idsThemes[Math.round(Math.random() * 3)]
    duel.is_accepted = false

    duel.save((err, duelStored) => {
        if (err) res.status(500).send({ message: `error saving to database: ${err}` })

        res.status(201).send({ duel: duelStored })
    })
}

function getAllDuels(req, res) {
    Duel.find({}, (err, duels) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })

        res.status(200).send({ duels })
    })
}

function getXduelsByCreatedAt(req, res) {
    // get 'x' number from request params.
    let xNumber = Number(req.params.number)

    Duel.find({}).sort({ created_at: 'desc' }).limit(xNumber).exec(function(err, duels) {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!duels) return res.status(404).send({ message: 'duels do not exist' })

        res.status(200).send({ duels })
    })
}

function getXduelsByUserId(req, res) {
    let xNumber = Number(req.params.number)
    let userId = req.params.userId

    let query = {}
    query = { $or: [{ id_user_challenged: { $regex: userId, $options: 'i' } }, { id_user_challenger: { $regex: userId, $options: 'i' } }] }

    Duel.find(query).sort({ created_at: 'desc' }).limit(xNumber).exec(function(err, duels) {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!duels) return res.status(404).send({ message: 'duels do not exist' })

        res.status(200).send({ duels })
    })
}

function getAllDuelsByUserId(req, res) {
    let userId = req.params.userId
    let query = {}
    query = { $or: [{ id_user_challenged: { $regex: userId, $options: 'i' } }, { id_user_challenger: { $regex: userId, $options: 'i' } }] }

    Duel.find(query, (err, duels) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!duels) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ duels })
    })
}

function getAllDuelsOrderByCreation(req, res) {
    Duel.find({}).sort({ created_at: 'desc' }).exec((err, duels) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!duels) return res.status(404).send({ message: 'duels do not exist' })

        res.status(200).send({ duels })
    })
}

function getXduelsOrderByCreation(req, res) {
    let xNumber = Number(req.params.number)

    Duel.find({}).sort({ created_at: 'desc' }).limit(xNumber).exec((err, duels) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!duels) return res.status(404).send({ message: 'duels do not exist' })

        res.status(200).send({ duels })
    })
}

function getAllDuelsByCategory(req, res) {
    let category = req.params.category

    Duel.find({ category: category }, (err, duels) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!duels) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ duels })
    })
}

function getXduelsByCategory(req, res) {
    let xNumber = Number(req.params.number)
    let category = req.params.category

    Duel.find({ category: category }).sort({ created_at: 'desc' }).limit(xNumber).exec(function(err, duels) {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!duels) return res.status(404).send({ message: 'the duels dont exist' })

        res.status(200).send({ duels })
    })
}

function deleteDuel(req, res) {
    let duelId = req.params.duelId

    Duel.findByIdAndRemove(duelId, (err, comment) => {
        if (err) res.status(500).send({ message: `error deleting duel: ${err}` })

        res.status(200).send({ message: 'the duel has been deleted' })
    })
}

function uploadImageChallenged(req, res) {
    upload(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
        }
        // Everything went fine
        let duelId = req.params.duelId

        let update = { id_image_challenged: config.DIRNAME + req.file.path.replace('\\', '/') }

        Duel.findByIdAndUpdate(duelId, update, (err, duelUpdated) => {
            if (err) res.status(500).send({ message: `error updating image challenged: ${err}` })

            res.status(200).send({ user: duelUpdated })
        })
    })
}

function uploadImageChallenger(req, res) {
    upld(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
        }
        // Everything went fine
        let duelId = req.params.duelId

        let update = { id_image_challenger: config.DIRNAME + req.file.path.replace('\\', '/') }

        Duel.findByIdAndUpdate(duelId, update, (err, duelUpdated) => {
            if (err) res.status(500).send({ message: `error updating image challenger: ${err}` })

            res.status(200).send({ user: duelUpdated })
        })
    })
}

function getImageChallenged(req, res) {
    let duelId = req.params.duelId

    Duel.findById(duelId, (err, id_image_challenged) => {
        res.status(200).sendFile(id_image_challenged.id_image_challenged)
    })
}

function getImageChallenger(req, res) {
    let duelId = req.params.duelId

    Duel.findById(duelId, (err, id_image_challenger) => {
        res.status(200).sendFile(id_image_challenger.id_image_challenger)
    })
}

function updateDuel(req, res) {
    let duelId = req.params.duelId
    let update = req.body

    Duel.findByIdAndUpdate(duelId, update, (err, duelUpdated) => {
        if (err) res.status(500).send({ message: `error updating duel: ${err}` })

        res.status(200).send({ duel: duelUpdated })
    })
}

function setLikeByChallenged(req, res) {
    let duelId = req.params.duelId

    // get image by id and increase likes.
    Duel.findOneAndUpdate({ _id: duelId }, { $inc: { likes_user_challenged: 1 } }, (err, duel) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!duel) return res.status(404).send({ message: 'the duel dont exist' })

        res.status(200).send({ duel })
    })
}

function setLikeByChallenger(req, res) {
    let duelId = req.params.duelId

    // get image by id and increase likes.
    Duel.findOneAndUpdate({ _id: duelId }, { $inc: { likes_user_challenger: 1 } }, (err, duel) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!duel) return res.status(404).send({ message: 'the duel dont exist' })

        res.status(200).send({ duel })
    })
}

module.exports = {
    createDuel,
    getAllDuels,
    getXduelsByCreatedAt,
    getAllDuelsByUserId,
    getAllDuelsOrderByCreation,
    getXduelsOrderByCreation,
    getAllDuelsByCategory,
    getXduelsByCategory,
    getXduelsByUserId,
    deleteDuel,
    uploadImageChallenged,
    uploadImageChallenger,
    getImageChallenged,
    getImageChallenger,
    updateDuel,
    setLikeByChallenged,
    setLikeByChallenger
}