const express = require('express');
const router = express.Router()
const {upload} = require('../middleware/upload')

const {draftDocService , createDocService , uploadDraftFromFileService , publishDocService} = require('../services/docCreateService')
const {getDocListService , previewDocService} = require('../services/docListService')
const {docDownloadService} = require('../services/docDownloadService')

router.post('/draft' , draftDocService)

router.post('/create' , createDocService)

router.post('/upload' , upload.single('file') , uploadDraftFromFileService)

router.post('/publish' , upload.single('file') , publishDocService)

router.get('/list' , getDocListService)

router.get('/preview/:file' , previewDocService)

router.get('/download/:file' , docDownloadService)

module.exports = router