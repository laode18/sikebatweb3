import React, { useState, useEffect } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import contractkependudukan from './contracts/contractkependudukan'
import Web3 from 'web3'
import contract from './contracts/contract'
import contractpindah from './contracts/contractpindah'

const WidgetsDropdown = () => {
  const [kependudukans, setKependudukans] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalKependudukan, setTotalKependudukan] = useState(0)
  const [users, setUsers] = useState([])
  const [genderCounts, setGenderCounts] = useState({ maleCount: 0, femaleCount: 0 })
  const [pindahs, setPindahs] = useState([])
  const [totalPindah, setTotalPindah] = useState(0)

  const getKependudukans = async () => {
    try {
      setIsLoading(true)
      // Implementasikan contractkependudukan sesuai dengan penggunaan yang sebenarnya
      const totalKependudukans = await contractkependudukan.methods.totalKependudukans().call()
      const kependudukansArray = []

      for (let i = 1; i <= totalKependudukans; i++) {
        const kependudukan = await contractkependudukan.methods.getKependudukan(i).call()
        if (kependudukan.userId !== '') {
          kependudukansArray.push(kependudukan)
        }
      }

      // Menghitung total kependudukan
      const totalKependudukan = kependudukansArray.length
      setKependudukans(kependudukansArray)
      setTotalKependudukan(totalKependudukan)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

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

      // Menghitung total jenis kelamin
      const { maleCount, femaleCount } = calculateGenderCounts(usersArray)

      setUsers(usersArray)
      setGenderCounts({ maleCount, femaleCount })
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const calculateGenderCounts = (users) => {
    let maleCount = 0
    let femaleCount = 0

    users.forEach((user) => {
      if (user.gender === 'Laki-Laki') {
        maleCount++
      } else if (user.gender === 'Perempuan') {
        femaleCount++
      }
    })

    return { maleCount, femaleCount }
  }

  const getPindahs = async () => {
    try {
      setIsLoading(true)
      const totalPindahs = await contractpindah.methods.totalPindahs().call()
      const pindahsArray = []

      for (let i = 1; i <= totalPindahs; i++) {
        const pindah = await contractpindah.methods.getPindah(i).call()
        if (pindah.userId !== '') {
          pindahsArray.push(pindah)
        }
      }

      // Menghitung total pindah
      const totalPindah = calculateTotalPindah(pindahsArray)

      setPindahs(pindahsArray)
      setTotalPindah(totalPindah)
      setIsLoading(false)

      // Menampilkan total pindah dalam elemen <p>
      const totalPindahElement = document.getElementById('totalPindah')
      if (totalPindahElement) {
        totalPindahElement.textContent = `Total Pindah: ${totalPindah}`
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const calculateTotalPindah = (pindahsArray) => {
    return pindahsArray.length
  }

  useEffect(() => {
    getUsers()
    getKependudukans()
    getPindahs()
  }, [])

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          title="Jumlah Penduduk"
          value={
            <>
              {totalKependudukan} Orang{' '}
              {/* <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          id="genderCount"
          className="mb-4"
          color="info"
          value={
            <>
              {genderCounts.maleCount} Orang{' '}
              {/* <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span> */}
            </>
          }
          title="Jumlah Pria"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          id="genderCount"
          className="mb-4"
          color="warning"
          value={
            <>
              {genderCounts.femaleCount} Orang{' '}
              {/* <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span> */}
            </>
          }
          title="Jumlah Perempuan"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              {totalPindah} Orang{' '}
              {/* <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          title="Jumlah Penduduk Pindah"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                  'January',
                  'February',
                  'March',
                  'April',
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
