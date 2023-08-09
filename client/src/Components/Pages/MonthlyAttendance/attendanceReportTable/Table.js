import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import { Link } from 'react-router-dom';
import ReactToPrint from "react-to-print";
import { useRef } from 'react'
// import logo from './../logo3.jpg';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import TextField from '@mui/material/TextField';
import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from "axios";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";



const Table = ({ data, setTableData }) => {

    // data = []

    // setTableData(data)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [Employee_ID, setEmployee_ID] = useState("");
    const [Name, setName] = useState("");
    const [In, setIn] = useState("");
    const [Out, setOut] = useState("");
    const [Date, setDate] = useState("");
    const [idOfEmployee, setIdOfEmployee] = useState("");





    const [tableSearch, setTableSearch] = useState("");






    const updateAttendance = async () => {
        try {
            const updateUser = await axios.put(`/updateuserattendance/${idOfEmployee}`, { in: In, out: Out, date: Date });
            console.log("savedata", updateUser,Date)
            NotificationManager.success("successfully posted");
        } catch (error) {
            console.log("eror", error);
            NotificationManager.error("Error Saving DATA");
        }
    };

    const columns = [

        // { field: "id", headerName: "", width: 0 },
        { field: "Empid", headerName: "Employee_ID", width: 150 },
        { field: "Name", headerName: "Name", width: 300 },
        { field: "Department", headerName: "Department", width: 200 },
        { field: "Date", headerName: "Date", width: 100 },
        {
            field: "In", headerName: "In", width: 100, renderCell: (params) => {
                // const isLate = (params.value.split(":")[0]*1)+ (params.value.split(":")[1]*0.01)
                console.log("params", params.value.split(".")[0])
                return (<>
                    <div style={{ color: params.value > 9.30 ? "red" : "green" }}>
                        {params.value.split(".")[0] != "NaN" ?

                            `${params.value.toString().split(".")[0]}`
                            : "NaN"}
                    </div>
                </>)
            }
        },
        { field: "Out", headerName: "Out", width: 100 },
        {
            field: "Status", headerName: "Status", width: 150, renderCell: (params) => {

                return (<>
                    <div style={{ color: params.value == "Absent" ? "red" : "green" }}>
                        {params.value}

                    </div>
                </>)
            }
        },
        {
            field: "Action", headerName: "Action", width: 100, renderCell: (params) => {

                return (<Button variant="primary" onClick={() => {
                    console.log("paramsValue", params.value.employee._id)
                    setEmployee_ID(params.value.Employee_ID)
                    setName(params.value.Name)
                    console.log("req.params.value", params.value.in)
                    setIn(params.value.in)
                    setOut(params.value.out)
                    setDate(params.value.date)
                    setIdOfEmployee(params.value.employee._id)
                    setTableData(data)
                    handleShow()
                }}>
                    Edit
                </Button>)
            }
        },



    ]
    console.log("data", data)
    const rows = data.filter((d) => d.Name.toLowerCase().includes(tableSearch.toLowerCase())).map((row) => ({

        id: row._id,
        Empid: row.Employee_ID,
        Name: row.Name,
        Date: row.date,
        Department: row.department,
        In: row.in,//((row.in.split(":")[0] * 1) + (row.in.split(":")[1] * 0.01)).toFixed(2),
        Out: row.out,
        Status: row.in.split(":")[0] != "NaN" ? "Present" : "Absent",
        Action: row
    }))




    return (
        <div>



            <Modal style={{ marginTop: "30vh" }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'rgb(0,105,92)' }}>Attendance Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex" }}>
                        <h5>Employee Id:</h5>
                        <div style={{ marginLeft: "12%" }}>
                            <input value={Employee_ID} onChange={(e) => {
                                setEmployee_ID(e.target.value)
                            }}>
                            </input>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <h5 style={{ marginTop: "2%" }}>Name:</h5>
                        <div style={{ marginLeft: "24.5%", marginTop: "2%" }}>
                            <input value={Name} onChange={(e) => { setName(e.target.value) }}>
                            </input>
                        </div>
                        <br />
                    </div>
                    <div style={{ display: "flex" }}>
                        <h5 style={{ marginTop: "2%" }}>In:</h5>
                        <div style={{ marginLeft: "32.5%", marginTop: "2%" }}>
                            <input type="time" value={In} onChange={(e) => { setIn(e.target.value) }}>
                            </input>
                        </div>
                        <br />
                    </div>
                    <div style={{ display: "flex" }}>
                        <h5 style={{ marginTop: "2%" }}>Out:</h5>
                        <div style={{ marginLeft: "29%", marginTop: "2%" }}>
                            <input type="time" value={Out} onChange={(e) => { setOut(e.target.value) }}>

                            </input>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <h5 style={{ marginTop: "2%" }}>Date:</h5>
                        <div style={{ marginLeft: "29%", marginTop: "2%" }}>

                            <input type="text" value={Date} onChange={(e) => { setDate(e.target.value) }}>
                                {console.log("mydate",Date)}
                            </input>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {

                        data.filter((d) => d.Employee_ID == Employee_ID)[0].Name = Name
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].in = In
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].out = Out
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].date = Date

                        updateAttendance()



                        setShow(false)

                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* 
            <div className='userList' style={{ margin: "50px", marginBottom: "80px", width: "95%", height: "800px" }} ref={(el) => (componentRef = el)}>

                <DataGrid
                    rows={rows}
                    columns={columns}

                />

            </div> */}

            <div className="d-flex justify-content-center"  >

                <div >
                    <div className="d-flex justify-content-between">
                        {/* <img src={logo} alt="Sagacious" width={170} height={100} /> */}
                        <div className='mb-4'>
                            {/* <div className="d-flex justify-content-center">
                                <div style={{ fontSize: "26px", paddingTop: "10px" }}>Monthly Attendance: <span style={{ fontSize: "20px" }}>{rows[0] && rows[0].Date}</span></div>

                            </div> */}
                        </div>
                        <div style={{ width: 170 }}></div>
                    </div>


                    Search Employee: <input style={{ width: "50vw" }} value={tableSearch} onChange={(e) => { setTableSearch(e.target.value) }}></input>
                    <br />

                    <br />

                    <DataGrid
                        style={{ height: "55vh", width: "75vw" }}
                        rows={rows}
                        columns={columns}
                        pageSize={40}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />

                </div>

            </div>

        </div>
    )
}

export default Table