import { Modal, FileButton, Button } from '@mantine/core'

function AddDocumentModal({ file, setFile, docModalShown, setDocModalShown }) {
    return (
        <Modal opened={docModalShown} onClose={() => setDocModalShown(false)} title='Add Document'>
            <div style={{ display: 'flex', flexDirection: 'column' , alignItems: 'center' }}>
                <div style={{width: '50%' , display: 'flex' , justifyContent: 'center'}}>
                    <FileButton variant='gradient' gradient={{ from: 'pink', to: 'violet', deg: 90 }} onChange={setFile} accept=".md,.pdf,.docx">
                        {(props) => <Button {...props}>Upload file</Button>}
                    </FileButton>
                </div>

                {file &&
                    <span>Selected file: {file.name}</span>
                }
            </div>
        </Modal>
    )
}

export default AddDocumentModal;