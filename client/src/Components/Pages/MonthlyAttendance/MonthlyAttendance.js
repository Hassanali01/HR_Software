import React, { useEffect, useContext } from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import HeaderContext from "../../../Context/HeaderContext";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Calendar from 'react-calendar';
import Table from "./attendanceReportTable/Table";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';

const MonthlyAttendance = () => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState();
  const [AttendanceToDB, setAttendanceToDB] = useState([]);
  function onChangeCalendar(e) {
    setPayrollMonth(e.toLocaleString('en-US', { month: "long" }))
    handleClose()
  }

  const columns = [
    { field: "id", headerName: "EmployeeID", width: 90 },
    {
      field: "Name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "In",
      headerName: "In",
      width: 200,
    },
    {
      field: "out",
      headerName: "out",
      width: 200,
    },
    {
      field: "status",
      headerName: "Full name",
      width: 200,
    },
    {
      field: "department",
      headerName: "department",
      width: 200
    }
  ];


  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: "dd", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  function NewToolbar() {
    return (<>
      <TextField />
    </>)
  }



  const [payrollMonth, setPayrollMonth] = useState("")
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState();
  const [tableData, setTableData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = "/postimport/attendance";
  const urlForEmployees = "/employees"
  let table = [];
  data.forEach((elem) => {
    table.push({
      Employee_ID: elem[0],
      Name: elem[1],
      Date: elem[2],
      in: elem[3],
      Out: elem[4],
      Duration: elem[5],
    });
  });



  let InTimes = [];

  // for in
  table.map((d) => {
    let fromExcel = d.in; //translates to 17:02:00
    let equivTimeIN = fromExcel * 24
    let hoursIN = Math.floor(equivTimeIN);


    var minutesIN = Math.round((equivTimeIN % 1) * 60)
    let dayIN = d.Date.split('/')[0]
    let monthIN = d.Date.split('/')[1]
    let yearIN = d.Date.split('/')[2]

    let InTime = hoursIN + ":" + minutesIN

    //for Out
    let outTime = d.Out;
    let equivTimeOUT = outTime * 24;
    let hoursOUT = Math.floor(equivTimeOUT);

    var minutesOUT = Math.round((equivTimeOUT % 1) * 60);

    let OutTime = hoursOUT + ":" + minutesOUT

    let totalDuration = d.Out - d.in;
    let basenumber3 = totalDuration * 24;
    let hoursT = `${Math.floor(basenumber3).toString()} hours`
    if (hoursT.length < 2) {
      hoursT = `0${hoursT} hours`
    }
    var minutesT = `${Math.round((basenumber3 % 1) * 60).toString()} minutes`;

    if (minutesT.length < 2) {
      minutesT = `0${minutesT} minutes`

    }
    let DurationTime = `${hoursT} ${minutesT}`;
    InTimes.push({
      Employee_ID: d.Employee_ID,
      Name: d.Name,
      Date: d.Date,
      in: InTime,
      out: OutTime,
      duration: DurationTime
    });
  });
  let converted = [];
  table.map((d) => {
    converted.push({
      Employee_ID: d.Employee_ID,
      Name: d.Name,
      Date: d.Date,
    });
  });
  console.log("table", table);

  useEffect(() => {

    try {
      axios.get(urlForEmployees).then((res) => {

        setEmployees(res.data.employees)
      });
    } catch (error) {
      console.log("error", error)
    }
  }, [])
  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Attendece Viewer ")
  })

  async function showMonthAttendance() {

    const tempAttendance = [];

    try {

      const attendanceTemp = (await axios.get(`/monthattendance/${payrollMonth}`));
      await attendanceTemp.data.map((i) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dateToAdd = `${i.date.split("-")[2].split("T")[0]}-${i.date.split("-")[1]}-${i.date.split("-")[0]}`

        {
          i.employee && tempAttendance.push({
            Name: i.employee.username, Employee_ID: i.employee.emp_id, Date: dateToAdd,
            department: i.employee.departments[0] && i.employee.departments[0].departmentname,
            status: i.in.split(':')[0] != "NaN" ? 'P' : 'A', ...i
          })
        }
        i.department = "null"

      })

      tempAttendance.length == 0 && NotificationManager.error("Current month has no record");
      setTableData(tempAttendance)
      tempAttendance.length > 0 && NotificationManager.success("Successfully Updated");

    } catch (error) {
      NotificationManager.error("Please select the month of Attendance")
    }
  }



  return (
    <div>
      <div className="content-wrapper">
        <section className="content mt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header buttoncolor">
                    <h3 className="card-title" style={{ color: "white" }}>
                      Monthly Attendance Viewer
                    </h3>
                  </div>
                  <div className="card-body">
                    <div style={{ height: '700px' }}>

                      <div className="ml-5">
                        <Button className="mr-3" variant="primary" onClick={handleShow}>
                          Select the Month
                        </Button>
                        Attendance Month: &nbsp;
                        <input className="mr-3" value={payrollMonth} disabled="true"></input>
                        <Button className="mr-3 showAttendance" onClick={showMonthAttendance}>Fetch</Button>
                      </div>
                      <Modal show={show} onHide={handleClose}>
                        <div className='d-flex justify-content-center'>
                          <Calendar
                            onChange={onChangeCalendar}
                            value={date}
                            maxDetail='year'
                          />
                        </div>
                      </Modal>

                      <Table data={tableData} setTableData={setTableData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <NotificationContainer />
    </div>
  )
}

export default MonthlyAttendance




