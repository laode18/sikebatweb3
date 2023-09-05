/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
// authMiddleware.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Fungsi ini harus mengembalikan true jika pengguna sudah login dan false jika sebaliknya.
  // Anda dapat mengimplementasikan logika autentikasi sesuai kebutuhan Anda.
  // Misalnya, Anda bisa menggunakan state, localStorage, atau token dari server untuk menentukan status autentikasi.
  // Contoh sederhana menggunakan localStorage:
  return localStorage.getItem('isLoggedIn') === 'true';
};

const withAuth = (requiredRoles) => (Component) => {
  return (props) => {
    if (isAuthenticated()) {
      const userRole = localStorage.getItem('userRole');
      if (requiredRoles.includes(userRole)) {
        return <Component {...props} />;
      } else {
        return <Navigate to="/unauthorized" />; // Pengguna dengan peran tidak diizinkan
      }
    } else {
      return <Navigate to="/login" />;
    }
  };
};

export default withAuth;
