const express = require('express');
const router = express.Router()
const {upload} = require('../middleware/upload')

const {draftDocService , createDocService , uploadDraftFromFileService} = require('../services/docCreateService')

router.post('/draft' , draftDocService)

router.post('/create' , createDocService)

router.post('/upload' , upload.single('file') , uploadDraftFromFileService)

module.exports = router