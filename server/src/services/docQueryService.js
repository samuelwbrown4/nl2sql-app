const config = require('../config/docConfig.json')
const { buildDocQuery, synthesizeFileContent } = require('./llmService')
const {getDocContent} = require('../services/s3Service')


const docQueryService = async (req , res) => {
    try{
        const {query} = req.body
        let doc =  await buildDocQuery(config.docs , query)
        if(doc.noDocFound){
            return res.status(doc.message)
        }else{
            let content = await getDocContent(doc.message)
            let howTo = await synthesizeFileContent(content , query)

            res.status(200).json(howTo)
        }

        
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {docQueryService}