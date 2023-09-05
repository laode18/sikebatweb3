/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contract from 'src/views/pengguna/contracts/contract';
import Web3 from 'web3';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import contractinformasi from './contracts/contractinformasi';
import axios from 'axios';
import api from 'src/api';
import CIcon from '@coreui/icons-react';
import {
  cilBullhorn,
  cilTrash,
  cilPencil,
  cilPlus,
} from '@coreui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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

const Informasi = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

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

  const [informasis, setInformasis] = useState([]);
  const [newInformasi, setNewInformasi] = useState({
    judul: '', // Add default values for all fields
    tanggal: '',
    sumber: '',
    gambar: '',
    isiInformasi: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [editingInformasi, setEditingInformasi] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [gambarFileName, setGambarFileName] = useState('');
  const backendURL = 'http://localhost:5000';

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

  useEffect(() => {
    getInformasis();
  }, []);

  const getInformasis = async () => {
    try {
      setIsLoading(true);
      const totalInformasis = await contractinformasi.methods.totalInformasis().call();
      const informasisArray = [];

      for (let i = 1; i <= totalInformasis; i++) {
        const informasi = await contractinformasi.methods.getInformasi(i).call();
        if (informasi.judul !== '') {
          informasisArray.push(informasi);
        }
      }

      setInformasis(informasisArray);
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
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (!allowedTypes.includes(file.type)) {
    alert('File must be in JPG, JPEG, or PNG format.');
    return;
  }

  // Move file upload logic to a separate function
  uploadFile(name, file);

    } else {
      setNewInformasi((prevState) => ({
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
        if (name === 'gambar') {
          setGambarFileName(response.data.filename);
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
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (!allowedTypes.includes(file.type)) {
    alert('File must be in JPG, JPEG, or PNG format.');
    return;
  }

  // Move file upload logic to a separate function
  uploadFile(name, file);

    } else {
      setEditingInformasi((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const createInformasi = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const informasiCount = await contractinformasi.methods.totalInformasis().call();
      const informasiId = parseInt(informasiCount) + 1;
      const informasiWithId = {
        ...newInformasi,
        informasiId: informasiId.toString(),
        gambar: gambarFileName, // Use the filename for letterNumber
      };
      await contractinformasi.methods.createInformasi(informasiWithId).send({ from: accounts[0] });
      api.post('/api/surat', informasiWithId);
      await getInformasis();
      setNewInformasi({
        judul: '', // Reset the state after successful creation
        tanggal: '',
        sumber: '',
        gambar: null,
        isiInformasi: '', // Reset the letterNumber state after successful creation
      });
      setGambarFileName(null); // Reset the filename state after successful creation
      setShowAdd(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };  

  const updateInformasi = async (informasiId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();

      // If a new file was selected for aktaNotaris or letterNumber, upload it and get the filename
      let updatedInformasi = { ...editingInformasi };

      if (typeof editingInformasi.gambar === 'object') {
        // Save the updated file in the state directly for later use
        const formDataGambar = new FormData();
        formDataGambar.append('gambar', editingInformasi.gambar);
        const responseLetterNumber = await axios.post(`${backendURL}/api/upload`, formDataGambar, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedInformasi.gambar = responseLetterNumber.data.filename; // Use the filename returned from the server
      } else {
        updatedInformasi.gambar = gambarFileName; // Use the existing filename if not changed
      }

      await contractinformasi.methods
        .updateInformasi(informasiId, updatedInformasi)
        .send({ from: accounts[0] });

        setSelectedFile(null);
        setEditingInformasi(null);
        setShowModal(false);
      await getInformasis(); // Refresh the user list after updating the user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInformasi = async (informasiId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      await contractinformasi.methods.deleteInformasi(informasis[informasiId].informasiId).send({ from: accounts[0] });
      await getInformasis();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Data Informasi</strong>
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
              <CTableHead style={{ backgroundColor: 'grey', color: 'white', fontSize: '16px' }}>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Judul</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Tanggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Sumber</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Isi Informasi</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Gambar</CTableHeaderCell>
                  
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell>
                   */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', verticalAlign: "middle" }}>
                {informasis.map((informasi, index) => {

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{informasi.judul}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{informasi.tanggal}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{informasi.sumber}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{informasi.isiInformasi}</CTableDataCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                        <img
                            className="img"
                            src={`http://localhost:5000/api/uploads/${informasi.gambar}`}
                            alt=""
                            style={{ width: '250px', height: '150px' }}
                        />
                        </CTableDataCell>

                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                        <Button variant="warning" style={{ marginBottom: '8px' }} onClick={() => {
                          toggleModal();
                          setEditingInformasi(informasi);
                        }}><CIcon icon={cilPencil} style={{ color: 'white' }} /></Button><br />
                        <Button variant="danger" onClick={() => deleteInformasi(index)}><CIcon icon={cilTrash} style={{ color: 'white' }} /></Button>
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
          <CModalTitle>Edit Data Informasi</CModalTitle>
        </CModalHeader>
        {editingInformasi && (
        <div>
        <Form>
        <CModalBody>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Judul Informasi
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="judul"
                  value={editingInformasi.judul}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Tanggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="tanggal"
                  value={editingInformasi.tanggal}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Sumber
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="sumber"
                  value={editingInformasi.sumber}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Isi Informasi
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="isiInformasi"
                  value={editingInformasi.isiInformasi}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            
              {/* Add more form inputs for other user fields */}
              <Form.Group as={Row}>
              <Form.Label column sm="3.5" htmlFor="letterNumber">
                Gambar:
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="file"
                  accept="image/jpeg, image/png, image/jpg" // Specify the accepted file type to PDF
                  name="gambar"
                  onChange={handleEditInputChange}
                  required
                />
                {gambarFileName && <p>Selected file Surat Keterangan RT: {gambarFileName}</p>}
              </Col>
            </Form.Group>
            
        </CModalBody>
        <CModalFooter>
            <Button variant="primary" onClick={() => updateInformasi(editingInformasi.informasiId)}>
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
    <CModalTitle>Tambah Data Informasi</CModalTitle>
  </CModalHeader>
  <Form>
    <CModalBody>
    <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Judul Informasi
          </Form.Label>
          <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="judul"
                  value={newInformasi.judul}
                  onChange={handleInputChange}
                />
              </Col>
        </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Tanggal
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="tanggal"
                  value={newInformasi.tanggal}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Sumber
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="sumber"
                  value={newInformasi.sumber}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Isi Informasi
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="isiInformasi"
                  value={newInformasi.isiInformasi}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
      
      {/* Add more form inputs for other user fields */}
      <Form.Group as={Row}>
        <Form.Label column sm="3.5" htmlFor="letterNumber">
          Gambar:
        </Form.Label>
        <Col sm="8.5">
          <Form.Control
            type="file"
            accept="image/jpeg, image/png, image/jpg" // Specify the accepted file type to PDF
            name="gambar"
            onChange={handleInputChange}
            required
          />
          {gambarFileName && <p>Selected file Surat Keterangan RT: {gambarFileName}</p>}
        </Col>
      </Form.Group>
      
    </CModalBody>
    <CModalFooter>
        <Button variant="primary" onClick={createInformasi}>
        Tambah
      </Button>{' '}
      <Button variant="danger" onClick={closeAdd}>Cancel</Button>
    </CModalFooter>
  </Form>
</CModal>

    </CRow>
  );
};

export default Informasi;
