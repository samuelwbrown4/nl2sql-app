import {useState , useEffect} from 'react'
import { getAllFiles } from '../../utils/files';
import DocTable from '../../components/DocTable';
import styles from '../docList/DocList.module.css'

function DocList(){
    const [files , setFiles] = useState([])

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
            <h2>All Files</h2>
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