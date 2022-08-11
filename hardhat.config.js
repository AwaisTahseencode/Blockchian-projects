require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("chai")
// require("@nomicfoundation/hardhat-toolbox")
// require("hardhat-contract-sizer")
require("dotenv").config()

const RINKEBY_RPC_URL=process.env.RINKEBY_URL
const PRIVATE_KEY=process.env.PRIVATE_KEY
const KOVAN_RPC_URL=process.env.KOVAL_URL
const MAINNET_RPC_URL=process.env.MAINNET_RPC_URL
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{
      chainId:31337,
      blockConfirmations:1,
      forking:{
        url:MAINNET_RPC_URL
      },
    },
    rinkeby:{
      chainId:4,
      blockConfirmations:1,
      url:RINKEBY_RPC_URL,
      accounts:[PRIVATE_KEY],
    },
  },
  gasReporter:{
  enabled:false
  }
  ,
  solidity:{
    compilers:
      [{version:"0.8.8"},{version:"0.6.6"},{version:"0.4.19"},{version:"0.6.12"}]
  },
  namedAccounts:{
    deployer:{
      default:0
    },
    player:{
      default:1
    },
  },
  mocha:{
    timeout:500000,
  }
}; 
