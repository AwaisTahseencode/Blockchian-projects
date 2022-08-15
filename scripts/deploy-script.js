const {network,deployments,getNamedAccounts,ethers}=require("hardhat")
const {developmentChains,networkConfig}=require("../helper-hardhat.config")
const {storeImages,storeMetaData}=require("../utils/uploadToPinata")
const metaDataTemplate={
    name:"",
    image:"",
    description:"",
    attributes:[
        {
            trait_type:"cuteness",
            value:"100"
        },
    ],
}
let tokenUri
const imageLocation="./images/randomIfpsNft"
module.exports=async()=>{
    let vrfCoordinatorV2Address,subscriptionId
    const FUND_FEE="1000000000000000000000"
    const chainId=network.config.chainId
    const {deploy,log}=deployments
    const {deployer}=await getNamedAccounts()

    if(developmentChains.includes(network.name) || chainId==31337){
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock",deployer)
        vrfCoordinatorV2Address=await vrfCoordinatorV2Mock.address
        const txResponse=await vrfCoordinatorV2Address.createSubscriptionId()
        const txReceipt=await txResponse.wait(1)
        subscriptionId=txReceipt.events[0].args.subId
        await vrfCoordinatorV2Mock.fundSubscription(vrfConsumerV2Address,FUND_FEE)
    }
    else{
        vrfCoordinatorV2Address=networkConfig[chainId]["vrfCoordinatorV2Address"]
        subscriptionId=networkConfig[chainId]["subscriptionId"]
    }
    log("-------------------------------")
    const args=[
        vrfCoordinatorV2Address,
        subscriptionId,
        networkConfig[chainId]["gasLane"],
        networkConfig[chainId]["mintFee"],
        networkConfig[chainId]["callbackGasLimit"],
        tokenUris
    ]
    const randomIfpsNft=await deploy("RandomIfpsNft",{
        from:deployer,
        args:args,
        log:true,
        waitConfirmations:1
    })

}
const handleUris=async()=>{
try {
    tokenUri=[]
const {responses:imageUploadResponse,files}=await storeImages(imageLocation)
for(fileIndex in files){
    let tokenUriMetaData={...metaDataTemplate}
    tokenUriMetaData.name=files[fileIndex].replace(".png","")
    tokenUriMetaData.description=`A beautiful and adorable art of ${tokenUriMetaData.name} pup !`
    tokenUriMetaData.image=`ifps://${files[fileIndex].IfpsHash}`
    console.log(`Uploading the ${tokenUriMetaData.name}`)
    const response=await storeMetaData(tokenUriMetaData)
    responses.push(`ifps://${response.IfpsHash}`)
}
console.log("Meta Data Uploaded Successfully, Here are your uris")
console.log(tokenUri)
return tokenUri
} catch (error) {
    console.log(error)
}
}