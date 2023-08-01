import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import EcxelImport from "./EcxelImport";
// import NotificationContainer from "react-notifications/lib/NotificationContainer";
import Xlsx from "./Xlsx";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Table from "./attendanceReportTable/Table";
import logo3 from './logo3.jpg';
import path from 'path';
import ReactToPrint from "react-to-print";
import { useRef } from 'react'

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';


import "./DataManagement.css"


// var base64 = require('base-64');

const moment = require('moment')
const DataManagement = () => {

  let componentRef = useRef();


  const [dateForAttendanceReport, setDateForAttendanceReport] = useState("");


  var img = new Image();
  img.src = path.resolve('logo3.jpg');
  console.log("image123", img)
  const doc = new jsPDF()


  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState();

  const [AttendanceToDB, setAttendanceToDB] = useState([]);


  const generateAttendanceReportOfSpecificDate = async () => {

    const tempAttendance = [];

    try {

      const dateAttendance = await axios.get(`/AttendanceForDate`,
        {
          params: {
            date: new Date(dateForAttendanceReport)
          }
        }
      );


      console.log("dateAttendance", dateAttendance)


      await dateAttendance.data.map((i) => {

        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // const empData = employees.filter((f) => f.emp_id == i.Employee_ID)[0]

        const dateToAdd = `${i.date.split("-")[2].split("T")[0]}-${i.date.split("-")[1]}-${i.date.split("-")[0]}`

        // if (empData) {
        // delete i.Date
        tempAttendance.push({
          Name: i.employee.username, Employee_ID: i.employee.emp_id, Date: dateToAdd,
          department: i.employee.departments[0] && i.employee.departments[0].departmentname,
          status: i.in.split(':')[0] != "NaN" ? 'P' : 'A', ...i
        })
        i.department = "null"
        // if (empData.departments.length > 0) {
        //   i.department = empData.departments[0].departmentname
        // }
        // }

      })


      console.log("dateAttendanceAfterTemp", tempAttendance)

      tempAttendance.length == 0 && NotificationManager.error("Current date has no record");



      setTableData(tempAttendance)

      tempAttendance.length > 0 && NotificationManager.success("Successfully Updated");



    } catch (error) {

      NotificationManager.error("Failed to fetch record");


      console.log("error generating report", error)

    }

  };



  const createRequests = async () => {

    const tempAttendance = [];

    await InTimes.map((i) => {

      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const empData = employees.filter((f) => f.emp_id == i.Employee_ID)[0]

      const dateToAdd = new Date(`${i.Date.split("/")[2]}-${i.Date.split("/")[1]}-${i.Date.split("/")[0]}`)

      if (empData) {
        // delete i.Date
        tempAttendance.push({
          username: empData.username, month: month[dateToAdd.getMonth()], employee: empData._id, date: dateToAdd,
          status: i.in.split(':')[0] != "NaN" ? 'P' : 'A', ...i
        })
        i.department = "null"
        if (empData.departments.length > 0) {
          i.department = empData.departments[0].departmentname
        }
      }
    })


    console.log("tempAttendance", tempAttendance)


    setTableData(InTimes)

    setAttendanceToDB(tempAttendance)

  };

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tableData, setTableData] = useState([]);

  const url = "/postimport/attendance";
  const urlForEmployees = "/employees"
  console.log(data,"-----------------------------")
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

    // let hour = Math.floor(basenumber % 12 || 12).toString();
    // if (hour.length < 2) {
    //   hour = `0${hour}`
    // }

    var minutesIN = Math.round((equivTimeIN % 1) * 60)
    // if (minute.length < 2) {
    //   minute = `0${minute}`
    // }

    // console.log("hour",hoursIN,"minute",minutesIN)
    // const period1 = +basenumber < 12 ? 'AM' : 'PM';

    // console.log("processDate",d.Date.split('/'))

    let dayIN = d.Date.split('/')[0]
    let monthIN = d.Date.split('/')[1]
    let yearIN = d.Date.split('/')[2]

    // console.log("Dateeeeeee", new Date(yearIN,monthIN, dayIN, hoursIN, minutesIN, 0, 0))
    let InTime = hoursIN + ":" + minutesIN

    //for Out
    let outTime = d.Out;
    let equivTimeOUT = outTime * 24;
    let hoursOUT = Math.floor(equivTimeOUT);


    // if (hours.length < 2) {
    //   hours = `0${hours}`
    // }
    var minutesOUT = Math.round((equivTimeOUT % 1) * 60);
    // if (minutes.length < 2) {
    //   minutes = `0${minutes}`;
    // }
    // const period2 = +basenumber2 < 12 ? 'AM' : 'PM';


    let OutTime = hoursOUT + ":" + minutesOUT
    console.log("out", OutTime);

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
    console.log("duration", DurationTime)
    InTimes.push({
      Employee_ID: d.Employee_ID,
      Name: d.Name,
      Date: d.Date,
      in: InTime,
      out: OutTime,
      duration: DurationTime
    });
  });

  // console.log("cONVERTED", InTimes);

  let converted = [];
  table.map((d) => {
    converted.push({
      Employee_ID: d.Employee_ID,
      Name: d.Name,
      Date: d.Date,
    });
  });
  console.log("table", table);
  // var finalData = JSON.stringify(table);
  // console.log(finalData);

  const postData = async () => {
    try {
      //   const savedata = await axios.post(url,finalData)

      // const finalData = JSON.stringify(table)
      const savedata = await axios.post(url, AttendanceToDB);

      NotificationManager.success("successfully posted");
    } catch (error) {
      console.log(error);
      NotificationManager.error("Error Saving DATA");
    }
  };


  useEffect(() => {

    try {
      axios.get(urlForEmployees).then((res) => {

        console.log("employessssssssssssssssss", res.data.employees)
        setEmployees(res.data.employees)
        // console.log("ressssssssss",res.data.employees)
      });
      // const datas = res.data;
      // console.log("resssssss",datas)
      // setEmployees(datas)
    } catch (error) {
      console.log("error", error)
    }
  }, [])



  return (
    <>
      <div className="content-wrapper" style={{ backgroundColor: "#f7f7f7" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Attendance</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Attendance</li>
                </ul>

              </div>
            </div>
          </div>
        </section>
        <section className="centent">
          <div className="container-fluid">
            <div className="card">

              <div className="card-body">
                <div className="table-responsive" style={{}}>
                  <div className="">
                    {/* <div class="card-header"> */}
                    <div className="card-body">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >

                        <span style={{ margin: "4px", fontWeight: "700", marginTop: "12px" }}>Date:</span>
                        <input type="date" onChange={(e) => { setDateForAttendanceReport(e.target.value) }}></input>
                        <button
                          onClick={generateAttendanceReportOfSpecificDate}
                          style={{
                            border: "none",
                            backgroundColor: "#17a392",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            width: "120px",
                            margin: "5px"
                          }}
                        >
                          Generate
                        </button>
                
                        <ReactToPrint
                          trigger={() => <button
                            onClick={postData}
                            style={{
                              border: "none",
                              backgroundColor: "#17a392",
                              color: "white",
                              padding: "5px",
                              borderRadius: "5px",
                              width: "120px",
                              margin: "5px"
                            }}
                          >Print</button>}
                          content={() => componentRef}

                        />


                      </div>

                      <div id="printelement" ref={(el) => (componentRef = el)} >

                        {console.log("tabledatatabledata", tableData)}
                        <Table data={tableData} />
                      </div>

                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>
        {/* {console.log("tableeeeeeeee",table)} */}

      </div>
      <NotificationContainer />

      <div></div>
    </>
  );
};

export default DataManagement;
