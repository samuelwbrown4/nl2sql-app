const config = require('../config/schemaConfig.json')
const express = require('express')
const router = express.Router()

const {buildQuery} = require('../services/llmService')
const {executeQuery} = require('../services/dbService')

router.post('/query' , async(req , res) => {
    try{
        const {source , query} = req.body
        
        if(!config[source]){
            return res.status(400).json({'Error' : 'Invalid source'})
        }

        const answer = await buildQuery(config[source] , query)

        if(answer.clarification_needed){
            return res.status(200).json(answer.message)
        }else{
            console.log('LOG PRE QUERY EXECUTION')
            let sqlAnswer = await executeQuery(source , answer.message)
            console.log('LOG POST QUERY EXECUTION')
            return res.status(200).json(sqlAnswer)
        }
        
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = router