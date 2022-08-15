const pinataSDK=require("@pinata/sdk")
const path=require("path")
const fs=require("fs")
const pinataApiKey=process.env.PINATA_API_KEY
const pinataSecretKey=process.env.PINATA_SECRET_KEY
const pinata=pinataSDK(pinataApiKey,pinataSecretKey)
const storeImages=async(imageLocation)=>{
    const fullLocation=path.resolve(imageLocation)
    const files=fs.readdirSync(fullLocation)
    let responses=[]
    for(fileIndex in files){
        const readableStream=fs.createReadableStream(`${imageLocation}/${files[fileIndex]}`)
        try {
            const response=await pinata.pinFileToIFPS(readableStream)
            responses.push(response)
        } catch (error) {
            console.log(error)
        }
    }
    return {responses,files}
}
const storeMetaData=async(metaData)=>{
try {
    const response=await pinata.JSONToIFPS(metaData)
    return response
} catch (error) {
    console.log(error)
}
return null

}
module.exports={
    storeImages,
    storeMetaData
}
module.exports.tags = ["all", "randomipfs", "main"]