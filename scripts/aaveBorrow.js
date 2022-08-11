const { ethers,getNamedAccounts } = require("hardhat")
const {getWeth}=require("../scripts/getWeth")
const getAddressOfLendingPool=async(account)=>{
    const lendingPoolAddressesProvider =await ethers.getContractAt("ILendingPoolAddressesProvider","0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",account)
    const lendingPoolAddress=await lendingPoolAddressesProvider.getLendingPool()
    const lendingPool=await ethers.getContractAt("ILendingPool",lendingPoolAddress,account)
    return lendingPool
}
const main=async()=>{
    const {deployer}=await getNamedAccounts()
    //the protocol treats everything as ERC20 Tokken
   await getWeth()
   //0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5 address of lendingPoolAddressProviders
   const lendingPool=await getAddressOfLendingPool(deployer)
    console.log(lendingPool.address)
    //ILendingPool has a safeTransferFrom function which allows the transfer and to whom the transfer has been allowed 
}

main().then(()=>process.exit(0))
.catch((e)=>{
    console.log(e)
    process.exit(1)
})