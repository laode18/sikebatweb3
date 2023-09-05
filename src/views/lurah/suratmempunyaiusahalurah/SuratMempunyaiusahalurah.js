/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contract from 'src/views/pengguna/contracts/contract';
import Web3 from 'web3';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import contractmempunyaiusaha from 'src/views/suratmempunyaiusaha/contracts/contractmempunyaiusaha';
import contractmempunyaiusahalurah from 'src/views/suratmempunyaiusaha/contracts/contractmempunyaiusahalurah';
import contractmempunyaiusahauser from './contracts/contractmempunyaiusahauser';
import axios from 'axios';
import api from 'src/api';
import CIcon from '@coreui/icons-react';
import logo from 'src/assets/logo.png'; // Pastikan logo.png ada di direktori yang sesuai
import ttdImage from 'src/assets/ttd1.png'; // Pastikan ttd1.png ada di direktori yang sesuai
import stempelImage from 'src/assets/stempel.png';
import {
  cilTrash,
  cilPencil,
  cilPlus,
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
  const codeSurat = 'Ekbang/'; 

  const nomorSurat = `${month}/${codeSurat}/${year}`;
  return nomorSurat;
};

const SuratMempunyaiusahalurah = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showData, setShowData] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showImages, setShowImages] = useState(false); // State untuk mengontrol tampilan gambar

  const handleTTDStempelClick = () => {
    setShowImages(true); // Set state menjadi true ketika tombol ditekan
  };


  const toggleData = (user) => {
    setSelectedData(user);
  };

  const closeData = () => {
    setSelectedData(null);
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
  const [mempunyaiusahas, setMempunyaiusahas] = useState([]);
  const [newMempunyaiusaha, setNewMempunyaiusaha] = useState({
    userId: '', // Add default values for all fields
    namaUsaha: '',
    jenisUsaha: '',
    alamatUsaha: '',
    keperluan: '',
    letterNumber: '',
  });
  const [newMempunyaiusahauser, setNewMempunyaiusahauser] = useState({
    userId: '', // Add default values for all fields
    namaUsaha: '',
    jenisUsaha: '',
    alamatUsaha: '',
    keperluan: '',
    letterNumber: '',
    walletId: '',
    namaDocument: '',
  });
  const [mempunyaiusahalurahs, setMempunyaiusahalurahs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [editingMempunyaiusaha, setEditingMempunyaiusaha] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [letterNumberFileName, setLetterNumberFileName] = useState('');
  const backendURL = 'http://localhost:5000';
  const [showFile, setShowFile] = useState(false);

  const handleOpenModal = () => {
    setShowFile(true);
  };

  const handleCloseModal = () => {
    setShowFile(false);
  };

  useEffect(() => {
    getUsers();
    getMempunyaiusahas();
    getMempunyaiusahalurahs();
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

  const getMempunyaiusahas = async () => {
    try {
      setIsLoading(true);
      const totalMempunyaiusahas = await contractmempunyaiusaha.methods.totalMempunyaiusahas().call();
      const mempunyaiusahasArray = [];

      for (let i = 1; i <= totalMempunyaiusahas; i++) {
        const mempunyaiusaha = await contractmempunyaiusaha.methods.getMempunyaiusaha(i).call();
        if (mempunyaiusaha.userId !== '') {
          mempunyaiusahasArray.push(mempunyaiusaha);
        }
      }

      setMempunyaiusahas(mempunyaiusahasArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getMempunyaiusahalurahs = async () => {
    try {
      setIsLoading(true);
      const totalMempunyaiusahalurahs = await contractmempunyaiusahalurah.methods.totalMempunyaiusahalurahs().call();
      const mempunyaiusahalurahsArray = [];

      for (let i = 1; i <= totalMempunyaiusahalurahs; i++) {
        const mempunyaiusahalurah = await contractmempunyaiusahalurah.methods.getMempunyaiusahalurah(i).call();
        if (mempunyaiusahalurah.userId !== '') {
          mempunyaiusahalurahsArray.push(mempunyaiusahalurah);
        }
      }

      setMempunyaiusahalurahs(mempunyaiusahalurahsArray);
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
        setNewMempunyaiusaha({
          ...newMempunyaiusaha,
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
      setNewMempunyaiusaha((prevState) => ({
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
        setEditingMempunyaiusaha({
          ...editingMempunyaiusaha,
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
      setEditingMempunyaiusaha((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleInputChangeuser = (event) => {
    const { name, value } = event.target;
    setNewMempunyaiusahauser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createMempunyaiusahauser = async (newMempunyaiusahauser, selectedUser, mempunyaiusahalurah) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const mempunyaiusahauserCount = await contractmempunyaiusahauser.methods.totalMempunyaiusahausers().call();
      const mempunyaiusahauserId = parseInt(mempunyaiusahauserCount) + 1;
      const userId = mempunyaiusahalurah.userId;
      const namaUsaha = mempunyaiusahalurah.namaUsaha;
      const jenisUsaha = mempunyaiusahalurah.jenisUsaha;
      const alamatUsaha = mempunyaiusahalurah.alamatUsaha;
      const keperluan = mempunyaiusahalurah.keperluan;
      const walletId = selectedUser.walletId;
      const namaDocument = "Surat Mempunyai Usaha"; 
      const mempunyaiusahauserWithId = {
        ...newMempunyaiusahauser,
        mempunyaiusahauserId: mempunyaiusahauserId.toString(),
        userId: userId.toString(),
        namaUsaha: namaUsaha.toString(),
        jenisUsaha: jenisUsaha.toString(),
        alamatUsaha: alamatUsaha.toString(),
        keperluan: keperluan.toString(),
        walletId: walletId.toString(),
        namaDocument: namaDocument.toString(),
      };
      await contractmempunyaiusahauser.methods.createMempunyaiusahauser(mempunyaiusahauserWithId).send({ from: accounts[0] });
      await getMempunyaiusahalurahs();
      toggleData(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const createMempunyaiusaha = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const mempunyaiusahaCount = await contractmempunyaiusaha.methods.totalMempunyaiusahas().call();
      const mempunyaiusahaId = parseInt(mempunyaiusahaCount) + 1;
      const mempunyaiusahaWithId = {
        ...newMempunyaiusaha,
        mempunyaiusahaId: mempunyaiusahaId.toString(),
        letterNumber: letterNumberFileName, // Use the filename for letterNumber
      };
      await contractmempunyaiusaha.methods.createMempunyaiusaha(mempunyaiusahaWithId).send({ from: accounts[0] });
      api.post('/api/surat', mempunyaiusahaWithId);
      await getMempunyaiusahas();
      setNewMempunyaiusaha({
        userId: '', // Reset the state after successful creation
        namaUsaha: '',
        jenisUsaha: '',
        alamatUsaha: '',
        keperluan: '',
        letterNumber: null, // Reset the letterNumber state after successful creation
      });
      setLetterNumberFileName(null); // Reset the filename state after successful creation
      setShowAdd(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };  

  const updateMempunyaiusaha = async (mempunyaiusahaId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();

      // If a new file was selected for aktaNotaris or letterNumber, upload it and get the filename
      let updatedMempunyaiusaha = { ...editingMempunyaiusaha };

      if (typeof editingMempunyaiusaha.letterNumber === 'object') {
        // Save the updated file in the state directly for later use
        const formDataLetterNumber = new FormData();
        formDataLetterNumber.append('letterNumber', editingMempunyaiusaha.letterNumber);
        const responseLetterNumber = await axios.post(`${backendURL}/api/upload`, formDataLetterNumber, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedMempunyaiusaha.letterNumber = responseLetterNumber.data.filename; // Use the filename returned from the server
      } else {
        updatedMempunyaiusaha.letterNumber = letterNumberFileName; // Use the existing filename if not changed
      }

      await contractmempunyaiusaha.methods
        .updateMempunyaiusaha(mempunyaiusahaId, updatedMempunyaiusaha)
        .send({ from: accounts[0] });

        setSelectedFile(null);
        setEditingMempunyaiusaha(null);
        setShowModal(false);
      await getMempunyaiusahas(); // Refresh the user list after updating the user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMempunyaiusaha = async (mempunyaiusahaId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      await contractmempunyaiusaha.methods.deleteMempunyaiusaha(mempunyaiusahas[mempunyaiusahaId].mempunyaiusahaId).send({ from: accounts[0] });
      await getMempunyaiusahas();
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
            <strong>Data Surat Mempunyai Usaha Lurah</strong>
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
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Username</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>NIK</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No KK</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Pemilik</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Kelamin</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Usaha</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Usaha</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Alamat Usaha</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Keperluan</CTableHeaderCell> */}
                  
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell>
                   */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle" }}>
                {mempunyaiusahalurahs.map((mempunyaiusahalurah, index) => {
                  const selectedUser = users.find((user) => user.username === mempunyaiusahalurah.userId);

                  if (!selectedUser) {
                    return null; // Skip rendering if user not found for this kependudukan
                  }

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{mempunyaiusaha.userId}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.nik}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.kkNumber}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.fullName}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.gender}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{mempunyaiusahalurah.namaUsaha}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{mempunyaiusahalurah.jenisUsaha}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{mempunyaiusahalurah.alamatUsaha}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{mempunyaiusaha.keperluan}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center', width: '20%' }}>
                        <Button variant="secondary" onClick={() => {
                        toggleData(selectedUser);
                    }}><CIcon icon={cilFile} style={{ color: 'white' }} />
                    </Button>

                    <CModal visible={selectedData === selectedUser} onClose={closeData} centered style={{ width: '22cm', height: '34cm' }} size='lg'>
        <CModalHeader closeButton>
          <CModalTitle>Surat Keterangan Mempunyai Usaha</CModalTitle>
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
      <p style={{ margin: '5px 0', fontSize: '11pt', fontWeight: 'bold' }}>SURAT KETERANGAN MEMPUNYAI USAHA</p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>NOMOR : {String(index + 1).padStart(3, '0')}.9/{nomorSurat}</p>
    </div>
    <div style={{ marginTop: '50px', textAlign: 'left', paddingLeft: '120px' }}>
    <p style={{ margin: '5px 0', fontSize: '11pt', textIndent: '30px', marginRight: '80px', lineHeight: '25px', textAlign: 'justify' }}>
    Yang bertanda tangan dibawah ini, Lurah Cibabat Kecamatan Cimahi Utara Kota Cimahi dengan ini menerangkan bahwa:
    </p>
    <table style={{ width: '100%'}}>
      <tbody>
      <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>NIK</td>
          <td>:</td>
          <td>{selectedUser.nik}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Nama Pemilik</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{selectedUser.fullName}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Tempat, Tanggal Lahir</td>
          <td>:</td>
          <td> {selectedUser.birthDate} </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Jenis Kelamin</td>
          <td>:</td>
          <td>{selectedUser.gender}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Pekerjaan</td>
          <td>:</td>
          <td>{selectedUser.occupation}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Agama</td>
          <td>:</td>
          <td>{selectedUser.religion}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Kewarganegaraan</td>
          <td>:</td>
          <td>{selectedUser.nationality}</td>
        </tr>
        
      </tbody>
    </table>
    <p style={{ margin: '5px 0', fontSize: '11pt', textIndent: '30px', marginRight: '80px', lineHeight: '25px', textAlign: 'justify' }}>
    Berdasarkan Surat Keterangan dari RT 03 RW 18 No. 123 Tanggal 04 April 2023 Nomor : 04/04/2023 tanggal 04 April 2023, yang bersangkutan mempunyai usaha :
    </p>
    <table style={{ width: '100%'}}>
      <tbody>
      <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Nama Usaha</td>
          <td>:</td>
          <td>{mempunyaiusahalurah.namaUsaha}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Jenis Usaha</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{mempunyaiusahalurah.jenisUsaha}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Alamat</td>
          <td>:</td>
          <td> {mempunyaiusahalurah.alamatUsaha} </td>
        </tr>
        
      </tbody>
    </table>
    
      <p style={{ margin: '5px 0', fontSize: '11pt', marginRight: '80px', lineHeight: '25px', textAlign: 'justify', textIndent: '30px' }}>
      Keterangan ini dibuat untuk { mempunyaiusahalurah.keperluan }. Surat Keterangan ini berlaku sampai dengan 05 Mei 2023. Demikian untuk dipergunakan sebagaimana mestinya.
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
        <Form.Control type="text" name="userId" value={mempunyaiusahalurah.userId} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="namaUsaha" value={mempunyaiusahalurah.namaUsaha} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="jenisUsaha" value={mempunyaiusahalurah.jenisUsaha} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="alamatUsaha" value={mempunyaiusahalurah.alamatUsaha} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="keperluan" value={mempunyaiusahalurah.keperluan} onChange={handleInputChangeuser} hidden />
        <Form.Control type="text" name="walletId" value={selectedUser.walletId} onChange={handleInputChangeuser} hidden />
        <Button variant="primary" onClick={() => {
          handleShowImages(selectedUser.userId);
          createMempunyaiusahauser(newMempunyaiusahauser, selectedUser, mempunyaiusahalurah);
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
          <CModalTitle>Edit Data Surat Mempunyai Usaha</CModalTitle>
        </CModalHeader>
        {editingMempunyaiusaha && (
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
                  value={editingMempunyaiusaha.userId}
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
                Nama Usaha
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaUsaha"
                  value={editingMempunyaiusaha.namaUsaha}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jenis Usaha
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jenisUsaha"
                  value={editingMempunyaiusaha.jenisUsaha}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alamat Usaha
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="alamatUsaha"
                  value={editingMempunyaiusaha.alamatUsaha}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Keperluan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="keperluan"
                  value={editingMempunyaiusaha.keperluan}
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
            <Button variant="primary" onClick={() => updateMempunyaiusaha(editingMempunyaiusaha.mempunyaiusahaId)}>
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
    <CModalTitle>Tambah Data Surat Mempunyai Usaha</CModalTitle>
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
            value={newMempunyaiusaha.userId}
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
                Nama Usaha
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaUsaha"
                  value={newMempunyaiusaha.namaUsaha}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jenis Usaha
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jenisUsaha"
                  value={newMempunyaiusaha.jenisUsaha}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alamat Usaha
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="alamatUsaha"
                  value={newMempunyaiusaha.alamatUsaha}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Keperluan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="keperluan"
                  value={newMempunyaiusaha.keperluan}
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
        <Button variant="primary" onClick={createMempunyaiusaha}>
        Tambah
      </Button>{' '}
      <Button variant="danger" onClick={closeAdd}>Cancel</Button>
    </CModalFooter>
  </Form>
</CModal>

    </CRow>
  );
};

export default SuratMempunyaiusahalurah;
