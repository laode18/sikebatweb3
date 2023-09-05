/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x986920479244f2E5fcF16Fa25b179921A82645f4'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kelahiranlurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaAyah",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaIbu",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaAnak",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "tanggalLahir",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "jenisKelamin",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "anakKe",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "jamLahir",
                "type": "string"
              }
            ],
            "internalType": "struct CrudKelahiranlurah.Kelahiranlurah",
            "name": "_kelahiranlurah",
            "type": "tuple"
          }
        ],
        "name": "createKelahiranlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_kelahiranlurahId",
            "type": "uint256"
          }
        ],
        "name": "deleteKelahiranlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_kelahiranlurahId",
            "type": "uint256"
          }
        ],
        "name": "getKelahiranlurah",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kelahiranlurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaAyah",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaIbu",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaAnak",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "tanggalLahir",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "jenisKelamin",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "anakKe",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "jamLahir",
                "type": "string"
              }
            ],
            "internalType": "struct CrudKelahiranlurah.Kelahiranlurah",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalKelahiranlurahs",
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
            "name": "_kelahiranlurahId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kelahiranlurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaAyah",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaIbu",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaAnak",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "tanggalLahir",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "jenisKelamin",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "anakKe",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "jamLahir",
                "type": "string"
              }
            ],
            "internalType": "struct CrudKelahiranlurah.Kelahiranlurah",
            "name": "_updatedKelahiranlurah",
            "type": "tuple"
          }
        ],
        "name": "updateKelahiranlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contractkelahiranlurah = new web3.eth.Contract(abi, contractAddress);

export default contractkelahiranlurah;
