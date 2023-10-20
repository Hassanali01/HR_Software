
import React, { useEffect } from 'react';
import logo from '../../Assets/img/AdminLTELogo.png'
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Context } from "./../../Context/Context";
import { useContext } from "react";
import "../Sidebar/Sidebar2.css"

const Sidebar = () => {
  const context = useContext(Context);
  const [toggleLeaves, settoggle] = useState(false)
  const [toggleAttendance, settoggleAttendance] = useState(false)
  const [toggleWorkLeave, settoggleWorkLeave] = useState(false)


  return (
    <>
      {/* <!-- Main Sidebar Container --> */}
      {/* <aside className="main-sidebar sidebar-dark-primary elevation-4  " style={{position:"fixed"}}> */}
      <aside className="main-sidebar  elevation-4  " style={{ position: "fixed", backgroundColor: "rgb(3, 110, 104)", color: "#fff" }}>
        {/* <!-- Brand Logo --> */}
        <Link to="/dashboard" className="brand-link">
          <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: 0 }} />
          <span className="brand-text font-weight-bold text-white">HR Software</span>
        </Link>
        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user (optional) --> */}
          <div className="user-panel mt-3 d-flex">
            <div className="image">
              {/* <img src="" className="img-circle elevation-2" alt="User Image" /> */}
            </div>
            <div className="info text-decoration-none border-bottom-2">
              <Link to="/dashboard" className="d-block text-white" ><h5 style={{ color: "#d8d808" }}>Sagacious Systems</h5></Link>
            </div>

          </div>
          <hr></hr>
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2" style={{ color: "#fff" }}>
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* <!-- Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library --> */}
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link" >
                  <i className="nav-icon fa-sharp fa-solid fa-network-wired iconColor"></i>
                  <p className='iconColor'>
                    Dashboard
                  </p>
                </NavLink >
              </li>
              <li className="nav-item">
                <Link
                  to={`/employees/${context.myID}`}
                  className="nav-link">
                  <i className="nav-icon  fa-solid fa-user iconColor"></i>
                  <p className='iconColor'>
                    Profile
                  </p>
                </Link>
              </li>
              {context.user.isAdmin &&
                <li className="nav-item">
                  <Link to="/employees" className="nav-link" >
                    <i className="nav-icon fa-sharp fa-solid fa-users iconColor"></i>
                    <p className='iconColor'>
                      Employees
                    </p>
                  </Link>
                </li>
              }

              {context.user.isAdmin &&
                <li className="nav-item">
                  <Link to="/departments" className="nav-link">
                    <i className="nav-icon fa-sharp fa-solid fa-users-rectangle iconColor"></i>
                    <p className='iconColor'>
                      Departments
                    </p>
                  </Link>
                </li>
              }
              {context.user.isAdmin &&
                <li className="nav-item">
                  <Link to="/companies" className="nav-link">
                    <i className="nav-icon fa-solid fa-building iconColor"></i>
                    <p className='iconColor'>
                      Companies
                    </p>
                  </Link>
                </li>
              }
              {context.user.isAdmin &&
                <li className="nav-item">
                  <Link to="/leaves" className="nav-link">
                    <i className="nav-icon fa-solid fa-user-xmark iconColor"></i>
                    <p className='iconColor'>
                      Leave Types
                    </p>
                  </Link>
                </li>
              }

              <li className='nav-item'>
                <a className='nav-link' style={{ cursor: 'pointer' }}>
                  <div onClick={() => { settoggle(!toggleLeaves) }}>

                    <i className=" nav-icon fa-solid fa-list-check iconColor"></i>
                    <p className='iconColor' >Leaves</p>
                    <i className='nav-icon fa-solid fa-chevron-down iconColor' style={{ fontSize: "13px" }}></i>
                  </div>
                  {
                    toggleLeaves && <>
                      <Link to={'/leaverequest'} className='nav-link '>
                        <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i>
                        <p className='iconColor'>Apply leave</p>
                      </Link>
                      <Link to={'/manageleaves'} className="nav-link">
                        <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i>
                        <p className='iconColor'>Assign to me </p>
                      </Link>
                    </>
                  }
                </a>
              </li>
              {context.user.isAdmin && <li className="nav-item">
                <Link to="/holidays" className="nav-link">
                  <i className="nav-icon fa-solid fa-calendar-days iconColor"></i>
                  <p className='iconColor'>
                    Holidays
                  </p>
                </Link>

              </li>
              }
              {context.user.isAdmin && <li className="nav-item">
                <Link to="/attendance" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt iconColor" ></i>
                  <p className='iconColor'>
                    Attendance
                  </p>
                </Link>
              </li>
              }

              {context.user.isAdmin &&
                <li className='nav-item' >
                  <a className='nav-link' style={{ cursor: 'pointer' }}>
                    <div className='d-flex' onClick={() => { settoggleAttendance(!toggleAttendance) }}>

                      <i className=" nav-icon fa-solid fa-list-check iconColor my-1"></i>
                      <p className='iconColor'> Attendance Management</p>
                      <i className='nav-icon fa-solid fa-chevron-down iconColor my-3' style={{ fontSize: "13px" }}></i>
                    </div>
                    {
                      toggleAttendance &&
                      <>
                        <Link to="/datamanagement" className="nav-link">
                          <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "12px" }}></i>
                          <p className='iconColor'>
                            Reports
                          </p>
                        </Link>
                        {context.user.isAdmin &&
                          <Link to="/monthlyattendance" className="nav-link">
                            <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "12px" }}></i>

                            <p className='iconColor'>
                              Attendance History
                            </p>
                          </Link>
                        }

                      </>
                    }
                  </a>
                </li>
              }
              {context.user.isAdmin &&
                <li className="nav-item">
                  <Link to="/monthlypayroll" className="nav-link">
                    <i className="nav-icon fa-solid fa-hand-holding-dollar iconColor"></i>
                    <p className='iconColor'>
                      Monthly Attendance
                    </p>
                  </Link>
                </li>}
              {context.user.isAdmin &&
                <li className="nav-item">
                  <Link to="/payrollsetup" className="nav-link">
                    <i className="nav-icon fa-solid fa-file-invoice-dollar iconColor"></i>
                    <p className='iconColor'>
                      Payroll Setup
                    </p>
                  </Link>
                </li>
              }

              {/* add shift for employee */}
              {context.user.isAdmin &&
                <li className="nav-item">
                  <Link
                    to={`/shifts`}
                    className="nav-link">
                    <i className="nav-icon fa-solid fa-business-time iconColor"></i>
                    <p className='iconColor'>
                      Job Shifts
                    </p>
                  </Link>
                </li>
              }
              <li className='nav-item' >
                <a className='nav-link' style={{ cursor: 'pointer' }}>
                  <div onClick={() => { settoggleWorkLeave(!toggleWorkLeave) }}>

                    <i className=" nav-icon fa-solid fa-list-check iconColor"></i>


                    <p className='iconColor'>Work absence</p>
                    <i className='nav-icon fa-solid fa-chevron-down iconColor' style={{ fontSize: "13px" }}></i>
                  </div>
                  {
                    toggleWorkLeave && <>
                      <Link to={`/workleave`} className='nav-link '>
                        <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i>
                        <p className='iconColor'>Apply</p>
                      </Link>
                  
                        <Link to={`/manageworkleave`} className="nav-link">
                          <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i>
                          <p className='iconColor'>Assign to me</p>
                        </Link>
                      
                    </>
                  }
                </a>
              </li>
            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    </>
  )
}

export default Sidebar;