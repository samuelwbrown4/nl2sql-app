import {Modal , FileButton , Button} from '@mantine/core'

function AddDocumentModal({file , setFile , docModalShown , setDocModalShown}){
    return(
        <Modal opened={docModalShown} onClose={()=>setDocModalShown(false)}>
            <div style={{display: 'flex' , flexDirection: 'column'}}>
                <FileButton onChange={setFile} accept=".md,.pdf,.docx">
                    {(props) => <Button {...props}>Upload file</Button>}
                </FileButton>
                {file && 
                    <span>Selected file: {file.name}</span>
                }
            </div>
        </Modal>
    )
}

export default AddDocumentModal;