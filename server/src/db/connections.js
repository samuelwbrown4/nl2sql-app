const {Pool} = require('pg')

const pools = {
    routebase: new Pool({
    host: process.env.ROUTEBASE_DB_HOST,
    port: process.env.ROUTEBASE_DB_PORT,
    database: process.env.ROUTEBASE_DB_NAME,
    user: process.env.ROUTEBASE_DB_USER,
    password: process.env.ROUTEBASE_DB_PASSWORD,
    ssl: { rejectUnauthorized: false }
    })
} 

module.exports = {pools}