const {getDocConfig , getDocContent} = require('../services/s3Service')

const getDocListService = async (req , res) => {
    try{
        let configText = await getDocConfig()
        let config = JSON.parse(configText)
        return res.status(200).json(config)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const previewDocService = async (req , res) => {
    try{
        const {file} = req.params
        let content = await getDocContent(file)
        res.status(200).json(content)

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {getDocListService , previewDocService}