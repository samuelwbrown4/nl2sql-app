import { useState } from 'react'
import { Modal, Input, Textarea, Button , LoadingOverlay} from '@mantine/core'
import { createFile } from '../utils/files'

function CreateDocumentModal({ createDocShown, setCreateDocShown, auth }) {
    const [title, setTitle] = useState('')
    const [system, setSystem] = useState('')
    const [content, setContent] = useState('')
    const [loading , setLoading] = useState(false)

    async function nextClickHandler() {
        if (title === '' || system === '' || content === '') {
            return alert('Please fill out all fields first')
        }
        setLoading(true)
        let draft = await createFile(title, system, content, auth)
        if(draft){
            setLoading(false)
            console.log(draft)
        }
    }

    return (

        <Modal size='xl' opened={createDocShown} onClose={() => setCreateDocShown(false)}>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "xl", blur: 2 }} loaderProps={{ color: 'pink', type: 'bars' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center' }}>
                    <div style={{ width: '40%', display: 'flex' , flexDirection: 'column' , gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' , alignItems: 'center'}}>
                            <span>Title: </span>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' , alignItems: 'center'}}>
                            <span>System: </span>
                            <Input value={system} onChange={(e) => setSystem(e.target.value)} />
                        </div>
                    </div>

                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span>Content: </span>
                    <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' , width: '100%'}}>
                    <div style={{ display: 'flex' , justifyContent: 'center'}}>
                        <Button onClick={() => nextClickHandler()}>Next</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CreateDocumentModal;