/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contract from 'src/views/pengguna/contracts/contract';
import Web3 from 'web3';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import contractdomisiliperusahaan from './contracts/contractdomisiliperusahaan';
import contractdomisiliperusahaanlurah from './contracts/contractdomisiliperusahaanlurah';
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
  const codeSurat = 'Ekbang'; 

  const nomorSurat = `${month}/${codeSurat}/${year}`;
  return nomorSurat;
};


const SuratDomisiliperusahaan = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showData, setShowData] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

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
  const [domisiliperusahaans, setDomisiliperusahaans] = useState([]);
  const [newDomisiliperusahaan, setNewDomisiliperusahaan] = useState({
    userId: '', // Add default values for all fields
    namaPerusahaan: '',
    jenisPerusahaan: '',
    jamKerja: '',
    alamatPerusahaan: '',
    aktaNotaris: '',
    letterNumber: '',
  });
  const [domisiliperusahaanlurahs, setDomisiliperusahaanlurahs] = useState([]);
  const [newDomisiliperusahaanlurah, setNewDomisiliperusahaanlurah] = useState({
    userId: '', // Add default values for all fields
    namaPerusahaan: '',
    jenisPerusahaan: '',
    jamKerja: '',
    alamatPerusahaan: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [editingDomisiliperusahaan, setEditingDomisiliperusahaan] = useState(null);
  const [letterNumberFileName, setLetterNumberFileName] = useState('');
  const backendURL = 'http://localhost:5000';
  const [showFile, setShowFile] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [aktaNotarisFileName, setAktaNotarisFileName] = useState('');
  const [hasSavedData, setHasSavedData] = useState([]);
  const [showDataButtonStatus, setShowDataButtonStatus] = useState({});

  const handleOpenModal = () => {
    setShowFile(true);
  };

  const handleCloseModal = () => {
    setShowFile(false);
  };

  const handleOpenModals = () => {
    setShowFiles(true);
  };

  const handleCloseModals = () => {
    setShowFiles(false);
  };

  useEffect(() => {
    getUsers();
    getDomisiliperusahaans();
    getDomisiliperusahaanlurahs();
  }, []);

  const getDomisiliperusahaanlurahs = async () => {
    try {
      setIsLoading(true);
      const totalDomisiliperusahaanlurahs = await contractdomisiliperusahaanlurah.methods.totalDomisiliperusahaanlurahs().call();
      const domisiliperusahaanlurahsArray = [];
      const savedDataIds = []; // Array to store saved data IDs
      const showDataStatus = {}; // Object to store show data button status
  
      for (let i = 1; i <= totalDomisiliperusahaanlurahs; i++) {
        const domisiliperusahaanlurah = await contractdomisiliperusahaanlurah.methods.getDomisiliperusahaanlurah(i).call();
        domisiliperusahaanlurahsArray.push(domisiliperusahaanlurah);
  
        // Check if data has been saved
        if (domisiliperusahaanlurah.userId !== '') {
          savedDataIds.push(domisiliperusahaanlurah.userId);
          showDataStatus[domisiliperusahaanlurah.userId] = true;
        }
      }
  
      setDomisiliperusahaanlurahs(domisiliperusahaanlurahsArray);
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

  const getDomisiliperusahaans = async () => {
    try {
      setIsLoading(true);
      const totalDomisiliperusahaans = await contractdomisiliperusahaan.methods.totalDomisiliperusahaans().call();
      const domisiliperusahaansArray = [];

      for (let i = 1; i <= totalDomisiliperusahaans; i++) {
        const domisiliperusahaan = await contractdomisiliperusahaan.methods.getDomisiliperusahaan(i).call();
        if (domisiliperusahaan.userId !== '') {
          domisiliperusahaansArray.push(domisiliperusahaan);
        }
      }

      setDomisiliperusahaans(domisiliperusahaansArray);
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
        setNewDomisiliperusahaan({
          ...newDomisiliperusahaan,
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
      setNewDomisiliperusahaan((prevState) => ({
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
        if (name === 'aktaNotaris') {
          setAktaNotarisFileName(response.data.filename);
        } else if (name === 'letterNumber') {
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
        setEditingDomisiliperusahaan({
          ...editingDomisiliperusahaan,
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
      setEditingDomisiliperusahaan((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleInputChangelurah = (event) => {
    const { name, value } = event.target;
    setNewDomisiliperusahaanlurah((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createDomisiliperusahaanlurah = async (newDomisiliperusahaanlurah, domisiliperusahaan) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const domisiliperusahaanlurahCount = await contractdomisiliperusahaanlurah.methods.totalDomisiliperusahaanlurahs().call();
      const domisiliperusahaanlurahId = parseInt(domisiliperusahaanlurahCount) + 1;
      const userId = domisiliperusahaan.userId;
      const namaPerusahaan = domisiliperusahaan.namaPerusahaan;
      const jenisPerusahaan = domisiliperusahaan.jenisPerusahaan;
      const jamKerja = domisiliperusahaan.jamKerja;
      const alamatPerusahaan = domisiliperusahaan.alamatPerusahaan;
      const domisiliperusahaanlurahWithId = {
        ...newDomisiliperusahaanlurah,
        domisiliperusahaanlurahId: domisiliperusahaanlurahId.toString(),
        userId: userId.toString(),
        namaPerusahaan: namaPerusahaan.toString(),
        jenisPerusahaan: jenisPerusahaan.toString(),
        jamKerja: jamKerja.toString(),
        alamatPerusahaan: alamatPerusahaan.toString(),
      };
      await contractdomisiliperusahaanlurah.methods.createDomisiliperusahaanlurah(domisiliperusahaanlurahWithId).send({ from: accounts[0] });
      await getDomisiliperusahaanlurahs();
      toggleData(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const createDomisiliperusahaan = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const domisiliperusahaanCount = await contractdomisiliperusahaan.methods.totalDomisiliperusahaans().call();
      const domisiliperusahaanId = parseInt(domisiliperusahaanCount) + 1;
  
      const domisiliperusahaanWithId = {
        ...newDomisiliperusahaan,
        domisiliperusahaanId: domisiliperusahaanId.toString(),
        aktaNotaris: aktaNotarisFileName, // Set the file name for aktaNotaris
        letterNumber: letterNumberFileName, // Set the file name for letterNumber
      };
  
      await contractdomisiliperusahaan.methods.createDomisiliperusahaan(domisiliperusahaanWithId).send({ from: accounts[0] });
      api.post('/api/surat', domisiliperusahaanWithId);
      await getDomisiliperusahaans();
      setNewDomisiliperusahaan({
        userId: '',
        namaPerusahaan: '',
        jenisPerusahaan: '',
        jamKerja: '',
        alamatPerusahaan: '',
        aktaNotaris: null,
        letterNumber: null,
      });
      setAktaNotarisFileName(''); // Reset the filename state after successful creation
      setLetterNumberFileName(''); // Reset the filename state after successful creation
      setShowAdd(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateDomisiliperusahaan = async (domisiliperusahaanId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
  
      // If a new file was selected for aktaNotaris or letterNumber, upload it and get the filename
      let updatedDomisiliperusahaan = { ...editingDomisiliperusahaan };
  
      if (typeof editingDomisiliperusahaan.aktaNotaris === 'object') {
        // Save the updated file in the state directly for later use
        const formDataAktaNotaris = new FormData();
        formDataAktaNotaris.append('aktaNotaris', editingDomisiliperusahaan.aktaNotaris);
        const responseAktaNotaris = await axios.post(`${backendURL}/api/upload`, formDataAktaNotaris, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedDomisiliperusahaan.aktaNotaris = responseAktaNotaris.data.filename; // Use the filename returned from the server
      } else {
        updatedDomisiliperusahaan.aktaNotaris = aktaNotarisFileName; // Use the existing filename if not changed
      }
  
      if (typeof editingDomisiliperusahaan.letterNumber === 'object') {
        // Save the updated file in the state directly for later use
        const formDataLetterNumber = new FormData();
        formDataLetterNumber.append('letterNumber', editingDomisiliperusahaan.letterNumber);
        const responseLetterNumber = await axios.post(`${backendURL}/api/upload`, formDataLetterNumber, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedDomisiliperusahaan.letterNumber = responseLetterNumber.data.filename; // Use the filename returned from the server
      } else {
        updatedDomisiliperusahaan.letterNumber = letterNumberFileName; // Use the existing filename if not changed
      }
  
      await contractdomisiliperusahaan.methods
        .updateDomisiliperusahaan(domisiliperusahaanId, updatedDomisiliperusahaan)
        .send({ from: accounts[0] });
  
      setEditingDomisiliperusahaan(null);
      setShowModal(false);
      await getDomisiliperusahaans(); // Refresh the user list after updating the data
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteDomisiliperusahaan = async (domisiliperusahaanId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      await contractdomisiliperusahaan.methods.deleteDomisiliperusahaan(domisiliperusahaans[domisiliperusahaanId].domisiliperusahaanId).send({ from: accounts[0] });
      await getDomisiliperusahaans();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

   const filteredDomisiliperusahaans = domisiliperusahaans.filter((domisiliperusahaan) => {
    const selectedUser = users.find((user) => user.username === domisiliperusahaan.userId);

    if (!selectedUser) {
      return false; // Skip this kependudukan if user not found
    }

    // You can adjust the properties you want to search in here
    const userFullname = selectedUser.fullName.toLowerCase();
    const userGender = selectedUser.gender.toLowerCase();
    const domisiliperusahaannamaPerusahaan = domisiliperusahaan.namaPerusahaan.toLowerCase();
    const domisiliperusahaanjenisPerusahaan = domisiliperusahaan.jenisPerusahaan.toLowerCase();

    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      userFullname.includes(searchTermLowerCase) ||
      userGender.includes(searchTermLowerCase) ||
      domisiliperusahaannamaPerusahaan.includes(searchTermLowerCase) ||
      domisiliperusahaanjenisPerusahaan.includes(searchTermLowerCase)
      
    );
  });

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Data Surat Domisili Perusahaan</strong>
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
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Username</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>NIK</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Pemilik</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Kelamin</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Perusahaan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Perusahaan</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jam Kerja</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Alamat</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Akta Notaris</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Surat Ket RT</CTableHeaderCell>
                  
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell>
                   */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle"  }}>
                {filteredDomisiliperusahaans.map((domisiliperusahaan, index) => {
                  const selectedUser = users.find((user) => user.username === domisiliperusahaan.userId);

                  if (!selectedUser) {
                    return null; // Skip rendering if user not found for this kependudukan
                  }

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{domisiliperusahaan.userId}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.nik}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.fullName}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.gender}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{domisiliperusahaan.namaPerusahaan}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{domisiliperusahaan.jenisPerusahaan}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{domisiliperusahaan.jamKerja}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{domisiliperusahaan.alamatPerusahaan}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                        <button onClick={handleOpenModals} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'blue', textDecorationLine: 'underline' }}>
                          {domisiliperusahaan.aktaNotaris}
                        </button>
                      </CTableDataCell>

                      <Modal show={showFiles} onHide={handleCloseModals} size="lg">
                        <Modal.Header closeButton>
                          <Modal.Title>{domisiliperusahaan.aktaNotaris}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <iframe
                            title="PDF Viewer"
                            src={`http://localhost:5000/api/uploads/${domisiliperusahaan.aktaNotaris}`}
                            width="100%"
                            height="500px"
                            allowFullScreen
                          />
                        </Modal.Body>

                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseModals}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                        <button onClick={handleOpenModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'blue', textDecorationLine: 'underline' }}>
                          {domisiliperusahaan.letterNumber}
                        </button>
                      </CTableDataCell>

                      <Modal show={showFile} onHide={handleCloseModal} size="lg">
                        <Modal.Header closeButton>
                          <Modal.Title>{domisiliperusahaan.letterNumber}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <iframe
                            title="PDF Viewer"
                            src={`http://localhost:5000/api/uploads/${domisiliperusahaan.letterNumber}`}
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
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center', width: '20%' }}>
                        <Button variant="warning" style={{ marginRight: '8px' }} onClick={() => {
                          toggleModal();
                          setEditingDomisiliperusahaan(domisiliperusahaan);
                        }}><CIcon icon={cilPencil} style={{ color: 'white' }} /></Button>
                        <Button style={{ marginRight: '8px' }} variant="danger" onClick={() => deleteDomisiliperusahaan(index)}><CIcon icon={cilTrash} style={{ color: 'white' }} /></Button>
                        <Button
                          variant={hasSavedData.includes(domisiliperusahaan.userId) ? "success" : "secondary"}
                          onClick={() => {
                            toggleData(selectedUser);
                          }}
                        >
                          <CIcon icon={showDataButtonStatus[domisiliperusahaan.userId] ? cilCheck : cilFile} style={{ color: 'white' }} />
                        </Button>

                    <CModal visible={selectedData === selectedUser} onClose={closeData} centered style={{ width: '22cm', height: '34cm' }} size='lg'>
        <CModalHeader closeButton>
          <CModalTitle>Surat Keterangan Domisili Perusahaan</CModalTitle>
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
      <p style={{ margin: '5px 0', fontSize: '11pt', fontWeight: 'bold' }}>SURAT KETERANGAN DOMISILI PERUSAHAAN</p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>NOMOR : {String(index + 1).padStart(3, '0')}.13/{nomorSurat}</p>
    </div>
    <div style={{ marginTop: '50px', textAlign: 'left', paddingLeft: '120px' }}>
    <p style={{ margin: '5px 0', fontSize: '11pt', textIndent: '30px', marginRight: '80px', lineHeight: '25px', textAlign: 'justify' }}>
    Yang bertanda tangan dibawah ini, Lurah Cibabat Kecamatan Cimahi Utara Kota Cimahi, dengan ini menerangkan bahwa:
    </p>
      <table style={{ width: '100%'}}>
      <tbody>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Nama</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{selectedUser.fullName}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>NIK</td>
          <td>:</td>
          <td>{selectedUser.nik}</td>
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
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Alamat</td>
          <td>:</td>
          <td>{selectedUser.alamat}</td>
        </tr>
        
      </tbody>
    </table>
      <p style={{ margin: '5px 0', fontSize: '11pt', marginRight: '80px', lineHeight: '25px', textAlign: 'justify', textIndent: '30px' }}>
      Berdasarkan Surat Pernyataan yang bersangkutan Tanggal 15 April 2023 dan Surat Keterangan dari Ketua RT 02 RW 20 Nomor: 1078/03/20.7/4/2023 Tanggal 15 April 2023, 
      yang bersangkutan merupakan Pimpinan Perusahaan dengan data sebagai berikut
      </p>
      <table style={{ width: '100%'}}>
      <tbody>
      <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Nama Perusahaan</td>
          <td>:</td>
          <td>{domisiliperusahaan.namaPerusahaan}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Bidang</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{domisiliperusahaan.jenisPerusahaan}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Jam Kerja</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{domisiliperusahaan.jamKerja}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Alamat</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{domisiliperusahaan.alamatPerusahaan}</td>
        </tr>
        
      </tbody>
    </table>
        <p style={{ margin: '5px 0', fontSize: '11pt', marginRight: '80px', lineHeight: '25px', textAlign: 'justify', textIndent: '30px' }}>
        Keterangan ini dibuat melengkapi untuk keperluan Administrasi. Demikian Surat Keterangan ini dibuat untuk dipergunakan seperlunya.
      </p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '-30px' }}>
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
        <Form.Control type="text" name="userId" value={domisiliperusahaan.userId} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="namaPerusahaan" value={domisiliperusahaan.namaPerusahaan} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="jenisPerusahaan" value={domisiliperusahaan.jenisPerusahaan} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="jamKerja" value={domisiliperusahaan.jamKerja} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="alamatPerusahaan" value={domisiliperusahaan.alamatPerusahaan} onChange={handleInputChangelurah} hidden />

        {/* Hapus baris berikut untuk menghindari input manual */}
        {/* <Form.Control type="text" name="noSurat" value={newKependudukanlurah.noSurat} onChange={handleInputChangelurah} hidden /> */}
        <Button variant="primary" onClick={() => createDomisiliperusahaanlurah(newDomisiliperusahaanlurah, domisiliperusahaan)}>Accept</Button>
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
          <CModalTitle>Edit Data Surat Domisili Perusahaan</CModalTitle>
        </CModalHeader>
        {editingDomisiliperusahaan && (
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
                  value={editingDomisiliperusahaan.userId}
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
                Nama Perusahaan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaPerusahaan"
                  value={editingDomisiliperusahaan.namaPerusahaan}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jenis Perusahaan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jenisPerusahaan"
                  value={editingDomisiliperusahaan.jenisPerusahaan}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jam Kerja
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jamKerja"
                  value={editingDomisiliperusahaan.jamKerja}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alamat Perusahaan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="alamatPerusahaan"
                  value={editingDomisiliperusahaan.alamatPerusahaan}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            
              {/* Add more form inputs for other user fields */}
              <Form.Group as={Row}>
              <Form.Label column sm="3.5" htmlFor="letterNumber">
                Akta Notaris:
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="file"
                  accept="application/pdf" // Specify the accepted file type to PDF
                  name="aktaNotaris"
                  onChange={handleEditInputChange}
                  required
                />
                {aktaNotarisFileName && <p>Selected file Akta Notaris: {aktaNotarisFileName}</p>}
              </Col>
            </Form.Group>
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
            <Button variant="primary" onClick={() => updateDomisiliperusahaan(editingDomisiliperusahaan.domisiliperusahaanId)}>
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
    <CModalTitle>Tambah Data Surat Domisili Perusahaan</CModalTitle>
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
            value={newDomisiliperusahaan.userId}
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
                Nama Perusahaan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaPerusahaan"
                  value={newDomisiliperusahaan.namaPerusahaan}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jenis Perusahaan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jenisPerusahaan"
                  value={newDomisiliperusahaan.jenisPerusahaan}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jam Kerja
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jamKerja"
                  value={newDomisiliperusahaan.jamKerja}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alamat Perusahaan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="alamatPerusahaan"
                  value={newDomisiliperusahaan.alamatPerusahaan}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
      
      {/* Add more form inputs for other user fields */}
      <Form.Group as={Row}>
        <Form.Label column sm="3.5" htmlFor="letterNumber">
          Akta Notaris:
        </Form.Label>
        <Col sm="8.5">
          <Form.Control
            type="file"
            accept="application/pdf" // Specify the accepted file type to PDF
            name="aktaNotaris"
            onChange={handleInputChange}
            required
          />
          {aktaNotarisFileName && <p>Selected file Akta Notaris: {aktaNotarisFileName}</p>}
        </Col>
      </Form.Group>
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
        <Button variant="primary" onClick={createDomisiliperusahaan}>
        Tambah
      </Button>{' '}
      <Button variant="danger" onClick={closeAdd}>Cancel</Button>
    </CModalFooter>
  </Form>
</CModal>

    </CRow>
  );
};

export default SuratDomisiliperusahaan;
