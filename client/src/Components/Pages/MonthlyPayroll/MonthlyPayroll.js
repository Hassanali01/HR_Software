import React, { useRef } from 'react'
import { useState } from 'react';
import moment from "moment";
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


  const [empLeaves, setEmpLeaves] = useState([])
  const [gaztedholiday, setGaztedholiday] = useState([])
  const [empshift, setEmpshift] = useState([])

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
      console.log(attendanceTemp, "attendenceTemp")
      attendanceTemp.length > 0 && NotificationManager.success("Successfully Generated")
      attendanceTemp.length == 0 && NotificationManager.error("Selected Month has no Data")
      const tempUserAttendance = userAttendance;
      attendanceTemp.map((at) => {
        //agr sari company ka payroll chahiya to if ko comment kr kr nichy wali statement ko uncommnt kr dy
        if (at.employee.company_payroll == "Sagacious Systems") {
          tempUserAttendance[`${at.employee && at.employee.username && at.employee.username}`] = []
        }
        //is statement ko remove nai krna ya total employess ki payroll ko generate karta hain...
        // tempUserAttendance[`${at.employee && at.employee.username && at.employee.username}`] = []
      })


      const approvedLeave = await axios.get(`/leaverequest/approved-leaves/${payrollMonth}`)
      setEmpLeaves(approvedLeave.data.totaldays)


      const gaztedholidays = await axios.get(`/holiday/detail`)
      setGaztedholiday(gaztedholidays.data)
      console.log("gaztedholiday", gaztedholidays.data)


      //shift data fetch
      const shift = await axios.get(`/shifts/allShifts`)
      setEmpshift(shift.data)
      console.log("shift", shift.data)






      Object.entries(tempUserAttendance).forEach(
        ([key, value]) => tempUserAttendance[`${key}`] = tempUserAttendance[`${key}`].concat(attendanceTemp.filter((at) => at.employee && at.employee.username == key))
      );


      // adding leaves inside the user attendance
      Object.entries(tempUserAttendance).forEach(
        ([key, value]) => {
          let appliedLeaves = approvedLeave.data.totaldays.filter((td) => td.username == key)
          appliedLeaves.forEach((al) => {
            tempUserAttendance[`${key}`].filter((te) => te.date == al.date)[0].status = "LWP"
          })
        }
      );


    

      setUserAttendance(tempUserAttendance)
      console.log("userattendence", userAttendance)






      for (let i in userAttendance) {
        const a = userAttendance[i]
        const singleuser = a.map((j) => {
          const slaps = j.employee.shift_id.slaps
          const date = j.in
          const splitdate = date.split(":")
          const sampleDateIn = new Date()

          sampleDateIn.setHours(splitdate[0])
          sampleDateIn.setMinutes(splitdate[1])
          console.log('sampleDateIn', sampleDateIn)
          slaps.forEach((s) => {
            const slapname = Object.keys(s)[0]
            const splitSlap = slapname.split(":")
            const sampleDateSlap = new Date()
            sampleDateSlap.setHours(splitSlap[0])
            sampleDateSlap.setMinutes(splitSlap[1])
            console.log("sample slap date", sampleDateSlap)
            if (sampleDateIn > sampleDateSlap) {
              console.log("checkin >= 9:30")
              j.status = (1 - s[slapname])
            }
          })
          console.log("splitdate", splitdate)
          console.log("slaps", slaps)
          console.log("date", date)













          // console.log(j.employee.shift_id)
          // const usershift = shift.data.map((k) => {
          //   // console.log("k",k._id)
          //   if (k._id == j.employee.shift_id) {
          //     if (j.in >= "09:00") {

          //     }
          //   }
          // })
        })
      }

 // adding Day-Of inside the user attendance
 Object.entries(tempUserAttendance).forEach(([key, value]) => {
  let dayof = daysOfMonth.filter((td) => td.day == "Sun");
  dayof.forEach((al) => {
    tempUserAttendance[key].forEach((te) => {
      const locale = "en-US"
      var date = new Date(te.date);
      var day = date.toLocaleDateString(locale, { weekday: 'long' });
      if (day == "Sunday") {
        te.status = "DO";
      }
    });
  });
});

// Adding last saturday dayoff
Object.entries(tempUserAttendance).forEach(([key, value]) => {
  let allSat = daysOfMonth.filter((st) => st.day == "Sat")
  const lastSat = allSat[allSat.length - 1]
  const [day, month, year] = lastSat.date.split('/');
  const convertedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const Finalsat = convertedDate.toISOString();
  tempUserAttendance[key].forEach((te) => {
    if (Finalsat == te.date) {
      te.status = "DO";
    }
  })
})


//Adding gazted holidays in payroll
Object.entries(tempUserAttendance).forEach(([key, value]) => {
  //  console.log("yes",gaztedholidays.data[0].date)
  const a = gaztedholidays.data.map((i) => {
    tempUserAttendance[key].forEach((te) => {
      if (i.date == te.date) {
        te.status = "GH";
      }
    })
  })

})




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