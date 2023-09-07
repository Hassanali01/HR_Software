import React, { useRef } from 'react'
import { useState } from 'react';
import moment from "moment";
import { Context } from '../../Context/Context';
import { useEffect, useContext } from 'react';
import axios from "axios"
import ReactToPrint from "react-to-print";
import Calendar from 'react-calendar';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import { generateItems, generateFormulaFields, supportedRefs } from './../../formulaParser/shared-demo/gen'
import { evaluateTokenNodes, getExtendedTokens } from './../../formulaParser/shared/src'
import 'react-calendar/dist/Calendar.css';
import './MonthlyPayroll.css'
import HeaderContext from '../../Context/HeaderContext'
import { Form } from "react-bootstrap";


const MonthlyPayroll = () => {
  const context = useContext(Context);
  let componentRef = useRef();
  const [payrollMonth, setPayrollMonth] = useState("")
  const [date, setDate] = useState(new Date());
  const [userAttendance, setUserAttendance] = useState({})
  const [usersPayrollCalculations, setUsersPayrollCalculations] = useState({})
  const [loading, setLoading] = useState(false);
  const [empLeaves, setEmpLeaves] = useState([])
  const [gaztedholiday, setGaztedholiday] = useState([])
  const [empshift, setEmpshift] = useState([])
  const [currentCalendar, setCurrentCalendar] = useState((new Date().toLocaleString("en-US").split(",")[0]))
  const [update, setUpdate] = useState(false)
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [fields, setFields] = useState(generateFormulaFields())
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState();
  const [comapnyID, setCompanyID] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [key, setKey] = useState(0)


  const CompanyName = (e) => {
    setCompanyID(e)

  }

  // For fetching current time to display on report
  useEffect(() => {
    getdata();
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Monthly Payroll")
  })

  function onChangeCalendar(e) {
    setCurrentCalendar(e.toLocaleString('en-US').split(",")[0])
    setPayrollMonth(e.toLocaleString('en-US', { month: "long" }))
    handleClose()
  }

  const getdata = async () => {
    try {
      const companies = await axios.get(process.env.React_APP_ORIGIN_URL + `allCompany`)
      const cs = companies.data
      setCompany(cs)
    }
    catch (error) {
      console.log(error);
    }
  }

  async function generateMonthAttendance() {
    try {
      setLoading(true);
      const attendanceTemp = await (await axios.get(process.env.React_APP_ORIGIN_URL + `monthattendance/${payrollMonth}`)).data;
      setLoading(false)
      attendanceTemp.length > 0 && NotificationManager.success("Successfully Generated")
      attendanceTemp.length == 0 && NotificationManager.error("Selected Month has no Data")
      const tempUserAttendance = userAttendance;

      attendanceTemp.map((at) => {
        if (at.employee.company == comapnyID) {
          //filter for all
          tempUserAttendance[`${at.employee && at.employee.username && at.employee.username}`] = []
        }
      })

      const approvedLeave = await axios.get(process.env.React_APP_ORIGIN_URL + `leaverequest/approved-leaves/${payrollMonth}`)
      setEmpLeaves(approvedLeave.data.totaldays)

      const gaztedholidays = await axios.get(process.env.React_APP_ORIGIN_URL + `holiday/holidaypayroll`)
      setGaztedholiday(gaztedholidays.data)

      //shift data fetch
      let shift = await axios.get(process.env.React_APP_ORIGIN_URL + `shifts/allShifts`)
      shift = shift.data
      setEmpshift(shift)


      Object.entries(tempUserAttendance).forEach(
        ([key, value]) => tempUserAttendance[`${key}`] = tempUserAttendance[`${key}`].concat(attendanceTemp.filter((at) => at.employee && at.employee.username == key))
      );


      // adding LWP inside the user attendance
      Object.entries(tempUserAttendance).forEach(
        ([key, value]) => {
          let appliedLeaves = approvedLeave.data.totaldays.filter((td) => td.username == key && td.Short_leave != "True" && td.leaveNature == "L.W.P")
          appliedLeaves.forEach((al) => {
            tempUserAttendance[`${key}`].filter((te) => te.date == al.date)[0].status = "LWP"
          })
        }
      );



      // adding CPL inside the user attendance
      Object.entries(tempUserAttendance).forEach(
        ([key, value]) => {
          let appliedLeaves = approvedLeave.data.totaldays.filter((td) => td.username == key && td.Short_leave != "True" && td.leaveNature == "C.P.L")
          appliedLeaves.forEach((al) => {
            tempUserAttendance[`${key}`].filter((te) => te.date == al.date)[0].status = "CPL"
          })
        }
      );



      // adding LWOP inside the user attendance
      Object.entries(tempUserAttendance).forEach(
        ([key, value]) => {
          let appliedLeaves = approvedLeave.data.totaldays.filter((td) => td.username == key && td.Short_leave != "True" && td.leaveNature == "L.W.O.P")
          appliedLeaves.forEach((al) => {
            tempUserAttendance[`${key}`].filter((te) => te.date == al.date)[0].status = "LWOP"
          })
        }
      );


      //Adding 1 in P in payroll
      Object.entries(tempUserAttendance).forEach(([key, value]) => {
        tempUserAttendance[key].forEach((te) => {
          if (te.status == "P") {
            te.status = 1;
          }
        })
      })


      //Adding shift slabs in payroll
      for (let i in userAttendance) {
        const a = userAttendance[i]
        const singleuser = a.map((j) => {
          if (j.employee.work_shift && j.status == 1) {
            const currentShift = j.employee.work_shift
            // Deduction for employees on late arrival
            const date = j.in
            const splitdate = date.split(":")
            const sampleDateIn = new Date()
            sampleDateIn.setHours(splitdate[0])
            sampleDateIn.setMinutes(splitdate[1])
            let deductionForLate = 0
            currentShift.slabs.forEach((s) => {
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
            currentShift.early_leave_slabs.forEach((s) => {
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


      // Add early leaver LWP and LWOP in payroll
      Object.entries(tempUserAttendance).forEach(
        ([key, value]) => {
          let appliedLeaves = approvedLeave.data.totaldays.filter((td) => td.username == key && td.Short_leave == "True")
          appliedLeaves.forEach((al) => {
            if (al.leaveNature == "L.W.P") {
              tempUserAttendance[`${key}`].filter((te) => te.date == al.date)[0].status += " LWP"
            }
            else {
              tempUserAttendance[`${key}`].filter((te) => te.date == al.date)[0].status += " LWOP"
            }
          })
        }
      );


      // adding Day-Off inside the user attendance
      Object.entries(tempUserAttendance).forEach(([key, value]) => {
        tempUserAttendance[key].forEach((te) => {
          const locale = "en-US"
          var date = new Date(te.date);
          var day = date.toLocaleDateString(locale, { weekday: 'long' });
          if (day == "Sunday" && te.employee.payroll_setup.daysoff && te.employee.payroll_setup.daysoff.sundayDayoff) {
            if (te.status == 'A') {
              te.status = "D.O";
            } else {
              te.status = te.status * 2
            }
          }
        });
      });


      // adding Tuesday Day-Off inside the user attendance
      Object.entries(tempUserAttendance).forEach(([key, value]) => {
        tempUserAttendance[key].forEach((te) => {
          const locale = "en-US"
          var date = new Date(te.date);
          var day = date.toLocaleDateString(locale, { weekday: 'long' });
          if (day == "Tuesday" && te.employee.payroll_setup.daysoff && te.employee.payroll_setup.daysoff.tuesdayDayoff) {
            if (te.status == 'A') {
              te.status = "D.O";
            } else {
              te.status = te.status * 2
            }
          }
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
          if (Finalsat == te.date && te.employee.payroll_setup && te.employee.payroll_setup.daysoff && te.employee.payroll_setup.daysoff.lastSaturdayDayoff) {
            te.status = "D.O";
          }
        })
      })


      //Adding gazted holidays in payroll
      Object.entries(tempUserAttendance).forEach(([key, value]) => {
        const a = gaztedholidays.data.map((i) => {
          tempUserAttendance[key].forEach((te) => {
            if (i.current == moment(te.date).utc().format('YYYY-MM-DD')) {
              if (te.employee.payroll_setup.applyGazettedHoliday) {
                if (te.status == 'A') {
                  te.status = "G.H";
                } else {
                  te.status = te.status * 2
                }
              }
            }
          })
        })
      })


      //Employee joining date modification in payroll
      Object.entries(tempUserAttendance).forEach(([key, value]) => {
        tempUserAttendance[key].forEach((te) => {
          const dateToCompare = new Date(te.date)
          if (dateToCompare.setDate(dateToCompare.getDate()) < (new Date(value[0].employee.joiningdate))) {
            te.status = "";
          }
        })
      })


      //Employee resigned date modification in payroll
      Object.entries(tempUserAttendance).forEach(([key, value]) => {
        tempUserAttendance[key].forEach((te) => {
          const dateToCompare = new Date(te.date)
          if (dateToCompare.setDate(dateToCompare.getDate() + 1) > (new Date(value[0].employee.date_of_resignation))) {
            te.status = "";
          }
        })
      })

      setUserAttendance(tempUserAttendance)
      setUpdate(!update)
    } catch (error) {
      setLoading(false);
      NotificationManager.error("Please select  the month of Payroll")
    }
  }

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

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  const formattedDateTime = currentDateTime.toLocaleDateString(undefined, options);
  let rowNumber = 0;



  return (
    <>
      <div className="content-wrapper">
    
        <section className='card' style={{ marginLeft: "40px", marginRight: "40px" }}>
        <div className="card-header  buttoncolor " style={{ paddingRight: "0px" , height: "57px"}}>
          <h3 className="card-title" style={{ fontWeight: "700" }} >
            Monthly Payroll
          </h3>
        </div>
          <div className='card-body'>
            <Button className="mr-3" variant="primary" onClick={handleShow} style={{ backgroundColor: "rgb(137, 179, 83)" }}>
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
            <select
              style={{ marginRight: "10px", outline: "none", padding: "2px 0px", backgroundColor: "#f5f3f3", borderColor: "darkgray", borderRadius: "2px" }}
              name="company"
              placeholder='Select Company'
              onChange={(event) => CompanyName(event.target.value)}
            >
              <option disabled selected hidden defaultValue={""}>Please Select Company</option>
              {company && company.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.title}
                </option>
              ))}
            </select>
            <Button className="mr-3" onClick={async () => {

              setUserAttendance({})
              setKey(currentKey => currentKey + 1)
              await generateMonthAttendance()

              // Applying the payroll formula for net pay days
              try {
                Object.entries(userAttendance).forEach(
                  ([key, value]) => {

                    const addField = () => {
                      setFields([...fields, { id: crypto.randomUUID(), referenceName: 'netpaydays', npd_formula: value[0].employee.payroll_setup && value[0].employee.payroll_setup.npd_formula }])
                    }
                    addField()
                    const formulasByRefs = [...fields, { id: crypto.randomUUID(), referenceName: 'netpaydays', npd_formula: value[0].employee.payroll_setup && value[0].employee.payroll_setup.npd_formula }].reduce((out, field) => {
                      if (field.referenceName) {
                        out[field.referenceName] = field.npd_formula
                      }
                      return out
                    }, {})

                    try {
                      const extendedTokens = formulasByRefs.netpaydays && getExtendedTokens(formulasByRefs, supportedRefs)
                      const extendedTokensOrdered = Object.values(extendedTokens).sort((a, b) => a.order - b.order)
                      const items = generateItems(
                        userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 1 || tu.status == 0.25 || tu.status == 0.5 || tu.status == 0.75 || tu.status == 1.5 || tu.status == 2).reduce((total, num) => { return (total + num.status) }, 0) + (userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && (tu.status.split(" ")[1] == "LWP" || tu.status.split(" ")[1] == "LWOP"))).reduce((total, num) => { return (total + (parseFloat(num.status.split(" ")[0]))) }, 0),
                        userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'D.O').length,
                        userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'G.H').length,
                        0,
                        userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWP').length + userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'CPL').length,
                        parseFloat(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWP").reduce((total, num) => { return (total + (1 - parseFloat(num.status.split(" ")[0]))) }, 0)),
                        userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'A').length
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

                    } catch (error) { console.log("error", error) }
                  }
                );
              } catch (error) { console.log("error in payroll", error) }
            }} style={{ backgroundColor: "rgb(137, 179, 83)" }}>Generate Payroll</Button>

            <ReactToPrint
              trigger={() => <Button style={{ backgroundColor: "rgb(137, 179, 83)" }}>Print Payroll</Button>}
              content={() => componentRef}
            />
            {/* component to be printed */}
            <div className="mt-3" style={{ overflow: "auto", width: "78vw", height: "68vh", }} >
              <table key={key}
                ref={(el) => (componentRef = el)} style={{ border: "1px solid black" }} id="payrollTable" className='payrollTable'>
                <tr style={{ backgroundColor: "#89CFF0" }}>
                  <th rowspan="2" style={{ border: "1px solid black" }}>Sr</th>
                  <th rowspan="2" style={{ border: "1px solid black" }}>Name</th>
                  <th rowspan="2" style={{ border: "1px solid black" }}>Designation</th>
                  {daysOfMonth.map((dm) => <th style={{ border: "1px solid black", textAlign: "center" }}>{dm.date.split("/")[0]}</th>)}
                  <th colSpan="6" style={{ border: "1px solid black", textAlign: "center" }}>Total Pay Days</th>
                  <th colSpan="3" style={{ border: "1px solid black", textAlign: "center" }}>Deductions</th>
                  <th rowspan="2" colSpan="1" style={{ border: "1px solid black" }}>M.D</th>
                  <th rowspan="2" colSpan="1" style={{ border: "1px solid black", width: "10px" }}>Net Pay Days</th>
                </tr>
                <tr style={{ backgroundColor: "#89CFF0" }}>
                  {daysOfMonth.map((dm) => <th style={{ border: "1px solid black", textAlign: "center" }}>{dm.day}</th>)}
                  <th style={{ border: "1px solid black" }}>W.D</th>
                  <th style={{ border: "1px solid black" }}>L.W.P</th>
                  <th style={{ border: "1px solid black" }}>S.L</th>
                  <th style={{ border: "1px solid black" }}>CPL</th>
                  <th style={{ border: "1px solid black" }}>G.H</th>
                  <th style={{ border: "1px solid black" }}>D.O</th>
                  <th style={{ border: "1px solid black" }}>LWOP</th>
                  <th style={{ border: "1px solid black" }}>Absent</th>
                  <th style={{ border: "1px solid black" }}>Late</th>
                </tr>
                {loading ? <div style={{ display: "flex", marginLeft: "40vw", marginTop: "10px" }}><LoadingSpinner /> </div> : ''}

                {Object.entries(userAttendance).map(
                  ([key, value]) =>
                    <tr>
                      <td style={{ border: "1px solid black", textAlign: "left" }}>{++rowNumber}</td>
                      <td style={{ border: "1px solid black", textAlign: "left" }}>{value[0] && value[0].employee.firstname}</td>
                      <td style={{ border: "1px solid black", textAlign: "left" }}>{value[0] && value[0].employee.designation}</td>
                      {
                        daysOfMonth.map((dm) => {
                          const attendanceEntry = userAttendance[`${key}`].find((tu) => parseInt(dm.date.split("/")[0]) === parseInt(tu.date.split("-")[2].split("T")[0]));
                          let fontWeight = "normal";
                          if (attendanceEntry) {
                            if (attendanceEntry.status === "D.O" || attendanceEntry.status === "G.H") {
                              fontWeight = "bolder";
                            }
                          }
                          return (
                            <td style={{ border: "1px solid black", fontWeight: fontWeight }}>
                              {attendanceEntry ? attendanceEntry.status : ""}
                            </td>
                          );
                        })
                      }

                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 1 || tu.status == 0.25 || tu.status == 0.5 || tu.status == 0.75 || tu.status == 1.5 || tu.status == 2).reduce((total, num) => { return (total + num.status) }, 0) + (userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && (tu.status.split(" ")[1] == "LWP" || tu.status.split(" ")[1] == "LWOP"))).reduce((total, num) => { return (total + (parseFloat(num.status.split(" ")[0]))) }, 0)}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWP').length ? userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWP').length : ""}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWP").reduce((total, num) => { return (total + (1 - parseFloat(num.status.split(" ")[0]))) }, 0) ? userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWP").reduce((total, num) => { return (total + (1 - parseFloat(num.status.split(" ")[0]))) }, 0) : ""}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'CPL').length ? userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'CPL').length : ""}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'G.H').length ? userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'G.H').length : ""}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'D.O').length ? userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'D.O').length : ""}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWOP' || (typeof tu.status == "string" && tu.status.split(" ")[1] == "LWOP")).length ? userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWOP').length + userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWOP").reduce((total, num) => { return (total + (1 - parseFloat(num.status.split(" ")[0]))) }, 0) : ""}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'A').length ? userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'A').length : ""}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => typeof tu.status == "number").reduce((total, num) => { return (parseFloat(num.status) <= 1 ? total + (1 - parseFloat(num.status)) : total + (2 - parseFloat(num.status))) }, 0) > 0 ? userAttendance[`${key}`].filter((tu) => typeof tu.status == "number").reduce((total, num) => { return (parseFloat(num.status) <= 1 ? total + (1 - parseFloat(num.status)) : total + (2 - parseFloat(num.status))) }, 0) : ""}</td>
                      <td style={{ border: "1px solid black" }}>{userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].length < days ? userAttendance[`${key}`].filter((tu) => tu.status === '').length + (days - userAttendance[`${key}`].length) : ""}</td>
                      <td style={{ border: "1px solid black", fontWeight: "bold" }}>{
                        // parseFloat(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 1 || tu.status == 0.25 || tu.status == 0.5 || tu.status == 0.75).reduce((total, num) => { return (total + num.status) }, 0)) + parseFloat((userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWP")).reduce((total, num) => { return (total + (parseFloat(num.status.split(" ")[0]))) }, 0)) +
                        // parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'HW').length) +
                        // parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWP').length) +
                        // parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'CPL').length) +
                        // parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'G.H').length) +
                        // parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'D.O').length) +
                        // parseFloat(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWP").reduce((total, num) => { return (total + (1 - parseFloat(num.status.split(" ")[0]))) }, 0))
                        usersPayrollCalculations[`${key}`] && usersPayrollCalculations[`${key}`].netpaydays
                      }
                      </td>
                    </tr>)
                }
                <tr>
                  <th colSpan="44" style={{ textAlign: "right" }}>Total:</th><th colSpan="45">
                    {/* Sum of net pay days */}
                    {usersPayrollCalculations && Object.entries(usersPayrollCalculations).reduce((total, num) => {
                      return (total + parseFloat(num[1].netpaydays))
                    }, 0)}
                    {/* 
                    {
                      Object.keys(userAttendance).reduce(function (previous, key) {
                        return (previous + parseFloat(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 1 || tu.status == 0.25 || tu.status == 0.5 || tu.status == 0.75).reduce((total, num) => { return (total + num.status) }, 0)) + parseFloat((userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWP")).reduce((total, num) => { return (total + (parseFloat(num.status.split(" ")[0]))) }, 0)) +
                          parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'HW').length) +
                          parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'LWP').length) +
                          parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'CPL').length) +
                          parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'G.H').length) +
                          parseInt(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => tu.status == 'D.O').length) +
                          parseFloat(userAttendance[`${key}`].length > 0 && userAttendance[`${key}`].filter((tu) => typeof tu.status == "string" && tu.status.split(" ")[1] == "LWP").reduce((total, num) => { return (total + (1 - parseFloat(num.status.split(" ")[0]))) }, 0))
                        )
                      }, 0)
                    } */}
                  </th>
                </tr>
                <tr>
                  <th colSpan="45" >
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", marginLeft: "28rem" }}>
                      <h6>Verified By: ____________</h6>
                      <h6>Approved By: ___________</h6>
                    </div>
                    <div style={{ marginTop: "3rem", display: "flex" }}>
                      <textarea style={{ width: "900px", border: "0 none", background: "transparent", outline: "none" }}></textarea>
                    </div>
                    <div style={{ marginTop: "1rem", display: "flex" }}>


                      * It's a computer generated report and does not require any signature.

                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                      <h6>Printed by: {context.user.firstname}</h6>
                      <h6>Date/Time: {formattedDateTime}</h6>
                      <h6>Print no: _________</h6>
                    </div>
                  </th>
                </tr>
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