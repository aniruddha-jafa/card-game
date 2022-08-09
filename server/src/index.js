const express = require('express')
app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = 4060
app.listen(PORT, (req, res) => {
    console.log(`Listening at http://localhost:${PORT}`)
})
