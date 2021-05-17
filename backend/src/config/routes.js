const express = require('express')

module.exports = server => {
    const router = express.Router()
    server.use('/api', router)

    const churrasTrincaService = require('../api/churrastrinca/churrasTincaService')
    churrasTrincaService.register(router, '/churrastrinca')
}