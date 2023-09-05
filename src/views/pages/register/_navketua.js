import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _navketua = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboardlurah',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Layanan',
    to: '/base',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Surat Kependudukan',
        to: '/suratkependudukanlurah',
      },
      {
        component: CNavItem,
        name: 'Surat Kelahiran',
        to: '/suratkelahiranlurah',
      },
      {
        component: CNavItem,
        name: 'Surat Kematian',
        to: '/suratkematianlurah',
      },
      {
        component: CNavItem,
        name: 'Surat Pindah',
        to: '/suratpindahlurah',
      },
      {
        component: CNavItem,
        name: 'Surat Belum Nikah',
        to: '/suratbelumnikahlurah',
      },
      {
        component: CNavItem,
        name: 'Surat Andon Nikah',
        to: '/suratandonnikahlurah',
      },
      {
        component: CNavItem,
        name: 'Surat Tidak Mampu Sekolah',
        to: '/surattidakmampusekolahlurah',
      },
      {
        component: CNavItem,
        name: 'Surat Tidak Mampu RS',
        to: '/surattidakmampurslurah',
      },
      {
        component: CNavItem,
        name: 'Surat Mempunyai Usaha',
        to: '/suratmempunyaiusahalurah',
      },
      {
        component: CNavItem,
        name: 'Surat SKCK',
        to: '/suratskcklurah',
      },
      {
        component: CNavItem,
        name: 'Surat Bersih Diri',
        to: '/suratbersihdirilurah',
      },
      {
        component: CNavItem,
        name: 'Surat Domisili Yayasan',
        to: '/suratdomisiliyayasanlurah',
      },
      {
        component: CNavItem,
        name: 'Surat Domisili Perusahaan',
        to: '/suratdomisiliperusahaanlurah',
      },
    ],
  },
]

export default _navketua
