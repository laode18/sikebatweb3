/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xc82b254322FB36C883349fD3Dc5428e02DD8BdAd'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "informasiId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "judul",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggal",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "sumber",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gambar",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "isiInformasi",
            "type": "string"
          }
        ],
        "internalType": "struct CrudInformasi.Informasi",
        "name": "_informasi",
        "type": "tuple"
      }
    ],
    "name": "createInformasi",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_informasiId",
        "type": "uint256"
      }
    ],
    "name": "deleteInformasi",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_informasiId",
        "type": "uint256"
      }
    ],
    "name": "getInformasi",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "informasiId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "judul",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggal",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "sumber",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gambar",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "isiInformasi",
            "type": "string"
          }
        ],
        "internalType": "struct CrudInformasi.Informasi",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalInformasis",
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
        "name": "_informasiId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "informasiId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "judul",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggal",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "sumber",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gambar",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "isiInformasi",
            "type": "string"
          }
        ],
        "internalType": "struct CrudInformasi.Informasi",
        "name": "_updatedInformasi",
        "type": "tuple"
      }
    ],
    "name": "updateInformasi",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractinformasi = new web3.eth.Contract(abi, contractAddress);

export default contractinformasi;
