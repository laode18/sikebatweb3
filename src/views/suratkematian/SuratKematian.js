/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contractkematian from './contracts/contractkematian';
import contractkematianlurah from './contracts/contractkematianlurah';
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

const SuratKematian = () => {
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
  const [kematians, setKematians] = useState([]);
  const [newKematian, setNewKematian] = useState({
    userId: '', // Add default values for all fields
    namaAlmarhum: '',
    tanggalMeninggal: '',
    jamMeninggal: '',
    lokasiMeninggal: '',
    penyebabMeninggal: '',
    usia: '',
    letterNumber: '',
  });
  const [kematianlurahs, setKematianlurahs] = useState([]);
  const [newKematianlurah, setNewKematianlurah] = useState({
    userId: '', // Add default values for all fields
    namaAlmarhum: '',
    tanggalMeninggal: '',
    jamMeninggal: '',
    lokasiMeninggal: '',
    penyebabMeninggal: '',
    usia: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [editingKematian, setEditingKematian] = useState(null);
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
    getKematians();
    getKematianlurahs();
  }, []);

  const getKematianlurahs = async () => {
    try {
      setIsLoading(true);
      const totalKematianlurahs = await contractkematianlurah.methods.totalKematianlurahs().call();
      const kematianlurahsArray = [];
      const savedDataIds = []; // Array to store saved data IDs
      const showDataStatus = {}; // Object to store show data button status
  
      for (let i = 1; i <= totalKematianlurahs; i++) {
        const kematianlurah = await contractkematianlurah.methods.getKematianlurah(i).call();
        kematianlurahsArray.push(kematianlurah);
  
        // Check if data has been saved
        if (kematianlurah.userId !== '') {
          savedDataIds.push(kematianlurah.userId);
          showDataStatus[kematianlurah.userId] = true;
        }
      }
  
      setKematianlurahs(kematianlurahsArray);
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

  const getKematians = async () => {
    try {
      setIsLoading(true);
      const totalKematians = await contractkematian.methods.totalKematians().call();
      const kematiansArray = [];

      for (let i = 1; i <= totalKematians; i++) {
        const kematian = await contractkematian.methods.getKematian(i).call();
        if (kematian.userId !== '') {
          kematiansArray.push(kematian);
        }
      }

      setKematians(kematiansArray);
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
        setNewKematian({
          ...newKematian,
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
      setNewKematian((prevState) => ({
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
        setEditingKematian({
          ...editingKematian,
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
      setEditingKematian((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleInputChangelurah = (event) => {
    const { name, value } = event.target;
    setNewKematianlurah((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const createKematian = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const kematianCount = await contractkematian.methods.totalKematians().call();
      const kematianId = parseInt(kematianCount) + 1;
      const kematianWithId = {
        ...newKematian,
        kematianId: kematianId.toString(),
        letterNumber: letterNumberFileName, // Use the filename for letterNumber
      };
      await contractkematian.methods.createKematian(kematianWithId).send({ from: accounts[0] });
      api.post('/api/surat', kematianWithId);
      await getKematians();
      setNewKematian({
        userId: '', // Reset the state after successful creation
        namaAlmarhum: '',
        tanggalMeninggal: '',
        jamMeninggal: '',
        lokasiMeninggal: '',
        penyebabMeninggal: '',
        usia: '',
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

  const createKematianlurah = async (newKematianlurah, kematian) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const kematianlurahCount = await contractkematianlurah.methods.totalKematianlurahs().call();
      const kematianlurahId = parseInt(kematianlurahCount) + 1;
      const userId = kematian.userId;
      const namaAlmarhum = kematian.namaAlmarhum;
      const tanggalMeninggal = kematian.tanggalMeninggal;
      const jamMeninggal = kematian.jamMeninggal;
      const lokasiMeninggal = kematian.lokasiMeninggal;
      const penyebabMeninggal = kematian.penyebabMeninggal;
      const usia = kematian.usia;
      const kematianlurahWithId = {
        ...newKematianlurah,
        kematianlurahId: kematianlurahId.toString(),
        userId: userId.toString(),
        namaAlmarhum : namaAlmarhum.toString(),
        tanggalMeninggal : tanggalMeninggal.toString(),
        jamMeninggal : jamMeninggal.toString(),
        lokasiMeninggal : lokasiMeninggal.toString(),
        penyebabMeninggal : penyebabMeninggal.toString(),
        usia : usia.toString(),

      };
      await contractkematianlurah.methods.createKematianlurah(kematianlurahWithId).send({ from: accounts[0] });
      await getKematianlurahs();
      toggleData(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateKematian = async (kematianId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();

      // If a new file was selected for aktaNotaris or letterNumber, upload it and get the filename
      let updatedKematian = { ...editingKematian };

      if (typeof editingKematian.letterNumber === 'object') {
        // Save the updated file in the state directly for later use
        const formDataLetterNumber = new FormData();
        formDataLetterNumber.append('letterNumber', editingKematian.letterNumber);
        const responseLetterNumber = await axios.post(`${backendURL}/api/upload`, formDataLetterNumber, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedKematian.letterNumber = responseLetterNumber.data.filename; // Use the filename returned from the server
      } else {
        updatedKematian.letterNumber = letterNumberFileName; // Use the existing filename if not changed
      }

      await contractkematian.methods
        .updateKematian(kematianId, updatedKematian)
        .send({ from: accounts[0] });

        setSelectedFile(null);
        setEditingKematian(null);
        setShowModal(false);
      await getKematians(); // Refresh the user list after updating the user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteKematian = async (kematianId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      await contractkematian.methods.deleteKematian(kematians[kematianId].kematianId).send({ from: accounts[0] });
      await getKematians();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredKematians = kematians.filter((kematian) => {
    const selectedUser = users.find((user) => user.username === kematian.userId);

    if (!selectedUser) {
      return false; // Skip this kependudukan if user not found
    }

    // You can adjust the properties you want to search in here
    const userNik = selectedUser.nik.toLowerCase();
    const kematiannamaAlmarhum = kematian.namaAlmarhum.toLowerCase();
    const kematiantanggalMeninggal = kematian.tanggalMeninggal.toLowerCase();

    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      userNik.includes(searchTermLowerCase) ||
      kematiannamaAlmarhum.includes(searchTermLowerCase) ||
      kematiantanggalMeninggal.includes(searchTermLowerCase)
    );
  });

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Data Surat Kematian</strong>
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
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Almarhum</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Tanggal Meninggal</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jam Meninggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Lokasi Meninggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Penyebab Meninggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Usia Saat Meninggal</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Surat Ket RT</CTableHeaderCell>
                  
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell>
                   */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle" }}>
                {filteredKematians.map((kematian, index) => {
                  const selectedUser = users.find((user) => user.username === kematian.userId);

                  if (!selectedUser) {
                    return null; // Skip rendering if user not found for this kependudukan
                  }

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.userId}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.nik}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{selectedUser.kkNumber}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kematian.namaAlmarhum}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kematian.tanggalMeninggal}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.jamMeninggal}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.lokasiMeninggal}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.penyebabMeninggal}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.usia}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                        <button onClick={handleOpenModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'blue', textDecorationLine: 'underline' }}>
                          {kematian.letterNumber}
                        </button>
                      </CTableDataCell>

                      <Modal show={showFile} onHide={handleCloseModal} size="lg">
                        <Modal.Header closeButton>
                          <Modal.Title>{kematian.letterNumber}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <iframe
                            title="PDF Viewer"
                            src={`http://localhost:5000/api/uploads/${kematian.letterNumber}`}
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
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center', width: '30%' }}>
                        <Button variant="warning" style={{ marginRight: '8px' }} onClick={() => {
                          toggleModal();
                          setEditingKematian(kematian);
                        }}><CIcon icon={cilPencil} style={{ color: 'white' }} /></Button>
                        <Button style={{ marginRight: '8px' }} variant="danger" onClick={() => deleteKematian(index)}><CIcon icon={cilTrash} style={{ color: 'white' }} /></Button>
                        <Button
                          variant={hasSavedData.includes(kematian.userId) ? "success" : "secondary"}
                          onClick={() => {
                            toggleData(selectedUser);
                          }}
                        >
                          <CIcon icon={showDataButtonStatus[kematian.userId] ? cilCheck : cilFile} style={{ color: 'white' }} />
                        </Button>

                    <CModal visible={selectedData === selectedUser} onClose={closeData} centered style={{ width: '22cm', height: '34cm' }} size='lg'>
        <CModalHeader closeButton>
          <CModalTitle>Surat Keterangan Kematian</CModalTitle>
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
      <p style={{ margin: '5px 0', fontSize: '11pt', fontWeight: 'bold' }}>SURAT KETERANGAN KEMATIAN</p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>NOMOR : {String(index + 1).padStart(3, '0')}.3/{nomorSurat}</p>
    </div>
    <div style={{ marginTop: '50px', textAlign: 'left', paddingLeft: '120px' }}>
    <p style={{ margin: '5px 0', fontSize: '11pt', textIndent: '30px', marginRight: '80px', lineHeight: '25px', textAlign: 'justify' }}>
    Yang bertanda tangan dibawah ini, Lurah Cibabat Kecamatan Cimahi Utara Kota Cimahi dan berdasarkan Surat Keterangan dan Ketua RT 03 Nomor : 753/RT03/20 tanggal 04 Januari 2023 dengan ini menerangkan:
    </p>

    <table style={{ width: '100%'}}>
      <tbody>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Nama</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{kematian.namaAlmarhum}</td>
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
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Agama</td>
          <td>:</td>
          <td>{selectedUser.religion}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>NIK</td>
          <td>:</td>
          <td>{selectedUser.nik}</td>
        </tr>
        
      </tbody>
    </table>

          <p style={{ margin: '3px 0', fontSize: '11pt', marginRight: '100px', lineHeight: '25px', textAlign: 'justify', textIndent: '30px' }}>
          Berdasarkan Surat Keterangan dari Ketua RT 01 RW 03 No. 8989 Tanggal 04 Januari 2023 bahwa nama tersebut adalah benar berdomisili dialamat tersebut diatas dan telah meninggal dunia pada:
      </p>
      <table style={{ width: '100%'}}>
      <tbody>
        <tr>
          <td style={{ paddingBottom: '5px', width: '30%', paddingLeft: '30px' }}>Hari, Tanggal</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{kematian.tanggalMeninggal}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Jam</td>
          <td>:</td>
          <td> {kematian.jamMeninggal} </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Lokasi</td>
          <td>:</td>
          <td> {kematian.lokasiMeninggal} </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px', paddingLeft: '30px' }}>Disebabkan Karena</td>
          <td>:</td>
          <td> {kematian.penyebabMeninggal} </td>
        </tr>
      </tbody>
    </table>
      <p style={{ margin: '3px 0', fontSize: '11pt', marginRight: '100px', lineHeight: '25px', textAlign: 'justify', textIndent: '30px' }}>
      Keterangan ini dipergunakan untuk keperluan Administrasi. Demikian Surat Keterangan ini dibuat untuk dipergunakan seperlunya.
      </p>

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
        <Form.Control type="text" name="userId" value={kematian.userId} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="namaAlmarhum" value={kematian.namaAlmarhum} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="tanggalMeninggal" value={kematian.tanggalMeninggal} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="jamMeninggal" value={kematian.jamMeninggal} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="lokasiMeninggal" value={kematian.lokasiMeninggal} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="penyebabMeninggal" value={kematian.penyebabMeninggal} onChange={handleInputChangelurah} hidden />
        <Form.Control type="text" name="usia" value={kematian.usia} onChange={handleInputChangelurah} hidden />
        {/* Hapus baris berikut untuk menghindari input manual */}
        {/* <Form.Control type="text" name="noSurat" value={newKependudukanlurah.noSurat} onChange={handleInputChangelurah} hidden /> */}
        <Button variant="primary" onClick={() => createKematianlurah(newKematianlurah, kematian)}>Accept</Button>
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
          <CModalTitle>Edit Data Surat Kematian</CModalTitle>
        </CModalHeader>
        {editingKematian && (
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
                  value={editingKematian.userId}
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
                Nama Almarhum
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaAlmarhum"
                  value={editingKematian.namaAlmarhum}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Tanggal Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="tanggalMeninggal"
                  value={editingKematian.tanggalMeninggal}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jam Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jamMeninggal"
                  value={editingKematian.jamMeninggal}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Lokasi Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="lokasiMeninggal"
                  value={editingKematian.lokasiMeninggal}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Penyebab Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="penyebabMeninggal"
                  value={editingKematian.penyebabMeninggal}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Usia Saat Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="number"
                  name="usia"
                  value={editingKematian.usia}
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
            <Button variant="primary" onClick={() => updateKematian(editingKematian.kematianId)}>
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
    <CModalTitle>Tambah Data Surat Kematian</CModalTitle>
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
            value={newKematian.userId}
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
                Nama Almarhum
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="namaAlmarhum"
                  value={newKematian.namaAlmarhum}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Tanggal Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="tanggalMeninggal"
                  value={newKematian.tanggalMeninggal}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jam Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="jamMeninggal"
                  value={newKematian.jamMeninggal}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Lokasi Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="lokasiMeninggal"
                  value={newKematian.lokasiMeninggal}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Penyebab Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="penyebabMeninggal"
                  value={newKematian.penyebabMeninggal}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Usia Saat Meninggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="number"
                  name="usia"
                  value={newKematian.usia}
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
        <Button variant="primary" onClick={createKematian}>
        Tambah
      </Button>{' '}
      <Button variant="danger" onClick={closeAdd}>Cancel</Button>
    </CModalFooter>
  </Form>
</CModal>

    </CRow>
  );
};

export default SuratKematian;
