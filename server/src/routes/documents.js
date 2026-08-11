const express = require('express');
const router = express.Router()

const {draftDocService , createDocService} = require('../services/docCreateService')

router.post('/draft' , draftDocService)

router.post('/create' , createDocService)

module.exports = router