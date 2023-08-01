import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Dashboard from '../../Dashboard/Dashboard'
import axios from "axios"
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import ReactToPrint from "react-to-print";
import Calendar from 'react-calendar';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
// import './MonthlyPayroll.css'

const MonthlyPayroll = () => {
  let componentRef = useRef();
  const [payrollMonth, setPayrollMonth] = useState("")
  const [monthNo, setMonthNo] = useState(0);
  const [date, setDate] = useState(new Date());
  const [userAttendance, setUserAttendance] = useState({})
  const [monthAttendance, setMonthAttendance] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentCalendar, setCurrentCalendar] = useState((new Date().toLocaleString("en-US").split(",")[0]))
  const [update, setUpdate] = useState(false)
  function onChangeCalendar(e) {
    // console.log("change calendar",e)

    setCurrentCalendar(e.toLocaleString('en-US').split(",")[0])
    // console.log("the value of change calander", e.toLocaleString('en-US').split(",")[0])
    setPayrollMonth(e.toLocaleString('en-US', { month: "long" }))
    handleClose()
  }

  async function generateMonthAttendance() {
    try {
      const attendanceTemp = await (await axios.get(`/monthattendance/${payrollMonth}`)).data;
      attendanceTemp.length > 0 && NotificationManager.success("Successfully Generated")
      attendanceTemp.length == 0 && NotificationManager.error("Selected Month has no Data")
      const tempUserAttendance = userAttendance;
      attendanceTemp.map((at) => {
        tempUserAttendance[`${at.employee && at.employee.username && at.employee.username}`] = []
      })
      // console.log(tempUserAttendance, payrollMonth, "payrol.................")
      const approvedLeave = axios.get(`/leaverequest/approved-leaves/${payrollMonth}`)
        .then(response => {
          console.log(response.data, userAttendance, "----payroll...");
          // console.log(response.data.arr,"arr2------")
        
          // const modydataleave= response.data.modyfieddata.map((i)=>{
          //   // console.log(i,"iiiiiiiiiiiiiiiiiii")
          //   const a1=i.Totaldays
          //   // console.log(a1,"a111111111111111111")
          //   for(let j in a1){
          //     // console.log(a1[j],"jjjjjjjjjjjjjjjjjjjjjjjjjjj")
          //      for(let l in userAttendance){
          //       // console.log(userAttendance[l],"lllll")
          //       const b1 = userAttendance[l]
          //       for(let m of b1){
          //         // console.log(m.date,"mmmmm")
          //         if(m.date==a1[j]){
          //           console.log(m.date, "&&" , a1[j],"yes....")
          //         }
          //       }
          //      }
          //   }
          // })

        })
        .catch(error => {
          console.log(error, "yess ...error");
        });

      
      Object.entries(tempUserAttendance).forEach(
        ([key, value]) => tempUserAttendance[`${key}`] = tempUserAttendance[`${key}`].concat(attendanceTemp.filter((at) => at.employee.username == key))
      );
      setUserAttendance(tempUserAttendance)
      setUpdate(!update)
    } catch (error) {
      NotificationManager.error("Please select  the month of Payroll")
      // console.log(error)
    }




  }

  function printPDF() {
    var printDoc = new jsPDF('p', 'mm', [1000, 1000]);
    var content = document.getElementById("payrollTable");
    printDoc.autoTable({
      html: '#payrollTable',
      // startY: 70,  
      // theme: 'grid',  
      // columnStyles: {  
      //     0: {  
      //         cellWidth: 180,  
      //     },  
      //     1: {  
      //         cellWidth: 180,  
      //     },  
      //     2: {  
      //         cellWidth: 180,  
      //     }  
      // },  
      // styles: {  
      //     minCellHeight: 40  
      // }  
    })
    printDoc.save();

    // printDoc.html(content,
    // {
    //   callback: function(doc) {
    //     console.log("in callback");
    //     doc.save();
    //   }
    // });
  }

  // printDoc.autoPrint();
  // printDoc.output("dataurlnewwindow"); // this opens a new popup,  after this the PDF opens the print window view but there are browser inconsistencies with how this is handled

  var splitDate = currentCalendar.split("/");
  var month = splitDate[0];
  var year = splitDate[2];
  var days = daysInMonth(month, year);
  const daysOfMonth = [];
  for (let i = 1; i <= days; i++) {
    daysOfMonth.push({ date: `${i}/${month}/${year}`, day: new Date(`${month}/${i}/${year}`).toLocaleString('en-us', { weekday: 'short' }) })
  }

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  // Attendance of month

  useEffect(() => {
    console.log("payroll.....useeffect");


  }, []);

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Monthly Payroll</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Monthly Payroll</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className='card' style={{ marginLeft: "40px", marginRight: "40px" }}>
          <div className='card-body'>
            <Button className="mr-3" variant="primary" onClick={handleShow}>
              Select the Month
            </Button>

            Payroll Month: &nbsp;
            <input className="mr-3" value={payrollMonth} disabled="true"></input>
            <Modal show={show} onHide={handleClose}>
              <div className='d-flex justify-content-center'>
                <Calendar
                  onChange={onChangeCalendar}
                  value={date}
                  maxDetail='year'
                />
              </div>
            </Modal>

            <Button className="mr-3" onClick={generateMonthAttendance}>Generate Payroll</Button>

            {/* <button onClick={printPDF}>Print Payroll</button> */}
            <ReactToPrint
              trigger={() => <Button>Print Payroll</Button>}
              content={() => componentRef}
            // pageStyle='@page { size: A4 landscape; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
            />
            {/* component to be printed */}
            {/* <ComponentToPrint ref={(el) => (componentRef = el)} /> */}
            <div className="mt-3" style={{ overflow: "auto", width: "78vw", height: "68vh", }}>
              {/* <style type="text/css" media="print">{"@page {size: landscape;}"}</style> */}
              <table
                ref={(el) => (componentRef = el)} style={{ border: "1px solid black" }} id="payrollTable" className='payrollTable'>
                <tr style={{ backgroundColor: "#89CFF0" }}>
                  <th rowspan="2" style={{ border: "1px solid black" }}>Employee ID</th>
                  <th rowspan="2" style={{ border: "1px solid black" }}>Name</th>
                  <th rowspan="2" style={{ border: "1px solid black" }}>Department</th>
                  {daysOfMonth.map((dm) => <th style={{ border: "1px solid black" }}>{dm.date.split("/")[0]}</th>)}
                  <th style={{ border: "1px solid black", width: "20px" }}></th>
                  <th colSpan="8" style={{ border: "1px solid black", textAlign: "center" }}>Total Pay Days</th>
                  <th rowspan="2" style={{ border: "1px solid black" }}>Extra Days</th>
                  <th colSpan="4" style={{ border: "1px solid black", textAlign: "center" }}>Deductions</th>
                </tr>
                <tr style={{ backgroundColor: "#89CFF0" }}>
                  {daysOfMonth.map((dm) => <th style={{ border: "1px solid black" }}>{dm.day}</th>)}
                  <td style={{ border: "1px solid black", width: "20px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <th style={{ border: "1px solid black" }}>W.D</th>
                  <th style={{ border: "1px solid black" }}>H.W</th>
                  <th style={{ border: "1px solid black" }}>L.W.P</th>
                  <th style={{ border: "1px solid black" }}>CPL</th>
                  <th style={{ border: "1px solid black" }}>G.H</th>
                  <th style={{ border: "1px solid black" }}>D.O</th>
                  <th style={{ border: "1px solid black" }}>Class</th>
                  <th style={{ border: "1px solid black" }}>T.Days</th>
                  <th style={{ border: "1px solid black" }}>LWOP</th>
                  <th style={{ border: "1px solid black" }}>Absent</th>
                  <th style={{ border: "1px solid black" }}>Late</th>
                  <th style={{ border: "1px solid black" }}>Total</th>
                </tr>
                {Object.entries(userAttendance).map(
                  ([key, value]) =>
                    <tr>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`][0] && userAttendance[`${key}`][0].employee.emp_id}</td>
                      <td style={{ border: "1px solid black", textAlign: "left" }}>{key}</td>
                      <td style={{ border: "1px solid black", textAlign: "left" }}>{userAttendance[`${key}`][0] && userAttendance[`${key}`][0].employee.departments[0] && userAttendance[`${key}`][0].employee.departments[0].departmentname}</td>
                      {
                        (userAttendance[`${key}`].length > 0) ?
                          <>
                          </>
                          :
                          <></>
                      }
                      {

                        daysOfMonth.map((dm) => {
                          return (
                            <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => parseInt(dm.date.split("/")[0]) == parseInt(tu.date.split("-")[2].split("T")[0]))[0] && userAttendance[`${key}`].filter((tu) => parseInt(dm.date.split("/")[0]) == parseInt(tu.date.split("-")[2].split("T")[0]))[0].status}</td>
                          )

                        })

                      }
                      <td></td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'P').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'HW').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWP').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'CPL').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'GH').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'DO').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'test').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'P' || tu.status == 'HW' || tu.status == 'LWP' || tu.status == 'CPL' || tu.status == 'GH' || tu.status == 'DO').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'extraDay').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWOP').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'A').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'Late').length}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWOP' || tu.status == 'A' || tu.status == 'Late').length}</td>
                    </tr>)
                }
              </table>
            </div>
          </div>
        </section>
      </div>
      <NotificationContainer />
    </>
  )
}
export default MonthlyPayroll