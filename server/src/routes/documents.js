const express = require('express');
const router = express.Router()
const {upload} = require('../middleware/upload')

const {draftDocService , createDocService , uploadDraftFromFileService} = require('../services/docCreateService')
const {getDocListService} = require('../services/docListService')

router.post('/draft' , draftDocService)

router.post('/create' , createDocService)

router.post('/upload' , upload.single('file') , uploadDraftFromFileService)

router.get('/list' , getDocListService)

module.exports = router