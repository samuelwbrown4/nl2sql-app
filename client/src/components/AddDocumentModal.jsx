import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router'
import { Modal, FileButton, Button , Input , LoadingOverlay} from '@mantine/core'
import { uploadDocFile } from '../utils/files'

function AddDocumentModal({docModalShown, setDocModalShown , auth}) {
    const [file, setFile] = useState(null)
    const [title , setTitle] = useState('')
    const [system , setSystem] = useState('')
    const [draft , setDraft] = useState(null)

    const [loading , setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(()=> {
        if(draft){
            navigate('/document-create' , {state : {draft , auth , file}})
        }
    },[draft])

    async function handleUploadClick(){
        setLoading(true)
        if(file === null || title === '' || system === ''){
            setLoading(false)
            return alert('Please select a file and fill out all fields')
        }else{
            let draftDoc = await uploadDocFile(file , title , system)
            if(draftDoc){
                setLoading(false)
                setDraft(draftDoc)
                
            }
        }
    }

    return (
        <Modal opened={docModalShown} onClose={() => setDocModalShown(false)} title='Upload Document'>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "xl", blur: 2 }} loaderProps={{ color: 'pink', type: 'bars' }} />
            <div style={{ display: 'flex', flexDirection: 'column' , alignItems: 'center' , gap: '2rem' }}>
                <div style={{width: '50%' , display: 'flex' , justifyContent: 'center' , flexDirection: 'column' , gap: '0.5rem'}}>
                    <FileButton onChange={setFile} accept=".md,.txt,.docx">
                        {(props) => <Button variant='outline' color='pink' {...props}>Choose File</Button>}
                    </FileButton>
                    <span style={{fontSize: '.7rem' , color: '#ccc'}}>Supported File Types: .md, .txt, .docx</span>
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