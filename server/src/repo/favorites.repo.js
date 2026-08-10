
const {appDbPool} = require('../db/connections')

const favoriteQuery = async(query , source , shortName , sqlMode , userId) => {
    try{
        let result = await appDbPool.query(`
            INSERT INTO favorite_queries (query , source, short_name , sqlMode , user_id)
            VALUES ($1 , $2 , $3 , $4 , $5)
            RETURNING *
            `,[query , source , shortName , sqlMode , userId])

        return result.rows[0]
    }catch(error){
        throw error
    }
}

const getFavorites = async(userId) => {
    try{
        let result = await appDbPool.query(`
            SELECT * FROM favorite_queries WHERE user_id = $1
            `,[userId])

        return result.rows
    }catch(error){
        throw error
    }
}

module.exports = {favoriteQuery , getFavorites}