const express = require('express')
const router = express.Router()

const {sqlQueryService} = require('../services/sqlQueryService')
const {docQueryService} = require('../services/docQueryService')

router.post('/query' , async(req , res) => {
    try{
        const {mode , source , query} = req.body

        if(mode === 'sql'){
            await sqlQueryService(req , res)
            
        }else if(mode === 'document'){
            await docQueryService(req , res)
           
        }else{
            return res.status(400).json({message: 'No mode selected'})
        }
        
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = router