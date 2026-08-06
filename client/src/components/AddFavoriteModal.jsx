import {useState} from 'react';
import {Modal , Input , Button} from '@mantine/core';

function AddFavoriteModal({favModalShown , setFavModalShown , handleFavoriteQueryClick}){

    const [shortName , setShortName] = useState('')

    return(
        <Modal>
            <div>
                <div style={{display: 'flex' , alignItems: 'center'}}>
                    <span>Query Name: </span>
                    <Input value={shortName} onChange={()=>setShortName(e.target.value)}/>
                </div>
                <div>
                    <Button onClick={()=>handleFavoriteQueryClick(shortName)}>Save Query</Button>
                </div>
            </div>
        </Modal>
    )
}

export default AddFavoriteModal;
