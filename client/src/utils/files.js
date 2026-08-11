

const createFile = async (title, system, content, auth) => {
    const API_URL = import.meta.env.VITE_API_URL
    try {
        let response = await fetch(`${API_URL}/api/documents/draft`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`
            },
            body: JSON.stringify({
                title,
                system,
                content
            })
        });

        let result = await response.json()

        return result
    } catch (error) {
        console.log(error)
    }
}

const uploadDoc = async (title, description, fileName, tags, system , fileContent , auth) => {
    const API_URL = import.meta.env.VITE_API_URL
    try {
        let response = await fetch(`${API_URL}/api/documents/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${auth}`
            },
            body: JSON.stringify({
                title,
                description,
                fileName,
                tags,
                fileContent,
            })
        });

        let result = await response.json()

        return result
    } catch (error) {
        console.log(error)
    }
}

export { createFile, uploadDoc }