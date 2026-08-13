const { S3Client, GetObjectCommand , PutObjectCommand } = require('@aws-sdk/client-s3')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')

const s3Client = new S3Client({ region: 'us-east-1' })

const getDocContent = async (key) => {
    console.log('Fetching key:', key)
    const command = new GetObjectCommand({
        Bucket: 'schemaspeak-docs',
        Key: key
    })
    const response = await s3Client.send(command)
    const content = await response.Body.transformToString()
    return content
}

const getDocBuffer = async (key) => {
    const command = new GetObjectCommand({
        Bucket: 'schemaspeak-docs',
        Key: key
    })
    const response = await s3Client.send(command)
    const buffer = Buffer.from(await response.Body.transformToByteArray())
    return buffer
}

const uploadDocContent = async (key , content , contentType) => {
    const command = new PutObjectCommand({
        Bucket: 'schemaspeak-docs' , 
        Key: key,
        Body: content,
        ContentType: contentType
    });

    await s3Client.send(command)
}

const updateDocConfig = async (config) => {
    const command = new PutObjectCommand({
        Bucket: 'schemaspeak-docs',
        Key: 'docConfig.json',
        Body: JSON.stringify(config, null, 2),
        ContentType: 'application/json'
    })
    await s3Client.send(command)
}

const getDocConfig = async () => {
    const command = new GetObjectCommand({
        Bucket: 'schemaspeak-docs',
        Key: 'docConfig.json',
        ContentType: 'application/json'
    })
    const response = await s3Client.send(command)
    const content = await response.Body.transformToString()
    return content
}

const getDownloadUrl = async(file) => {
    const command = new GetObjectCommand({
        Bucket: 'schemaspeak-docs',
        Key: file,
        ResponseContentDisposition: `attachment; filename="${file}"`
    })
    const url = await getSignedUrl(s3Client , command , {expiresIn: 300})
    return url
}

module.exports = { getDocContent , getDocBuffer , uploadDocContent , updateDocConfig , getDocConfig , getDownloadUrl}