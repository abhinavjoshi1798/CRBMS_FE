import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import EmployeeDashboard from '../pages/EmployeeDashboard'
import SidebarWithHeader from '../pages/AdminDashboard'

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/employeedashboard" element={<EmployeeDashboard />} />
      <Route path="/admindashboard" element={<SidebarWithHeader />} />
    </Routes>
  )
}

export default Allroutes
// dadajlgakl
