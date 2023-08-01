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
    const [Department, setDepartment] = useState("")




    const [tableSearch, setTableSearch] = useState("");

    const columns = [
        { field: "id", headerName: "Employee_ID", width: 180 },
        { field: "Name", headerName: "Name", width: 220 },
        { field: "Department", headerName: "Department", width: 200 },
        {
            field: "In", headerName: "In", width: 100, renderCell: (params) => {
                console.log("params", params.value.split(".")[0])
                return (<>
                    <div style={{ color: params.value > 9.15 ? "red" : "green" }}>
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
                    setEmployee_ID(params.value.Employee_ID)
                    setName(params.value.Name)
                    setDepartment(params.value.Department)
                    console.log(params.value.Department, "******************")
                    console.log("req.params.value", params.value.in)
                    setIn(params.value.in)
                    setOut(params.value.out)
                    setTableData(data)
                    handleShow()
                }}>
                    Edit
                </Button>)
            }
        },
    ]
    const rows = data.filter((d) => d.Name.toLowerCase().includes(tableSearch.toLowerCase())).map((row) => ({

        id: row.Employee_ID,
        Name: row.Name,
        // Date: row.Date,
        Department: row.department,
        In: row.in,//((row.in.split(":")[0] * 1) + (row.in.split(":")[1] * 0.01)).toFixed(2),
        Out: row.out,
        Status: row.in.split(":")[0] != "NaN" ? "Present" : "Absent",
        Action: row


    }))
    console.log("data for table", data)




    return (
        <div>



            <Modal style={{ marginTop: "30vh" }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Employee Id:
                        <input style={{ marginLeft: "3%", marginTop: '2%' }} value={Employee_ID} onChange={(e) => {


                            setEmployee_ID(e.target.value)

                        }}></input> </div>
                    Name:
                    <input style={{ marginLeft: "12.5%", marginTop: '2%' }} value={Name} onChange={(e) => { setName(e.target.value) }}></input><br />
                    In:
                    <input style={{ marginLeft: "18.5%", marginTop: '2%' }} type="time" value={In} onChange={(e) => { setIn(e.target.value) }}></input><br />
                    Out:


                    <input style={{ marginLeft: "15.5%", marginTop: '2%' }} type="time" value={Out} onChange={(e) => { setOut(e.target.value) }}></input>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {

                        data.filter((d) => d.Employee_ID == Employee_ID)[0].Name = Name
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].in = In
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].out = Out

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
                        <div>
                            <div style={{ fontSize: "26px", paddingTop: "10px" }}> <span style={{ fontSize: "20px" }}>{data[0] && data[0].Date}</span></div>
                            <div className="d-flex justify-content-center">
                                <div style={{ fontSize: "18px" }}>{rows[0] && rows[0].Date}</div>
                            </div>
                        </div>
                        <div style={{ width: 170 }}></div>
                    </div>


                    Search Employee: <input style={{ width: "50vw" }} value={tableSearch} onChange={(e) => { setTableSearch(e.target.value) }}></input>
                    <br />                    <br />

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