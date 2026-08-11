const {buildDocDraftQuery} = require('../services/llmService')

const draftDocService = async (req , res) => {
    try{
        const {title , system , content} = req.body
        let draft = await buildDocDraftQuery(title , system , content)
        res.status(200).json(draft)
    }catch(error){
        res.status(500).json({error: error.message})
        console.log(error)
    }
}

module.exports = {draftDocService}

