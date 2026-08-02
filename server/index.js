const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

const PORT = 3000

const queryRoute = require('./src/routes/query')

app.use(cors())
app.use(express.json())

app.use('/api' , queryRoute)

app.listen(PORT , () => {
    console.log(`NL2SQL app up and running on port ${PORT}`)
})