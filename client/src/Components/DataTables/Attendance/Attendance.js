import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import EcxelImport from "./EcxelImport";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Table from "./attendanceReportTable/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import HeaderContext from '../../../Context/HeaderContext'


const Attendance = () => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [AttendanceToDB, setAttendanceToDB] = useState([]);







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
      width: 200,
    },
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



  const [tableData, setTableData] = useState([]);
 
 






  const postData = async () => {

    try {
      const tempAttendance = [];

      await tableData.map((i) => {

        const month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const empData = employees.filter((f) => f.emp_id == i.Employee_ID)[0];
        const dateToAdd = new Date(
          `${i.Date.split("/")[2]}-${i.Date.split("/")[1]}-${i.Date.split("/")[0]
          }`
        );

        if (empData) {

          tempAttendance.push({
            username: empData.username,
            month: month[dateToAdd.getMonth()],
            employee: empData._id,
            date: i.Date,
            status: i.in.split(":")[0] != "NaN" ? "P" : "A",
            ...i,
          });
          i.department = "null";
          if (empData.departments.length > 0) {
            i.department = empData.departments[0].departmentname;
          }
        }

      });

      const updateData = await setAttendanceToDB(tempAttendance);

      const savedata = await axios.post("/postimport/attendance", tempAttendance);
      NotificationManager.success("successfully posted");
    } catch (error) {
      const code = error.response.data.code;

      if (code == 11000) {
        NotificationManager.success("successfully posted");
      }
      else {
        NotificationManager.error("Error Saving DATA");
      }
    }
  };


  useEffect(() => {
    try {
      axios.get("/employees").then((res) => {
        setEmployees(res.data.employees);

      });

    } catch (error) {
      console.log("error--------", error);
    }
  }, []);
  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Attendence ")
  })

  const createRequests = async (data) => {

    let table = [];

    console.log("data", data)

    data.forEach((elem) => {
      table.push({
        Employee_ID: elem[0],
        Name: elem[1],
        department: elem[2],
        Date: elem[3] && elem[3].split ? elem[3] : (new Date(Math.round((elem[3] - 25569) * 86400 * 1000))).toISOString().substring(0, 10),
        in: elem[4],
        Out: elem[5],
        Duration: elem[6],
      });
    });

    console.log("table", table)

    


    let InTimes = [];



    table.map((d) => {

      let fromExcel = d.in; //translates to 17:02:00
  
      let equivTimeIN = fromExcel * 24;
      let hoursIN = Math.floor(equivTimeIN);
      var minutesIN = Math.round((equivTimeIN % 1) * 60);
  
      let InTime = hoursIN + ":" + minutesIN;
  
      //for Out
      let outTime = d.Out;
      let equivTimeOUT = outTime * 24;
      let hoursOUT = Math.floor(equivTimeOUT);
  
      var minutesOUT = Math.round((equivTimeOUT % 1) * 60);
  
      let OutTime = hoursOUT + ":" + minutesOUT;
  
  
      let totalDuration = d.Out - d.in;
      let basenumber3 = totalDuration * 24;
      let hoursT = `${Math.floor(basenumber3).toString()} hours`;
      if (hoursT.length < 2) {
        hoursT = `0${hoursT} hours`;
      }
      var minutesT = `${Math.round((basenumber3 % 1) * 60).toString()} minutes`;
  
      if (minutesT.length < 2) {
        minutesT = `0${minutesT} minutes`;
      }
      let DurationTime = `${hoursT} ${minutesT}`;
      InTimes.push({
        Employee_ID: d.Employee_ID,
        Name: d.Name,
        Date: d.Date,
        in: InTime,
        out: OutTime,
        duration: DurationTime,
        department: d.department
      });
    });

    const tempAttendance = [];
    await InTimes.map((i) => {
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const empData = employees.filter((f) => f.emp_id == i.Employee_ID)[0];
      const dateToAdd = new Date(
        `${i.Date.split("/")[2]}-${i.Date.split("/")[1]}-${i.Date.split("/")[0]
        }`
      );

      if (empData) {
        var formattedInTime = i.in;
        if (i.in.split(":")[0].length == 1) {
          formattedInTime = `0${i.in.split(":")[0]}:${i.in.split(":")[1]}`;
        }

        if (i.in.split(":")[1].length == 1) {
          formattedInTime = `${formattedInTime.split(":")[0]}:0${i.in.split(":")[1]
            }`;
        }
        var formattedOutTime = i.out;

        if (i.out.split(":")[0].length == 1) {
          formattedOutTime = `0${i.out.split(":")[0]}:${i.out.split(":")[1]}`;
        }

        if (i.out.split(":")[1].length == 1) {
          formattedOutTime = `${formattedOutTime.split(":")[0]}:0${i.out.split(":")[1]
            }`;
        }

        i.in = formattedInTime;
        i.out = formattedOutTime;


        tempAttendance.push({
          username: empData.username,
          month: month[dateToAdd.getMonth()],
          employee: empData._id,
          date: dateToAdd,
          in: formattedInTime,
          out: formattedOutTime,
          status: i.in.split(":")[0] != "NaN" ? "P" : "A",
          ...i,
        });
        if (empData.departments.length > 0) {
          i.department = empData.departments[0].departmentname;
        }
      }
    });

    setTableData(InTimes);

    setAttendanceToDB(tempAttendance);


    console.log("intimes", InTimes)

    console.log("tempAttendance", tempAttendance)




  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content mt-4">
          <div className="container-fluid">
            <Card>
              <Card.Header className="buttoncolor">
                {" "}
                Daily Attendance Uploader
              </Card.Header>
              <Card.Body>

                <div style={{ marginLeft: "3%" }}>
                  <Stack direction="horizontal" gap={3}>
                    <EcxelImport uploadHandler={createRequests} />
                    {/* <Button
                      variant="outline-danger"
                      onClick={createRequests}
                      style={{
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      Fetch
                    </Button> */}
                    <div className="submitAttendance">
                      <Button
                        variant="outline-danger"
                        onClick={postData}
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Stack>

                  <div>
                    <NotificationContainer />
                  </div>
                </div>

                <Table
                  data={tableData}
                  setTableData={setTableData}
                  style={{ width: "auto"}}
                />

              </Card.Body>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default Attendance;
