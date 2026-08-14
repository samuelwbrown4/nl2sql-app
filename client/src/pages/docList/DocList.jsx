import { useState, useEffect } from 'react'
import { Button, Image, Input, Pagination } from '@mantine/core'
import { getAllFiles } from '../../utils/files';
import DocTable from '../../components/DocTable';
import TagsFilterModal from '../../components/TagFilterModal';
import styles from '../docList/DocList.module.css'
import funnelIcon from '../../assets/funnel.svg'
import searchIcon from '../../assets/magnifying-glass.svg'

function DocList() {
    const [files, setFiles] = useState([])
    const [openTagFilter, setOpenTagFilter] = useState(false)
    const [selectedTags, setSelectedTags] = useState([])
    const [searchInput, setSearchInput] = useState('')

    const [activePage, setActivePage] = useState(1)


    useEffect(() => {
        const getFiles = async () => {
            let config = await getAllFiles();
            console.log(config.docs)

            setFiles(config.docs)
        }
        getFiles()
    }, [])

    useEffect(() => {
        console.log(files)
    }, [files])

    let tagSet = new Set()
    for (let i = 0; i < files.length; i++) {
        let tags = files[i].tags
        for (let tag of tags) {
            if (!tagSet.has(tag)) {
                tagSet.add(tag)
            }
        }
    }
    let availableTags = [...tagSet]

    const searchFilteredFiles = searchInput !== '' ? files.filter(f => f.title.toLowerCase().includes(searchInput.toLowerCase())) : files
    const filteredFiles = selectedTags.length > 0 ? searchFilteredFiles.filter(f => selectedTags.some(t => f.tags.includes(t))) : searchFilteredFiles

    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredFiles / itemsPerPage)
    const paginatedFiles = filteredFiles.slice(((activePage - 1) * itemsPerPage), (activePage * itemsPerPage))
    const pageMessage = `Showing ${itemsPerPage * (activePage - 1) + 1}-${Math.min(paginatedFiles.length , itemsPerPage * activePage)} of ${paginatedFiles.length}`

    return (
        <div className={styles.root}>
            <TagsFilterModal availableTags={availableTags} openTagFilter={openTagFilter} setOpenTagFilter={setOpenTagFilter} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            <div style={{ display: 'flex', width: '100%', gap: '2rem' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Input styles={{ input: { borderColor: '#e64980' } }} placeholder='Search...' leftSection={<Image src={searchIcon} h={16} w={'auto'} />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2>File Repository</h2>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button className={styles.filterBtn} onClick={() => setOpenTagFilter(true)}>
                        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                            <Image src={funnelIcon} h={16} w={'auto'} />
                            <span style={{fontWeight: 'lighter'}}>Filter</span>
                        </div>
                    </Button>
                </div>

            </div>
            <div style={{display: 'flex' , justifyContent: 'flex-end' , gap:  '1rem' , alignItems: 'center' , width: '100%' , marginBottom: '0.5rem'}}>
                <span style={{color: '#ccc' , fontSize: '0.8rem'}}>{pageMessage}</span>
                
                    <Pagination total={totalPages} value={activePage} onChange={setActivePage}  withPages={false} size='sm' />
                
                
            </div>
            

            {files?.length > 0 &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className={styles.tableContainer} style={{ width: '100%' }}>
                        <DocTable files={paginatedFiles} />
                    </div>
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