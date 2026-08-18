const {pools} = require('../db/connections');

const executeQuery = async(source , query) => {
    try{
        console.log('>>> EXECUTING QUERY FOR SOURCE:', source)
        if(!pools[source]){
            throw new Error('No connection exists for source')
        }
        if(Array.isArray(query)){
            let results = []
            for(i = 0 ; i < query.length ; i++){
                let res = await pools[source].query(query[i])

                results.push(res.rows)
            }

            return results
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