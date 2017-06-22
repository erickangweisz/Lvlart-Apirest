'use strict'

const Comment = require('../models/comment')

function createComment(req, res) {
    let comment = new Comment()
    comment.comment = req.body.comment
    comment.id_user_receiver = req.body.id_user_receiver
    comment.id_user_sender = req.body.id_user_sender
    comment.created_at = new Date()

    comment.save((err, commentStored) => {
        if (err) res.status(500).send({ message: `error saving to database: ${err}` })

        res.status(201).send({ comment: commentStored })
    })
}

function getAllComments(req, res) {
    Comment.find({}, (err, comments) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })

        res.status(200).send({ comments })
    })
}

function getCommentsByIdReceiver(req, res) {
    let idReceiver = req.params.idReceiver

    Comment.find({ id_user_receiver: idReceiver }, (err, comments) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!comments) return res.status(404).send({ message: 'the useridreceiver dont exist' })

        res.status(200).send({ comments })
    })
}

function deleteComment(req, res) {
    let commentId = req.params.commentId

    Comment.findByIdAndRemove(commentId, (err, comment) => {
        if (err) res.status(500).send({ message: `error deleting comment: ${err}` })

        res.status(200).send({ message: 'the comment has been deleted' })
    })
}

module.exports = {
    createComment,
    getAllComments,
    getCommentsByIdReceiver,
    deleteComment
}