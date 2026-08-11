import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router'
import { Modal, FileButton, Button , Input} from '@mantine/core'
import { uploadDocFile } from '../utils/files'

function AddDocumentModal({docModalShown, setDocModalShown , auth}) {
    const [file, setFile] = useState(null)
    const [title , setTitle] = useState('')
    const [system , setSystem] = useState('')
    const [draft , setDraft] = useState(null)

    const navigate = useNavigate()

    useEffect(()=> {
        if(draft === null){
            return
        }else{
            navigate('/document-create' , {state : draft , auth: auth})
        }
    },[draft])

    async function handleUploadClick(){
        if(file === null || title === '' || system === ''){
            return alert('Please select a file and fill out all fields')
        }else{
            let draftDoc = await uploadDocFile(file , title , system)
            if(draftDoc){
                setDraft(draftDoc)
                
            }
        }
    }

    return (
        <Modal opened={docModalShown} onClose={() => setDocModalShown(false)} title='Add Document'>
            <div style={{ display: 'flex', flexDirection: 'column' , alignItems: 'center' , gap: '2rem' }}>
                <div style={{width: '50%' , display: 'flex' , justifyContent: 'center'}}>
                    <FileButton onChange={setFile} accept=".md,.pdf,.docx">
                        {(props) => <Button variant='outline' color='pink' {...props}>Select file</Button>}
                    </FileButton>
                </div>

                {file &&
                <div style={{display: 'flex' , flexDirection: 'column' , gap: '1rem'}}>
                    <span>Selected file: {file.name}</span>
                    <div style={{display: 'flex' , gap: '1rem' , justifyContent: 'space-between'}}>
                        <span>Title: </span>
                        <Input value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                    <div style={{display: 'flex' , gap: '1rem' , justifyContent: 'space-between'}}>
                        <span>System: </span>
                        <Input value={system} onChange={(e)=>setSystem(e.target.value)}/>
                    </div>
                </div>
                }

                {title !== '' && system !== '' && 
                    <div>
                    <Button variant='gradient' gradient={{ from: 'pink', to: 'violet', deg: 90 }} onClick={()=>handleUploadClick()}>Upload</Button>
                    </div>
                }
            </div>
        </Modal>
    )
}

export default AddDocumentModal;