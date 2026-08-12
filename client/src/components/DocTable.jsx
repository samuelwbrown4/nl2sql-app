import {useState} from 'react'
import { Table } from '@mantine/core'
import DocPreview from './DocPreview';
import styles from '../pages/docList/DocList.module.css'
import { downloadFile , previewFile} from '../utils/files';

function DocTable({ files }) {
    const [showPreview , setShowPreview] = useState(false)
    const [file , setFile] = useState('')
    const [fileName , setFileName] = useState('')

    async function handleDownloadClick(name){
        let result = await downloadFile(name)
        if(!result.url){
            return alert('Could not download file')
        }else{
            window.location.href = result.url
        }
    }

    async function handlePreviewClick(name){
        let content = await previewFile(name)
        if(content){
            setFile(content)
            setFileName(name)
            setShowPreview(true)
        }
    }

    return (
        <Table>
            <DocPreview showPreview={showPreview} setShowPreview={setShowPreview} file={file} fileName={fileName}/>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>File Name</Table.Th>
                    <Table.Th>System</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th colSpan={2}>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {files.map(f => (
                    <Table.Tr key={f.file} className={styles.tr}>
                        <Table.Td>{f.file}</Table.Td>
                        <Table.Td>{f.system}</Table.Td>
                        <Table.Td>{f.description}</Table.Td>
                        <Table.Td><span className={styles.actionBtn} onClick={()=>handlePreviewClick(f.file)}>Preview</span></Table.Td>
                        <Table.Td><span className={styles.actionBtn} onClick={()=>handleDownloadClick(f.file)}>Download</span></Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    )
}

export default DocTable;