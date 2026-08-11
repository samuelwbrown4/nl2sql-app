

const createFile = async(title , system , content , auth) => {
    const API_URL = import.meta.env.VITE_API_URL
    try{
        let response = await fetch(`${API_URL}/api/documents/draft` , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${auth}`
            },
            body: JSON.stringify({
                title,
                system,
                content
            })
        });

        let result = await response.json()

        let r = await result.json()
        return r
    }catch(error){
        console.log(error)
    }
}

export {createFile}