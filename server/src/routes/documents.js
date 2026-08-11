const express = require('express');
const router = express.Router()

const {draftDocService} = require('../services/docCreateService')

router.post('/draft' , draftDocService)

module.exports = router