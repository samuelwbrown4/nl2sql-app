const {Pool} = require('pg')

console.log('password type:', typeof process.env.ROUTEBASE_DB_PASSWORD, JSON.stringify(process.env.ROUTEBASE_DB_PASSWORD))

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