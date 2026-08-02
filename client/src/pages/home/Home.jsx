import { useState, useEffect } from "react";
import { Input, Select, Image } from '@mantine/core'
import styles from './Home.module.css'

function Home() {
    const [queryInput, setQueryInput] = useState('');
    const [source , setSource] = useState('');

    const [answer , setAnswer] = useState('')

    const API_URL = import.meta.env.VITE_API_URL

    async function submitQuery(){
        if(source === '' || queryInput === ''){
            return alert('Need to select a data source and submit a query')
        }
        try{
            let response = await fetch(`${API_URL}/api/query` , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source: source,
                    query: queryInput
                })
            })

            let result = await response.json()

            setAnswer(result)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className={styles.root}>
            <div style={{flex: 1 , marginTop: '3rem' , display: 'flex' , flexDirection: 'column' , alignItems: 'center'}}>
                <h1 style={{ color: 'white' , paddingBottom: '2rem' , margin: '0rem' }}>Welcome to SchemaSpeak!</h1>
            
            <div style={{paddingBottom: '2rem' , display: 'flex' , alignItems: 'center'}}>
                <Image src={'/schema_speak_logo.png'} h={150} w={150}/>
            </div>
            </div>
            <div className={styles.inputDiv}>
                
                <form >
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '25%' }}>
                            <Select 
                                styles={{ 
                                    input: { 
                                        backgroundColor: '#333', 
                                        border: '1px solid white', 
                                        width: '100%', 
                                        borderRadius: '30px' , 
                                        color: 'white' 
                                    }, 
                                    wrapper: {
                                        width: '100%'
                                    } 
                                }} 
                                size='xl' 
                                data={['routebase']} 
                                value={source} 
                                onChange={(value)=>setSource(value)} 
                                w={230} 
                                placeholder="Select Source" />
                        </div>
                        <div style={{ width: '75%' }}>
                            <Input size='xl' styles={{ input: { width: '100%', backgroundColor: '#333', borderColor: 'white', color: 'white', borderRadius: '30px' }, wrapper: { width: '100%' } }} value={queryInput} onChange={(e) => setQueryInput(e.target.value)} placeholder={'Ask away...'} onKeyDown={(e) => { if (e.key === 'Enter') submitQuery() }} />
                        </div>
                    </div>
                </form>
            </div>
            <div style={{flex: 1}}>
                <p style={{color: 'white'}}>{answer}</p>
            </div>
        </div>
    )
}

export default Home;