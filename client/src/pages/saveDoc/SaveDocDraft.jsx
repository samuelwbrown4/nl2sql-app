import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Input, Textarea, Button , TagsInput} from '@mantine/core'
import ConfirmationModal from '../../components/ConfirmationModal'
import { uploadDoc } from '../../utils/files'
import styles from './SaveDoc.module.css'

function SaveDocDraft() {
    //if no draft redirect to home
    const location = useLocation()
    const navigate = useNavigate()

    const draft = location.state || {}
    const auth = location.auth || {}

    if (draft === {} || auth === {}) {
        navigate('/')
    }

    const [title, setTitle] = useState(draft?.title)
    const [system, setSystem] = useState(draft?.system)
    const [description, setDescription] = useState(draft?.description)
    const [fileContent, setFileContent] = useState(draft?.content)
    const [fileName, setFileName] = useState(draft?.file)
    const [tags , setTags] = useState(draft?.tags)
    

    const [confirmationShown , setConfirmationShown] = useState(false)

    function handleClearAll(){
        setTitle('')
        setSystem('')
        setDescription('')
        setFileContent('')
        setFileName('')
        setTags([])
    }

    function handleConfirmClick(){
        if(title === '' || system === '' || description === '' || fileContent === '' || fileName === '' || tags === [] || tags.length < 2){
            return alert('Fill out all fields')
        }
        let result = await uploadDoc(title, description, fileName, tags, system , fileContent , auth)

        if(result.message.includes('Successfully')){
            navigate('/')
        }else{
            return alert(result.error)
        }
    }

    return (
        <div className={styles.root}>
            <ConfirmationModal open={confirmationShown} setOpen={setConfirmationShown}/>
            <h2>Review Document</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%' }}>
                <div className={styles.inputDiv}>
                    <span className={styles.span}>Title:</span>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={styles.inputDiv}>
                    <span className={styles.span}>System:</span>
                    <Input value={system} onChange={(e) => setSystem(e.target.value)} />
                </div>
                <div className={styles.inputDiv}>
                    <span className={styles.span}>File Name:</span>
                    <Input value={fileName} onChange={(e) => setFileName(e.target.value)} />
                </div>
                <div className={styles.inputDiv}>
                    <span className={styles.span}>Tags:</span>
                    <TagsInput   value={tags} onChange={setTags} placeholder='Add tags...' />
                </div>
                <div className={styles.inputDiv} style={{ gridColumn: '1 / 3' }}>
                    <span className={styles.span}>Description:</span>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>


            <div style={{ width: '100%', height: '40vh' , gap: '.5rem' , display: 'flex' , flexDirection: 'column' }}>
                <span className={styles.span}>File Content: </span>
                <Textarea styles={{ input: { height: '35vh' } }} value={fileContent} onChange={(e) => setFileContent(e.target.value)} />
            </div>

            <div style={{display: 'flex' , gap: '3rem'}}>
                <Button variant='outline' color='red' onClick={()=>setConfirmationShown(true)}>Abandon</Button>
                <Button variant='outline' onClick={()=>handleClearAll()}>Clear All</Button>
                <Button variant='outline' color='green' onClick={()=>handleConfirmClick()}>Looks Good</Button>
            </div>
        </div>
    )
}

export default SaveDocDraft