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
                temperature: 0,
                messages: [
                    { role: 'user', content: prompt }
                ]
            })
        })

        let result = await response.json()
        console.log('>>>SQL RESULT' , result)

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
    return `Take the following schema and query and return raw SQL that would execute the query. Return only SELECT statements, return only raw SQL, while paying attention to exact enum values, with no preamble or leading or trailing text. Be mindful of any conditions expressed in a table to determine proper SQL and do not use lazy aliases. Be intentional and descriptive in your aliasing of tables. When a question asks for human-readable information (such as names, addresses, or statuses), you MUST join to the relevant table and return the resolved value — never return a raw foreign key ID in place of the readable value it points to. Only ask for clarification when the question is genuinely ambiguous about what data is being requested, not when it simply requires a join or conditional logic to resolve. Pay attention to known pitfalls, and avoid those pitfalls. If the query is ambiguous, return a response fitting the format 'CLARIFICATION_NEEDED: <a short question asking the user what they meant>. SCHEMA: ${JSON.stringify(source)} , QUERY: ${query}`
}

const stripSql = (text) => {
    let modifiedText = text.replace('```sql\n' , '').replace('```' , '')
    return modifiedText
}

const normalizeResultPrompt = (originQuery , queryResponse) => {
    return `This query result (${JSON.stringify(queryResponse)}) was returned as a response to the following query: ${originQuery}. Summarize the result in plain English, using context from the original query. Return response in object format with property "intro" with value of a string for the intro into the data results and property "bullets" being represented by an array with each index of the array being a string of text for that point. Give no trailing text past this object.`
}

const requestNormalized = async(originQuery , queryResponse) => {
    try{
        console.log('>>>ORIGIN QUERY' , originQuery)
        console.log('>>>QUERY RESPONSE' , queryResponse)
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

        let result = await response.json()

        console.log('RAW TEXT:', JSON.stringify(result.content[0].text))

        return JSON.parse(result.content[0].text.replace('```json\n' , '').replace('\n```' , ''))
    }catch(error){
        console.log(error)
        throw error
    }
}

module.exports = { buildQuery , requestNormalized }