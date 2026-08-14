import {Modal , TagsInput} from '@mantine/core'

function TagsFilterModal({availableTags , openTagFilter , setOpenTagFilter , selectedTags , setSelectedTags}){
    return(
        <Modal opened={openTagFilter} onClose={()=>setOpenTagFilter(false)} title='Filter by tags' size='lg'>
            <div>
                <TagsInput data={availableTags} value={selectedTags} onChange={setSelectedTags} placeholder='Pick tag from list or type any tag' clearable/>
            </div>
        </Modal>
    )
}

export default TagsFilterModal;