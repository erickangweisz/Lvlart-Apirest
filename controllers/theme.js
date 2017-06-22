'use strict'

const Theme = require('../models/theme')

function createTheme(req, res) {
    let theme = new Theme()
    theme.title = req.body.title
    theme.description = req.body.description
    theme.img_theme = req.body.img_theme
    theme.category = req.body.category

    theme.save((err, themeStored) => {
        if (err) res.status(500).send({ message: `error saving to database: ${err}` })

        res.status(201).send({ theme: themeStored })
    })
}

function getAllThemes(req, res) {
    Theme.find({}, (err, themes) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })

        res.status(200).send({ themes })
    })
}

function getTheme(req, res) {
    let themeId = req.params.themeId

    Theme.findById(themeId, (err, theme) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!theme) return res.status(404).send({ message: 'the theme dont exist' })

        res.status(200).send({ theme })
    })
}

function updateTheme(req, res) {
    let themeId = req.params.themeId
    let update = req.body

    Theme.findByIdAndUpdate(themeId, update, (err, themeUpdated) => {
        if (err) res.status(500).send({ message: `error updating image: ${err}` })

        res.status(200).send({ theme: themeUpdated })
    })
}

function deleteTheme(req, res) {
    let themeId = req.params.themeId

    Theme.findByIdAndRemove(themeId, (err, theme) => {
        if (err) res.status(500).send({ message: `error deleting theme: ${err}` })

        res.status(200).send({ message: 'the theme has been deleted' })
    })
}

// not used
function getIds(req, res) {
    Theme.find({}, "_id", (err, idsthemes) => {
        if (err) res.status(500).send({ message: `request error: ${err}` })

        //return idsthemes
        res.status(200).send({ idsthemes })
    })
}

module.exports = {
    createTheme,
    getAllThemes,
    getTheme,
    getIds,
    updateTheme,
    deleteTheme
}