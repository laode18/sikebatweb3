/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contract from 'src/views/pengguna/contracts/contract';
import Web3 from 'web3';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import contractdomisiliperusahaan from 'src/views/suratdomisiliperusahaan/contracts/contractdomisiliperusahaan';
import contractdomisiliperusahaanlurah from 'src/views/suratdomisiliperusahaan/contracts/contractdomisiliperusahaanlurah';
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
  cilCloudDownload,
} from '@coreui/icons';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
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


const SuratDomisiliperusahaanr = () => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Center the title and add some space
    const title = 'Data Domisili Perusahaan'
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = (pageWidth - titleWidth) / 2;
    doc.text(title, marginLeft, 10);

    const data = domisiliperusahaanlurahs.map((domisiliperusahaanlurah, index) => {
      const selectedUser = users.find((user) => user.username === domisiliperusahaanlurah.userId);

      if (!selectedUser) {
        return null; // Skip data if user not found for this kependudukan
      }

      return [
        index + 1,
        selectedUser.nik,
        selectedUser.fullName,
        selectedUser.gender,
        domisiliperusahaanlurah.namaPerusahaan,
        domisiliperusahaanlurah.jenisPerusahaan,
        domisiliperusahaanlurah.jamKerja,
        domisiliperusahaanlurah.alamatPerusahaan,
      ];
    });

    const tableOptions = {
      headStyles: {
        valign: 'middle', // Align header vertically to middle
        halign: 'center', // Align header horizontally to center
      },
      bodyStyles: {
        valign: 'middle', // Align content vertically to middle
        halign: 'center', // Align content horizontally to center
      },
      theme: 'grid', // Add grid lines
    };

    doc.autoTable({
      head: [['No.', 'NIK', 'Nama Pemilik', 'Jenis Kelamin', 'Nama Perusahaan', 'Jenis Perusahaan', 'Jam Kerja', 'Alamat']],
      body: data.filter((row) => row !== null),
      ...tableOptions,
    });

    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, 'data_domisiliperusahaan.pdf');
  };

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
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [editingDomisiliperusahaan, setEditingDomisiliperusahaan] = useState(null);
  const [letterNumberFileName, setLetterNumberFileName] = useState('');
  const backendURL = 'http://localhost:5000';
  const [showFile, setShowFile] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [aktaNotarisFileName, setAktaNotarisFileName] = useState('');

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

  const getDomisiliperusahaanlurahs = async () => {
    try {
      setIsLoading(true);
      const totalDomisiliperusahaanlurahs = await contractdomisiliperusahaanlurah.methods.totalDomisiliperusahaanlurahs().call();
      const domisiliperusahaanlurahsArray = [];

      for (let i = 1; i <= totalDomisiliperusahaanlurahs; i++) {
        const domisiliperusahaanlurah = await contractdomisiliperusahaanlurah.methods.getDomisiliperusahaanlurah(i).call();
        if (domisiliperusahaanlurah.userId !== '') {
          domisiliperusahaanlurahsArray.push(domisiliperusahaanlurah);
        }
      }

      setDomisiliperusahaanlurahs(domisiliperusahaanlurahsArray);
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
            <strong>Rekap Data Surat Domisili Perusahaan</strong>
          </CCardHeader>
          <br />
          <Button variant='primary' style={{ width: 130, marginLeft: 16 }} onClick={handleDownloadPDF}><CIcon icon={cilCloudDownload} style={{ color: 'white', filter: 'drop-shadow(0px 0px 5px black)' }} />&nbsp;
          Download</Button>
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
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Pemilik</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Kelamin</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Perusahaan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Perusahaan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jam Kerja</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Alamat Perusahaan</CTableHeaderCell>
                  
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell>
                   */}
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle"  }}>
                {filteredDomisiliperusahaans.map((domisiliperusahaanlurah, index) => {
                  const selectedUser = users.find((user) => user.username === domisiliperusahaanlurah.userId);

                  if (!selectedUser) {
                    return null; // Skip rendering if user not found for this kependudukan
                  }

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{domisiliperusahaan.userId}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.nik}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.fullName}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.gender}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{domisiliperusahaanlurah.namaPerusahaan}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{domisiliperusahaanlurah.jenisPerusahaan}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{domisiliperusahaanlurah.jamKerja}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{domisiliperusahaanlurah.alamatPerusahaan}</CTableDataCell>
                     
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

export default SuratDomisiliperusahaanr;
