import {Modal , Input , Button} from '@mantine/core'
import {useState} from 'react'

function SignInModal({signInPressed , setSignInPressed , signIn}){
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    return(
        <Modal title='Sign In to SchemaSpeak' opened={signInPressed} onClose={()=>setSignInPressed(false)}>
            <div style={{display: 'flex' , flexDirection: 'column'}}>
                <div style={{display: 'flex' , gap: '1rem'}}>
                    <span>Email: </span>
                    <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='john.smith@example.com'/>
                </div>
               <div style={{display: 'flex' , gap: '1rem'}}>
                    <span>Password: </span>
                    <Input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Pa$$word123'/>
                </div>  
                <Button onClick={()=>signIn(email , password)}>Sign In</Button>
            </div>
        </Modal>
    )
}

export default SignInModal;