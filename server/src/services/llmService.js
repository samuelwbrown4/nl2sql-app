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

const buildDocQuery = async (docs , query) => {
    try{
        let prompt = buildDocPrompt(docs , query)

        let response = await fetch('https://api.anthropic.com/v1/messages' , {
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
        });

        let result = await response.json()

        let noDocFound = result.content[0].text.includes('NO_DOC_FOUND')
        let text = noDocFound ? result.content[0].text.split('NO_DOC_FOUND:' , 2)[1] :  result.content[0].text.split('FILE_FOUND: ' , 2)[1]

        return {
            noDocFound: noDocFound,
            message: text
        }
    }catch(error){
        console.log(error)
        throw error
    }
}

const buildDocDraftQuery = async (title , system , content) => {
    try{
        let prompt = buildCreateDocPrompt(title , system , content)

        let response = await fetch('https://api.anthropic.com/v1/messages' , {
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
        });

        let result = await response.json()

        let fileContent = stripJson(result.content[0].text)

        return fileContent
    }catch(error){
        console.log(error)
        throw error
    }
}


const buildPrompt = (source, query) => {
    return `Take the following schema and query and return raw SQL that would execute the query. Return only SELECT statements, return only raw SQL, while paying attention to exact enum values, with no preamble or leading or trailing text. Be mindful of any conditions expressed in a table to determine proper SQL and do not use lazy aliases. Be intentional and descriptive in your aliasing of tables. When a question asks for human-readable information (such as names, addresses, or statuses), you MUST join to the relevant table and return the resolved value — never return a raw foreign key ID in place of the readable value it points to. Only ask for clarification when the question is genuinely ambiguous about what data is being requested, not when it simply requires a join or conditional logic to resolve. Pay attention to known pitfalls, and avoid those pitfalls. If the query is ambiguous, return a response fitting the format 'CLARIFICATION_NEEDED: <a short question asking the user what they meant>. SCHEMA: ${JSON.stringify(source)} , QUERY: ${query}`
}

const buildDocPrompt = (docs , query) => {
    return `Take the following query and return the document that most matches what the user is asking how to do. The documents are QRG's (quick reference guides) or SOP's (standard operating procedures). Consider the tags on each document, and use the description field of each document to verify which document most matches the request. If there is no relevant document for the query, or if the query is ambiguous, return a response fitting the format 'NO_DOC_FOUND: <explain that the document was either not found because a QRG does not exist yet, or the query was too ambiguous>'. If matching document is found, only return in the format 'FILE_FOUND: <file>'. DOCUMENTS: ${JSON.stringify(docs)} , QUERY: ${query}`
}

const buildDocSummaryPrompt = (file , originalQuery) => {
    return `Take the following query and file content to synthesize instrcutions to accomplish what the user has asked. QUERY: ${originalQuery} , CONTENT: ${file}. Return response in object format with property "intro" with value of a string for the intro into the result and property "bullets" being represented by an array with each index of the array being a string of text for that point. Give no trailing text past this object.`
}

const buildCreateDocPrompt = (title , system , content) => {
    return `Build a QRG based on the following information. It should be instructional and designed to help future users accomplish a task. Preserve any specific instructions given to you, but make the steps more coherent and technical where applicable. TITLE: ${title} , SYSTEM: ${system} , CONTENT: ${content}. Response should be in JSON object format. {
      "id": "<kebab-case-short-descriptive-id>",
      "system": "<system as passed to you>",
      "title": "<title as passed to you>",
      "tags": "<array of one to two word, relevant tags. will be used to search by later>",
      "description": "One sentence description of what this 'how to' document covers",
      "file": "suggested file name with markdown extension (.md). will likely be the same as or similar to the id. kebab case.",
      "content": "should be written out as a full document, including title. using the content passed to you"
    }`
}

const stripSql = (text) => {
    let modifiedText = text.replace('```sql\n' , '').replace('```' , '')
    return modifiedText
}

const stripJson = (text) => {
    let modifiedText = text.replace('```json\n' , '').replace('\n```' , '')
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

const synthesizeFileContent = async(content , originalQuery) => {
    try{
        let prompt = buildDocSummaryPrompt(content , originalQuery)
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

        return JSON.parse(result.content[0].text.replace('```json\n' , '').replace('\n```' , ''))
    }catch(error){
        console.log(error)
        throw error
    }
}

module.exports = { buildQuery , requestNormalized , buildDocQuery , synthesizeFileContent , buildDocDraftQuery}