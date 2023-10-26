
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
      <aside className="main-sidebar  elevation-4  " style={{ position: "fixed",   top: 0, bottom:0,backgroundColor: "rgb(3, 110, 104)", color: "#fff" }}>
        {/* <!-- Brand Logo --> */}
        <Link to="/dashboard" className="brand-link">
          <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: 0 }} />
          <span className="brand-text font-weight-bold text-white">HR Software</span>
        </Link>
        {/* <!-- Sidebar --> */}
        <div className="sidebar" >
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
                <NavLink
                  to={`/employees/${context.myID}`}
                  className="nav-link">
                  <i className="nav-icon  fa-solid fa-user iconColor"></i>
                  <p className='iconColor'>
                    Profile
                  </p>
                </NavLink>
              </li>
              {context.user.isAdmin &&
                <li className="nav-item">
                  <NavLink to="/employees" className="nav-link" >
                    <i className="nav-icon fa-sharp fa-solid fa-users iconColor"></i>
                    <p className='iconColor'>
                      Employees
                    </p>
                  </NavLink>
                </li>
              }

              {context.user.isAdmin &&
                <li className="nav-item">
                  <NavLink to="/departments" className="nav-link">
                    <i className="nav-icon fa-sharp fa-solid fa-users-rectangle iconColor"></i>
                    <p className='iconColor'>
                      Departments
                    </p>
                  </NavLink>
                </li>
              }
               {context.user.isAdmin &&
                <li className="nav-item">
                  <NavLink to="/dasignation" className="nav-link">
                    <i className="nav-icon fa-sharp fa-solid fa-users-rectangle iconColor"></i>
                    <p className='iconColor'>
                      Designation
                    </p>
                  </NavLink>
                </li>
              }
              {context.user.isAdmin &&
                <li className="nav-item">
                  <NavLink to="/companies" className="nav-link">
                    <i className="nav-icon fa-solid fa-building iconColor"></i>
                    <p className='iconColor'>
                      Companies
                    </p>
                  </NavLink>
                </li>
              }
              {context.user.isAdmin &&
                <li className="nav-item">
                  <NavLink to="/leaves" className="nav-link">
                    <i className="nav-icon fa-solid fa-user-xmark iconColor"></i>
                    <p className='iconColor'>
                      Leave Types
                    </p>
                  </NavLink>
                </li>
              }
              <li className='nav-item'>
                <a className='nav-link' style={{ cursor: 'pointer' }}>
                  <div onClick={() => { settoggle(!toggleLeaves) }}>
                    <i className=" nav-icon fa-solid fa-list-check iconColor"></i>
                    <p className='iconColor' >Leaves</p>
                    {toggleLeaves ? <i className='nav-icon fa-solid fa-chevron-up iconColor' style={{ fontSize: "13px" }}></i> : <i className='nav-icon fa-solid fa-chevron-down iconColor' style={{ fontSize: "13px" }}></i>}
                  </div>
                  {
                    toggleLeaves && <> <li>
                      <NavLink to={'/leaverequest'} className='nav-link mt-2 p-1  ps-3'>
                        {/* <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i> */}
                        <p className='iconColor' style={{ opacity: 0.9, fontSize: 13 }}>Apply leave</p>
                      </NavLink> </li>
                     <li>  <NavLink to={'/leaveshistory'} className='nav-link mt-2 p-1  ps-3'>
                        {/* <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i> */}
                        <p className='iconColor' style={{ opacity: 0.9, fontSize: 13 }}>Leaves history</p>
                      </NavLink> </li>
                      <li> <NavLink to={'/manageleaves'} className="nav-link mt-2 p-1 ps-3">
                        {/* <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i> */}
                        <p className='iconColor' style={{ opacity: 0.9, fontSize: 13 }}>Assign to me </p>
                      </NavLink> </li>
                      <li> <NavLink to={'/leaveallocation'} className="nav-link mt-2 p-1 ps-3">
                        {/* <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i> */}
                        <p className='iconColor' style={{ opacity: 0.9, fontSize: 13 }}>Leave Allocation </p>
                      </NavLink> </li>
                    </>
                  }
                </a>
              </li>
              {context.user.isAdmin && <li className="nav-item">
                <NavLink to="/holidays" className="nav-link">
                  <i className="nav-icon fa-solid fa-calendar-days iconColor"></i>
                  <p className='iconColor'>
                    Holidays
                  </p>
                </NavLink>

              </li>
              }
              {context.user.isAdmin && <li className="nav-item">
                <NavLink to="/attendance" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt iconColor" ></i>
                  <p className='iconColor'>
                    Attendance
                  </p>
                </NavLink>
              </li>
              }

              {context.user.isAdmin &&
                <li className='nav-item' >
                  <a className='nav-link' style={{ cursor: 'pointer' }}>
                    <div className='d-flex' onClick={() => { settoggleAttendance(!toggleAttendance) }}>

                      <i className=" nav-icon fa-solid fa-list-check iconColor my-1"></i>
                      <p className='iconColor'> Attendance Management</p>
                      {toggleAttendance ? <i className='nav-icon fa-solid fa-chevron-up iconColor my-3' style={{ fontSize: "13px" }}></i> : <i className='nav-icon fa-solid fa-chevron-down iconColor my-3' style={{ fontSize: "13px" }}></i>}
                    </div>
                    {
                      toggleAttendance &&
                      <> <li>
                        <NavLink to="/datamanagement" className="nav-link mt-2 p-1 ps-3">
                          {/* <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "12px" }}></i> */}
                          <p className='iconColor' style={{ opacity: 0.9, fontSize: 13 }}>
                            Reports
                          </p>
                        </NavLink> </li>
                        {context.user.isAdmin && <li>
                          <NavLink to="/monthlyattendance" className="nav-link  mt-2 p-1 ps-3">
                            {/* <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "12px" }}></i> */}

                            <p className='iconColor' style={{ opacity: 0.9, fontSize: 13 }}>
                              Attendance history
                            </p>
                          </NavLink> </li>
                        }

                      </>
                    }
                  </a>
                </li>
              }
              {context.user.isAdmin &&
                <li className="nav-item">
                  <NavLink to="/monthlypayroll" className="nav-link">
                    <i className="nav-icon fa-solid fa-hand-holding-dollar iconColor"></i>
                    <p className='iconColor'>
                      Monthly Attendance
                    </p>
                  </NavLink>
                </li>}
              {context.user.isAdmin &&
                <li className="nav-item">
                  <NavLink to="/payrollsetup" className="nav-link">
                    <i className="nav-icon fa-solid fa-file-invoice-dollar iconColor"></i>
                    <p className='iconColor'>
                      Payroll Setup
                    </p>
                  </NavLink>
                </li>
              }

              {/* add shift for employee */}
              {context.user.isAdmin &&
                <li className="nav-item">
                  <NavLink
                    to={`/shifts`}
                    className="nav-link">
                    <i className="nav-icon fa-solid fa-business-time iconColor"></i>
                    <p className='iconColor'>
                      Job Shifts
                    </p>
                  </NavLink>
                </li>
              }
              <li className='nav-item' >
                <a className='nav-link' style={{ cursor: 'pointer' }}>
                  <div  onClick={() => { settoggleWorkLeave(!toggleWorkLeave) }}>
                    <i className=" nav-icon fa-solid fa-list-check iconColor"></i>
                    <p className='iconColor'>Work absence</p>
                    {toggleWorkLeave ? <i className='nav-icon fa-solid fa-chevron-up iconColor' style={{ fontSize: "13px" }}></i> : <i className='nav-icon fa-solid fa-chevron-down iconColor' style={{ fontSize: "13px" }}></i>}
                  </div>
                  {
                    toggleWorkLeave && <>
                      <li>
                        <NavLink to={`/workleave`} className='nav-link mt-2  p-1 ps-3'>
                          {/* <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i> */}
                          <p className='iconColor' style={{ opacity: 0.9, fontSize: 13 }}>Apply</p>
                        </NavLink>
                      </li>
                      <li >
                        <NavLink to={`/manageworkleave`} className="nav-link mt-2  p-1 ps-3">
                          {/* <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i> */}
                          <p className='iconColor' style={{ opacity: 0.9, fontSize: 13 }}>Assign to me</p>
                        </NavLink>
                      </li>
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