/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contractkelahiran from 'src/views/suratkelahiran/contracts/contractkelahiran';
import contractkelahiranlurah from 'src/views/suratkelahiran/contracts/contractkelahiranlurah';
import contractkelahiranuser from './contracts/contractkelahiranuser';
import Web3 from 'web3';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import contract from 'src/views/pengguna/contracts/contract';
import axios from 'axios';
import api from 'src/api';
import CIcon from '@coreui/icons-react';
import logo from 'src/assets/logo.png'; // Pastikan logo.png ada di direktori yang sesuai
import ttdImage from 'src/assets/ttd1.png'; // Pastikan ttd1.png ada di direktori yang sesuai
import stempelImage from 'src/assets/stempel.png';
import {
  cilBullhorn,
  cilTrash,
  cilPencil,
  cilPlus,
  cilEyedropper,
  cilFile,
} from '@coreui/icons';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const generateSuratNumber = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  
  // Simulasi contoh code surat (misalnya: A, B, C, ...)
  const codeSurat = 'Pem'; 

  const nomorSurat = `${month}/${codeSurat}/${year}`;
  return nomorSurat;
};

const SuratKelahiranlurah = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showImages, setShowImages] = useState(false); // State untuk mengontrol tampilan gambar

  const handleTTDStempelClick = () => {
    setShowImages(true); // Set state menjadi true ketika tombol ditekan
  };


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };

  const closeAdd = () => {
    setShowAdd(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleData = (user) => {
    setSelectedData(user);
  };

  const closeData = () => {
    setSelectedData(null);
  };

  const [nomorSurat, setNomorSurat] = useState('');

  useEffect(() => {
    const generatedNomorSurat = generateSuratNumber();
    setNomorSurat(generatedNomorSurat);
  }, []);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);  // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // Search logic
  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sorting logic
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const direction = sortConfig.direction === 'ascending' ? 1 : -1;
    return a[sortConfig.key].localeCompare(b[sortConfig.key]) * direction;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };
  const [kelahirans, setKelahirans] = useState([]);
  const [kelahiranlurahs, setKelahiranlurahs] = useState([]);
  const [newKelahiran, setNewKelahiran] = useState({
    userId: '', // Add default values for all fields
    namaAyah: '',
    namaIbu: '',
    namaAnak: '',
    tanggalLahir: '',
    jenisKelamin: '',
    anakKe: '',
    jamLahir: '',
    letterNumber: '',
  });
  const [newKelahiranlurah, setNewKelahiranlurah] = useState({
    userId: '', // Add default values for all fields
    namaAyah: '',
    namaIbu: '',
    namaAnak: '',
    tanggalLahir: '',
    jenisKelamin: '',
    anakKe: '',
    jamLahir: '',
  });
  const [newKelahiranuser, setNewKelahiranuser] = useState({
    userId: '', // Add default values for all fields
    namaAyah: '',
    namaIbu: '',
    namaAnak: '',
    tanggalLahir: '',
    jenisKelamin: '',
    anakKe: '',
    jamLahir: '',
    walletId: '',
    namaDocument: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [editingKelahiran, setEditingKelahiran] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [letterNumberFileName, setLetterNumberFileName] = useState('');
  const backendURL = 'http://localhost:5000';
  const [showFile, setShowFile] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenModal = () => {
    setShowFile(true);
  };

  const handleCloseModal = () => {
    setShowFile(false);
  };

  useEffect(() => {
    getUsers();
    getKelahirans();
    getKelahiranlurahs();
  }, []);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const totalUsers = await contract.methods.totalUsers().call();
      const usersArray = [];

      for (let i = 1; i <= totalUsers; i++) {
        const user = await contract.methods.getUser(i).call();
        if (user.username !== '') {
          usersArray.push(user);
        }
      }

      setUsers(usersArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getKelahirans = async () => {
    try {
      setIsLoading(true);
      const totalKelahirans = await contractkelahiran.methods.totalKelahirans().call();
      const kelahiransArray = [];

      for (let i = 1; i <= totalKelahirans; i++) {
        const kelahiran = await contractkelahiran.methods.getKelahiran(i).call();
        if (kelahiran.userId !== '') {
          kelahiransArray.push(kelahiran);
        }
      }

      setKelahirans(kelahiransArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getKelahiranlurahs = async () => {
    try {
      setIsLoading(true);
      const totalKelahiranlurahs = await contractkelahiranlurah.methods.totalKelahiranlurahs().call();
      const kelahiranlurahsArray = [];

      for (let i = 1; i <= totalKelahiranlurahs; i++) {
        const kelahiranlurah = await contractkelahiranlurah.methods.getKelahiranlurah(i).call();
        if (kelahiranlurah.userId !== '') {
          kelahiranlurahsArray.push(kelahiranlurah);
        }
      }

      setKelahiranlurahs(kelahiranlurahsArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file' && files && files.length > 0) {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        alert('File must be in PDF format.');
        return;
      }

      // Move file upload logic to a separate function
      uploadFile(name, file);

    } else if (name === 'userId') {
      const selectedUser = users.find((user) => user.username === value);
      if (selectedUser) {
        setNewKelahiran({
          ...newKelahiran,
          [name]: value,
          nik : selectedUser.nik,
          kkNumber : selectedUser.kkNumber,
          birthDate : selectedUser.birthDate,
          gender : selectedUser.gender,
          religion : selectedUser.religion,
          nationality : selectedUser.nationality,
          educationStatus : selectedUser.educationStatus,
          maritalStatus : selectedUser.maritalStatus,
          occupation : selectedUser.occupation,
          alamat: selectedUser.alamat,
        });
      }
    } else {
      setNewKelahiran((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const uploadFile = (name, file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    axios
      .post(`${backendURL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('File uploaded successfully:', response.data.filename);
        if (name === 'letterNumber') {
          setLetterNumberFileName(response.data.filename);
        }
      })
      .catch((error) => {
        console.error('File upload failed:', error);
      });
  };

  const handleEditInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file' && files && files.length > 0) {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        alert('File must be in PDF format.');
        return;
      }

      // Move file upload logic to a separate function
      uploadFile(name, file);

    } else if (name === 'userId') {
      const selectedUser = users.find((user) => user.username === value);
      if (selectedUser) {
        setEditingKelahiran({
          ...editingKelahiran,
          userId: value,
          nik : selectedUser.nik,
          kkNumber : selectedUser.kkNumber,
          birthDate : selectedUser.birthDate,
          gender : selectedUser.gender,
          religion : selectedUser.religion,
          nationality : selectedUser.nationality,
          educationStatus : selectedUser.educationStatus,
          maritalStatus : selectedUser.maritalStatus,
          occupation : selectedUser.occupation,
          alamat: selectedUser.alamat,
          letterNumber: value, // You can set the letterNumber to the userId if needed
        });
      }
    } else {
      setEditingKelahiran((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const createKelahiran = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const kelahiranCount = await contractkelahiran.methods.totalKelahirans().call();
      const kelahiranId = parseInt(kelahiranCount) + 1;
      const kelahiranWithId = {
        ...newKelahiran,
        kelahiranId: kelahiranId.toString(),
        letterNumber: letterNumberFileName, // Use the filename for letterNumber
      };
      await contractkelahiran.methods.createKelahiran(kelahiranWithId).send({ from: accounts[0] });
      api.post('/api/surat', kelahiranWithId);
      await getKelahirans();
      setNewKelahiran({
        userId: '', // Reset the state after successful creation
        namaAyah: '',
        namaIbu: '',
        namaAnak: '',
        tanggalLahir: '',
        jenisKelamin: '',
        anakKe: '',
        jamLahir: '',
        letterNumber: null, // Reset the letterNumber state after successful creation
      });
      setLetterNumberFileName(''); // Reset the filename state after successful creation
      setShowAdd(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };  

  const handleInputChangeuser = (event) => {
    const { name, value } = event.target;
    setNewKelahiranuser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createKelahiranuser = async (newKelahiranuser, selectedUser, kelahiranlurah) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const kelahiranuserCount = await contractkelahiranuser.methods.totalKelahiranusers().call();
      const kelahiranuserId = parseInt(kelahiranuserCount) + 1;
      const userId = kelahiranlurah.userId;
      const namaAyah = kelahiranlurah.namaAyah;
      const namaIbu = kelahiranlurah.namaIbu;
      const namaAnak = kelahiranlurah.namaAnak;
      const tanggalLahir = kelahiranlurah.tanggalLahir;
      const jenisKelamin = kelahiranlurah.jenisKelamin;
      const anakKe = kelahiranlurah.anakKe;
      const jamLahir = kelahiranlurah.jamLahir;
      const walletId = selectedUser.walletId;
      const namaDocument = "Surat Kelahiran"; 
      const kelahiranuserWithId = {
        ...newKelahiranuser,
        kelahiranuserId: kelahiranuserId.toString(),
        userId: userId.toString(),
        namaAyah: namaAyah.toString(),
        namaIbu: namaIbu.toString(),
        namaAnak: namaAnak.toString(),
        tanggalLahir: tanggalLahir.toString(),
        jenisKelamin: jenisKelamin.toString(),
        anakKe: anakKe.toString(),
        jamLahir: jamLahir.toString(),
        walletId: walletId.toString(),
        namaDocument: namaDocument.toString(),
      };
      await contractkelahiranuser.methods.createKelahiranuser(kelahiranuserWithId).send({ from: accounts[0] });
      await getKelahiranlurahs();
      toggleData(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createKelahiranlurah = async (newKelahiranlurah, kelahiran) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const kelahiranlurahCount = await contractkelahiranlurah.methods.totalKelahiranlurahs().call();
      const kelahiranlurahId = parseInt(kelahiranlurahCount) + 1;
      const userId = kelahiran.userId;
      const namaAyah = kelahiran.namaAyah;
      const namaIbu = kelahiran.namaIbu;
      const namaAnak = kelahiran.namaAnak;
      const tanggalLahir = kelahiran.tanggalLahir;
      const jenisKelamin = kelahiran.jenisKelamin;
      const anakKe = kelahiran.anakKe;
      const jamLahir = kelahiran.jamLahir;
      const kelahiranlurahWithId = {
        ...newKelahiranlurah,
        kelahiranlurahId: kelahiranlurahId.toString(),
        userId: userId.toString(),
        namaAyah: namaAyah.toString(),
        namaIbu: namaIbu.toString(),
        namaAnak: namaAnak.toString(),
        tanggalLahir: tanggalLahir.toString(),
        jenisKelamin: jenisKelamin.toString(),
        anakKe: anakKe.toString(),
        jamLahir: jamLahir.toString(),
      };
      await contractkelahiranlurah.methods.createKelahiranlurah(kelahiranlurahWithId).send({ from: accounts[0] });
      toggleData(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChangelurah = (event) => {
    const { name, value } = event.target;
    setNewKelahiranlurah((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const updateKelahiran = async (kelahiranId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();

      // If a new file was selected for aktaNotaris or letterNumber, upload it and get the filename
      let updatedKelahiran = { ...editingKelahiran };

      if (typeof editingKelahiran.letterNumber === 'object') {
        // Save the updated file in the state directly for later use
        const formDataLetterNumber = new FormData();
        formDataLetterNumber.append('letterNumber', editingKelahiran.letterNumber);
        const responseLetterNumber = await axios.post(`${backendURL}/api/upload`, formDataLetterNumber, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedKelahiran.letterNumber = responseLetterNumber.data.filename; // Use the filename returned from the server
      } else {
        updatedKelahiran.letterNumber = letterNumberFileName; // Use the existing filename if not changed
      }

      await contractkelahiran.methods
        .updateKelahiran(kelahiranId, updatedKelahiran)
        .send({ from: accounts[0] });

        setSelectedFile(null);
        setEditingKelahiran(null);
        setShowModal(false);
      await getKelahirans(); // Refresh the user list after updating the user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteKelahiran = async (kelahiranId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      await contractkelahiran.methods.deleteKelahiran(kelahirans[kelahiranId].kelahiranId).send({ from: accounts[0] });
      await getKelahirans();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowImages = (userId) => {
    setShowImages(prevState => ({
      ...prevState,
      [userId]: true,
    }));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Data Surat Kelahiran Lurah</strong>
          </CCardHeader>
          <br />
          {/* <Button variant='primary' style={{ width: 100, marginLeft: 16 }} onClick={toggleAdd}><CIcon icon={cilPlus} style={{ color: 'white', filter: 'drop-shadow(0px 0px 1px black)' }} />
            Tambah</Button> */}
          <CCardBody>
            {/* Items per page */}
      <select style={{ borderRadius: '6px' }} value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={25}>25 per page</option>
        <option value={50}>50 per page</option>
      </select>
            {/* Search bar */}
          <input
            type="text"
            placeholder="Search Data"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ float: 'right', borderRadius: '8px', paddingRight: '2rem', paddingLeft: '10px' }}
          />
          <FontAwesomeIcon icon={faSearch} style={{ float: 'right', marginRight: '-210px', marginTop: '7px' }} />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <CTable style={{ marginTop: '10px', borderCollapse: 'collapse', width: '100%' }}>
              <CTableHead style={{ backgroundColor: 'grey', color: 'white', fontSize: '16px', verticalAlign: "middle", lineHeight: '20px' }}>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No.</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Username</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>NIK</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No KK</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Lengkap</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Ayah</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Ibu</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Anak</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Tanggal Lahir</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Kelamin Anak</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Anak Ke</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jam Lahir</CTableHeaderCell> */}
                  
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell>
                   */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center', width: '20%' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle" }}>
                {kelahiranlurahs.map((kelahiranlurah, index) => {
                 const selectedUser = users.find((user) => user.username === kelahiranlurah.userId);

                 if (!selectedUser) {
                   return null; // Skip rendering if user not found for this kependudukan
                 }
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kelahiran.userId}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.nik}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.kkNumber}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.fullName}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kelahiranlurah.namaAyah}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kelahiranlurah.namaIbu}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kelahiranlurah.namaAnak}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kelahiran.tanggalLahir}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kelahiranlurah.jenisKelamin}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kelahiran.anakKe.toString()}</CTableDataCell> */}
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kelahiran.jamLahir}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                        <Button variant="secondary" onClick={() => {
                        toggleData(selectedUser);
                    }}><CIcon icon={cilFile} style={{ color: 'white' }} />
                    </Button>

                    <CModal visible={selectedData === selectedUser} onClose={closeData} centered style={{ width: '22cm', height: '34cm' }} size='lg'>
        <CModalHeader closeButton>
          <CModalTitle>Surat Keterangan Kelahiran</CModalTitle>
        </CModalHeader>
        <Form>
        <CModalBody>
        <center>
        <div style={{ width: '21cm', height: '29.7cm', backgroundColor: 'white' }}> 
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div style={{ width: '20%', paddingLeft: '30px', paddingTop: '35px' }}>
        <img src={logo} style={{ width: '120px', height: '120px' }} alt="" />
      </div>  

      <div style={{ width: '60%', paddingTop: '30px', marginLeft: '25px' }}>
        <div style={{ fontSize: '14pt', margin: '2px 0', fontWeight: 'bold' }}>PEMERINTAH DAERAH KOTA CIMAHI</div>
        <div style={{ fontSize: '14pt', margin: '2px 0', fontWeight: 'bold' }}>KECAMATAN CIMAHI UTARA</div>
        <div style={{ fontSize: '24pt', margin: '2px 0', fontWeight: 'bold' }}>KELURAHAN CIBABAT</div>
        <div style={{ fontSize: '12pt', margin: '2px 0' }}>Jl. Sirnarasa No.18 Telp (022) 6654095 Cimahi 40513</div>
      </div>    

      <div style={{ width: '20%' }}>
            &nbsp;
      </div>
    </div>
    <hr style={{ borderTop: '5px double black', width: '90%', borderColor: 'black' }} />

    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <p style={{ margin: '5px 0', fontSize: '11pt', fontWeight: 'bold' }}>SURAT KETERANGAN KELAHIRAN</p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>NOMOR : {String(index + 1).padStart(3, '0')}.1/{nomorSurat}</p>
    </div>
    <div style={{ marginTop: '50px', textAlign: 'left', paddingLeft: '120px' }}>
    <p style={{ margin: '5px 0', fontSize: '11pt', textIndent: '30px', marginRight: '80px', lineHeight: '25px', textAlign: 'justify' }}>
    Yang bertanda tangan dibawah ini, Lurah Cibabat Kecamatan Cimahi Utara Kota Cimahi dan berdasarkan Surat Keterangan dan Ketua RT 03 Nomor : 753/RT03/20 tanggal 04 Januari 2023 dengan ini menerangkan:
    </p>

    <table style={{ width: '100%'}}>
      <tbody>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Nama Anak</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{kelahiranlurah.namaAnak}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Tempat, Tanggal Lahir</td>
          <td>:</td>
          <td> {kelahiranlurah.tanggalLahir} </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Jenis Kelamin</td>
          <td>:</td>
          <td>{selectedUser.gender}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Anak Ke-</td>
          <td>:</td>
          <td>{kelahiranlurah.anakKe.toString()}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Jam Lahir</td>
          <td>:</td>
          <td>{kelahiranlurah.jamLahir}</td>
        </tr>
        
      </tbody>
    </table>

          <p style={{ margin: '3px 0', fontSize: '11pt', marginRight: '100px', lineHeight: '25px', textAlign: 'justify', textIndent: '0px' }}>
          Adalah anak dari suami isteri :
      </p>
      <table style={{ width: '100%'}}>
      <tbody>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Nama Ayah</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{kelahiranlurah.namaAyah}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Nama Ibu</td>
          <td>:</td>
          <td> {kelahiranlurah.namaIbu} </td>
        </tr>
        
      </tbody>
    </table>
      <p style={{ margin: '3px 0', fontSize: '11pt', marginRight: '100px', lineHeight: '25px', textAlign: 'justify', textIndent: '30px' }}>
      Surat Keterangan ini dipergunakan untuk melengkapi persyaratan pengurusan Akta Kelahiran di Dinas Kelurahan Cibabat Cimahi Utara.
      </p>

    </div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '30px' }}>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div style={{ textAlign: 'center', paddingRight: '100px', marginLeft: '67%', position: 'relative' }}>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>Cibabat, 04 Januari 2023</p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>a.n. Lurah Cibabat</p>
      {showImages[selectedUser.userId] && (
        // Tampilkan gambar hanya jika showImages[selectedUser.userId] bernilai true
        <div>
          <img src={ttdImage} alt="" style={{ width: '60%', height: '30%', position: 'absolute', top: '70px', left: '0' }} />
          <img src={stempelImage} alt="" style={{ width: '55%', height: '70%', position: 'absolute', top: '60px', left: '30px', opacity: 0.7 }} />
        </div>
      )}
      <p style={{ margin: '5px 0', fontSize: '11pt', marginTop: '40px' }}><u><b>Faisal, S.Si, M.A.P</b></u></p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}><b>197512032009041001</b></p>
    </div>
    
    </div>
  </div>
  
  </center>
        
        </CModalBody>
        <CModalFooter>
        
        <Form>
        <Form.Control type="text" name="userId" value={kelahiranlurah.userId} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="namaAyah" value={kelahiranlurah.namaAyah} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="namaIbu" value={kelahiranlurah.namaIbu} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="namaAnak" value={kelahiranlurah.namaAnak} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="tanggalLahir" value={kelahiranlurah.tanggalLahir} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="jenisKelamin" value={kelahiranlurah.jenisKelamin} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="anakKe" value={kelahiranlurah.anakKe.toString()} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="jamLahir" value={kelahiranlurah.jamLahir} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="walletId" value={selectedUser.walletId} onChange={handleInputChangeuser} hidden />
        <Button variant="primary" onClick={() => {
          handleShowImages(selectedUser.userId);
          createKelahiranuser(newKelahiranuser, selectedUser, kelahiranlurah);
        }}>
          TTD & Stempel
        </Button>
        </Form>
          <Button variant="secondary" onClick={closeData}>Close</Button>
        </CModalFooter>
        </Form>
      </CModal>

                      </CTableDataCell>
                    </CTableRow>
                  );
                })}
              </CTableBody>

            </CTable>
            )}
            <div style={{ float: 'right' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        &nbsp;&nbsp;
        <button
          disabled={indexOfLastItem >= sortedUsers.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Edit Data */}
      <CModal visible={showModal} onClose={closeModal}>
        <CModalHeader closeButton>
          <CModalTitle>Edit Data Surat Kelahiran</CModalTitle>
        </CModalHeader>
        {editingKelahiran && (
        <div>
        <Form>
        <CModalBody>
          <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nama Lengkap
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  as="select"
                  name="userId"
                  value={editingKelahiran.userId}
                  onChange={handleEditInputChange}
                >
                  <option value="" disabled>Select Name</option>
                  {users.map((user) => (
                    <option key={user.username} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nama Ayah
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaAyah"
                  value={editingKelahiran.namaAyah}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nama Ibu
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaIbu"
                  value={editingKelahiran.namaIbu}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nama Anak
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaAnak"
                  value={editingKelahiran.namaAnak}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Tanggal Lahir
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="tanggalLahir"
                  value={editingKelahiran.tanggalLahir}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jenis Kelamin Anak
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jenisKelamin"
                  value={editingKelahiran.jenisKelamin}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Anak Ke
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="number"
                  name="anakKe"
                  value={editingKelahiran.anakKe.toString()}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jam Lahir
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jamLahir"
                  value={editingKelahiran.jamLahir}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
              {/* Add more form inputs for other user fields */}
            <Form.Group as={Row}>
              <Form.Label column sm="3.5" htmlFor="letterNumber">
                Surat Keterangan RT:
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="file"
                  accept="application/pdf" // Specify the accepted file type to PDF
                  name="letterNumber"
                  onChange={handleEditInputChange}
                  required
                />
                {letterNumberFileName && <p>Selected file Surat Keterangan RT: {letterNumberFileName}</p>}
              </Col>
            </Form.Group>
            
        </CModalBody>
        <CModalFooter>
            <Button variant="primary" onClick={() => updateKelahiran(editingKelahiran.kelahiranId)}>
              Simpan
            </Button>{" "}
          <Button variant="danger" onClick={closeModal}>Cancel</Button>
        </CModalFooter>
        </Form>
        </div>
        )}
      </CModal>

      {/* Tambah Data */}
<CModal visible={showAdd} onClose={closeAdd} centered size='md'>
  <CModalHeader closeButton>
    <CModalTitle>Tambah Data Surat Kelahiran</CModalTitle>
  </CModalHeader>
  <Form>
    <CModalBody>
      <Form.Group as={Row}>
        <Form.Label column sm="3.5">
          Nama Lengkap
        </Form.Label>
        <Col sm="8.5">
          <Form.Control
            as="select"
            name="userId"
            value={newKelahiran.userId}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Name</option>
            {users.map((user, index) => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nama Ayah
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaAyah"
                  value={newKelahiran.namaAyah}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nama Ibu
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaIbu"
                  value={newKelahiran.namaIbu}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nama Anak
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaAnak"
                  value={newKelahiran.namaAnak}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Tanggal Lahir
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="tanggalLahir"
                  value={newKelahiran.tanggalLahir}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jenis Kelamin Anak
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jenisKelamin"
                  value={newKelahiran.jenisKelamin}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Anak Ke
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="number"
                  name="anakKe"
                  value={newKelahiran.anakKe.toString()}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jam Lahir
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jamLahir"
                  value={newKelahiran.jamLahir}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
      
      {/* Add more form inputs for other user fields */}
      <Form.Group as={Row}>
        <Form.Label column sm="3.5" htmlFor="letterNumber">
          Surat Keterangan RT:
        </Form.Label>
        <Col sm="8.5">
          <Form.Control
            type="file"
            accept="application/pdf" // Specify the accepted file type to PDF
            name="letterNumber"
            onChange={handleInputChange}
            required
          />
          {letterNumberFileName && <p>Selected file Surat Keterangan RT: {letterNumberFileName}</p>}
        </Col>
      </Form.Group>
    </CModalBody>
    <CModalFooter>
        <Button variant="primary" onClick={createKelahiran}>
        Tambah
      </Button>{' '}
      <Button variant="danger" onClick={closeAdd}>Cancel</Button>
    </CModalFooter>
  </Form>
</CModal>

    </CRow>
  );
};

export default SuratKelahiranlurah;
