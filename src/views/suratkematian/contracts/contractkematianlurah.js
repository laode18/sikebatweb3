/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x0BdaA1948f6C70A9aB171b3ea488956AE85eB0c8'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kematianlurahId",
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
              }
            ],
            "internalType": "struct CrudKematianlurah.Kematianlurah",
            "name": "_kematianlurah",
            "type": "tuple"
          }
        ],
        "name": "createKematianlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_kematianlurahId",
            "type": "uint256"
          }
        ],
        "name": "deleteKematianlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_kematianlurahId",
            "type": "uint256"
          }
        ],
        "name": "getKematianlurah",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kematianlurahId",
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
              }
            ],
            "internalType": "struct CrudKematianlurah.Kematianlurah",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalKematianlurahs",
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
            "name": "_kematianlurahId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kematianlurahId",
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
              }
            ],
            "internalType": "struct CrudKematianlurah.Kematianlurah",
            "name": "_updatedKematianlurah",
            "type": "tuple"
          }
        ],
        "name": "updateKematianlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contractkematianlurah = new web3.eth.Contract(abi, contractAddress);

export default contractkematianlurah;
