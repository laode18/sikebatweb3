/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contractpindah from './contracts/contractpindah';
import contractpindahlurah from './contracts/contractpindahlurah';
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
  cilTrash,
  cilPencil,
  cilPlus,
  cilFile,
  cilCheck,
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

const SuratPindah = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showData, setShowData] = useState(false);

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
  const [pindahs, setPindahs] = useState([]);
  const [newPindah, setNewPindah] = useState({
    userId: '', // Add default values for all fields
    kotaTujuan: '',
    kelurahanTujuan: '',
    alamatTujuan: '',
    rtTujuan: '',
    rwTujuan: '',
    alasanPindah: '',
    tanggalPindah: '',
    letterNumber: '',
  });
  const [pindahlurahs, setPindahlurahs] = useState([]);
  const [newPindahlurah, setNewPindahlurah] = useState({
    userId: '', // Add default values for all fields
    kotaTujuan: '',
    kelurahanTujuan: '',
    alamatTujuan: '',
    rtTujuan: '',
    rwTujuan: '',
    alasanPindah: '',
    tanggalPindah: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [editingPindah, setEditingPindah] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [letterNumberFileName, setLetterNumberFileName] = useState('');
  const backendURL = 'http://localhost:5000';
  const [showFile, setShowFile] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [hasSavedData, setHasSavedData] = useState([]);
  const [showDataButtonStatus, setShowDataButtonStatus] = useState({});

  const handleOpenModal = () => {
    setShowFile(true);
  };

  const handleCloseModal = () => {
    setShowFile(false);
  };

  useEffect(() => {
    getUsers();
    getPindahs();
    getPindahlurahs();
  }, []);

  const getPindahlurahs = async () => {
    try {
      setIsLoading(true);
      const totalPindahlurahs = await contractpindahlurah.methods.totalPindahlurahs().call();
      const pindahlurahsArray = [];
      const savedDataIds = []; // Array to store saved data IDs
      const showDataStatus = {}; // Object to store show data button status
  
      for (let i = 1; i <= totalPindahlurahs; i++) {
        const pindahlurah = await contractpindahlurah.methods.getPindahlurah(i).call();
        pindahlurahsArray.push(pindahlurah);
  
        // Check if data has been saved
        if (pindahlurah.userId !== '') {
          savedDataIds.push(pindahlurah.userId);
          showDataStatus[pindahlurah.userId] = true;
        }
      }
  
      setPindahlurahs(pindahlurahsArray);
      setIsLoading(false);
      setHasSavedData(savedDataIds);
      setShowDataButtonStatus(showDataStatus); // Set the show data button status
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

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

  const getPindahs = async () => {
    try {
      setIsLoading(true);
      const totalPindahs = await contractpindah.methods.totalPindahs().call();
      const pindahsArray = [];

      for (let i = 1; i <= totalPindahs; i++) {
        const pindah = await contractpindah.methods.getPindah(i).call();
        if (pindah.userId !== '') {
          pindahsArray.push(pindah);
        }
      }

      setPindahs(pindahsArray);
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
        setNewPindah({
          ...newPindah,
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
      setNewPindah((prevState) => ({
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
        setEditingPindah({
          ...editingPindah,
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
      setEditingPindah((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleInputChangelurah = (event) => {
    const { name, value } = event.target;
    setNewPindahlurah((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createPindahlurah = async (newPindahlurah, pindah) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const pindahlurahCount = await contractpindahlurah.methods.totalPindahlurahs().call();
      const pindahlurahId = parseInt(pindahlurahCount) + 1;
      const userId = pindah.userId;
      const kotaTujuan = pindah.kotaTujuan;
      const kelurahanTujuan = pindah.kelurahanTujuan;
      const alamatTujuan = pindah.alamatTujuan;
      const rtTujuan = pindah.rtTujuan;
      const rwTujuan = pindah.rwTujuan;
      const alasanPindah = pindah.alasanPindah;
      const tanggalPindah = pindah.tanggalPindah;
      const pindahlurahWithId = {
        ...newPindahlurah,
        pindahlurahId: pindahlurahId.toString(),
        userId: userId.toString(),
        kotaTujuan: kotaTujuan.toString(),
        kelurahanTujuan: kelurahanTujuan.toString(),
        alamatTujuan: alamatTujuan.toString(),
        rtTujuan: rtTujuan.toString(),
        rwTujuan: rwTujuan.toString(),
        alasanPindah: alasanPindah.toString(),
        tanggalPindah: tanggalPindah.toString(),

      };
      await contractpindahlurah.methods.createPindahlurah(pindahlurahWithId).send({ from: accounts[0] });
      await getPindahlurahs();
      toggleData(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const createPindah = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const pindahCount = await contractpindah.methods.totalPindahs().call();
      const pindahId = parseInt(pindahCount) + 1;
      const pindahWithId = {
        ...newPindah,
        pindahId: pindahId.toString(),
        letterNumber: letterNumberFileName, // Use the filename for letterNumber
      };
      await contractpindah.methods.createPindah(pindahWithId).send({ from: accounts[0] });
      api.post('/api/surat', pindahWithId);
      await getPindahs();
      setNewPindah({
        userId: '', // Reset the state after successful creation
        kotaTujuan: '',
        kelurahanTujuan: '',
        alamatTujuan: '',
        rtTujuan: '',
        rwTujuan: '',
        alasanPindah: '',
        tanggalPindah: '',
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

  const updatePindah = async (pindahId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();

      // If a new file was selected for aktaNotaris or letterNumber, upload it and get the filename
      let updatedPindah = { ...editingPindah };

      if (typeof editingPindah.letterNumber === 'object') {
        // Save the updated file in the state directly for later use
        const formDataLetterNumber = new FormData();
        formDataLetterNumber.append('letterNumber', editingPindah.letterNumber);
        const responseLetterNumber = await axios.post(`${backendURL}/api/upload`, formDataLetterNumber, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedPindah.letterNumber = responseLetterNumber.data.filename; // Use the filename returned from the server
      } else {
        updatedPindah.letterNumber = letterNumberFileName; // Use the existing filename if not changed
      }

      await contractpindah.methods
        .updatePindah(pindahId, updatedPindah)
        .send({ from: accounts[0] });

        setSelectedFile(null);
        setEditingPindah(null);
        setShowModal(false);
      await getPindahs(); // Refresh the user list after updating the user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePindah = async (pindahId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      await contractpindah.methods.deletePindah(pindahs[pindahId].pindahId).send({ from: accounts[0] });
      await getPindahs();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPindahs = pindahs.filter((pindah) => {
    const selectedUser = users.find((user) => user.username === pindah.userId);

    if (!selectedUser) {
      return false; // Skip this kependudukan if user not found
    }

    // You can adjust the properties you want to search in here
    const userFullname = selectedUser.fullName.toLowerCase();
    const userNik = selectedUser.nik.toLowerCase();
    const pindahkotaTujuan = pindah.kotaTujuan.toLowerCase();
    const pindahalamatTujuan = pindah.alamatTujuan.toLowerCase();

    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      userFullname.includes(searchTermLowerCase) ||
      userNik.includes(searchTermLowerCase) ||
      pindahkotaTujuan.includes(searchTermLowerCase) ||
      pindahalamatTujuan.includes(searchTermLowerCase)
    );
  });

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Data Surat Pindah</strong>
          </CCardHeader>
          <br />
          <Button variant='primary' style={{ width: 100, marginLeft: 16 }} onClick={toggleAdd}><CIcon icon={cilPlus} style={{ color: 'white', filter: 'drop-shadow(0px 0px 1px black)' }} />
            Tambah</Button>
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
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Kota Tujuan</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Kelurahan Tujuan</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Alamat Tujuan</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>RT Tujuan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>RW Tujuan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Alasan Pindah</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Tanggal Pindah</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Surat Ket RT</CTableHeaderCell>
                  
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell>
                   */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center', width: '20%' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle" }}>
                {filteredPindahs.map((pindah, index) => {
                  const selectedUser = users.find((user) => user.username === pindah.userId);

                  if (!selectedUser) {
                    return null; // Skip rendering if user not found for this kependudukan
                  }

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{pindah.userId}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.nik}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.kkNumber}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.fullName}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pindah.kotaTujuan}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{pindah.kelurahanTujuan}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pindah.alamatTujuan}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{pindah.rtTujuan}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{pindah.rwTujuan}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{pindah.alasanPindah}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{pindah.tanggalPindah}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                        <button onClick={handleOpenModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'blue', textDecorationLine: 'underline' }}>
                          {pindah.letterNumber}
                        </button>
                      </CTableDataCell>

                      <Modal show={showFile} onHide={handleCloseModal} size="lg">
                        <Modal.Header closeButton>
                          <Modal.Title>{pindah.letterNumber}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <iframe
                            title="PDF Viewer"
                            src={`http://localhost:5000/api/uploads/${pindah.letterNumber}`}
                            width="100%"
                            height="500px"
                            allowFullScreen
                          />
                        </Modal.Body>

                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                        <Button variant="warning" style={{ marginRight: '8px' }} onClick={() => {
                          toggleModal();
                          setEditingPindah(pindah);
                        }}><CIcon icon={cilPencil} style={{ color: 'white' }} /></Button>
                        <Button style={{ marginRight: '8px' }} variant="danger" onClick={() => deletePindah(index)}><CIcon icon={cilTrash} style={{ color: 'white' }} /></Button>
                        <Button
                          variant={hasSavedData.includes(pindah.userId) ? "success" : "secondary"}
                          onClick={() => {
                            toggleData(selectedUser);
                          }}
                        >
                          <CIcon icon={showDataButtonStatus[pindah.userId] ? cilCheck : cilFile} style={{ color: 'white' }} />
                        </Button>

                    <CModal visible={selectedData === selectedUser} onClose={closeData} centered style={{ width: '22cm', height: '34cm' }} size='lg'>
        <CModalHeader closeButton>
          <CModalTitle>Surat Keterangan Pindah</CModalTitle>
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
      <p style={{ margin: '5px 0', fontSize: '11pt', fontWeight: 'bold' }}>SURAT KETERANGAN PINDAH</p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>NOMOR : {String(index + 1).padStart(3, '0')}.5/{nomorSurat}</p>
    </div>
    <div style={{ marginTop: '50px', textAlign: 'left', paddingLeft: '120px' }}>

    <table style={{ width: '100%'}}>
      <tbody>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Nama</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{selectedUser.fullName}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Tempat, Tanggal Lahir</td>
          <td>:</td>
          <td> {selectedUser.birthDate} </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Kewarganegaraan</td>
          <td>:</td>
          <td>{selectedUser.nationality}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Agama</td>
          <td>:</td>
          <td>{selectedUser.religion}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Status Perkawinan</td>
          <td>:</td>
          <td>{selectedUser.maritalStatus}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Pekerjaan</td>
          <td>:</td>
          <td>{selectedUser.occupation}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Status Pendidikan</td>
          <td>:</td>
          <td>{selectedUser.educationStatus}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Alamat Asal</td>
          <td>:</td>
          <td>{selectedUser.alamat}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>NIK</td>
          <td>:</td>
          <td>{selectedUser.nik}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Pindah Ke</td>
          <td>:</td>
          <td>{pindah.alamatTujuan} RT.{pindah.rtTujuan} RT.{pindah.rwTujuan}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Kelurahan Tujuan</td>
          <td>:</td>
          <td>{pindah.kelurahanTujuan}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Kota Tujuan</td>
          <td>:</td>
          <td>{pindah.kotaTujuan}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Pada Tanggal</td>
          <td>:</td>
          <td>{pindah.tanggalPindah}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Alasan Pindah</td>
          <td>:</td>
          <td>{pindah.alasanPindah}</td>
        </tr>
        
      </tbody>
    </table>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '30px' }}>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div style={{ textAlign: 'center', paddingRight: '100px', marginLeft: '67%', position: 'relative' }}>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>Cibabat, 04 Januari 2023</p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>a.n. Lurah Cibabat</p>
      {/* <img src={ttdImage} alt="" style={{ width: '60%', height: '30%', position: 'absolute', top: '70px', left: '0' }} />
      <img src={stempelImage} alt="" style={{ width: '55%', height: '70%', position: 'absolute', top: '60px', left: '30px', opacity: 0.7 }} /> */}
      <p style={{ margin: '5px 0', fontSize: '11pt', marginTop: '40px' }}><u><b>Faisal, S.Si, M.A.P</b></u></p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}><b>197512032009041001</b></p>
    </div>
    
    </div>
  </div>
  
  </center>
        
        </CModalBody>
        <CModalFooter>
        <Form>
        <Form.Control type="text" name="userId" value={pindah.userId} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="kotaTujuan" value={pindah.kotaTujuan} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="kelurahanTujuan" value={pindah.kelurahanTujuan} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="alamatTujuan" value={pindah.alamatTujuan} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="rtTujuan" value={pindah.rtTujuan} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="rwTujuan" value={pindah.rwTujuan} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="alasanPindah" value={pindah.alasanPindah} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="tanggalPindah" value={pindah.tanggalPindah} onChange={handleInputChangelurah} hidden />
        {/* Hapus baris berikut untuk menghindari input manual */}
        {/* <Form.Control type="text" name="noSurat" value={newKependudukanlurah.noSurat} onChange={handleInputChangelurah} hidden /> */}
        <Button variant="primary" onClick={() => createPindahlurah(newPindahlurah, pindah)}>Accept</Button>
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
          <CModalTitle>Edit Data Surat Pindah</CModalTitle>
        </CModalHeader>
        {editingPindah && (
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
                  value={editingPindah.userId}
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
                Kota Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="kotaTujuan"
                  value={editingPindah.kotaTujuan}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Kelurahan Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="kelurahanTujuan"
                  value={editingPindah.kelurahanTujuan}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alamat Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="alamatTujuan"
                  value={editingPindah.alamatTujuan}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                RT Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="rtTujuan"
                  value={editingPindah.rtTujuan}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                RW Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="rwTujuan"
                  value={editingPindah.rwTujuan}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alasan Pindah
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="alasanPindah"
                  value={editingPindah.alasanPindah}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Tanggal Pindah
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="tanggalPindah"
                  value={editingPindah.tanggalPindah}
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
            <Button variant="primary" onClick={() => updatePindah(editingPindah.pindahId)}>
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
    <CModalTitle>Tambah Data Surat Pindah</CModalTitle>
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
            value={newPindah.userId}
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
                Kota Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="kotaTujuan"
                  value={newPindah.kotaTujuan}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Kelurahan Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="kelurahanTujuan"
                  value={newPindah.kelurahanTujuan}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alamat Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="alamatTujuan"
                  value={newPindah.alamatTujuan}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                RT Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="rtTujuan"
                  value={newPindah.rtTujuan}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                RW Tujuan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="rwTujuan"
                  value={newPindah.rwTujuan}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alasan Pindah
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="alasanPindah"
                  value={newPindah.alasanPindah}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Tanggal Pindah
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="tanggalPindah"
                  value={newPindah.tanggalPindah}
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
        <Button variant="primary" onClick={createPindah}>
        Tambah
      </Button>{' '}
      <Button variant="danger" onClick={closeAdd}>Cancel</Button>
    </CModalFooter>
  </Form>
</CModal>

    </CRow>
  );
};

export default SuratPindah;
