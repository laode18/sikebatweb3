import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import withAuth from 'src/authMiddleware'
import DefaultLayout from './layout/DefaultLayout'
import DefaultLayoutketua from './views/pages/register/layoutketua/DefaultLayoutketua'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Pages
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Login = React.lazy(() => import('./views/pages/login/Login'))

class HomeLayout extends Component {
  render() {
    // Anda akan perlu mengambil peran pengguna dari sistem auth yang sesuai
    const userRole = localStorage.getItem('userRole')

    if (userRole === 'admin') {
      return <DefaultLayout />
    } else if (userRole === 'ketua') {
      return <DefaultLayoutketua />
    } else {
      return <Login />
    }
  }
}

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<HomeLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
