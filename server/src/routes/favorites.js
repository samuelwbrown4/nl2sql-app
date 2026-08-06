const express = require('express')
const router = express.Router()

const {requireAuth} = require('../middleware/auth')
const {favoriteQueryService , getFavoritesService} = require('../services/favoritesService')

router.post('/' , requireAuth , favoriteQueryService)

router.get('/' , requireAuth , getFavoritesService)

module.exports = router