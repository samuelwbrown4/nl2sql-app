import {useState , useEffect} from 'react'
import { getAllFiles } from '../../utils/files';
import DocTable from '../../components/DocTable';

function DocList(){

    useEffect(()=>{
        async () => {
            let config = await getAllFiles;

            setFiles(config.docs)
        }
    },[])

    const [files , setFiles] = useState([])

    return(
        <div>
            {files.length > 0 &&
                <DocTable files={files}/>
            }
            {files.length == 0 &&
                <div>
                    No files found.
                </div>
            }
        </div>
    )
}

export default DocList;