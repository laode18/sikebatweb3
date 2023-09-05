/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import contract from './contracts/contract';
import Web3 from 'web3';
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
  cilBullhorn,
  cilTrash,
  cilPencil,
  cilPlus,
  cilEyedropper,
  cilFile,
} from '@coreui/icons';
import { Button, Form, Row, Col } from 'react-bootstrap';
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

const Pengguna = () => {
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

  const toggleData = () => {
    setShowData(!showData);
  };

  const closeData = () => {
    setShowData(false);
  };

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [editingUser, setEditingUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
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
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const totalUsers = await contract.methods.totalUsers().call();
      const usersArray = [];

      for (let i = 1; i <= totalUsers; i++) {
        const user = await contract.methods.getUser(i).call();
        if (user.username !== "") {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditingUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createUser = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();

      const usernameExists = users.some(user => user.username === newUser.username);
      if (usernameExists) {
        console.error("Username already exists");
        alert("Username already exists");
        setIsLoading(false);
        return;
      }

      const userCount = await contract.methods.totalUsers().call();
      const userId = parseInt(userCount) + 1;
      const userWithId = { ...newUser, userId: userId.toString() };
      await contract.methods.createUser(userWithId).send({ from: accounts[0] });
      setNewUser({});
      setShowAdd(false);
      await getUsers(); // Refresh the user list after creating a new user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUser = async (userId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const userToUpdate = users.find((user) => user.userId === userId.toString());
      
      const updatedUser = {
        ...userToUpdate,
        ...editingUser
      };
  
      await contract.methods.updateUser(userId, updatedUser).send({ from: accounts[0] });
      setEditingUser({});
      setShowModal(false);
      await getUsers(); // Refresh the user list after updating the user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const deleteUser = async (userId) => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      await contract.methods.deleteUser(users[userId].userId).send({ from: accounts[0] }); // Menggunakan akun pertama sebagai pengirim transaksi
      await getUsers();
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
            <strong>Data Pengguna</strong>
          </CCardHeader>
          <br />
          <Button variant='primary' style={{ width: 100, marginLeft: 16 }} onClick={toggleAdd}><CIcon icon={cilPlus} style={{ color: 'white', filter: 'drop-shadow(0px 0px 1px black)' }} />
           Tambah
          </Button>
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
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Username</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Password</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Id Wallet</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>NIK</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No KK</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Lengkap</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Tanggal Lahir</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Jenis Kelamin</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Agama</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Kewarga negaraan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Status Pendidikan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Status Perkawinan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Pekerjaan</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Alamat</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle"}}>
              {currentUsers.map((user, index) => (
                // eslint-disable-next-line react/jsx-key
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.username}</CTableDataCell>
                  {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.password}</CTableDataCell>
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.walletId}</CTableDataCell> */}
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.nik}</CTableDataCell>
                  {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.kkNumber}</CTableDataCell> */}
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.fullName}</CTableDataCell>
                  {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.birthDate}</CTableDataCell> */}
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.gender}</CTableDataCell>
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.religion}</CTableDataCell>
                  {/* <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.nationality}</CTableDataCell>
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.educationStatus}</CTableDataCell>
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.maritalStatus}</CTableDataCell>
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.occupation}</CTableDataCell>
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{user.alamat}</CTableDataCell> */}
                  <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                    <Button variant="warning" style={{ marginRight: '8px' }} onClick={() => {
                        toggleModal();
                        setEditingUser(user);
                    }}><CIcon icon={cilPencil} style={{ color: 'white' }} /></Button>
                    <Button style={{ marginRight: '8px' }} variant="danger" onClick={() => deleteUser(index)}><CIcon icon={cilTrash} style={{ color: 'white' }} /></Button>
                    <Button variant="secondary" onClick={() => {
                        toggleData();
                        setEditingUser(user);
                    }}><CIcon icon={cilFile} style={{ color: 'white' }} />
                    </Button>
                  </CTableDataCell>
                </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            )}
            {/* Pagination */}
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
          <CModalTitle>Edit Pengguna</CModalTitle>
        </CModalHeader>
        {editingUser.username !== undefined && (
        <div>
        <Form>
        <CModalBody>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Username
              </Form.Label>
              <Col sm="8.5">
                  <Form.Control
                    type="text"
                    name="username"
                    value={editingUser.username}
                    onChange={handleEditInputChange}
                    onBlur={() => {
                      if (editingUser.username.trim() === '') {
                        setIsUsernameValid(true);
                        return;
                      }
                      const isExistingUsername = users.some(
                        (user) =>
                          user.username === editingUser.username &&
                          user.userId !== editingUser.userId
                      );
                      setIsUsernameValid(!isExistingUsername);
                    }}
                    isInvalid={!isUsernameValid} // Step 2
                  />
                  <Form.Control.Feedback type="invalid">
                    Username already exists.
                  </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Password
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="password"
                  name="password"
                  value={editingUser.password}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                ID Wallet
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="walletId"
                  value={editingUser.walletId}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nomor Induk Kependudukan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="nik"
                  value={editingUser.nik}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nomor Kartu Keluarga
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="kkNumber"
                  value={editingUser.kkNumber}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nama Lengkap
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="fullName"
                  value={editingUser.fullName}
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
                  name="birthDate"
                  value={editingUser.birthDate}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jenis Kelamin
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="gender"
                  value={editingUser.gender}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Agama
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="religion"
                  value={editingUser.religion}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Kewarganegaraan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="nationality"
                  value={editingUser.nationality}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Status Pendidikan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="educationStatus"
                  value={editingUser.educationStatus}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Status Perkawinan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="maritalStatus"
                  value={editingUser.maritalStatus}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Pekerjaan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="occupation"
                  value={editingUser.occupation}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alamat
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                  type="text"
                  name="alamat"
                  value={editingUser.alamat}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            {/* Add more form inputs for other user fields */}
            
        </CModalBody>
        <CModalFooter>
        <Button
                variant="primary"
                onClick={() => updateUser(editingUser.userId)}
                disabled={!isUsernameValid} // Step 3
              >
                Simpan
              </Button>
          <Button variant="danger" onClick={closeModal}>Cancel</Button>
        </CModalFooter>
        </Form>
        </div>
        )}
      </CModal>

      {/* Tambah Data */}
      <CModal visible={showAdd} onClose={closeAdd} centered size='md'>
        <CModalHeader closeButton>
          <CModalTitle>Tambah Pengguna</CModalTitle>
        </CModalHeader>
        <Form>
        <CModalBody>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Username
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="username" value={newUser.username || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Password
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="password" name="password" value={newUser.password || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            ID Wallet
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="walletId" value={newUser.walletId || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Nomor Induk Kependudukan
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="nik" value={newUser.nik || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Nomor Kartu Keluarga
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="kkNumber" value={newUser.kkNumber || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Nama Lengkap
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="fullName" value={newUser.fullName || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Tanggal Lahir
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="date" name="birthDate" value={newUser.birthDate || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
        <Form.Label column sm="3.5">
          Jenis Kelamin
        </Form.Label>
        <Col sm="8.5" className="position-relative">
          <Form.Control as="select" name="gender" value={newUser.gender || ''} onChange={handleInputChange}>
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </Form.Control>
          <FontAwesomeIcon icon={faChevronDown} className="position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)' }} />
        </Col>
      </Form.Group>
        {/* <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Jenis Kelamin
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="gender" value={newUser.gender || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group> */}
        {/* <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Agama
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="religion" value={newUser.religion || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group> */}
        <Form.Group as={Row}>
        <Form.Label column sm="3.5">
          Agama
        </Form.Label>
        <Col sm="8.5" className="position-relative">
          <Form.Control as="select" name="religion" value={newUser.religion || ''} onChange={handleInputChange} >
            <option value="">Pilih Agama</option>
            <option value="Islam">Islam</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
            <option value="Kristen Katolik">Kristen Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Khonghucu">Khonghucu</option>
          </Form.Control>
          <FontAwesomeIcon icon={faChevronDown} className="position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)' }} />
        </Col>
      </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Kewarganegaraan
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="nationality" value={newUser.nationality || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Status Pendidikan
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="educationStatus" value={newUser.educationStatus || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        {/* <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Status Perkawinan
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="maritalStatus" value={newUser.maritalStatus || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group> */}
        <Form.Group as={Row}>
        <Form.Label column sm="3.5">
          Status Perkawinan
        </Form.Label>
        <Col sm="8.5" className="position-relative">
          <Form.Control as="select" name="maritalStatus" value={newUser.maritalStatus || ''} onChange={handleInputChange} >
            <option value="">Pilih Status Perkawinan</option>
            <option value="Belum Kawin">Belum Kawin</option>
            <option value="Kawin">Kawin</option>
            <option value="Cerai Hidup">Cerai Hidup</option>
            <option value="Cerai Mati">Cerai Mati</option>
          </Form.Control>
          <FontAwesomeIcon icon={faChevronDown} className="position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)' }} />
        </Col>
      </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Pekerjaan
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="occupation" value={newUser.occupation || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3.5">
            Alamat
          </Form.Label>
          <Col sm="8.5">
            <Form.Control type="text" name="alamat" value={newUser.alamat || ''} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        {/* Add more form inputs for other user fields */}
        
        </CModalBody>
        <CModalFooter>
        <Button variant="primary" onClick={createUser}>
          Tambah
        </Button>{' '}
          <Button variant="danger" onClick={closeAdd}>Cancel</Button>
        </CModalFooter>
        </Form>
      </CModal>

      {/* Show Data */}
      {editingUser.username !== undefined && (
      // eslint-disable-next-line react/jsx-key
      <CModal visible={showData} onClose={closeData} centered size='md'>
        <CModalHeader closeButton>
          <CModalTitle>Show Pengguna</CModalTitle>
        </CModalHeader>
        <Form>
        <CModalBody>
        <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Username
              </Form.Label>
              <Col sm="8.5">
                  <Form.Control
                  disabled
                    type="text"
                    name="username"
                    value={editingUser.username}
                    onChange={handleEditInputChange}
                    onBlur={() => {
                      if (editingUser.username.trim() === '') {
                        setIsUsernameValid(true);
                        return;
                      }
                      const isExistingUsername = users.some(
                        (user) =>
                          user.username === editingUser.username &&
                          user.userId !== editingUser.userId
                      );
                      setIsUsernameValid(!isExistingUsername);
                    }}
                    isInvalid={!isUsernameValid} // Step 2
                  />
                  <Form.Control.Feedback type="invalid">
                    Username already exists.
                  </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Password
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="password"
                  name="password"
                  value={editingUser.password}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                ID Wallet
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="walletId"
                  value={editingUser.walletId}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nomor Induk Kependudukan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="nik"
                  value={editingUser.nik}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nomor Kartu Keluarga
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="kkNumber"
                  value={editingUser.kkNumber}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Nama Lengkap
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="fullName"
                  value={editingUser.fullName}
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
                 disabled
                  type="text"
                  name="birthDate"
                  value={editingUser.birthDate}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Jenis Kelamin
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="gender"
                  value={editingUser.gender}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Agama
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="religion"
                  value={editingUser.religion}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Kewarganegaraan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="nationality"
                  value={editingUser.nationality}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Status Pendidikan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="educationStatus"
                  value={editingUser.educationStatus}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Status Perkawinan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="maritalStatus"
                  value={editingUser.maritalStatus}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Pekerjaan
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="occupation"
                  value={editingUser.occupation}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3.5">
                Alamat
              </Form.Label>
              <Col sm="8.5">
                <Form.Control
                 disabled
                  type="text"
                  name="alamat"
                  value={editingUser.alamat}
                  onChange={handleEditInputChange}
                />
              </Col>
            </Form.Group>
        {/* Add more form inputs for other user fields */}
        
        </CModalBody>
        <CModalFooter>
          <Button variant="secondary" onClick={closeData}>Close</Button>
        </CModalFooter>
        </Form>
      </CModal>
      )}
    </CRow>
  );
};

export default Pengguna;
