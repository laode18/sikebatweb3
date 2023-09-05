import React from 'react'
import Pengguna from './views/pengguna/Pengguna'
import SuratKependudukan from './views/suratkependudukan/SuratKependudukan'
import SuratKelahiran from './views/suratkelahiran/SuratKelahiran'
import SuratKematian from './views/suratkematian/SuratKematian'
import SuratPindah from './views/suratpindah/SuratPindah'
import SuratBelumnikah from './views/suratbelumnikah/SuratBelumnikah'
import SuratAndonnikah from './views/suratandonnikah/SuratAndonnikah'
import SuratTmsekolah from './views/surattidakmampusekolah/SuratTmsekolah'
import SuratTmrs from './views/surattidakmampurs/SuratTmrs'
import SuratMempunyaiusaha from './views/suratmempunyaiusaha/SuratMempunyaiusaha'
import SuratSkck from './views/suratskck/SuratSkck'
import SuratBersihdiri from './views/suratbersihdiri/SuratBersihdiri'
import SuratDomisiliyayasan from './views/suratdomisiliyayasan/SuratDomisiliyayasan'
import SuratDomisiliperusahaan from './views/suratdomisiliperusahaan/SuratDomisiliperusahaan'
import Informasi from './views/informasi/Informasi'
import Pesan from './views/pesan/Pesan'
import Dashboardlurah from './views/dashboardlurah/Dashboardlurah'
import SuratKependudukanlurah from './views/lurah/suratkependudukanlurah/SuratKependudukanlurah'
import SuratKelahiranlurah from './views/lurah/suratkelahiranlurah/SuratKelahiranlurah'
import SuratKematianlurah from './views/lurah/suratkematianlurah/SuratKematianlurah'
import SuratPindahlurah from './views/lurah/suratpindahlurah/SuratPindahlurah'
import SuratBelumnikahlurah from './views/lurah/suratbelumnikahlurah/SuratBelumnikahlurah'
import SuratAndonnikahlurah from './views/lurah/suratandonnikahlurah/SuratAndonnikahlurah'
import SuratTmsekolahlurah from './views/lurah/surattidakmampusekolahlurah/SuratTmsekolahlurah'
import SuratTmrslurah from './views/lurah/surattidakmampurslurah/SuratTmrslurah'
import SuratMempunyaiusahalurah from './views/lurah/suratmempunyaiusahalurah/SuratMempunyaiusahalurah'
import SuratSkcklurah from './views/lurah/suratskcklurah/SuratSkcklurah'
import SuratBersihdirilurah from './views/lurah/suratbersihdirilurah/SuratBersihdirilurah'
import SuratDomisiliyayasanlurah from './views/lurah/suratdomisiliyayasanlurah/SuratDomisiliyayasanlurah'
import SuratDomisiliperusahaanlurah from './views/lurah/suratdomisiliperusahaanlurah/SuratDomisiliperusahaanlurah'
import SuratKependudukanr from './views/rekapdata/suratkependudukanr/SuratKependudukanlurah'
import SuratKelahiranr from './views/rekapdata/suratkelahiranr/SuratKelahiranlurah'
import SuratKematianr from './views/rekapdata/suratkematianr/SuratKematianlurah'
import SuratPindahr from './views/rekapdata/suratpindahr/SuratPindahlurah'
import SuratBelumnikahr from './views/rekapdata/suratbelumnikahr/SuratBelumnikahlurah'
import SuratAndonnikahr from './views/rekapdata/suratandonnikahr/SuratAndonnikahlurah'
import SuratTmsekolahr from './views/rekapdata/surattidakmampusekolahr/SuratTmsekolahlurah'
import SuratTmrsr from './views/rekapdata/surattidakmampursr/SuratTmrslurah'
import SuratMempunyaiusahar from './views/rekapdata/suratmempunyaiusahar/SuratMempunyaiusahalurah'
import SuratSkckr from './views/rekapdata/suratskckr/SuratSkcklurah'
import SuratBersihdirir from './views/rekapdata/suratbersihdirir/SuratBersihdirilurah'
import SuratDomisiliyayasanr from './views/rekapdata/suratdomisiliyayasanr/SuratDomisiliyayasanlurah'
import SuratDomisiliperusahaanr from './views/rekapdata/suratdomisiliperusahaanr/SuratDomisiliperusahaanlurah'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/dashboardlurah', name: 'Dashboard Lurah', element: Dashboardlurah },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/pengguna', name: 'Pengguna', element: Pengguna },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/suratkependudukan', name: 'Surat Kependudukan', element: SuratKependudukan },
  { path: '/suratkelahiran', name: 'Surat Kelahiran', element: SuratKelahiran },
  { path: '/suratkematian', name: 'Surat Kematian', element: SuratKematian },
  { path: '/suratpindah', name: 'Surat Pindah', element: SuratPindah },
  { path: '/suratbelumnikah', name: 'Surat Belum Nikah', element: SuratBelumnikah },
  { path: '/suratandonnikah', name: 'Surat Andon Nikah', element: SuratAndonnikah },
  { path: '/surattidakmampusekolah', name: 'Surat Tidak Mampu Sekolah', element: SuratTmsekolah },
  { path: '/surattidakmampurs', name: 'Surat Tidak Mampu RS', element: SuratTmrs },
  { path: '/suratmempunyaiusaha', name: 'Surat Mempunyai Usaha', element: SuratMempunyaiusaha },
  { path: '/suratskck', name: 'Surat SKCK', element: SuratSkck },
  { path: '/suratbersihdiri', name: 'Surat Bersih Diri', element: SuratBersihdiri },
  {
    path: '/suratdomisiliyayasan',
    name: 'Surat Domisili Yayasan/Organisasi',
    element: SuratDomisiliyayasan,
  },
  {
    path: '/suratdomisiliperusahaan',
    name: 'Surat Domisili Perusahaan',
    element: SuratDomisiliperusahaan,
  },
  { path: '/suratkependudukanlurah', name: 'Surat Kependudukan', element: SuratKependudukanlurah },
  { path: '/suratkelahiranlurah', name: 'Surat Kelahiran', element: SuratKelahiranlurah },
  { path: '/suratkematianlurah', name: 'Surat Kematian', element: SuratKematianlurah },
  { path: '/suratpindahlurah', name: 'Surat Pindah', element: SuratPindahlurah },
  { path: '/suratbelumnikahlurah', name: 'Surat Belum Nikah', element: SuratBelumnikahlurah },
  { path: '/suratandonnikahlurah', name: 'Surat Andon Nikah', element: SuratAndonnikahlurah },
  {
    path: '/surattidakmampusekolahlurah',
    name: 'Surat Tidak Mampu Sekolah',
    element: SuratTmsekolahlurah,
  },
  { path: '/surattidakmampurslurah', name: 'Surat Tidak Mampu RS', element: SuratTmrslurah },
  {
    path: '/suratmempunyaiusahalurah',
    name: 'Surat Mempunyai Usaha',
    element: SuratMempunyaiusahalurah,
  },
  { path: '/suratskcklurah', name: 'Surat SKCK', element: SuratSkcklurah },
  { path: '/suratbersihdirilurah', name: 'Surat Bersih Diri', element: SuratBersihdirilurah },
  {
    path: '/suratdomisiliyayasanlurah',
    name: 'Surat Domisili Yayasan/Organisasi',
    element: SuratDomisiliyayasanlurah,
  },
  {
    path: '/suratdomisiliperusahaanlurah',
    name: 'Surat Domisili Perusahaan',
    element: SuratDomisiliperusahaanlurah,
  },
  {
    path: '/rekapdatasuratkependudukan',
    name: 'Surat Kependudukan',
    element: SuratKependudukanr,
  },
  {
    path: '/rekapdatasuratkelahiran',
    name: 'Surat Kelahiran',
    element: SuratKelahiranr,
  },
  {
    path: '/rekapdatasuratkematian',
    name: 'Surat Kematian',
    element: SuratKematianr,
  },
  {
    path: '/rekapdatasuratpindah',
    name: 'Surat Pindah',
    element: SuratPindahr,
  },
  {
    path: '/rekapdatasuratbelumnikah',
    name: 'Surat Belum Nikah',
    element: SuratBelumnikahr,
  },
  {
    path: '/rekapdatasuratandonnikah',
    name: 'Surat Andon Nikah',
    element: SuratAndonnikahr,
  },
  {
    path: '/rekapdatasurattmsekolah',
    name: 'Surat Tidak Mampu Sekolah',
    element: SuratTmsekolahr,
  },
  {
    path: '/rekapdatasurattmrs',
    name: 'Surat Tidak Mampu RS',
    element: SuratTmrsr,
  },
  {
    path: '/rekapdatasuratmempunyaiusaha',
    name: 'Surat Mempunyai Usaha',
    element: SuratMempunyaiusahar,
  },
  {
    path: '/rekapdatasuratskck',
    name: 'Surat SKCK',
    element: SuratSkckr,
  },
  {
    path: '/rekapdatasuratbersihdiri',
    name: 'Surat Bersih Diri',
    element: SuratBersihdirir,
  },
  {
    path: '/rekapdatasuratdomisiliyayasan',
    name: 'Surat Domisili Yayasan/Organisasi',
    element: SuratDomisiliyayasanr,
  },
  {
    path: '/rekapdatasuratdomisiliperusahaan',
    name: 'Surat Domisili Perusahaan',
    element: SuratDomisiliperusahaanr,
  },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/pesan', name: 'Pesan', element: Pesan },
  { path: '/informasi', name: 'Informasi', element: Informasi },
]

export default routes
