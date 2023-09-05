/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x5d02a7Eb9b585694d678ffF42FD4eF9FF0897d2E'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tmsekolahId",
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
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudTmsekolah.Tmsekolah",
        "name": "_tmsekolah",
        "type": "tuple"
      }
    ],
    "name": "createTmsekolah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tmsekolahId",
        "type": "uint256"
      }
    ],
    "name": "deleteTmsekolah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tmsekolahId",
        "type": "uint256"
      }
    ],
    "name": "getTmsekolah",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tmsekolahId",
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
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudTmsekolah.Tmsekolah",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalTmsekolahs",
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
        "name": "_tmsekolahId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tmsekolahId",
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
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudTmsekolah.Tmsekolah",
        "name": "_updatedTmsekolah",
        "type": "tuple"
      }
    ],
    "name": "updateTmsekolah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contracttmsekolah = new web3.eth.Contract(abi, contractAddress);

export default contracttmsekolah;
