const buildQuery = async (source, query) => {
    try {
        let prompt = buildPrompt(source, query)

        let response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 1000,
                messages: [
                    { role: 'user', content: prompt }
                ]
            })
        })

        let result = await response.json()
        console.log(result)

        let clarificationNeeded = result.content[0].text.includes('CLARIFICATION_NEEDED') 
        let text = clarificationNeeded ? result.content[0].text.split('CLARIFICATION_NEEDED:', 2)[1] : stripSql(result.content[0].text)
        


        return {
            clarification_needed: clarificationNeeded,
            message: text
        }



    } catch (error) {
        console.log(error)
        throw error
    }
}

const buildPrompt = (source, query) => {
    return `Take the following schema and query and return raw SQL that would execute the query. Return only SELECT statements, return only raw SQL, while paying attention to exact enum values, with no preamble or leading or trailing text. If the query is ambiguous, return a response fitting the format 'CLARIFICATION_NEEDED: <a short question asking the user what they meant>. SCHEMA: ${JSON.stringify(source)} , QUERY: ${query}`

}

const stripSql = (text) => {
    let modifiedText = text.replace('```sql\n' , '').replace('```' , '')
    return modifiedText
}

const normalizeResultPrompt = (originQuery , queryResponse) => {
    return `This query result (${queryResponse}) was returned as a response to the following query: ${originQuery}. Transform the response into plain English. Your response should be returned in object format, with key 'preamble' associated with original query context. Key 'resultData' contains value of the actual data. Result data will be mapped over on the front end of the application.`
}

const requestNormalized = async(originQuery , queryResponse) => {
    try{
        let prompt = normalizeResultPrompt(originQuery , queryResponse);

        let response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 1000,
                messages: [
                    { role: 'user', content: prompt }
                ]
            })
        })
    }catch(error){
        console.log(error)
        throw error
    }
}

module.exports = { buildQuery , requestNormalized }