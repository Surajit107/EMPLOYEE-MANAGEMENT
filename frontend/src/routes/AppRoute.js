import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/common/Dashboard'
import ProtectedRouteOne from './protected/ProtectedRouteOne'
import TopNavBar from '../components/common/TopNavBar'
import SideNavBar from '../components/common/SideNavBar'
// import Footer from '../components/common/Footer'
import ManageEmployees from '../pages/management/ManageEmployees'
import AllEmployee from '../pages/management/AllEmployee'
import EmployeeDetails from '../pages/employee/EmployeeDetails'
import Department from '../pages/management/Department'
import EditEmployee from '../components/core/EditEmployee'
import ManagerAccess from './protected/ManagerAccess'

const AppRoute = () => {
    return (
        <>
            <TopNavBar />
            <SideNavBar />
            <Routes>
                <Route element={<ProtectedRouteOne />}>
                    <Route path='/' element={<Dashboard />} exact />
                </Route>
                <Route element={<ManagerAccess />}>
                    <Route path='/edit-employee/:e_id' element={<EditEmployee />} />
                    <Route path='/manage-employee' element={<ManageEmployees />} />
                    <Route path='/departments' element={<Department />} />
                </Route>
                <Route path='/all-employee' element={<AllEmployee />} />
                <Route path='/profile-details' element={<EmployeeDetails />} />
            </Routes>
            {/* <Footer /> */}
        </>
    )
}

export default AppRoute