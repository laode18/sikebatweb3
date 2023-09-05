/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x53d8E793f8d70597c18165d279AAe1eaaF734A23'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tmsekolahuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "noKIP",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaOrangtua",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaSekolah",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaDocument",
            "type": "string"
          }
        ],
        "internalType": "struct CrudTmsekolahuser.Tmsekolahuser",
        "name": "_tmsekolahuser",
        "type": "tuple"
      }
    ],
    "name": "createTmsekolahuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tmsekolahuserId",
        "type": "uint256"
      }
    ],
    "name": "deleteTmsekolahuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tmsekolahuserId",
        "type": "uint256"
      }
    ],
    "name": "getTmsekolahuser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tmsekolahuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "noKIP",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaOrangtua",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaSekolah",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaDocument",
            "type": "string"
          }
        ],
        "internalType": "struct CrudTmsekolahuser.Tmsekolahuser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalTmsekolahusers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tmsekolahuserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tmsekolahuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "noKIP",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaOrangtua",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaSekolah",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaDocument",
            "type": "string"
          }
        ],
        "internalType": "struct CrudTmsekolahuser.Tmsekolahuser",
        "name": "_updatedTmsekolahuser",
        "type": "tuple"
      }
    ],
    "name": "updateTmsekolahuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contracttmsekolahuser = new web3.eth.Contract(abi, contractAddress);

export default contracttmsekolahuser;
