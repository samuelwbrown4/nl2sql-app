import {Modal} from '@mantine/core'
import ReactMarkdown from 'react-markdown'

function DocPreview({file , showPreview , setShowPreview , fileName}){
    return(
        <Modal opened={showPreview} onClose={()=>setShowPreview(false)} size='xl' title={`Previewing: ${fileName}`}>
            <div>
                <ReactMarkdown>{file}</ReactMarkdown>
            </div>
        </Modal>
    )
}

export default DocPreview;