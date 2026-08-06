const signIn = async(email , password) => {
    const API_URL = import.meta.env.VITE_API_URL
    try{
        let response = await fetch(`${API_URL}/api/users/sign-in` , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        let result = await response.json();
        if(result.token){
            localStorage.setItem('auth' , result.token)
        }
        
        return result

    }catch(error){
        console.log(error)
    }
}

const signOut = () => {
    localStorage.removeItem('auth')
}

export {signIn , signOut}