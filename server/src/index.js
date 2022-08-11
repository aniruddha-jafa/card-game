const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

app = express()

// -- middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

app.use(helmet())

// -- routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
})

const PORT = 4060
app.listen(PORT, (req, res) => {
    console.log(`Listening at http://localhost:${PORT}`)
})
