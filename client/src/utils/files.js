

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

const publishFreeformDoc = async (title, description, fileName, tags, system , fileContent , auth) => {
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
                system
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

const publishDoc = async(file, title, description, name, tags, system, auth) => {
    try{
        const API_URL = import.meta.env.VITE_API_URL
        let formData = new FormData()
        formData.append('title' , title)
        formData.append('description' , description)
        formData.append('name' , name)
        formData.append('tags' , JSON.stringify(tags))
        formData.append('system' , system)
        formData.append('file' , file)

        let response = await fetch(`${API_URL}/api/documents/publish` , {
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

export { createFile, publishFreeformDoc , uploadDocFile , getAllFiles , downloadFile , previewFile , publishDoc}