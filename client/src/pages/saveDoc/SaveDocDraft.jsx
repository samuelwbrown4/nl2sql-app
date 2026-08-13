import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Input, Textarea, Button, TagsInput } from '@mantine/core'
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown'
import ConfirmationModal from '../../components/ConfirmationModal'
import { publishFreeformDoc, publishDoc } from '../../utils/files'
import styles from './SaveDoc.module.css'

function SaveDocDraft() {
    //if no draft redirect to home
    const location = useLocation()
    const navigate = useNavigate()



    const { draft, auth, file } = location.state || {}

    useEffect(() => {
        if (!draft || !auth) {
            navigate('/')
        }
    }, [draft, auth, navigate])


    const [title, setTitle] = useState(draft?.title)
    const [system, setSystem] = useState(draft?.system)
    const [description, setDescription] = useState(draft?.description)
    const [fileContent, setFileContent] = useState(draft?.content)
    const [fileBase, setFileBase] = useState(draft?.file?.split('.')[0] || draft?.name?.split('.')[0])
    const [fileExtension, setFileExtension] = useState(`.${draft?.file?.split('.').pop() || draft?.name?.split('.').pop()}`)
    const [tags, setTags] = useState(draft?.tags)


    const [confirmationShown, setConfirmationShown] = useState(false)

    function handleClearAll() {
        setTitle('')
        setSystem('')
        setDescription('')
        setFileContent('')
        setFileBase('')
        setFileExtension('')
        setTags([])
    }

    async function handleConfirmClick() {
        if (file) {
            if (title === '' || system === '' || description === '' || fileBase === '' || tags === [] || tags.length < 2) {
                return alert('Fill out all fields')
            }

            let result = await publishDoc(file, title, description, `${fileBase}${fileExtension}`, tags, system, auth)

            if (result.message && result.message.includes('Successfully')) {
                navigate('/')
            } else {
                return alert(result.error)
            }
        } else {
            if (title === '' || system === '' || description === '' || fileContent === '' || fileBase === '' || tags === [] || tags.length < 2) {
                return alert('Fill out all fields')
            }
            let result = await publishFreeformDoc(title, description, `${fileBase}${fileExtension}`, tags, system, fileContent, auth)

            if (result.message && result.message.includes('Successfully')) {
                navigate('/')
            } else {
                return alert(result.error)
            }
        }

    }

    return (
        <div className={styles.root}>
            <ConfirmationModal open={confirmationShown} setOpen={setConfirmationShown} />
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
                    <Input value={fileBase} onChange={(e) => setFileBase(e.target.value)} rightSection={<span style={{fontSize: '.8rem' , paddingRight: '1rem'}}>{fileExtension}</span>} />
                </div>
                <div className={styles.inputDiv}>
                    <span className={styles.span}>Tags:</span>
                    <TagsInput value={tags} onChange={setTags} placeholder='Add tags...' />
                </div>
                <div className={styles.inputDiv} style={{ gridColumn: '1 / 3' }}>
                    <span className={styles.span}>Description:</span>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>


            <div style={{ width: '100%', height: '40vh', gap: '.5rem', display: 'flex', flexDirection: 'column' }}>
                <span className={styles.span}>File Content: </span>
                {!file && <Textarea styles={{ input: { height: '35vh' } }} value={fileContent} onChange={(e) => setFileContent(e.target.value)} />}
                {file && draft.name.split('.').pop() === 'docx' &&
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(draft.previewHtml) }}  style={{color: 'white' , overflowY: 'scroll'}}/>
                }
                {file && (draft.name.split('.').pop() === 'md' || draft.name.split('.').pop() === 'txt') &&
                    <ReactMarkdown>{draft.extractedText}</ReactMarkdown>
                }
            </div>

            <div style={{ display: 'flex', gap: '3rem' }}>
                <Button variant='outline' color='red' onClick={() => setConfirmationShown(true)}>Abandon</Button>
                <Button variant='outline' onClick={() => handleClearAll()}>Clear All</Button>
                <Button variant='outline' color='green' onClick={() => handleConfirmClick()}>Looks Good</Button>
            </div>
        </div>
    )
}

export default SaveDocDraft