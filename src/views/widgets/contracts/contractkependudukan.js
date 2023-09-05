/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x516c7469Af4212220fF2699a767a0B9C4FD67585'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kependudukanId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudKependudukan.Kependudukan",
        "name": "_kependudukan",
        "type": "tuple"
      }
    ],
    "name": "createKependudukan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kependudukanId",
        "type": "uint256"
      }
    ],
    "name": "deleteKependudukan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kependudukanId",
        "type": "uint256"
      }
    ],
    "name": "getKependudukan",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kependudukanId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudKependudukan.Kependudukan",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalKependudukans",
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
        "name": "_kependudukanId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kependudukanId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudKependudukan.Kependudukan",
        "name": "_updatedKependudukan",
        "type": "tuple"
      }
    ],
    "name": "updateKependudukan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractkependudukan = new web3.eth.Contract(abi, contractAddress);

export default contractkependudukan;
