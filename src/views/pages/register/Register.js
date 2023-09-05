/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CRow } from '@coreui/react'
import withAuth from 'src/authMiddleware'
import { useNavigate } from 'react-router-dom'
import contract from 'src/views/pengguna/contracts/contract'
import contractkependudukanuser from 'src/views/lurah/suratkependudukanlurah/contracts/contractkependudukanuser'
import {
  CCardHeader,
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
} from '@coreui/react';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import ttdImage from 'src/assets/ttd1.png'; // Pastikan ttd1.png ada di direktori yang sesuai
import stempelImage from 'src/assets/stempel.png';
import CIcon from '@coreui/icons-react';
import {
  cilCloudDownload,
  cilFile,
} from '@coreui/icons';
import logo from 'src/assets/logo.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const generateSuratNumber = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  
  // Simulasi contoh code surat (misalnya: A, B, C, ...)
  const codeSurat = 'Pem'; 

  const nomorSurat = `${month}/${codeSurat}/${year}`;
  return nomorSurat;
};

const Register = () => {
  const navigate = useNavigate()
  const walletId = localStorage.getItem('walletId')
  const [users, setUsers] = useState([])
  const [kependudukanusers, setKependudukanusers] = useState([])
  const [selectedData, setSelectedData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const toggleData = (user) => {
    setSelectedData(user);
  };

  const closeData = () => {
    setSelectedData(null);
  };

  useEffect(() => {
    getUsers()
    getKependudukanusers()
  }, [])

  const [nomorSurat, setNomorSurat] = useState('');

  useEffect(() => {
    const generatedNomorSurat = generateSuratNumber();
    setNomorSurat(generatedNomorSurat);
  }, []);

  const getUsers = async () => {
    try {
      setIsLoading(true)
      const totalUsers = await contract.methods.totalUsers().call()
      const usersArray = []

      for (let i = 1; i <= totalUsers; i++) {
        const user = await contract.methods.getUser(i).call()
        if (user.username !== '') {
          usersArray.push(user)
        }
      }

      setUsers(usersArray)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const getKependudukanusers = async () => {
    try {
      setIsLoading(true)
      const totalKependudukanusers = await contractkependudukanuser.methods
        .totalKependudukanusers()
        .call()
      const kependudukanusersArray = []

      for (let i = 1; i <= totalKependudukanusers; i++) {
        const kependudukanuser = await contractkependudukanuser.methods
          .getKependudukanuser(i)
          .call()
        if (kependudukanuser.userId !== '') {
          kependudukanusersArray.push(kependudukanuser)
        }
      }

      setKependudukanusers(kependudukanusersArray)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    // Perform sign-out logic here
    // For now, we'll just simulate a sign-out by redirecting back to the login page
    localStorage.removeItem('isLoggedIn')
    navigate('/login')
  }

  const printDiv = (elementId) => {
    const printingCss = document.getElementById('printing-css').value;
    const content = document.getElementById(elementId).innerHTML;

    const printFrame = window.frames['print_frame'];
    printFrame.document.title = document.title;
    printFrame.document.body.innerHTML = `<style>${printingCss}</style>${content}`;
    printFrame.window.focus();
    printFrame.window.print();
  };

  const createPDFfromHTML = () => {
    const halaman1 = document.getElementById('halaman1');
    const HTML_Width = halaman1.offsetWidth;
    const HTML_Height = halaman1.offsetHeight;
    const top_left_margin = 15;
    const PDF_Width = HTML_Width + top_left_margin * 2;
    const PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
    const canvas_image_width = HTML_Width;
    const canvas_image_height = HTML_Height;

    const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas(halaman1).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(
          imgData,
          'JPG',
          top_left_margin,
          -PDF_Height * i + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }
      pdf.save('surat_kependudukan.pdf');
    });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                    <h1 style={{ margin: 0 }}>Hallo User</h1>
                    <img
                      className="img"
                      src="/assets/hello.gif"
                      alt=""
                      style={{ width: 60, height: 60, marginLeft: '6px' }}
                    />
                  </div>
                  <p className="text-medium-emphasis" style={{ marginBottom: 20 }}>
                    Connected Wallet ID: {walletId}
                  </p>
                  <h4 style={{ textAlign: 'center', marginBottom: 30 }}>Cek Your Document</h4>
                  
                  <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Data Surat Kependudukan Lurah</strong>
          </CCardHeader>
          <br />
          <CCardBody>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <CTable style={{ marginTop: '10px', borderCollapse: 'collapse', width: '100%' }}>
              <CTableHead style={{ backgroundColor: 'grey', color: 'white', fontSize: '16px' }}>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nama Document</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ fontSize: '14px', textAlign: 'center', verticalAlign: "middle" }}>
              {kependudukanusers
                .filter((kependudukanuser) => kependudukanuser.walletId === walletId)
                .map((kependudukanuser, index) => {
                  const selectedUser = users.find((user) => user.username === kependudukanuser.userId);

                  if (!selectedUser) {
                    return null; // Skip rendering if user not found for this kependudukan
                  }

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}.</CTableHeaderCell>
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{kependudukanuser.namaDocument}</CTableDataCell>
                      
                      <CTableDataCell style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                        
                        <Button variant="secondary" onClick={() => {
                        toggleData(selectedUser);
                    }}><CIcon icon={cilFile} style={{ color: 'white' }} />
                    </Button>

                    <CModal visible={selectedData === selectedUser} onClose={closeData} centered style={{ width: '22cm', height: '34cm' }} size='lg'>
        <CModalHeader closeButton>
          <CModalTitle>Surat Keterangan Kependudukan</CModalTitle>
        </CModalHeader>
        <Form>
        <CModalBody>
      <div id="halaman1">
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
      <p style={{ margin: '5px 0', fontSize: '11pt', fontWeight: 'bold' }}>SURAT KETERANGAN KEPENDUDUKAN</p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>NOMOR : {String(index + 1).padStart(3, '0')}/{nomorSurat}</p>
    </div>
    <div style={{ marginTop: '50px', textAlign: 'left', paddingLeft: '120px' }}>
    <p style={{ margin: '5px 0', fontSize: '11pt', textIndent: '30px' }}>
      Lurah Cibabat Kecamatan Cimahi Utara Kota Cimahi, dengan ini menerangkan bahwa:
    </p>

    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td style={{ width: '30%', paddingBottom: '5px' }}>NIK</td>
          <td style={{ width: '2%' }}>:</td>
          <td style={{ width: '60%' }}>{selectedUser.nik}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px' }}>Nama</td>
          <td>:</td>
          <td>{selectedUser.fullName}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px' }}>Tempat, Tanggal Lahir</td>
          <td>:</td>
          <td> {selectedUser.birthDate}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px' }}>Jenis Kelamin</td>
          <td>:</td>
          <td>{selectedUser.gender}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px' }}>Kewarganegaraan</td>
          <td>:</td>
          <td>{selectedUser.nationality}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px' }}>Pekerjaan</td>
          <td>:</td>
          <td>{selectedUser.occupation}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px' }}>Status Perkawinan</td>
          <td>:</td>
          <td>{selectedUser.maritalStatus}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px' }}>Agama</td>
          <td>:</td>
          <td>{selectedUser.religion}</td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '5px' }}>Alamat</td>
          <td>:</td>
          <td>{selectedUser.alamat}</td>
        </tr>
      </tbody>
    </table>

          <p style={{ margin: '3px 0', fontSize: '11pt', marginRight: '100px', lineHeight: '25px', textAlign: 'justify', textIndent: '30px' }}>
        Berdasarkan Surat Keterangan dari RT 03 RW 14 No. 112 Tanggal 04 Januari 2023, 
        bahwa nama tersebut adalah benar penduduk kelurahan Cibabat Kecamatan Cimahi Utara dan sampai saat ini masih bertempat tinggal 
        dan berdomisili pada alamat tersebut.
      </p>
      <p style={{ margin: '3px 0', fontSize: '11pt', marginRight: '100px', lineHeight: '25px', textAlign: 'justify', textIndent: '30px' }}>
        Surat Keterangan ini dipergunakan sebagai identitas selama KTP yang bersangkutan 
        masih dalam proses pembuatan dan berlaku sampai dengan tanggal 04 Februari 2023.
      </p>
      <p style={{ margin: '3px 0', fontSize: '11pt', marginRight: '100px', lineHeight: '25px', textAlign: 'justify', textIndent: '30px' }}>
        Demikian Surat Keterangan ini diberikan untuk dipergunakan sebagaimana mestinya.
      </p>

    </div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '30px' }}>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div style={{ textAlign: 'center', paddingRight: '100px', marginLeft: '67%', position: 'relative' }}>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>Cibabat, 04 Januari 2023</p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}>a.n. Lurah Cibabat</p>
      <img src={ttdImage} alt="" style={{ width: '60%', height: '30%', position: 'absolute', top: '70px', left: '0' }} />
      <img src={stempelImage} alt="" style={{ width: '55%', height: '70%', position: 'absolute', top: '60px', left: '30px', opacity: 0.7 }} />
      <p style={{ margin: '5px 0', fontSize: '11pt', marginTop: '40px' }}><u><b>Faisal, S.Si, M.A.P</b></u></p>
      <p style={{ margin: '5px 0', fontSize: '11pt' }}><b>197512032009041001</b></p>
    </div>
    
    </div>
  </div>
  
  </center>
  </div>
        
        </CModalBody>
        <CModalFooter>
        <Button variant="primary" onClick={createPDFfromHTML}>
        <CIcon icon={cilCloudDownload} style={{ color: 'white' }} />&nbsp;
          Download
        </Button>
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
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>

                  <div className="d-grid">
                    <CButton
                      style={{
                        marginTop: 30,
                        width: '150px',
                        fontWeight: 500,
                        marginLeft: '33%',
                      }}
                      onClick={handleSignOut}
                      color="success"
                    >
                      Logout
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default withAuth(['user'])(Register)
// export default Register
