const { buildDocDraftQuery, buildDocMetadataQuery } = require('../services/llmService')
const { uploadDocContent, updateDocConfig, getDocContent, getDocConfig } = require('../services/s3Service')
const mammoth = require('mammoth')

const draftDocService = async (req, res) => {
    try {
        const { title, system, content } = req.body
        let draft = await buildDocDraftQuery(title, system, content)
        res.status(200).json(draft)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)
    }
}

const createDocService = async (req, res) => {
    try {
        const { title, system, description, fileName, fileContent, tags } = req.body
        const id = fileName.split('.', 2)[0]

        const extension = fileName.split('.').pop()
        let contentType = null

        switch (extension) {
            case 'txt':
                contentType = 'text/plain'
                break;
            case 'md':
                contentType = 'text/markdown'
                break;
            case 'docx':
                contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                break;
            default:
                contentType = 'application/octet-stream'
        }

        let doc = await uploadDocContent(fileName, fileContent , contentType)

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

        res.status(201).json({ message: `Successfully created file: ${fileName}` })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const extractText = async (fileName, buffer) => {

    const extension = fileName.split('.')[1]

    if (extension === 'md' || extension === 'txt') {
        return buffer.toString('utf-8')
    }

    if (extension === 'docx') {
        let result = await mammoth.extractRawText({ buffer })
        return result.value
    }

    throw new Error(`Unsupported file type: .${extension}`)
}

const uploadDraftFromFileService = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        const { system, title } = req.body
        const extractedText = await extractText(req.file.originalname, req.file.buffer)

        let previewHtml = null
        if (req.file.originalname.split('.').pop() === 'docx') {
            const result = await mammoth.convertToHtml({ buffer: req.file.buffer })
            previewHtml = result.value
        }
        const metadata = await buildDocMetadataQuery(title, system, extractedText)

        res.status(200).json({
            ...metadata,
            name: req.file.originalname,
            previewHtml,
            extractedText
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const publishDocService = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        const { title, system, description, name } = req.body
        const tags = JSON.parse(req.body.tags)
        const id = name.split('.', 2)[0]

        const extension = name.split('.').pop()
        let contentType = null

        switch (extension) {
            case 'txt':
                contentType = 'text/plain'
                break;
            case 'md':
                contentType = 'text/markdown'
                break;
            case 'docx':
                contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                break;
            default:
                contentType = 'application/octet-stream'
        }

        await uploadDocContent(name, req.file.buffer, contentType)

        const configFile = await getDocConfig()
        const config = JSON.parse(configFile)

        config.docs.push({
            id: id,
            system: system,
            title: title,
            tags: tags,
            description: description,
            file: name
        })

        await updateDocConfig(config)

        res.status(200).json({ message: 'Successfully published' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { draftDocService, createDocService, uploadDraftFromFileService, extractText , publishDocService }

