const { buildDocQuery, synthesizeFileContent } = require('./llmService')
const {getDocContent , getDocBuffer} = require('../services/s3Service')
const {extractText} = require('../services/docCreateService')


const docQueryService = async (req , res) => {
    try{
        const {query} = req.body
        const config = JSON.parse(await getDocContent('docConfig.json'))
        let doc =  await buildDocQuery(config.docs , query)
        if(doc.noDocFound){
            return res.status(404).json(doc.message)
        }else{
            
            let buffer = await getDocBuffer(doc.message)
            let content = await extractText(doc.message , buffer)
            let howTo = await synthesizeFileContent(content , query)

            res.status(200).json(howTo)
        }

        
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {docQueryService}