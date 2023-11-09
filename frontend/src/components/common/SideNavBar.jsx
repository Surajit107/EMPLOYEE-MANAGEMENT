import React from 'react'
import { Link } from 'react-router-dom'

const SideNavBar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to="/">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-item">
            <Link className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" to="#">
              <i className="ri-admin-line"></i><span>Management</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link to="/manage-department">
                  <i className="bi bi-circle"></i><span>Manage Departments</span>
                </Link>
              </li>
              <li>
                <Link to="/departments">
                  <i className="bi bi-circle"></i><span>Departments</span>
                </Link>
              </li>
              <li>
                <Link to="/all-employee">
                  <i className="bi bi-circle"></i><span>All Employee</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* <!-- End Components Nav --> */}
        </ul>
      </aside>
    </>
  )
}

export default SideNavBar