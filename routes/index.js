'use strict'

const express = require('express')
const auth = require('../middlewares/auth')
const api = express.Router()

const imageCtrl = require('../controllers/image')
const userCtrl = require('../controllers/user')
const themeCtrl = require('../controllers/theme')
const commentCtrl = require('../controllers/comment')
const duelCtrl = require('../controllers/duel')
const notificationCtrl = require('../controllers/notification')

// paths [ image ]
api.post('/image', auth, imageCtrl.saveImage)
api.get('/images', imageCtrl.getImages)
api.get('/image/:imageId', imageCtrl.getImage)
api.get('/images/user/:userId', imageCtrl.getAllImagesByUserId)
api.get('/images/:number/latestupload', imageCtrl.getXimagesOrderByLatestUpload)
api.get('/images/:number/likes', imageCtrl.getXimagesOrderByScore)
api.get('/image/:imageId/urlimage', imageCtrl.getUrlImageByImageId)
api.get('/images/:number/category/:category', imageCtrl.getXimagesOrderByCategory)
api.put('/image/:imageId/urlimage', auth, imageCtrl.updateUrlImage)
api.put('/image/:imageId', /*auth,*/ imageCtrl.uploadImage)
api.put('/image/:imageId/like', auth, imageCtrl.setLikeScoreByImageId)
api.put('/image/:imageId/dislike', auth, imageCtrl.setDislikeScoreByImageId)
api.delete('/image/:imageId', /*auth,*/ imageCtrl.deleteImage)

// paths [ login ]
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

// paths [ user ]
api.get('/users', userCtrl.getUsers)
api.get('/users/score', userCtrl.getUsersOrderByScore)
api.get('/users/:number/score', userCtrl.getXusersOrderByScore)
api.get('/users/:number/visits', userCtrl.getXusersOrderByVisits)
api.get('/users/:number/victories', userCtrl.getXusersOrderByVictories)
api.get('/user/:userId', userCtrl.getUserById)
api.get('/user/username/:username', userCtrl.getUserByUsername)
api.get('/users/:number/category/:category', userCtrl.getXusersOrderByCategory)
api.put('/user/:userId/scorebylike', auth, userCtrl.setLikeScoreByUserId)
api.put('/user/:userId/scorebydislike', auth, userCtrl.setDislikeScoreByUserId)
api.put('/user/:userId/scorebyvictory', auth, userCtrl.setVictoryScoreByUserId)
api.put('/user/:userId/scorebydefeat', auth, userCtrl.setDefeatScoreByUserId)
api.put('/user/:userId/updateuser', auth, userCtrl.updateUser)
api.put('/user/:userId/uploadavatar', userCtrl.uploadAvatar)
api.put('/user/:userId/uploadimghead', userCtrl.uploadImgHead)
api.get('/user/:userId/imghead', userCtrl.getImageHeaderByUserId)
api.get('/user/:userId/avatar', userCtrl.getAvatarByUserId)

// paths [ theme ]
api.post('/theme', auth, themeCtrl.createTheme)
api.get('/themes', themeCtrl.getAllThemes)
api.get('/theme/:themeId', themeCtrl.getTheme)
api.get('/themes/ids', themeCtrl.getIds)
api.put('/theme/:themeId', auth, themeCtrl.updateTheme)
api.delete('/theme/:themeId', auth, themeCtrl.deleteTheme)

// paths [ comment ]
api.post('/comment', /*auth,*/ commentCtrl.createComment)
api.get('/comments/receiver/:idReceiver', commentCtrl.getCommentsByIdReceiver)
api.get('/comments', commentCtrl.getAllComments)
api.delete('/comment/:commentId', auth, commentCtrl.deleteComment)

// paths [ duel ]
api.post('/duel', /*auth,*/ duelCtrl.createDuel)
api.post('/duel/:duelId/uploadchallengedimage', duelCtrl.uploadImageChallenged)
api.post('/duel/:duelId/uploadchallengerimage', duelCtrl.uploadImageChallenger)
api.get('/duels', duelCtrl.getAllDuels)
api.get('/duels/:number', auth, duelCtrl.getXduelsByCreatedAt)
api.get('/duels/user/:userId', duelCtrl.getAllDuelsByUserId)
api.get('/duels/orderbycreation', duelCtrl.getAllDuelsOrderByCreation)
api.get('/duels/:number/orderbycreation', duelCtrl.getXduelsOrderByCreation)
api.get('/duels/category/:category', duelCtrl.getAllDuelsByCategory)
api.get('/duel/:duelId/getimagechallenged', duelCtrl.getImageChallenged)
api.get('/duel/:duelId/getimagechallenger', duelCtrl.getImageChallenger)
api.delete('/duel/:duelId', duelCtrl.deleteDuel)
api.put('/duel/:duelId', duelCtrl.updateDuel)
api.put('/duel/:duelId/likeforchallenged', duelCtrl.setLikeByChallenged)
api.put('/duel/:duelId/likeforchallenger', duelCtrl.setLikeByChallenger)

// paths [ notification ]
api.post('/notification', auth, notificationCtrl.createNotification)
api.get('/notifications', notificationCtrl.getAllNotifications)
api.get('/notifications/:idReceiver', notificationCtrl.getNotificationsByIdReceiver)
api.put('/notification/:idNotification', auth, notificationCtrl.updateNotification)

// paths [ private ]
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'you have access' })
})

module.exports = api