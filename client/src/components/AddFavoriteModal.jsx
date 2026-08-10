import {useState} from 'react';
import {Modal , Input , Button} from '@mantine/core';

function AddFavoriteModal({favModalShown , setFavModalShown , handleFavoriteQueryClick , shortName , setShortName}){

    

    return(
        <Modal title={<h3>Name Query</h3>} opened={favModalShown} onClose={()=>setFavModalShown(false)}>
            <div style={{display: 'flex' , flexDirection: 'column' , alignItems: 'center' , gap: '2rem'}}>
                <div style={{display: 'flex' , alignItems: 'center' , gap: '1rem'}}>
                    <span>Query Name: </span>
                    <Input value={shortName} onChange={(e)=>setShortName(e.target.value)}/>
                </div>
                <div style={{width: '50%' , display: 'flex' , justifyContent: 'center'}}>
                    <Button variant='gradient' gradient={{ from: 'pink', to: 'violet', deg: 90 }} onClick={()=>handleFavoriteQueryClick(shortName)}>Save Query</Button>
                </div>
            </div>
        </Modal>
    )
}

export default AddFavoriteModal;
