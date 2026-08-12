

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

const uploadDocFile = async(file , title , system) => {
    const API_URL = import.meta.env.VITE_API_URL
    try{
        let formData = new FormData()
        formData.append('file' , file)
        formData.append('title' , title)
        formData.append('system' , system)

        let response = await fetch(`${API_URL}/api/documents/upload` , {
            method: 'POST',
            body: formData
        });

        let result = await response.json()

        return result
    }catch(error){
        console.log(error)
    }
}

const getAllFiles = async () => {
    const API_URL = import.meta.env.VITE_API_URL
    try{
        let response = await fetch(`${API_URL}/api/documents/list` , {
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        let result = await response.json()

        return result
    }catch(error){
        console.log(error)
    }
}

const downloadFile = async (fileName) => {
    const API_URL = import.meta.env.VITE_API_URL
    try{
        let response = await fetch(`${API_URL}/api/documents/download/${fileName}` , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        let result = await response.json()

        return result
    }catch(error){
        console.log(error)
    }
}

const previewFile = async(fileName) => {
    let API_URL = import.meta.env.VITE_API_URL
    try{
        let response = await fetch(`${API_URL}/api/documents/preview/${fileName}` , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        let result = await response.json()

        return result
    }catch(error){
        console.log(error)
    }
}

export { createFile, uploadDoc , uploadDocFile , getAllFiles , downloadFile , previewFile}