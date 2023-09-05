/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xdAA64E3b1F2f2dc64ed576218C3EEd67BE31c2c9'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kematianuserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaAlmarhum",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "tanggalMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "jamMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "lokasiMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "penyebabMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "usia",
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
            "internalType": "struct CrudKematianuser.Kematianuser",
            "name": "_kematianuser",
            "type": "tuple"
          }
        ],
        "name": "createKematianuser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_kematianuserId",
            "type": "uint256"
          }
        ],
        "name": "deleteKematianuser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_kematianuserId",
            "type": "uint256"
          }
        ],
        "name": "getKematianuser",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kematianuserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaAlmarhum",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "tanggalMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "jamMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "lokasiMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "penyebabMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "usia",
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
            "internalType": "struct CrudKematianuser.Kematianuser",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalKematianusers",
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
            "name": "_kematianuserId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kematianuserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaAlmarhum",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "tanggalMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "jamMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "lokasiMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "penyebabMeninggal",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "usia",
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
            "internalType": "struct CrudKematianuser.Kematianuser",
            "name": "_updatedKematianuser",
            "type": "tuple"
          }
        ],
        "name": "updateKematianuser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contractkematianuser = new web3.eth.Contract(abi, contractAddress);

export default contractkematianuser;
