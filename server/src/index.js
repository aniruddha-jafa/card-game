const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { Server } = require('socket.io')

// ---------------------------------------------

const PORT = 4060
const CLIENT_ORIGIN_URL = 'http://localhost:3000'

app = express()

const httpServer = require('http').createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: CLIENT_ORIGIN_URL,
    },
})

// -- middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
    cors({
        origin: CLIENT_ORIGIN_URL,
    })
)

app.use(helmet())

io.use((socket, next) => {
    const username = socket.handshake.auth.username
    if (!username) {
        return next(new Error('invalid username'))
    }
    socket.username = username
    next()
})

io.on('connection', (socket) => {
    console.info('A user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.emit('message', 'Hello!')
})

// -- routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
})

httpServer.listen(PORT, (req, res) => {
    console.log(`Listening at http://localhost:${PORT}`)
})
