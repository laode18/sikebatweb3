/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contractkematian from 'src/views/suratkematian/contracts/contractkematian';
import contractkematianlurah from 'src/views/suratkematian/contracts/contractkematianlurah';
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
  cilCloudDownload,
  cilFile,
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
  const codeSurat = 'Pem'; 

  const nomorSurat = `${month}/${codeSurat}/${year}`;
  return nomorSurat;
};

const SuratKematianr = () => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Center the title and add some space
    const title = 'Data Kematian'
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = (pageWidth - titleWidth) / 2;
    doc.text(title, marginLeft, 10);

    const data = kematianlurahs.map((kematianlurah, index) => {
      const selectedUser = users.find((user) => user.username === kematianlurah.userId);

      if (!selectedUser) {
        return null; // Skip data if user not found for this kependudukan
      }

      return [
        index + 1,
        selectedUser.nik,
        kematianlurah.namaAlmarhum, 
        selectedUser.gender,
        selectedUser.religion,
        kematianlurah.tanggalMeninggal,
        kematianlurah.lokasiMeninggal,
        kematianlurah.penyebabMeninggal,
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
      head: [['No.', 'NIK', 'Nama Almarhum', 'Jenis Kelamin', 'Agama', 'Tanggal Meninggal', 'Lokasi Meninggal', 'Penyebab Meninggal']],
      body: data.filter((row) => row !== null),
      ...tableOptions,
    });

    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, 'data_kematian.pdf');
  };

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
  const [showImages, setShowImages] = useState(false); // State untuk mengontrol tampilan gambar

  const handleTTDStempelClick = () => {
    setShowImages(true); // Set state menjadi true ketika tombol ditekan
  };

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

  const getKematianlurahs = async () => {
    try {
      setIsLoading(true);
      const totalKematianlurahs = await contractkematianlurah.methods.totalKematianlurahs().call();
      const kematianlurahsArray = [];

      for (let i = 1; i <= totalKematianlurahs; i++) {
        const kematianlurah = await contractkematianlurah.methods.getKematianlurah(i).call();
        if (kematianlurah.userId !== '') {
          kematianlurahsArray.push(kematianlurah);
        }
      }

      setKematianlurahs(kematianlurahsArray);
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
            <strong>Rekap Data Surat Kematian</strong>
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
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No KK</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Almarhum</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Kelamin</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Agama</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Tanggal Meninggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Lokasi Meninggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Penyebab Meninggal</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jam Meninggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Lokasi Meninggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Penyebab Meninggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Usia Saat Meninggal</CTableHeaderCell> */}
                  
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell>
                   */}
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle" }}>
                {filteredKematians.map((kematianlurah, index) => {
                  const selectedUser = users.find((user) => user.username === kematianlurah.userId);

                  if (!selectedUser) {
                    return null; // Skip rendering if user not found for this kependudukan
                  }

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.userId}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.nik}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{selectedUser.kkNumber}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kematianlurah.namaAlmarhum}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.gender}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.religion}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kematianlurah.tanggalMeninggal}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kematianlurah.lokasiMeninggal}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kematianlurah.penyebabMeninggal}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.jamMeninggal}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.lokasiMeninggal}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.penyebabMeninggal}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kematian.usia}</CTableDataCell> */}

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

export default SuratKematianr;
