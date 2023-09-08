import React from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmpAttendance from "./Pages/EmpAttendance/EmpAttendance";
import EmpHolidays from "./Pages/EmpHolidays/EmpHolidays";
import AllEmployees from "./Pages/Employee Data/All Employees/AllEmployees";
import Calendar from "./Components/Calendar/Calendar";
import EmpDetails from "./Pages/Employee Data/Emp Details 2/EmpDetails";
import CalendarDetails from "./Components/Calendar/CalendarDetails";
import { Context } from "./Context/Context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Leaves from './Pages/Leaves/Leaves'
import "./index.css";
import DataManagement from "./Pages/Attendence Report/DataManagement";
import Login from "./Auth/Login/Login";
import Departments from "./Pages/Departments/Departments";
import LeaveRequest from "./Pages/Leave Management/leaveRequest/LeaveRequest";
import ManageLeaves from "./Pages/Leave Management/All Leave Reuests/ManageLeaves";
import './index.css'
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardNonAdmin from "./Pages/Dashboard/DashboardNonAdmin";
import MonthlyPayroll from "./Pages/MonthlyPayroll/MonthlyPayroll";
import MonthlyAttendance from "./Pages/MonthlyAttendance/MonthlyAttendance";
import SetupPayroll from "./Pages/Payroll/SetupPages/payrollSetupPage";
import EmployeeData from "./Pages/Employee Data/All Employees/EmployeeData";
import Companies from "./Pages/Companies/Companies";
import Shifts from "./Pages/Shifts/Shifts";
import AddSlabs from "./Pages/Shifts/AddSlabs";
import HeaderState from "./Context/HeaderState";



function App(props) {
  const context = useContext(Context);
  const { user } = useContext(Context);
  return (
    <>
      <HeaderState>
        <BrowserRouter>
          {context.user ? (
            <>
              <Sidebar />
              <Header />
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />}></Route>
                {context.user.isAdmin && <Route path="/dashboard" element={<Dashboard />} />}
                <Route path="/dashboard" element={<DashboardNonAdmin />} />
                <Route path="/attendance" element={user.isAdmin &&  <EmpAttendance />} />
                <Route path="/holidays" element={user.isAdmin &&  <EmpHolidays />} />
                <Route path="/employees" element={<AllEmployees />} />
                <Route path="/employees/:id" element={<EmpDetails />} />
                <Route path="/calendar" element={<Calendar />}></Route>
                <Route path="/calendar/:id" element={<CalendarDetails />}></Route>
                <Route path="/datamanagement" element={<DataManagement />} />
                <Route path='/leaves' element={<Leaves />} />
                <Route path='/departments' element={<Departments />} />
                <Route path='/companies' element={<Companies />} />
                <Route path="/leaverequest" element={<LeaveRequest />} />
                <Route path="/manageleaves" element={<ManageLeaves />}></Route>
                <Route path="/monthlypayroll"  element={user.isAdmin && <MonthlyPayroll />} />
                <Route path="/monthlyattendance" element={user.isAdmin && <MonthlyAttendance />}></Route>
                <Route path="/payrollsetup" element={user.isAdmin && <SetupPayroll />}></Route>
                <Route path="/employeeData" element={<EmployeeData />}></Route>
                <Route path='/shifts' element={user.isAdmin && <Shifts />} />
                <Route path="/addslabs" element={<AddSlabs />}></Route>
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </HeaderState>
      {/* <Footer/> */}
    </>
  );
}

export default App;
