/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x249ac81676Fa94D03A57E46EDC9b384f13512197'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kematianId",
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
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudKematian.Kematian",
        "name": "_kematian",
        "type": "tuple"
      }
    ],
    "name": "createKematian",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kematianId",
        "type": "uint256"
      }
    ],
    "name": "deleteKematian",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kematianId",
        "type": "uint256"
      }
    ],
    "name": "getKematian",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kematianId",
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
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudKematian.Kematian",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalKematians",
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
        "name": "_kematianId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kematianId",
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
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudKematian.Kematian",
        "name": "_updatedKematian",
        "type": "tuple"
      }
    ],
    "name": "updateKematian",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractkematian = new web3.eth.Contract(abi, contractAddress);

export default contractkematian;
