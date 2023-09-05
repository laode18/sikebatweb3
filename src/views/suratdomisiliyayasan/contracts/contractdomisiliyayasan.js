/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x4dc5C01114aD60DF925a877707AD9b6eD6d7B47a'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliyayasanId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisUsaha",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "jumlahAnggota",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudDomisiliyayasan.Domisiliyayasan",
        "name": "_domisiliyayasan",
        "type": "tuple"
      }
    ],
    "name": "createDomisiliyayasan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliyayasanId",
        "type": "uint256"
      }
    ],
    "name": "deleteDomisiliyayasan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliyayasanId",
        "type": "uint256"
      }
    ],
    "name": "getDomisiliyayasan",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliyayasanId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisUsaha",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "jumlahAnggota",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudDomisiliyayasan.Domisiliyayasan",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDomisiliyayasans",
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
        "name": "_domisiliyayasanId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliyayasanId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisUsaha",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "jumlahAnggota",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudDomisiliyayasan.Domisiliyayasan",
        "name": "_updatedDomisiliyayasan",
        "type": "tuple"
      }
    ],
    "name": "updateDomisiliyayasan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }    
];

const contractdomisiliyayasan = new web3.eth.Contract(abi, contractAddress);

export default contractdomisiliyayasan;
