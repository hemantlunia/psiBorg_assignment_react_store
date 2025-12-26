import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

function AuthLayout() {
  return (
    <>
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16">
        <Outlet />
      </main>
    </div>
    </>
  )
}

export default AuthLayout;