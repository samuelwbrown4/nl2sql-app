const {getDocConfig , getDocContent , getDocBuffer} = require('../services/s3Service')
const {extractText} = require('../services/docCreateService')
const mammoth = require('mammoth')

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
        let buffer = await getDocBuffer(file)
        let extractedText = await extractText(file , buffer)

        let previewHtml = null
        if (file.split('.').pop() === 'docx') {
            const result = await mammoth.convertToHtml({ buffer: buffer})
            previewHtml = result.value
        }
        let content = await getDocContent(file)
        if(previewHtml){
            return res.status(200).json(previewHtml)
        }
        res.status(200).json(content)

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {getDocListService , previewDocService}