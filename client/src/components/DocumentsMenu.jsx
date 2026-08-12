import {useState} from 'react'
import {useNavigate} from 'react-router'
import {Menu , Button , Image} from '@mantine/core'
import AddDocumentModal from './AddDocumentModal';
import uploadIcon from '../assets/cloud-arrow-up.svg'
import createFileIcon from '../assets/file-plus.svg'
import binocularsIcon from '../assets/binoculars.svg'

function DocumentsMenu({setDocModalShown , setCreateDocShown}){

    const navigate = useNavigate()

    return(
        
        <Menu>
            
            <Menu.Target>
                <Button variant='outline' color='pink' >Documents</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={()=>setDocModalShown(true)}>
                    <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , gap: '1rem'}}>
                        <Image src={uploadIcon} h={16} w={'auto'}/>
                        <span>Upload</span>
                    </div>
                    
                </Menu.Item>
                <Menu.Item onClick={()=>setCreateDocShown(true)}>
                    <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , gap: '1rem'}}>
                        <Image src={createFileIcon} h={16} w={'auto'}/>
                        <span>Create</span>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , gap: '1rem'}} onClick={()=>navigate('/documents/list')}>
                        <Image src={binocularsIcon} h={16} w={'auto'}/>
                        <span>Search</span>
                    </div>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default DocumentsMenu;