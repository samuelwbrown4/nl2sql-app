import {useState} from 'react';
import {Modal , Input , Button} from '@mantine/core';

function AddFavoriteModal({favModalShown , setFavModalShown , handleFavoriteQueryClick , shortName , setShortName}){

    

    return(
        <Modal opened={favModalShown} onClose={()=>setFavModalShown(false)}>
            <div>
                <div style={{display: 'flex' , alignItems: 'center'}}>
                    <span>Query Name: </span>
                    <Input value={shortName} onChange={(e)=>setShortName(e.target.value)}/>
                </div>
                <div>
                    <Button onClick={()=>handleFavoriteQueryClick(shortName)}>Save Query</Button>
                </div>
            </div>
        </Modal>
    )
}

export default AddFavoriteModal;
