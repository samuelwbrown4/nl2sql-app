
const {pool} = require('../db/connections')

const favoriteQuery = async(query , source , userId) => {
    try{
        let result = await pool.query(`
            INSERT INTO favorite_queries (query , source, user_id)
            VALUES ($1 , $2 , $3)
            RETURNING *
            `[query , source , userId])

        return result.rows[0]
    }catch(error){
        throw error
    }
}

const getFavorites = async(userId) => {
    try{
        let result = await pool.query(`
            SELECT * FROM favorite_queries WHERE user_id = $1
            `,[userId])

        return result.rows
    }catch(error){
        throw error
    }
}

module.exports = {favoriteQuery , getFavorites}