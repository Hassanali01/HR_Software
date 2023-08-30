import React, { useEffect, useContext } from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import HeaderContext from "../../Context/HeaderContext";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Calendar from 'react-calendar';
import Table from "./attendanceReportTable/Table";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import moment from "moment";

import 'react-calendar/dist/Calendar.css';

const MonthlyAttendance = () => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState();
  const [payrollMonth, setPayrollMonth] = useState("")
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState();
  const [tableData, setTableData] = useState([]);
  const [employeesAttendance, setEmployeesAttendance] = useState({});


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function onChangeCalendar(e) {
    setPayrollMonth(e.toLocaleString('en-US', { month: "long" }))
    handleClose()
  }


  function PrintElem(elem) {
    var mywindow = window.open('', 'PRINT', 'height=900,width=1200');

    mywindow.document.write('<html><head><title>' + 'title' + '</title>');
    mywindow.document.write('<style>* {-webkit-print-color-adjust: exact !important;}</style>')
    mywindow.document.write('</head><body ><div>');
    // mywindow.document.write('<h1>' + document.title  + '</h1>');


    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</div></body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  }

  function NewToolbar() {
    return (<>
      <TextField />
    </>)
  }

  const urlForEmployees = "employees"
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

  useEffect(() => {
    try {
      axios.get(process.env.React_APP_ORIGIN_URL + urlForEmployees).then((res) => {

        setEmployees(res.data.employees)
      });
    } catch (error) {
    }
  }, [])

  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Attendece Viewer ")
  })

  async function showMonthAttendance() {
    const tempAttendance = [];
    try {
      const attendanceTemp = (await axios.get(process.env.React_APP_ORIGIN_URL + `monthattendance/${payrollMonth}`));
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


      const gaztedholidays = await (await axios.get(process.env.React_APP_ORIGIN_URL + `holiday/holidaypayroll`)).data







      tempAttendance.forEach((att) => {


        if (att.status == "A") {
          att.in = "Absent";
          att.out = "Absent";
        }

      })



      gaztedholidays.map((i) => {
        tempAttendance.forEach((te) => {


          if (i.current == moment(te.date).utc().format('YYYY-MM-DD')) {

            if (te.employee.payroll_setup.applyGazettedHoliday) {


              if (te.status == 'A') {
                te.in = "G.H";
                te.out = "G.H";
              }
            }
          }
        })
      })


      console.log("tempAttendance", tempAttendance)

      tempAttendance.forEach((att) => {

        const locale = "en-US"
        var date = new Date(att.date);
        var day = date.toLocaleDateString(locale, { weekday: 'long' });
        att.day = day
        if (day == "Sunday"
          && att.employee.payroll_setup.daysoff && att.employee.payroll_setup.daysoff.sundayDayoff
        ) {
          att.in = "Day off";
          att.out = "Day off";
        }

      })







      const attendanceByEmployee = tempAttendance.reduce((empAtt, tempAtt) => {
        const { Employee_ID } = tempAtt;
        empAtt[Employee_ID] = empAtt[Employee_ID] ? empAtt[Employee_ID] : [];
        empAtt[Employee_ID].push(tempAtt);
        return empAtt;
      }, {});

      console.log("attendanceByEmployee", attendanceByEmployee);


      setEmployeesAttendance(attendanceByEmployee)






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
                        <Button style={{marginLeft:"20%"}} onClick={() => { PrintElem('AttendanceToPrint') }}>Print monthly attendance</Button>

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



                      <div style={{display:"none"}} className='AttendanceToPrint' id='AttendanceToPrint'>

                        {Object.keys(employeesAttendance).map(key =>





                          <table style={{ fontSize: 12, fontFamily: "arial", border: "1px solid black", borderCollapse: "collapse", pageBreakAfter: "always"
                        
                          }} >
                            <tr style={{ fontWeight: "bold", fontSize: 18, border: "2px solid black", height: 50, backgroundColor: "silver" }}>

                              <th colSpan={7}>

                                Attendance August 23

                              </th>
                            </tr>
                            <tr style={{ height: 30 }}>
                              <th style={{ width: "100px", border: "1px solid black" }}>Date</th>
                              <th style={{ width: "90px", border: "1px solid black" }}>Day</th>
                              <th style={{ width: "160px", border: "1px solid black" }}>Name</th>
                              <th style={{ width: "100px", border: "1px solid black" }}>Dept.</th>
                              <th style={{ width: "70px", border: "1px solid black" }}>Check In</th>
                              <th style={{ width: "70px", border: "1px solid black" }}>Check Out</th>
                              <th style={{ width: "100px", border: "1px solid black" }}>Remarks</th>
                            </tr>
                            {
                              employeesAttendance[key].map((t) => <tr style={{ height: 25 }}>
                                <td align="center" style={{ width: "100px", border: "1px solid black" }}>{t.Date}</td>
                                <td style={{ width: "90px", border: "1px solid black" }}>{t.day}</td>
                                <td style={{ width: "160px", border: "1px solid black" }}>{t.Name}</td>
                                <td style={{ width: "100px", border: "1px solid black" }}>{t.department}</td>
                                <td align="center" style={{ width: "70px", border: "1px solid black" }}>{t.in}</td>
                                <td align="center" style={{ width: "70px", border: "1px solid black" }}>{t.out}</td>
                                <td style={{ width: "100px", border: "1px solid black" }}></td>
                              </tr>)
                            }

                          </table>



                        )}
                      </div>
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




