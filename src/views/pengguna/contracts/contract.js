/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x7Ba0352aD6829153D7BB334bc1bdA54FD855BD88'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "userId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "password",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "nik",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "kkNumber",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fullName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "birthDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "religion",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "nationality",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "educationStatus",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "maritalStatus",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "occupation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamat",
            "type": "string"
          }
        ],
        "internalType": "struct CrudPengguna.User",
        "name": "_user",
        "type": "tuple"
      }
    ],
    "name": "createUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_userId",
        "type": "uint256"
      }
    ],
    "name": "deleteUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_userId",
        "type": "uint256"
      }
    ],
    "name": "getUser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "userId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "password",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "nik",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "kkNumber",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fullName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "birthDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "religion",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "nationality",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "educationStatus",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "maritalStatus",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "occupation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamat",
            "type": "string"
          }
        ],
        "internalType": "struct CrudPengguna.User",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalUsers",
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
        "name": "_userId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "userId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "password",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "nik",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "kkNumber",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fullName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "birthDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "religion",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "nationality",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "educationStatus",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "maritalStatus",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "occupation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamat",
            "type": "string"
          }
        ],
        "internalType": "struct CrudPengguna.User",
        "name": "_updatedUser",
        "type": "tuple"
      }
    ],
    "name": "updateUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contract = new web3.eth.Contract(abi, contractAddress);

export default contract;

