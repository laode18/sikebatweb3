import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import SimpleStorageuser from './contracts/SimpleStorageuser.json'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Modal from 'react-bootstrap/Modal' // Impor komponen modal
import Button from 'react-bootstrap/Button'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [walletId, setWalletId] = useState('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const [isConnecting, setIsConnecting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isButtonAnimating, setIsButtonAnimating] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    checkWalletConnection()
    // eslint-disable-next-line no-undef
    ethereum.on('accountsChanged', handleAccountChange)
    return () => {
      // eslint-disable-next-line no-undef
      ethereum.removeListener('accountsChanged', handleAccountChange)
    }
  }, [])

  const handleAccountChange = (accounts) => {
    if (accounts.length > 0) {
      setIsWalletConnected(true)
      formatWalletId(accounts[0])
    } else {
      setIsWalletConnected(false)
      setWalletId('')
    }
  }

  const formatWalletId = (address) => {
    if (address && address.length >= 6) {
      const shortenedAddress = address.slice(0, 5) + '.........' + address.slice(-3)
      setWalletId(shortenedAddress)
    } else {
      setWalletId('')
    }
  }

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
        const accounts = await window.web3.eth.getAccounts()
        if (accounts.length > 0) {
          setIsWalletConnected(true)
          formatWalletId(accounts[0])
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error)
      }
    } else {
      setIsWalletConnected(false)
      setErrorMessage('Please install MetaMask to connect.')
    }
  }

  const handleConnectMetamask = async () => {
    if (!isWalletConnected && !isConnecting) {
      setIsConnecting(true)
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          setIsConnecting(false)
          checkWalletConnection()
        } catch (error) {
          console.error('Error connecting to wallet:', error)
          setIsConnecting(false)
        }
      } else {
        setIsConnecting(false)
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }
  }

  const handleLogin = async () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first.')
      return
    }
    setLoading(true)
    setIsButtonAnimating(true)
    const accounts = await window.web3.eth.getAccounts()
    const userAddress = accounts[0]
    const contractAddress = '0x7c663f921607DA5108e1dAE8eBeF8d29aCc8d9e3'
    const contract = new window.web3.eth.Contract(SimpleStorageuser.abi, contractAddress)

    try {
      const userData = await contract.methods.getUserData().call({ from: userAddress })
      const storedPassword = userData[0]
      const userRole = userData[1]

      if (storedPassword === password) {
        setSuccess(true)
        setLoading(false)

        if (userRole === 'admin') {
          navigate('/dashboard')
        } else if (userRole === 'ketua') {
          navigate('/dashboardlurah')
        } else if (userRole === 'user') {
          navigate('/register')
        }
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userRole', userRole)
        localStorage.setItem('walletId', userAddress)
        setShowModal(true)
      } else {
        setErrorMessage('Invalid password. Please try again.')
        setLoading(false)
        setShowModal(true)
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('Error occurred during login. Please try again later.')
      setLoading(false)
      setShowModal(true)
    }
  }

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: '#e4b560' }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CCardGroup style={{ width: 500 }}>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <img
                        className="img"
                        src="/assets/logo.png"
                        alt=""
                        style={{ width: 60, height: 60, marginRight: '10px' }}
                      />
                      <h1>SIM Kelurahan</h1>
                    </div>
                    <p
                      className="text-medium-emphasis"
                      style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        marginTop: 20,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}
                    >
                      Login
                    </p>
                    <CRow>
                      <CCol xs={12} style={{ textAlign: 'center', marginBottom: 20 }}>
                        {isWalletConnected ? (
                          <p style={{ fontWeight: 500 }}>
                            <label style={{ fontWeight: 500 }}>Connected Wallet ID:</label>{' '}
                            {walletId}
                          </p>
                        ) : (
                          <button
                            onClick={handleConnectMetamask}
                            className={`btn ${isConnecting ? 'connecting' : ''}`}
                            style={{
                              backgroundColor: '#e4b560',
                              color: 'white',
                              fontWeight: 700,
                              width: 420,
                              height: '52px',
                            }}
                            disabled={isConnecting}
                          >
                            {isConnecting ? (
                              <div className="loading-effect">
                                <div className="loading-spinner" />
                              </div>
                            ) : (
                              <>
                                Connect Wallet
                                <img
                                  className="img"
                                  src="/assets/meta.gif"
                                  alt=""
                                  style={{ width: 56, height: 40, marginLeft: '3px' }}
                                />
                              </>
                            )}
                          </button>
                        )}
                      </CCol>
                    </CRow>
                    <CInputGroup className="mb-4 password-input">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <CInputGroupText style={{ backgroundColor: 'transparent' }}>
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          onClick={handleToggleShowPassword}
                          className="password-icon"
                        />
                      </CInputGroupText>
                    </CInputGroup>
                    <CRow>
                      <CCol
                        xs={12}
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        <CButton
                          onClick={handleLogin}
                          fontWeight="bold"
                          className={`px-4 custom-button ${loading ? 'disabled' : ''} ${
                            success ? 'success' : ''
                          } ${isButtonAnimating ? 'animating' : ''}`}
                        >
                          {loading ? (
                            <div className="d-flex align-items-center">
                              <div className="spinner-border text-light mr-2" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                              Loading...
                            </div>
                          ) : success ? (
                            <div className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faCheckCircle} className="text-success mr-2" />
                              Success
                            </div>
                          ) : (
                            'Login'
                          )}
                        </CButton>
                      </CCol>
                    </CRow>
                    {/* Modal Sukses */}
                    <Modal show={showModal && success} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Login successful!</Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowModal(false)}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* Modal Error */}
                    <Modal
                      show={showModal && !success && errorMessage}
                      onHide={() => setShowModal(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title style={{ color: 'red' }}>Error</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ color: 'red' }}>{errorMessage}</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
