import {Modal , Input , Button} from '@mantine/core'
import {useState} from 'react'

function SignInModal({signInPressed , setSignInPressed , handleSignIn, setAuth , email , password , setEmail , setPassword}){
  



    return(
        <Modal title={<h3>Sign In</h3>} opened={signInPressed} onClose={()=>setSignInPressed(false)}>
            <div style={{display: 'flex' , flexDirection: 'column' , alignItems: 'center' , gap: '2rem' , marginTop: '2rem'}}>
                <div style={{display: 'flex' , flexDirection: 'column' , alignItems: 'center' , gap: '1rem'}}>
                    <div style={{display: 'flex' , gap: '1rem' , justifyContent: 'right' , width: '100%'}}>
                    <span>Email: </span>
                    <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='john.smith@example.com'/>
                </div>
               <div style={{display: 'flex' , gap: '1rem' , justifyContent: 'right' , width: '100%'}}>
                    <span>Password: </span>
                    <Input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Pa$$word123'/>
                </div>  
                </div>
                
                <div style={{width: '50%' , display: 'flex' , justifyContent: 'center'}}>
                    <Button variant='gradient' gradient={{ from: 'pink', to: 'violet', deg: 90 }} onClick={()=>handleSignIn(email , password)}>Sign In</Button>
                </div>
                
            </div>
        </Modal>
    )
}

export default SignInModal;