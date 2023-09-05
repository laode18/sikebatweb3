import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilEnvelopeOpen,
  cilDescription,
  cilUser,
  cilNotes,
  cilSpeedometer,
  cilBullhorn,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pengguna',
    to: '/pengguna',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
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
        to: '/suratkependudukan',
      },
      {
        component: CNavItem,
        name: 'Surat Kelahiran',
        to: '/suratkelahiran',
      },
      {
        component: CNavItem,
        name: 'Surat Kematian',
        to: '/suratkematian',
      },
      {
        component: CNavItem,
        name: 'Surat Pindah',
        to: '/suratpindah',
      },
      {
        component: CNavItem,
        name: 'Surat Belum Nikah',
        to: '/suratbelumnikah',
      },
      {
        component: CNavItem,
        name: 'Surat Andon Nikah',
        to: '/suratandonnikah',
      },
      {
        component: CNavItem,
        name: 'Surat Tidak Mampu Sekolah',
        to: '/surattidakmampusekolah',
      },
      {
        component: CNavItem,
        name: 'Surat Tidak Mampu RS',
        to: '/surattidakmampurs',
      },
      {
        component: CNavItem,
        name: 'Surat Mempunyai Usaha',
        to: '/suratmempunyaiusaha',
      },
      {
        component: CNavItem,
        name: 'Surat SKCK',
        to: '/suratskck',
      },
      {
        component: CNavItem,
        name: 'Surat Bersih Diri',
        to: '/suratbersihdiri',
      },
      {
        component: CNavItem,
        name: 'Surat Domisili Yayasan',
        to: '/suratdomisiliyayasan',
      },
      {
        component: CNavItem,
        name: 'Surat Domisili Perusahaan',
        to: '/suratdomisiliperusahaan',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Rekap Data',
    to: '/buttons',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Surat Kependudukan',
        to: '/rekapdatasuratkependudukan',
      },
      {
        component: CNavItem,
        name: 'Surat Kelahiran',
        to: '/rekapdatasuratkelahiran',
      },
      {
        component: CNavItem,
        name: 'Surat Kematian',
        to: '/rekapdatasuratkematian',
      },
      {
        component: CNavItem,
        name: 'Surat Pindah',
        to: '/rekapdatasuratpindah',
      },
      {
        component: CNavItem,
        name: 'Surat Belum Nikah',
        to: '/rekapdatasuratbelumnikah',
      },
      {
        component: CNavItem,
        name: 'Surat Andon Nikah',
        to: '/rekapdatasuratandonnikah',
      },
      {
        component: CNavItem,
        name: 'Surat Tidak Mampu Sekolah',
        to: '/rekapdatasurattmsekolah',
      },
      {
        component: CNavItem,
        name: 'Surat Tidak Mampu RS',
        to: '/rekapdatasurattmrs',
      },
      {
        component: CNavItem,
        name: 'Surat Mempunyai Usaha',
        to: '/rekapdatasuratmempunyaiusaha',
      },
      {
        component: CNavItem,
        name: 'Surat SKCK',
        to: '/rekapdatasuratskck',
      },
      {
        component: CNavItem,
        name: 'Surat Bersih Diri',
        to: '/rekapdatasuratbersihdiri',
      },
      {
        component: CNavItem,
        name: 'Surat Domisili Yayasan',
        to: '/rekapdatasuratdomisiliyayasan',
      },
      {
        component: CNavItem,
        name: 'Surat Domisili Perusahaan',
        to: '/rekapdatasuratdomisiliperusahaan',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Pesan',
    to: '/pesan',
    icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Informasi',
    to: '/informasi',
    icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
]

export default _nav
