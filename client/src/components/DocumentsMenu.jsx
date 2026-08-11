import {useState} from 'react'
import {Menu , Button} from '@mantine/core'
import AddDocumentModal from './AddDocumentModal';

function DocumentsMenu({setDocModalShown , setCreateDocShown}){


    return(
        
        <Menu>
            
            <Menu.Target>
                <Button variant='gradient' gradient={{ from: 'pink', to: 'violet', deg: 90 }} >Documents</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={()=>setDocModalShown(true)}>Upload Document</Menu.Item>
                <Menu.Item onClick={()=>setCreateDocShown(true)}>Create Document</Menu.Item>
                <Menu.Item>Search Documents</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default DocumentsMenu;