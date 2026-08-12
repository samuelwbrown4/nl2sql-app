import {useState , useEffect} from 'react'
import {Button , Image , Input} from '@mantine/core'
import { getAllFiles } from '../../utils/files';
import DocTable from '../../components/DocTable';
import styles from '../docList/DocList.module.css'
import funnelIcon from '../../assets/funnel.svg'
import searchIcon from '../../assets/magnifying-glass.svg'

function DocList(){
    const [files , setFiles] = useState([])
    const [openFilters , setOpenFilters] = useState(false)

    useEffect(()=>{
        const getFiles = async() => {
            let config = await getAllFiles();
            console.log(config.docs)

            setFiles(config.docs)
        }
        getFiles()
    },[])

    useEffect(()=>{
        console.log(files)
    },[files])

    

    return(
        <div className={styles.root}>
            <div style={{display: 'flex' , width: '100%'}}>
                <div style={{flex: 1 , display: 'flex' , alignItems: 'center'}}>
                    <Input styles={{input: {borderColor: '#e64980'}}} placeholder='Search...' leftSection={<Image src={searchIcon} h={16} w={'auto'}/>}/>
                </div>
                <div style={{flex: 1}}>
                    <h2>All Files</h2>
                </div>
                <div style={{flex: 1 , display: 'flex' , alignItems: 'center' , justifyContent: 'flex-end'}}>
                    <Button variant='outline' color='pink'>
                        <div style={{display: 'flex' , gap: '0.5rem' , alignItems: 'center'}}>
                            <Image src={funnelIcon} h={16} w={'auto'}/>
                            <span>Filter</span>
                        </div>
                    </Button>
                </div>
                
            </div>
            
            {files?.length > 0 &&
            <div className={styles.tableContainer} style={{width: '100%'}}>
                <DocTable files={files}/>
            </div>
            }
            {files?.length == 0 &&
                <div>
                    No files found.
                </div>
            }
        </div>
    )
}

export default DocList;