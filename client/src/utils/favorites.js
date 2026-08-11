const favoriteQuery = async (query , source , shortName , sqlMode , auth) => {
    try {
        const API_URL = import.meta.env.VITE_API_URL
        let response = await fetch(`${API_URL}/api/favorites/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`
            },
            body: JSON.stringify({
                query: query,
                source: source,
                sqlMode: sqlMode,
                shortName: shortName
            })
        });
        let result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

const getFavorites = async (auth) => {
    const API_URL = import.meta.env.VITE_API_URL
    try{
        let response = await fetch(`${API_URL}/api/favorites/` , {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${auth}`
            }
        });

        let result = await response.json()
        return result.favorites
    }catch(error){
        console.log(error)
    }

}

export {favoriteQuery , getFavorites}