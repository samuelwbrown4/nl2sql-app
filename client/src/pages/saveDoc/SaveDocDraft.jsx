import { useState } from 'react'
import { Input, Textarea , Button} from '@mantine/core'
import styles from './SaveDoc.module.css'

function SaveDocDraft({ draft }) {
    //if no draft redirect to home

    const [title, setTitle] = useState(draft?.title)
    const [system, setSystem] = useState(draft?.system)
    const [description, setDescription] = useState(draft?.description)
    const [fileContent, setFileContent] = useState(draft?.content)
    const [fileName , setFileName] = useState(draft?.file)

    return (
        <div className={styles.root}>
            <div>
                <div className={styles.inputDiv}>
                    <span>Title:</span>
                    <Input value={title} onChange={(e)=>setTitle(e.target.value)}>{draft.title}</Input>
                </div>
                <div className={styles.inputDiv}>
                    <span>Description:</span>
                    <Input value={description} onChange={(e)=>setDescription(e.target.value)}>{draft.description}</Input>
                </div>
            </div>
            <div>
                <div className={styles.inputDiv}>
                    <span>System:</span>
                    <Input value={system} onChange={(e)=>setSystem(e.target.value)}>{draft.system}</Input>
                </div>
                <div className={styles.inputDiv}>
                    <span>File Name:</span>
                    <Input value={fileName} onChange={(e)=>setFileName(e.target.value)}>{draft.file}</Input>
                </div>
            </div>


            <div>
                <span>File Content: </span>
                <Textarea value={fileContent} onChange={(e)=>setFileContent(e.target.value)}>{draft.content}</Textarea>
            </div>
        </div>
    )
}

export default SaveDocDraft