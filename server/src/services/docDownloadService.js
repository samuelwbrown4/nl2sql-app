const { getDownloadUrl } = require("./s3Service")

const docDownloadService = async (req , res) => {
    try{
        const {file} = req.params
        const url = await getDownloadUrl(file)
        res.status(200).json({url: url})
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {docDownloadService}