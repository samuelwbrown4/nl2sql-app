const {favoriteQuery , getFavorites} = require('../repo/favorites.repo')

const favoriteQueryService = async(req , res) => {
    try{
        const {query , source , sqlMode , shortName} = req.body
        const userId = req.user.userId
        let favorited = await favoriteQuery(query , source , shortName , sqlMode , userId)
        res.status(201).json({favorited})
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const getFavoritesService = async(req , res) => {
    try{
        const userId = req.user.userId
        let favorites = await getFavorites(userId)
        res.status(200).json({favorites})
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {favoriteQueryService , getFavoritesService}