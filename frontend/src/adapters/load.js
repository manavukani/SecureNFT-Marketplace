import Web3 from "web3";

import { ABI, contractAddress } from "./config";

const web3 = new Web3(typeof window !== "undefined" && (Web3.givenProvider || window.ethereum)); //creating instace of Web3 library/className

export const nftContract = new web3.eth.Contract(ABI, contractAddress); //creating instance of our smart contract