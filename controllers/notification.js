'use strict'

const Notification = require('../models/notification')

function createNotification(req, res) {
    let notification = new Notification()
    notification.id_user_receiver = req.body.id_user_receiver
    notification.id_user_sender = req.body.id_user_sender
    notification.message = req.body.message
    notification.type_notification = req.body.type_notification
    notification.state = 'launched'

    notification.save((err, notificationStored) => {
        if (err) res.status(500).send({ message: `error saving to database: ${err}` })

        res.status(201).send({ notification: notificationStored })
    })
}

function getAllNotifications(req, res) {
    Notification.find({}, (err, notifications) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })

        res.status(200).send({ notifications })
    })
}

function getNotificationsByIdReceiver(req, res) {
    let idReceiver = req.params.idReceiver

    Notification.find({ id_user_receiver: idReceiver }, (err, notifications) => {
        if (err) return res.status(500).send({ message: `request error: ${err}` })
        if (!notifications) return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ notifications })
    })
}

function updateNotification(req, res) {
    let idNotification = req.params.idNotification
    let update = req.body

    Notification.findByIdAndUpdate(idNotification, update, (err, notificationUpdated) => {
        if (err) res.status(500).send({ message: `error updating notification: ${err}` })

        res.status(200).send({ notification: notificationUpdated })
    })
}

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationsByIdReceiver,
    updateNotification
}