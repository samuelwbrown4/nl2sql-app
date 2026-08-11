const {buildDocDraftQuery} = require('../services/llmService')
const {uploadDocContent , updateDocConfig} = require('../services/s3Service')

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

const createDocService = async (req , res) => {
    try{
        const {title , system , description , fileName , fileContent , tags} = req.body
        const id = fileName.split('.' , 2)[0]
        let doc = await uploadDocContent(fileName , fileContent)

        let configJson = await getDocContent('docConfig.json')
        let config = JSON.parse(configJson)

        config.docs.push({
            id: id,
            system: system,
            title: title,
            tags: tags,
            description: description,
            file: fileName
        })

        await updateDocConfig(config)

        res.status(201).json({message: `Successfully created file: ${fileName}`})
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {draftDocService , createDocService}

