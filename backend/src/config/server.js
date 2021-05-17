const port = 3003

const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(allowCors)

server.listen(port, () => {
    console.log(`BACKEND RODANDO NA PORTA ${port}.`)
})

module.exports = server