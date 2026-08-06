import { useState, useEffect } from "react";
import { Input, Select, Image, Button, Drawer } from '@mantine/core'
import SignInModal from "../../components/SignInModal";
import AddFavoriteModal from "../../components/AddFavoriteModal.jsx";
import styles from './Home.module.css'
import { signIn } from "../../utils/signIn.js";
import { favoriteQuery, getFavorites } from "../../utils/favorites.js";
import starIcon from '../../assets/star.svg'
import starFillIcon from '../../assets/star.svg'

function Home() {
    const [queryInput, setQueryInput] = useState('');
    const [source, setSource] = useState('');
    const [signInPressed, setSignInPressed] = useState(false);
    const [favoritesShown, setFavoritesShown] = useState(false);
    const [favoritesList, setFavoritesList] = useState([])
    const [favModalShown, setFavModalShown] = useState(false)


    const [answer, setAnswer] = useState('')

    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (!favoritesShown) {
            return setFavoritesList([])
        }
        setFavoritesList(getFavorites())
    }, [favoritesShown])



    async function submitQuery() {
        if (source === '' || queryInput === '') {
            return alert('Need to select a data source and submit a query')
        }
        try {
            let response = await fetch(`${API_URL}/api/query`, {
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
        } catch (error) {
            console.log(error)
        }
    }

    function handleShowFavoritesClick() {
        if (!localStorage.getItem('auth')) {
            return alert('You must be logged in to view favorite queries!')
        }
        setFavoritesShown(true)

    }

    async function handleFavoriteQueryClick(shortName) {
        if (!localStorage.getItem('auth')) {
            return alert('You must be logged in to favorite queries!')
        }
        await favoriteQuery(queryInput, source, shortName, auth)
        await getFavorites(auth)

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SignInModal signInPressed={signInPressed} setSignInPressed={setSignInPressed} signIn={signIn} />
            <AddFavoriteModal favModalShown={favModalShown} setFavModalShown={setFavModalShown} handleFavoriteQueryClick={handleFavoriteQueryClick} />
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', marginTop: '2rem', paddingRight: '2rem', paddingLeft: '2rem', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button variant='outline' color='pink' size='md' onClick={() => handleShowFavoritesClick()}>Favorites</Button>

                    <Drawer opened={favoritesShown} onClose={() => setFavoritesShown(false)} orientation='horizontal' title='Favorites'>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quaerat praesentium esse vitae qui. Dolorum suscipit corporis, minima pariatur a quis temporibus. Eos deleniti enim quas! In deserunt animi modi?</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente aliquam sed iure perspiciatis eos eaque dolor fuga aspernatur, unde officiis exercitationem eligendi voluptates ipsam tenetur earum nobis, hic reiciendis corrupti.</li>
                        </ul>
                    </Drawer>
                </div>


                <Button variant='outline' color='pink' size='md' onClick={() => setSignInPressed(true)}>{localStorage.getItem('auth') ? 'Sign Out' : 'Sign In'}</Button>


            </div>
            <div className={styles.root}>

                <div style={{ flex: 1, marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ color: 'white', paddingBottom: '2rem', margin: '0rem' }}>Welcome to SchemaSpeak!</h1>

                    <div style={{ paddingBottom: '2rem', display: 'flex', alignItems: 'center' }}>
                        <Image src={'/schema_speak_logo.png'} h={150} w={150} />
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
                                            borderRadius: '30px',
                                            color: 'white'
                                        },
                                        wrapper: {
                                            width: '100%'
                                        }
                                    }}
                                    size='xl'
                                    data={['routebase']}
                                    value={source}
                                    onChange={(value) => setSource(value)}
                                    w={230}
                                    placeholder="Select Source" />
                            </div>
                            <div style={{ width: '75%' }}>
                                <Input size='xl' styles={{ input: { width: '100%', backgroundColor: '#333', borderColor: 'white', color: 'white', borderRadius: '30px' }, wrapper: { width: '100%' } }} value={queryInput} onChange={(e) => setQueryInput(e.target.value)} placeholder={'Ask away...'} onKeyDown={(e) => { if (e.key === 'Enter') submitQuery() }} />
                            </div>
                            <div>
                                <Image src={starIcon} h={32} w={'auto'} onClick={() => setFavModalShown(true)} />
                            </div>
                        </div>
                    </form>
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ color: 'white' }}>{answer.intro}</p>
                    {answer.bullets &&
                        <ul style={{ color: 'white' }}>
                            {answer.bullets.map(bullet =>
                                <li>{bullet}</li>
                            )}
                        </ul>
                    }
                </div>
            </div>
        </div>

    )
}

export default Home;