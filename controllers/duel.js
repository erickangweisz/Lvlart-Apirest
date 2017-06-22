'use strict'

const Duel = require('../models/duel')

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

module.exports = {
    createDuel,
    getAllDuels,
    getXduelsByCreatedAt,
    getAllDuelsByUserId,
    getAllDuelsOrderByCreation,
    getXduelsOrderByCreation,
    getAllDuelsByCategory
}