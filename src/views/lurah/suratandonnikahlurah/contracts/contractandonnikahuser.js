/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xf3e276b5298b6B447c1B96AbCa1e898369007679'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "andonnikahuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPasangan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPasangan",
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
        "internalType": "struct CrudAndonnikahuser.Andonnikahuser",
        "name": "_andonnikahuser",
        "type": "tuple"
      }
    ],
    "name": "createAndonnikahuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_andonnikahuserId",
        "type": "uint256"
      }
    ],
    "name": "deleteAndonnikahuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_andonnikahuserId",
        "type": "uint256"
      }
    ],
    "name": "getAndonnikahuser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "andonnikahuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPasangan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPasangan",
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
        "internalType": "struct CrudAndonnikahuser.Andonnikahuser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalAndonnikahusers",
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
        "name": "_andonnikahuserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "andonnikahuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPasangan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPasangan",
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
        "internalType": "struct CrudAndonnikahuser.Andonnikahuser",
        "name": "_updatedAndonnikahuser",
        "type": "tuple"
      }
    ],
    "name": "updateAndonnikahuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractandonnikahuser = new web3.eth.Contract(abi, contractAddress);

export default contractandonnikahuser;
