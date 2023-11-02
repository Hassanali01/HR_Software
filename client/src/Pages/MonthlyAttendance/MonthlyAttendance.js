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
import { generateItems, generateFormulaFields, supportedRefs } from './../../formulaParser/shared-demo/gen'
import { evaluateTokenNodes, getExtendedTokens } from './../../formulaParser/shared/src'
import 'react-calendar/dist/Calendar.css';
const { v4: uuidv4 } = require('uuid');



const MonthlyAttendance = () => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState();
  const [payrollMonth, setPayrollMonth] = useState("")
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState();
  const [tableData, setTableData] = useState([]);
  const [employeesAttendance, setEmployeesAttendance] = useState({});
  const [empshift, setEmpshift] = useState([])
  const [empLeaves, setEmpLeaves] = useState([])
  const [currentCalendar, setCurrentCalendar] = useState((new Date().toLocaleString("en-US").split(",")[0]))
  const [usersPayrollCalculations, setUsersPayrollCalculations] = useState({})
  const [fields, setFields] = useState(generateFormulaFields())

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onChangeCalendar(e) {
    setCurrentCalendar(e.toLocaleString('en-US').split(",")[0])
    setPayrollMonth(e.toLocaleString('en-US', { month: "long" }))
    handleClose()
  }


  function PrintElem(elem) {

    var mywindow = window.open('', 'PRINT', 'height=900,width=1200');
    mywindow.document.write('<html><head><title>' + 'title' + '</title>');
    mywindow.document.write('<style>* {-webkit-print-color-adjust: exact !important;}</style>')
    mywindow.document.write('</head><body ><div>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</div></body></html>');
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
    return true;
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
    let fromExcel = d.in;
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
      const shifts = await (await axios.get(process.env.React_APP_ORIGIN_URL + `shifts/allShifts`)).data
      setEmpshift(shifts)
      const approvedLeave = await (await axios.get(process.env.React_APP_ORIGIN_URL + `leaverequest/approved-leaves/${payrollMonth}`)).data
      setEmpLeaves(approvedLeave.totaldays)

      tempAttendance.forEach((att) => {
        if (att.status == "A") {
          att.in = "Absent";
          att.out = "Absent";
        }
      })



      // adding CPL inside the user attendance
      tempAttendance.forEach(
        (tempAtt) => {
          let appliedLeaves = approvedLeave.totaldays.filter((al) => al.employee && al.employee.emp_id == tempAtt.Employee_ID && al.Short_leave != "True" && al.leaveNature == "C.P.L" && al.date == tempAtt.date)
          if (appliedLeaves.length > 0) {
            tempAtt.status = "CPL"
          }
        }
      );


      // adding 1 inside the user attendance
      tempAttendance.forEach((te) => {
        if (te.status == "P") {
          te.status = 1;
        }
      })


      //Adding shift slabs in payroll
      const singleuser = tempAttendance.map((j) => {
        if (j.employee.work_shift && j.status == 1) {
          j.employee.work_shift.forEach((ps) => {
            if (new Date(j.date) >= new Date(ps.dateFrom) && new Date(j.date) <= new Date(ps.dateTo)) {
              // Deduction for employees on late arrival
              const date = j.in
              const splitdate = date.split(":")
              const sampleDateIn = new Date()
              sampleDateIn.setHours(splitdate[0])
              sampleDateIn.setMinutes(splitdate[1])
              let deductionForLate = 0
              ps.workShift.slabs.forEach((s) => {
                const slabsname = s.later_than
                const splitSlabs = slabsname.split(":")
                const sampleDateSlabs = new Date()
                sampleDateSlabs.setHours(splitSlabs[0])
                sampleDateSlabs.setMinutes(splitSlabs[1])
                if (sampleDateIn > sampleDateSlabs && s.deduction > deductionForLate) {
                  deductionForLate = s.deduction;
                }
              })
              j.status = j.status - deductionForLate
              // Deduction for employees on early leaver
              const checkOut = j.out
              const checkOutArr = checkOut.split(":")
              const sampleDateOut = new Date()
              sampleDateOut.setHours(checkOutArr[0])
              sampleDateOut.setMinutes(checkOutArr[1])
              let deductionForEarlyLeaver = 0
              ps.workShift.early_leave_slabs.forEach((s) => {
                const earlyLeaveTime = s.early_leave_time
                const earlyLeaveTimeArr = earlyLeaveTime.split(":")
                const sampleDateEarlyLeaveSlabs = new Date()
                sampleDateEarlyLeaveSlabs.setHours(earlyLeaveTimeArr[0])
                sampleDateEarlyLeaveSlabs.setMinutes(earlyLeaveTimeArr[1])
                if (sampleDateOut < sampleDateEarlyLeaveSlabs && s.deduction > deductionForEarlyLeaver) {
                  deductionForEarlyLeaver = s.deduction
                }
              })
              j.status = j.status - deductionForEarlyLeaver
            }
          })
        }
      })

      // Add early leaver LWP and LWOP in payroll
      tempAttendance.forEach(
        (tempAtt) => {

          let appliedLeaves = approvedLeave.totaldays.filter((td) => td.employee && td.employee.emp_id == tempAtt.Employee_ID && td.Short_leave == "True")
          appliedLeaves.forEach((al) => {
            if (al.leaveNature == "L.W.P" && tempAtt.date == al.date) {
              tempAtt.status += " LWP"
            }
            else if (al.leaveNature == "L.W.O.P" && tempAtt.date == al.date) {
              tempAtt.status += " LWOP"
            }
          })
        }
      );


      // adding GH inside the user attendance
      gaztedholidays.map((i) => {
        tempAttendance.forEach((te) => {
          if (i.current == moment(te.date).utc().format('YYYY-MM-DD')) {
            if (te.employee.payroll_setup && te.employee.payroll_setup.applyGazettedHoliday) {
              if (te.status == 'A') {
                te.in = "G.H";
                te.out = "G.H";
                te.status = "G.H"
              }
            }
          }
        })
      })


      // Adding last saturday dayoff
      function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
      }

      var splitDate = currentCalendar.split("/");
      var selectedMonth = splitDate[0];
      var selectedYear = splitDate[2];
      var days = daysInMonth(selectedMonth, selectedYear);
      const daysOfMonth = [];
      for (let i = 1; i <= days; i++) {
        daysOfMonth.push({ date: `${i}/${selectedMonth}/${selectedYear}`, day: new Date(`${selectedMonth}/${i}/${selectedYear}`).toLocaleString('en-us', { weekday: 'short' }) })
      }
      let allSat = daysOfMonth.filter((st) => st.day == "Sat")
      const lastSat = allSat[allSat.length - 1]
      const [day, month, year] = lastSat.date.split('/');
      const convertedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
      const Finalsat = convertedDate.toISOString();
      tempAttendance.forEach((te, index) => {

        if (Finalsat ==  te.date  && (tempAttendance[index-1] && tempAttendance[index-1].status) ==  "A" && ((tempAttendance[index+2] && tempAttendance[index+2].status )  == "A")){
                 
          te.status = "A";
        }else if (Finalsat == te.date && te.employee.payroll_setup && te.employee.payroll_setup.length>0 && te.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && te.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff.lastSaturdayDayoff) {
          te.status = "D.O";
          te.in = "Day off";
          te.out = "Day off";
        }
      })



      // adding DO inside the user attendance
      tempAttendance.forEach((att, index) => {


        const locale = "en-US"
        var date = new Date(att.date);
        var day = date.toLocaleDateString(locale, { weekday: 'long' });
        att.day = day

        if (day == "Sunday"  && (tempAttendance[index-1] && tempAttendance[index-1].status) ==  "A" && ((tempAttendance[index+1] && tempAttendance[index+1].status )  == "A")){
                 
           att.status = "A";
         }else  if (day == "Sunday" 
          && att.employee.payroll_setup && att.employee.payroll_setup && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff.sundayDayoff
        ) {
          att.in = "Day off";
          att.out = "Day off";
          att.status = "D.O"
        } 
      })


      // adding Monday DO inside the user attendance
      tempAttendance.forEach((att) => {
        const locale = "en-US"
        var date = new Date(att.date);
        var day = date.toLocaleDateString(locale, { weekday: 'long' });
        att.day = day
        if (day == "Monday"
          && att.employee.payroll_setup && att.employee.payroll_setup.length > 0 && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff &&  att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff.mondayDayoff
        ) {
          att.in = "Day off";
          att.out = "Day off";
          att.status = "D.O"
        }
      })


      // adding Tuesday DO inside the user attendance
      tempAttendance.forEach((att) => {
        const locale = "en-US"
        var date = new Date(att.date);
        var day = date.toLocaleDateString(locale, { weekday: 'long' });
        att.day = day
        if (day == "Tuesday"
          && att.employee.payroll_setup && att.employee.payroll_setup && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff.tuesdayDayoff
        ) {
          att.in = "Day off";
          att.out = "Day off";
          att.status = "D.O"
        }
      })

      // adding Wednesday DO inside the user attendance
      tempAttendance.forEach((att) => {
        const locale = "en-US"
        var date = new Date(att.date);
        var day = date.toLocaleDateString(locale, { weekday: 'long' });
        att.day = day
        if (day == "Wednesday"
          && att.employee.payroll_setup && att.employee.payroll_setup && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff.wednesdayDayoff
        ) {
          att.in = "Day off";
          att.out = "Day off";
          att.status = "D.O"
        }
      })

      // adding Thursday DO inside the user attendance
      tempAttendance.forEach((att) => {
        const locale = "en-US"
        var date = new Date(att.date);
        var day = date.toLocaleDateString(locale, { weekday: 'long' });
        att.day = day
        if (day == "Thursday"
          && att.employee.payroll_setup && att.employee.payroll_setup && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff.thursdayDayoff
        ) {
          att.in = "Day off";
          att.out = "Day off";
          att.status = "D.O"
        }
      })


      // adding Friday DO inside the user attendance
      tempAttendance.forEach((att) => {
        const locale = "en-US"
        var date = new Date(att.date);
        var day = date.toLocaleDateString(locale, { weekday: 'long' });
        att.day = day
        if (day == "Friday"
          && att.employee.payroll_setup && att.employee.payroll_setup && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff.fridayDayoff
        ) {
          att.in = "Day off";
          att.out = "Day off";
          att.status = "D.O"
        }
      })


      // adding Saturday DO inside the user attendance
      tempAttendance.forEach((att) => {
        const locale = "en-US"
        var date = new Date(att.date);
        var day = date.toLocaleDateString(locale, { weekday: 'long' });
        att.day = day
        if (day == "Saturday"
          && att.employee.payroll_setup && att.employee.payroll_setup && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff && att.employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.daysoff.saturdayDayoff
        ) {
          att.in = "Day off";
          att.out = "Day off";
          att.status = "D.O"
        }
      })


      
      // adding LWP inside the user attendance
      tempAttendance.forEach(
        (tempAtt) => {
          let appliedLeaves = approvedLeave.totaldays.filter((al) => al.employee && al.employee.emp_id == tempAtt.Employee_ID && al.Short_leave != "True" && al.leaveNature == "L.W.P" && al.date == tempAtt.date)
          if (appliedLeaves.length > 0) {
            tempAtt.status = "LWP"
          }
        }
      );

      // adding LWOP inside the user attendance
      tempAttendance.forEach(
        (tempAtt) => {
          let appliedLeaves = approvedLeave.totaldays.filter((al) => al.employee && al.employee.emp_id == tempAtt.Employee_ID && al.Short_leave != "True" && al.leaveNature == "L.W.O.P" && al.date == tempAtt.date)
          if (appliedLeaves.length > 0) {
            tempAtt.status = "LWOP"
          }
        }
      );


      //Employee joining date modification in payroll
      tempAttendance.forEach((te) => {
        const dateToCompare = new Date(te.date)
        if (dateToCompare.setDate(dateToCompare.getDate()) < (new Date(te.employee.joiningdate))) {
          te.status = "";
          te.in = "";
          te.out = "";
        }
      })


      //Employee resigned date modification in payroll
      tempAttendance.forEach((te) => {
        const dateToCompare = new Date(te.date)
        if (dateToCompare.setDate(dateToCompare.getDate() + 1) > (new Date(te.employee.date_of_resignation))) {
          te.status = "";
          te.in = "";
          te.out = "";
        }
      })
      const attendanceByEmployee = tempAttendance.reduce((empAtt, tempAtt) => {
        const { Employee_ID } = tempAtt;
        empAtt[Employee_ID] = empAtt[Employee_ID] ? empAtt[Employee_ID] : [];
        empAtt[Employee_ID].push(tempAtt);
        return empAtt;
      }, {});


      setEmployeesAttendance(attendanceByEmployee)
      setTableData(tempAttendance)

      Object.entries(attendanceByEmployee).forEach(
        ([key, value]) => {



          const addField = () => {
            setFields([...fields, { id: uuidv4(), referenceName: 'netpaydays', npd_formula: value[0].employee.payroll_setup && value[0].employee.payroll_setup.filter((p)=>((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) )[0].payrollSetup.npd_formula }])
          }

          addField()

          const formulasByRefs = [...fields, { id: uuidv4(), referenceName: 'netpaydays', npd_formula: value[0].employee.payroll_setup && value[0].employee.payroll_setup.filter((p)=>{
            return((new Date()) >= new Date(p.dateFrom) && (new Date()) <= new Date(p.dateTo)) })[0].payrollSetup.npd_formula }].reduce((out, field) => {
            if (field.referenceName) {
              out[field.referenceName] = field.npd_formula
            }
            return out
          }, {})

          try {



            const extendedTokens = getExtendedTokens(formulasByRefs, supportedRefs)
            const extendedTokensOrdered = Object.values(extendedTokens).sort((a, b) => a.order - b.order)

            const items = generateItems(
              attendanceByEmployee[`${key}`].length > 0 && attendanceByEmployee[`${key}`].filter((tu) => tu.status == 1 || tu.status == 0.25 || tu.status == 0.5 || tu.status == 0.75 || tu.status == 1.5 || tu.status == 2).reduce((total, num) => { return (total + num.status) }, 0) + (attendanceByEmployee[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWP")).reduce((total, num) => { return (total + (parseFloat(num.status.split(" ")[0]))) }, 0),
              attendanceByEmployee[`${key}`].length > 0 && attendanceByEmployee[`${key}`].filter((tu) => tu.status == 'D.O').length,
              attendanceByEmployee[`${key}`].length > 0 && attendanceByEmployee[`${key}`].filter((tu) => tu.status == 'G.H').length,
              0,
              attendanceByEmployee[`${key}`].length > 0 && attendanceByEmployee[`${key}`].filter((tu) => tu.status == 'LWP').length,
              parseFloat(attendanceByEmployee[`${key}`].length > 0 && attendanceByEmployee[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWP").reduce((total, num) => { return (total + (1 - parseFloat(num.status.split(" ")[0]))) }, 0)),
              attendanceByEmployee[`${key}`].length > 0 && attendanceByEmployee[`${key}`].filter((tu) => tu.status == 'A').length
            )

            const extendedItems =
              items.map((item) => {
                const extendedItem = {}
                Object.entries(item).forEach(([key, value]) => {
                  extendedItem[key] = (value === 0 ? 0 : (value || '')).toString()
                })
                extendedTokensOrdered.forEach((entry) => {
                  extendedItem[entry.referenceNameOrig] = evaluateTokenNodes(entry.tokenNodes, (prop) => (extendedItem[prop] || '').toString())
                })
                return extendedItem
              })
            usersPayrollCalculations[`${key}`] = { netpaydays: extendedItems[0].netpaydays }
          } catch (err) { console.log("error", err) }
        }
      );
      tempAttendance.length > 0 && NotificationManager.success("Successfully Updated");
    } catch (error) {
      console.log("error", error)
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
                    <div>
                      <div className="ml-5">
                        <Button className="mr-3" variant="primary" onClick={handleShow} style={{ backgroundColor: "rgb(137, 179, 83)" }}>
                          Select the Month
                        </Button>
                        Attendance Month: &nbsp;
                        <input className="mr-3" value={payrollMonth} disabled="true"></input>
                        <Button className="mr-3 showAttendance" onClick={showMonthAttendance} style={{ backgroundColor: "rgb(137, 179, 83)" }}>Fetch</Button>
                        <Button style={{ marginLeft: "20%", backgroundColor: "rgb(137, 179, 83)" }} onClick={() => { PrintElem('AttendanceToPrint') }}>Print monthly attendance</Button>
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

                      <div style={{ display: "none" }} className='AttendanceToPrint' id='AttendanceToPrint'>
                        {Object.keys(employeesAttendance).map(key =>
                          <div className="pageperemployee" style={{ pageBreakAfter: "always" }}>
                            <table style={{
                              fontSize: 12, fontFamily: "arial", border: "1px solid black", borderCollapse: "collapse"
                            }} >
                              <tr style={{ fontWeight: "bold", fontSize: 18, border: "2px solid black", height: 50, backgroundColor: "silver" }}>
                                <th colSpan={7}>
                                  Attendance {payrollMonth} 23
                                </th>
                              </tr>

                              <tr style={{ height: 40 }}>
                                <td colSpan={3} > <span style={{ fontWeight: "bold" }}>Name:</span> {employeesAttendance[key][0].Name}</td>
                                <td colSpan={4} ><span style={{ fontWeight: "bold" }}>Department:</span>  {employeesAttendance[key][0].department}</td>
                              </tr>

                              <tr style={{ height: 30 }}>
                                <th style={{ width: "100px", border: "1px solid black" }}>Date</th>
                                <th style={{ width: "100px", border: "1px solid black" }}>Day</th>
                                <th style={{ width: "100px", border: "1px solid black" }}>Check In</th>
                                <th style={{ width: "100px", border: "1px solid black" }}>Check Out</th>
                                <th style={{ width: "70px", border: "1px solid black" }}>Status</th>
                                <th style={{ width: "270px", border: "1px solid black" }}>Remarks</th>
                              </tr>
                              {
                                employeesAttendance[key].map((t) => <tr style={{ height: 25 }}>
                                  <td align="center" style={{ width: "100px", border: "1px solid black" }}>{t.Date}</td>
                                  <td style={{ width: "100px", border: "1px solid black" }}>{t.day}</td>
                                  <td align="center" style={{ width: "100px", border: "1px solid black" }}>{t.in}</td>
                                  <td align="center" style={{ width: "100px", border: "1px solid black" }}>{t.out}</td>
                                  <td align="center" style={{ width: "70px", border: "1px solid black" }}>{t.status}</td>
                                  <td style={{ width: "270px", border: "1px solid black" }}></td>
                                </tr>)
                              }

                              <tr style={{ height: 30 }}>
                                <td colSpan={5}></td>
                                <td colSpan={1} style={{}}><span style={{ fontWeight: "bold" }}>Net pay days:</span> {usersPayrollCalculations[`${key}`] && usersPayrollCalculations[`${key}`].netpaydays}</td>
                              </tr>
                            </table>
                            <div style={{ marginTop: 40 }}>
                              <div style={{ marginLeft: "75%", fontSize: 15, marginRight: 0 }}>
                                <span style={{ fontWeight: "bold" }}>Verified by:</span> <span style={{ borderBottom: "1px solid black" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                              </div>
                            </div>
                          </div>
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




