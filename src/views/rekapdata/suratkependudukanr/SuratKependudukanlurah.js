/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contractkependudukan from 'src/views/suratkependudukan/contracts/contractkependudukan';
import contractkependudukanlurah from 'src/views/suratkependudukan/contracts/contractkependudukanlurah';
import Web3 from 'web3';
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
  cilCloudDownload,
} from '@coreui/icons';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import contract from 'src/views/pengguna/contracts/contract';
import axios from 'axios';
import api from 'src/api';
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

const SuratKependudukanr = () => {

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Center the title and add some space
    const title = 'Data Kependudukan';
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = (pageWidth - titleWidth) / 2;
    doc.text(title, marginLeft, 10);

    const data = kependudukanlurahs.map((kependudukanlurah, index) => {
      const selectedUser = users.find((user) => user.username === kependudukanlurah.userId);

      if (!selectedUser) {
        return null; // Skip data if user not found for this kependudukan
      }

      return [
        index + 1,
        selectedUser.nik,
        selectedUser.fullName,
        selectedUser.birthDate,
        selectedUser.gender,
        selectedUser.religion,
        selectedUser.occupation,
        selectedUser.alamat,
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
      head: [['No.', 'NIK', 'Nama Lengkap', 'Tanggal Lahir', 'Jenis Kelamin', 'Agama', 'Pekerjaan', 'Alamat']],
      body: data.filter((row) => row !== null),
      ...tableOptions,
    });

    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, 'data_kependudukan.pdf');
  };
  
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
  const [kependudukans, setKependudukans] = useState([]);
  const [kependudukanlurahs, setKependudukanlurahs] = useState([]);
  const [newKependudukan, setNewKependudukan] = useState({
    userId: '', // Add default values for all fields
    letterNumber: '',
  });
  const [newKependudukanlurah, setNewKependudukanlurah] = useState({
    userId: '', // Add default values for all fields
    noSurat: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [fileName, setFileName] = useState('');
  const [editingKependudukan, setEditingKependudukan] = useState(null);
  const [nik, setNIK] = useState(newKependudukan.nik); // State untuk menyimpan NIK
  const [kkNumber, setKKNumber] = useState(newKependudukan.kkNumber); // State untuk menyimpan KK Number
  const [fullName, setFullName] = useState(newKependudukan.fullName);
  const [birthDate, setBirthDate] = useState(newKependudukan.birthDate);
  const [gender, setGender] = useState(newKependudukan.gender);
  const [religion, setReligion] = useState(newKependudukan.religion);
  const [nationality, setNationality] = useState(newKependudukan.nationality);
  const [educationStatus, setEducationStatus] = useState(newKependudukan.educationStatus);
  const [maritalStatus, setMaritalStatus] = useState(newKependudukan.maritalStatus);
  const [occupation, setOccupation] = useState(newKependudukan.occupation);
  const [alamat, setAlamat] = useState(newKependudukan.alamat);
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
    getKependudukans();
    getKependudukanlurahs();
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

  const getKependudukans = async () => {
    try {
      setIsLoading(true);
      const totalKependudukans = await contractkependudukan.methods.totalKependudukans().call();
      const kependudukansArray = [];

      for (let i = 1; i <= totalKependudukans; i++) {
        const kependudukan = await contractkependudukan.methods.getKependudukan(i).call();
        if (kependudukan.userId !== '') {
          kependudukansArray.push(kependudukan);
        }
      }

      setKependudukans(kependudukansArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getKependudukanlurahs = async () => {
    try {
      setIsLoading(true);
      const totalKependudukanlurahs = await contractkependudukanlurah.methods.totalKependudukanlurahs().call();
      const kependudukanlurahsArray = [];

      for (let i = 1; i <= totalKependudukanlurahs; i++) {
        const kependudukanlurah = await contractkependudukanlurah.methods.getKependudukanlurah(i).call();
        if (kependudukanlurah.userId !== '') {
          kependudukanlurahsArray.push(kependudukanlurah);
        }
      }

      setKependudukanlurahs(kependudukanlurahsArray);
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
        setNewKependudukan({
          ...newKependudukan,
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

        // Set NIK and KK Number based on selected user
        setNIK(selectedUser.nik);
        setKKNumber(selectedUser.kkNumber);
        setFullName(selectedUser.fullName);
        setBirthDate(selectedUser.birthDate);
        setGender(selectedUser.gender);
        setReligion(selectedUser.religion);
        setNationality(selectedUser.nationality);
        setEducationStatus(selectedUser.educationStatus);
        setMaritalStatus(selectedUser.maritalStatus);
        setOccupation(selectedUser.occupation);
        setAlamat(selectedUser.alamat);
      }
    } else {
      setNewKependudukan((prevState) => ({
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
        setEditingKependudukan({
          ...editingKependudukan,
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
        setNIK(selectedUser.nik);
        setKKNumber(selectedUser.kkNumber);
        setFullName(selectedUser.fullName);
        setBirthDate(selectedUser.birthDate);
        setGender(selectedUser.gender);
        setReligion(selectedUser.religion);
        setNationality(selectedUser.nationality);
        setEducationStatus(selectedUser.educationStatus);
        setMaritalStatus(selectedUser.maritalStatus);
        setOccupation(selectedUser.occupation);
        setAlamat(selectedUser.alamat);
      }
    } else {
      setEditingKependudukan((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  const handleInputChangelurah = (event) => {
    const { name, value } = event.target;
    setNewKependudukanlurah((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createKependudukanlurah = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const kependudukanlurahCount = await contractkependudukanlurah.methods.totalKependudukanlurahs().call();
      const kependudukanlurahId = parseInt(kependudukanlurahCount) + 1;
      const kependudukanlurahWithId = {
        ...newKependudukanlurah,
        kependudukanlurahId: kependudukanlurahId.toString(),
      };
      await contractkependudukanlurah.methods.createKependudukanlurah(kependudukanlurahWithId).send({ from: accounts[0] });
      toggleData(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createKependudukan = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const kependudukanCount = await contractkependudukan.methods.totalKependudukans().call();
      const kependudukanId = parseInt(kependudukanCount) + 1;
      const kependudukanWithId = {
        ...newKependudukan,
        kependudukanId: kependudukanId.toString(),
        letterNumber: letterNumberFileName, // Use the filename for letterNumber
      };
      await contractkependudukan.methods.createKependudukan(kependudukanWithId).send({ from: accounts[0] });
      api.post('/api/surat', kependudukanWithId);
      await getKependudukans();
      setNewKependudukan({
        userId: '', // Reset the state after successful creation
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

  const updateKependudukan = async (kependudukanId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();

      // If a new file was selected for aktaNotaris or letterNumber, upload it and get the filename
      let updatedKependudukan = { ...editingKependudukan };

      if (typeof editingKependudukan.letterNumber === 'object') {
        // Save the updated file in the state directly for later use
        const formDataLetterNumber = new FormData();
        formDataLetterNumber.append('letterNumber', editingKependudukan.letterNumber);
        const responseLetterNumber = await axios.post(`${backendURL}/api/upload`, formDataLetterNumber, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedKependudukan.letterNumber = responseLetterNumber.data.filename; // Use the filename returned from the server
      } else {
        updatedKependudukan.letterNumber = letterNumberFileName; // Use the existing filename if not changed
      }

      await contractkependudukan.methods
        .updateKependudukan(kependudukanId, updatedKependudukan)
        .send({ from: accounts[0] });

        setSelectedFile(null);
        setEditingKependudukan(null);
        setShowModal(false);
      await getKependudukans(); // Refresh the user list after updating the user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteKependudukan = async (kependudukanId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      await contractkependudukan.methods.deleteKependudukan(kependudukans[kependudukanId].kependudukanId).send({ from: accounts[0] });
      await getKependudukans();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredKependudukans = kependudukans.filter((kependudukan) => {
    const selectedUser = users.find((user) => user.username === kependudukan.userId);

    if (!selectedUser) {
      return false; // Skip this kependudukan if user not found
    }

    // You can adjust the properties you want to search in here
    const userFullName = selectedUser.fullName.toLowerCase();
    const userNik = selectedUser.nik.toLowerCase();
    const userGender = selectedUser.gender.toLowerCase();
    const userReligion = selectedUser.religion.toLowerCase();

    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      userFullName.includes(searchTermLowerCase) ||
      userNik.includes(searchTermLowerCase) ||
      userGender.includes(searchTermLowerCase) ||
      userReligion.includes(searchTermLowerCase)
    );
  });

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Rekap Data Surat Kependudukan</strong>
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
              <CTableHead style={{ backgroundColor: 'grey', color: 'white', fontSize: '16px' }}>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No.</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Username</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>NIK</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No KK</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Lengkap</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Tanggal Lahir</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Kelamin</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Agama</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Kewarga negaraan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Status Pendidikan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Status Perkawinan</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Pekerjaan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Alamat</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Alamat</CTableHeaderCell> */}
                  
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell>
                   */}
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Action</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle" }}>
                {filteredKependudukans.map((kependudukanlurah, index) => {
                  const selectedUser = users.find((user) => user.username === kependudukanlurah.userId);

                  if (!selectedUser) {
                    return null; // Skip rendering if user not found for this kependudukan
                  }

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{kependudukan.userId}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.nik}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.kkNumber}</CTableDataCell> */}
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.fullName}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.birthDate}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.gender}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.religion}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.occupation}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{selectedUser.alamat}</CTableDataCell>
                      {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.nationality}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.educationStatus}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.maritalStatus}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.occupation}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.alamat}</CTableDataCell> */}
                      
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
          <CModalTitle>Edit Data Surat Kependudukan</CModalTitle>
        </CModalHeader>
        {editingKependudukan && (
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
                  value={editingKependudukan.userId}
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
            <Button variant="primary" onClick={() => updateKependudukan(editingKependudukan.kependudukanId)}>
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
    <CModalTitle>Tambah Data Surat Kependudukan</CModalTitle>
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
            value={newKependudukan.userId}
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
      <Button variant="primary" onClick={createKependudukan}>
        Tambah
      </Button>{' '}
      <Button variant="danger" onClick={closeAdd}>Cancel</Button>
    </CModalFooter>
  </Form>
</CModal>

    </CRow>
  );
};

export default SuratKependudukanr;
