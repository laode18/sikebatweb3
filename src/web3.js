/* eslint-disable prettier/prettier */
import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Gunakan MetaMask
  web3 = new Web3(window.ethereum);
  window.ethereum.enable().catch((error) => {
    // Penanganan jika pengguna menolak otorisasi
    console.error(error);
  });
} else {
  // Gunakan provider Infura
  const infuraUrl = 'https://sepolia.infura.io/v3/79bbf70f177249e6a1ba74d17c0c91fd';
  const provider = new Web3.providers.HttpProvider(infuraUrl);
  web3 = new Web3(provider);
}

export default web3;
