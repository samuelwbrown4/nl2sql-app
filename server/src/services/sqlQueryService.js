const config = require('../config/schemaConfig.json')

const { buildQuery, requestNormalized, requestAnalysis } = require('../services/llmService')
const { executeQuery } = require('../services/dbService')

const sqlQueryService = async (req, res) => {
    try {
        const { source, query } = req.body

        if (!config[source.toLowerCase()]) {
            return res.status(400).json({ 'Error': 'Invalid source' })
        }

        const answer = await buildQuery(config[source.toLowerCase()], query)

        // return res.status(200).json(answer) 

        if (answer.clarificationNeeded) {
            return res.status(200).json(answer.clarificationNeeded)
        } else {

            if (answer.sqlArray) {
                console.log(answer.sqlArray)
                let sqlResults = await executeQuery(source.toLowerCase(), answer.sqlArray)

                let analysis = await requestAnalysis(query, answer.sqlArray, sqlResults, answer.notes)
                return res.status(200).json(analysis)
            } else {
                console.log('LOG PRE QUERY EXECUTION')
                let sqlAnswer = await executeQuery(source.toLowerCase(), answer.sql)

                if (sqlAnswer.length >= 10) {
                    return res.status(200).json(sqlAnswer)
                } else {
                    let normalized = await requestNormalized(query, sqlAnswer)
                    console.log('LOG POST QUERY EXECUTION')
                    return res.status(200).json(normalized)
                }
            }
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { sqlQueryService }