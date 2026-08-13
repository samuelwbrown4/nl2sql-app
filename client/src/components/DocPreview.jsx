import {Modal} from '@mantine/core'
import ReactMarkdown from 'react-markdown'
import DOMPurify from 'dompurify'

function DocPreview({file , showPreview , setShowPreview , fileName}){
    return(
        <Modal opened={showPreview} onClose={()=>setShowPreview(false)} size='xl' title={`Previewing: ${fileName}`}>
            <div>
                {fileName.split('.').pop() !== 'docx' && <ReactMarkdown>{file}</ReactMarkdown>}
                {fileName.split('.').pop() === 'docx' && 
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(file) }}  style={{color: 'white' , overflowY: 'scroll'}}/>
                }
            </div>
        </Modal>
    )
}

export default DocPreview;