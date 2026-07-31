const express = require('express')
require('dotenv').config()
const app = express()

const PORT = 3000

const queryRoute = require('./src/routes/query')

app.use(express.json())

app.use('/api' , queryRoute)

app.listen(PORT , () => {
    console.log(`NL2SQL app up and running on port ${PORT}`)
})