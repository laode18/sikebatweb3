/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x79597B8A5f0b0327F1844188709A65ffbf24A758'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliperusahaanuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPerusahaan",
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
        "internalType": "struct CrudDomisiliperusahaanuser.Domisiliperusahaanuser",
        "name": "_domisiliperusahaanuser",
        "type": "tuple"
      }
    ],
    "name": "createDomisiliperusahaanuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliperusahaanuserId",
        "type": "uint256"
      }
    ],
    "name": "deleteDomisiliperusahaanuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliperusahaanuserId",
        "type": "uint256"
      }
    ],
    "name": "getDomisiliperusahaanuser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliperusahaanuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPerusahaan",
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
        "internalType": "struct CrudDomisiliperusahaanuser.Domisiliperusahaanuser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDomisiliperusahaanusers",
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
        "name": "_domisiliperusahaanuserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliperusahaanuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPerusahaan",
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
        "internalType": "struct CrudDomisiliperusahaanuser.Domisiliperusahaanuser",
        "name": "_updatedDomisiliperusahaanuser",
        "type": "tuple"
      }
    ],
    "name": "updateDomisiliperusahaanuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }       
];

const contractdomisiliperusahaanuser = new web3.eth.Contract(abi, contractAddress);

export default contractdomisiliperusahaanuser;
