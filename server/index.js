const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

const PORT = 3000

const queryRoute = require('./src/routes/query')
const userRoute = require('./src/routes/users')
const favoritesRoutes = require('./src/routes/favorites')

app.use(cors())
app.use(express.json())

app.use('/api' , queryRoute)
app.use('/api/users' , userRoute)
app.use('/api/favorites' , favoritesRoutes)

app.listen(PORT , () => {
    console.log(`NL2SQL app up and running on port ${PORT}`)
})