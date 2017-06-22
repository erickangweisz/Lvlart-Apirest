'use strict'

const Image = require('../models/image')

function getImage(req, res) {
    let imageId = req.params.imageId

    Image.findById(imageId, (err, image) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!image) return res.status(404).send({ message: 'the image dont exist' })

        res.status(200).send({ image }) // == image: image 
    })
}

function getImages(req, res) {
    Image.find({}, (err, images) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!images) return res.status(404).send({ message: 'images do not exist' })

        res.status(200).send({ images })
    })
}

function saveImage(req, res) {
    let image = new Image()
    image.title = req.body.title
    image.description = req.body.description
    image.url_image = req.body.url_image
    image.id_user = req.body.id_user
    image.category = req.body.category
    image.n_likes = 0
    image.n_dislikes = 0
    image.uploaded_at = new Date()
    image.score = 0

    image.save((err, imageStored) => {
        if (err) res.status(500).send({ message: `error saving to database: ${err}` })

        res.status(201).send({ image: imageStored })
    })
}

function updateImage(req, res) {
    let imageId = req.params.imageId
    let update = req.body

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
        if (err) res.status(500).send({ message: `error updating image: ${err}` })

        res.status(200).send({ image: imageUpdated })
    })
}

function deleteImage(req, res) {
    let imageId = req.params.imageId

    Image.findById(imageId, (err, image) => {
        if (err) res.status(500).send({ message: `error deleting image: ${err}` })

        image.remove(err => {
            if (err) res.status(500).send({ message: `error deleting image: ${err}` })
            res.status(200).send({ message: 'the image has been deleted' })
        })
    })
}

function setLikeScoreByImageId(req, res) {
    let imageId = req.params.imageId

    // get image by id and increase likes.
    Image.findOneAndUpdate({ _id: imageId }, { $inc: { n_likes: 1 } }, (err, image) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!image) return res.status(404).send({ message: 'the image dont exist' })

        res.status(200).send({ image })
    })
}

function setDislikeScoreByImageId(req, res) {
    let imageId = req.params.imageId

    // get image by id and increase dislikes.
    Image.findOneAndUpdate({ _id: imageId }, { $inc: { n_dislikes: 1 } }, (err, image) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!image) return res.status(404).send({ message: 'the image dont exist' })

        res.status(200).send({ image })
    })
}

function getXimagesOrderByLatestUpload(req, res) {
    // get 'x' number from request params.
    let xNumber = Number(req.params.number)

    Image.find({}).sort({ uploaded_at: 'desc' }).limit(xNumber).exec((err, images) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!images) return res.status(404).send({ message: 'images do not exist' })

        res.status(200).send({ images })
    })
}

function getXimagesOrderByScore(req, res) {
    // get 'x' number from request params.
    let xNumber = Number(req.params.number)

    Image.find({}).sort({ n_likes: 'desc' }).limit(xNumber).exec((err, images) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!images) return res.status(404).send({ message: 'images do not exist' })

        res.status(200).send({ images })
    })
}

function getAllImagesByUserId(req, res) {
    let userId = req.params.userId

    Image.find({ id_user: userId }, (err, images) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!images) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ images })
    })
}

module.exports = {
    getImage,
    getImages,
    setLikeScoreByImageId,
    setDislikeScoreByImageId,
    getXimagesOrderByLatestUpload,
    getXimagesOrderByScore,
    getAllImagesByUserId,
    updateImage,
    saveImage,
    deleteImage
}