/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xA6027548cE1CC2a2ec09c260c3E4e97D7A7b5a60'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tmsekolahlurahId",
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
              }
            ],
            "internalType": "struct CrudTmsekolahlurah.Tmsekolahlurah",
            "name": "_tmsekolahlurah",
            "type": "tuple"
          }
        ],
        "name": "createTmsekolahlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tmsekolahlurahId",
            "type": "uint256"
          }
        ],
        "name": "deleteTmsekolahlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tmsekolahlurahId",
            "type": "uint256"
          }
        ],
        "name": "getTmsekolahlurah",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tmsekolahlurahId",
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
              }
            ],
            "internalType": "struct CrudTmsekolahlurah.Tmsekolahlurah",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalTmsekolahlurahs",
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
            "name": "_tmsekolahlurahId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tmsekolahlurahId",
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
              }
            ],
            "internalType": "struct CrudTmsekolahlurah.Tmsekolahlurah",
            "name": "_updatedTmsekolahlurah",
            "type": "tuple"
          }
        ],
        "name": "updateTmsekolahlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contracttmsekolahlurah = new web3.eth.Contract(abi, contractAddress);

export default contracttmsekolahlurah;
