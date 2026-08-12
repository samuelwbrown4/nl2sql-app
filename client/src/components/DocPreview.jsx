import {Modal} from '@mantine/core'

function DocPreview({file , showPreview , setShowPreview}){
    return(
        <Modal opened={showPreview} onClose={()=>setShowPreview(false)}>
            <div>

            </div>
        </Modal>
    )
}

export default DocPreview;