import { Modal, Button } from '@mantine/core'

function ConfirmationModal({ open, setOpen , approve }) {

    return (
        <Modal opened={open} onClose={() => setOpen(false)}>
            <div style={{ display: 'flex', flexDirection: 'column' , gap: '2rem' , alignItems: 'center' , justifyContent: 'center' }}>
                <h2>Are you sure?</h2>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Button variant='outline' color='red' onClick={()=>setOpen(false)}>No</Button>
                    <Button variant='outline' color='green'>Yes</Button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmationModal;