const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')

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

module.exports = { getDocContent }