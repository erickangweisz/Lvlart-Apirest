'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(), // date creation token
        exp: moment().add(14, 'days').unix() // date token expired
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'the token has expired'
                })
            }
            resolve(payload.sub)
        } catch (err) {
            reject({
                status: 500,
                message: 'invalid token'
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}