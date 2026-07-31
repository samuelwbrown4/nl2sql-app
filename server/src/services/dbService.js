const {pools} = require('../db/connections');

const executeQuery = async(source , query) => {
    try{
        console.log('>>> EXECUTING QUERY FOR SOURCE:', source)
        if(!pools[source]){
            throw new Error('No connection exists for source')
        }
        let response = await pools[source].query(query)
        return response.rows
    }catch(error){
        console.log('>>> CAUGHT ERROR IN executeQuery:', error)
        console.log(error)
        throw error
    }
    
}

module.exports = {executeQuery}