import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
import "@typechain/hardhat"
import "hardhat-deploy"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"

dotenv.config();

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.BRAVE_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""


const config: HardhatUserConfig = {
  //solidity: "0.8.9",
  solidity: {
    compilers: [
      {version : "0.8.8"},
      {version : "0.6.6"}
    ]
  },
  defaultNetwork: "hardhat",
  networks: {
    rinkeby : {
      url : RINKEBY_RPC_URL,
      chainId: 4,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
  },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
