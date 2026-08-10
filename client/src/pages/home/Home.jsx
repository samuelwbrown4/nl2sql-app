import { useState, useEffect } from "react";
import { Input, Select, Image, Button, Drawer , Switch , Loader} from '@mantine/core'
import SignInModal from "../../components/SignInModal";
import AddFavoriteModal from "../../components/AddFavoriteModal.jsx";
import AddDocumentModal from "../../components/AddDocumentModal.jsx";
import styles from './Home.module.css'
import { signIn, signOut } from "../../utils/signIn.js";
import { favoriteQuery, getFavorites } from "../../utils/favorites.js";
import starIcon from '../../assets/list-star.svg'
import starFillIcon from '../../assets/star.svg'
import dbIcon from '../../assets/database.svg'
import docIcon from '../../assets/file-cloud.svg'

function Home() {
    const [auth, setAuth] = useState(localStorage.getItem('auth') || undefined)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shortName, setShortName] = useState('')
    const [queryInput, setQueryInput] = useState('');
    const [source, setSource] = useState('');
    const [sqlMode , setSqlMode] = useState(true)
    const [signInPressed, setSignInPressed] = useState(false);
    const [favoritesShown, setFavoritesShown] = useState(false);
    const [favoritesList, setFavoritesList] = useState([])
    const [favModalShown, setFavModalShown] = useState(false)
    const [answer, setAnswer] = useState('')
    const [file , setFile] = useState(null)
    const [docModalShown , setDocModalShown] = useState(false)
    const [loading , setLoading] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (!favoritesShown) {
            setFavoritesList([])
            return
        }
        const fetchFavorites = async () => {
            const favorites = await getFavorites(auth)
            setFavoritesList(favorites || [])
        }
        fetchFavorites()
    }, [favoritesShown])

    useEffect(()=>{
        setAnswer('')
        setQueryInput('')
    } , [sqlMode])

    async function submitQuery() {
        if ((sqlMode && source === '') || queryInput === '') {
            return alert('Need to select a data source and submit a query')
        }
        try {
            setLoading(true)
            let response = await fetch(`${API_URL}/api/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source: source,
                    query: queryInput,
                    mode: sqlMode ? "sql" : "document"
                })
            })

            let result = await response.json()

            setAnswer(result)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    async function handleSignIn(email, password) {
        let result = await signIn(email, password)
        if (result.token) {
            setEmail('')
            setPassword('')
            setSignInPressed(false)
            setAuth(result.token)
        }
    }

    function handleSignOut() {
        signOut()
        setAuth(undefined)
    }

    function handleShowFavoritesClick() {
        if (!auth) {
            return alert('You must be logged in to view favorite queries!')
        }
        setFavoritesShown(true)

    }

    function handleStarClick() {
        if (!auth) {
            return alert('You must be logged in to favorite queries!')
        }
        if (queryInput === '' || source === '') {
            return alert('You must select a source and type a query in order to save it!')
        }
        setFavModalShown(true)
    }

    async function handleFavoriteQueryClick(shortName) {
        if (!localStorage.getItem('auth')) {
            return alert('You must be logged in to favorite queries!')
        }
        let result = await favoriteQuery(queryInput, source, shortName, sqlMode , auth)
        if(result.favorited.id){
            setShortName('')
            setFavModalShown(false)
        }
        await getFavorites(auth)

    }

    function handleSelectFavorite(queryId){
        let query = favoritesList.find(f=>f.id === queryId)
        setQueryInput(query.query)
        setSource(query.source)
        setSqlMode(query.sqlMode)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SignInModal signInPressed={signInPressed} setSignInPressed={setSignInPressed} handleSignIn={handleSignIn} email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
            <AddFavoriteModal favModalShown={favModalShown} setFavModalShown={setFavModalShown} handleFavoriteQueryClick={handleFavoriteQueryClick} shortName={shortName} setShortName={setShortName} />
            <AddDocumentModal file={file} setFile={setFile} docModalShown={docModalShown} setDocModalShown={setDocModalShown}/>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: '2rem', paddingRight: '2rem', paddingLeft: '2rem', gap: '2rem' }}>
                <div style={{display: 'flex' , gap: '1rem'}}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button variant='outline' color='pink'  onClick={() => handleShowFavoritesClick()}>Favorites</Button>

                    <Drawer opened={favoritesShown} onClose={() => setFavoritesShown(false)} orientation='horizontal' title='Favorites' styles={{title: {color: 'black'}}}>
                        <div style={{display: 'flex' , flexDirection: 'column'}}>
                            {favoritesList.map(q => (
                                <div className={styles.favoriteDiv} key={q.id} onClick={()=>handleSelectFavorite(q.id)}>
                                    <span>{q.short_name}</span>
                                    <Image src={q.sqlMode ? dbIcon : docIcon}/>
                                </div>
                                
                            ))}
                        </div>
                    </Drawer>
                </div>


                <Button variant='outline' color='pink' onClick={auth ? () => handleSignOut() : () => setSignInPressed(true)}>{auth ? 'Sign Out' : 'Sign In'}</Button>
                </div>
                <div>
                    <div style={{display: 'flex' , gap: '1rem' , alignItems: 'center'}}>
                        <div style={{display: 'flex' , gap: '1rem' , alignItems: 'center'}}>
                            <span style={{color: 'white'}}><b>{sqlMode ? 'SQL Mode' : 'Document Mode'}</b></span>
                        <Switch checked={sqlMode} onChange={(e)=>setSqlMode(e.currentTarget.checked)} color='pink' size='md'/>
                        </div>
                        <div>
                            <Button variant='outline' color='pink' onClick={()=>setDocModalShown(true)}>Add Document</Button>
                        </div>
                    </div>
                    
                </div>
                


            </div>
            <div className={styles.root}>

                <div style={{marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ color: 'white', paddingBottom: '2rem', margin: '0rem' }}>Welcome to SchemaSpeak!</h1>

                    <div style={{ paddingBottom: '2rem', display: 'flex', alignItems: 'center' }}>
                        <Image src={'/schema_speak_logo.png'} h={120} w={120} />
                    </div>
                </div>
                <div className={styles.inputDiv}>

                    <form >
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', gap: '2rem' }}>
                            <div style={{ width: '15%' }}>
                                <Select
                                    styles={{
                                        input: {
                                            backgroundColor: '#333',
                                            border: '1px solid white',
                                            width: '100%',
                                            borderRadius: '30px',
                                            color: 'white'
                                        },
                                        wrapper: {
                                            width: '100%'
                                        }
                                    }}
                                    size='lg'
                                    data={['routebase']}
                                    value={source}
                                    onChange={(value) => setSource(value)}
                                    w={'auto'}
                                    placeholder="Select Source" />
                            </div>
                            <div style={{ width: '65%' }}>
                                <Input size='lg' styles={{ input: { width: '100%', backgroundColor: '#333', borderColor: 'white', color: 'white', borderRadius: '30px' }, wrapper: { width: '100%' } }} value={queryInput} onChange={(e) => setQueryInput(e.target.value)} placeholder={'Ask away...'} onKeyDown={(e) => { if (e.key === 'Enter') submitQuery() }} />
                            </div>
                            <div>
                                <Button color='pink' variant='outline' size='lg' style={{borderRadius: '50px' }} onClick={() => handleStarClick()}>
                                    <div style={{display: 'flex' , gap: '1rem'}}>
                                        <Image src={starIcon} h={24} w={'auto'}  />
                                        
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                {loading ? <div style={{flex: 1}}><Loader color='pink'/></div> : 
                <div style={{ flex: 1  , overflowY: 'scroll' , maxHeight: '40vh' , width: '70%' , display: 'flex' , alignItems: 'center' , flexDirection: 'column' , justifyContent: 'center' }}>
                    <p style={{ color: 'white' , fontSize: '1.2rem'}}><b>{answer.intro}</b></p>
                    {!answer.intro && <p style={{ color: 'white' , fontSize: '1rem'}}><b>{answer}</b></p>}
                    {answer.bullets && sqlMode &&
                        <ul style={{ color: 'white' }}>
                            {answer.bullets.map(bullet =>
                                <li style={{textAlign: 'left'}}>{bullet}</li>
                            )}
                        </ul>
                    }
                    {answer.bullets && !sqlMode &&
                        <ol style={{ color: 'white'}}>
                            {answer.bullets.map(bullet =>
                                <li style={{textAlign: 'left'}}>{bullet}</li>
                            )}
                        </ol>
                    }
                </div>}
            </div>
        </div>

    )
}

export default Home;