const {getNamedAccounts,ethers}=require("hardhat")
const AMOUNT=ethers.utils.parseEther("0.02")

const getWeth=async()=>{
    //To interact with the contract we need an account so
    const {deployer}=await getNamedAccounts()
    //call the deposit function on weth contract so for that we need to deploy the contract first , so we need abi and contract address
    const iWeth=await ethers.getContractAt("IWeth","0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",deployer)
 
    const transactionResponse=await iWeth.deposit({value:AMOUNT})
    await transactionResponse.wait(1)
    const wethBalance=await iWeth.balanceOf(deployer)
    console.log(`Got this much ${wethBalance.toString()} WETH`)
}
module.exports={getWeth}