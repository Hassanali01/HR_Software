import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import moment from "moment";

const Table = ({ data, setTableData }) => {
    const [show, setShow] = useState(false);
    const [Employee_ID, setEmployee_ID] = useState("");
    const [Name, setName] = useState("");
    const [In, setIn] = useState("");
    const [Out, setOut] = useState("");
    const [Date, setDate] = useState("");
    const [idOfEmployee, setIdOfEmployee] = useState("");
    const [tableSearch, setTableSearch] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateAttendance = async () => {
        try {
            const updateUser = await axios.put(process.env.React_APP_ORIGIN_URL + `updateuserattendance/${idOfEmployee}`, { in: In, out: Out, date: Date });
            NotificationManager.success("successfully posted");
        } catch (error) {
            NotificationManager.error("Error Saving DATA");
        }
    };

    const deleteAttendence = async (employeeId,date) => {
        try {
            const delattendence = await axios.delete(process.env.React_APP_ORIGIN_URL + `userattendance/delattendence/${employeeId}/${date}`);
            NotificationManager.success("successfully posted");
        } catch (error) {
            NotificationManager.error("Error Saving DATA");
        }
    }

    const columns = [
        { field: "Empid", headerName: "Employee_ID", width: 150 },
        { field: "Name", headerName: "Name", width: 200 },
        // { field: "Status", headerName: "Status", width: 100 },
        { field: "Department", headerName: "Department", width: 200 },
        { field: "Date", headerName: "Date", width: 150 },
        { field: "In", headerName: "In", width: 100 },
        { field: "Out", headerName: "Out", width: 100 },
        {
            field: "Action", headerName: "Action", width: 130, renderCell: (params) => {
                return (<Button variant="primary" onClick={() => {
                    setEmployee_ID(params.value.Employee_ID)
                    setName(params.value.Name)
                    setIn(params.value.in)
                    setOut(params.value.out)
                    setDate(moment(params.value.date).utc().format('YYYY-MM-DD'))
                    setIdOfEmployee(params.value.employee._id)
                    setTableData(data)
                    handleShow()
                }}  title="Delete"
                style={{ backgroundColor: '#17a392'}}
                >
                    Detail
                </Button>)
            }
        },
        {
            field: "delete", headerName: "Delete", width: 100, renderCell: (params) => {
                return (<i variant="primary" onClick={() => { 
                    deleteAttendence(params.value.employee._id,params.value.date) }}
                    style={{ color: 'red',fontSize: "20px", cursor: 'pointer', float: "center"}} 
                    class=" fa-regular fa-trash-can" 
                     title="Delete">
                  
                </i>)
            }
        },
    ]
    const rows = data.filter((d) => d.Name.toLowerCase().includes(tableSearch.toLowerCase())).map((row) => ({
        id: row._id,
        Empid: row.Employee_ID,
        Name: row.Name,
        Date: moment(row.date).utc().format('YYYY-MM-DD'),
        Department: row.department,
        In: row.in,//((row.in.split(":")[0] * 1) + (row.in.split(":")[1] * 0.01)).toFixed(2),
        Out: row.out,
        Status: row.in.split(":")[0] != "NaN" ? "Present" : "Absent",
        Action: row,
        delete: row
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
                            </input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "rgb(137, 179, 83)"}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].Name = Name
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].in = In
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].out = Out
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].date = Date
                        updateAttendance()
                        setShow(false)
                    }} style={{backgroundColor: "rgb(137, 179, 83)"}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex justify-content-center"  >
                <div >
                    <div className="d-flex justify-content-between">
                        <div className='mb-4'>
                        </div>
                        <div style={{ width: 170 }}></div>
                    </div>
                    Search Employee: <input style={{ width: "50vw" }} value={tableSearch} onChange={(e) => { setTableSearch(e.target.value) }}></input>
                    <br />
                    <br />

                    <DataGrid
                        style={{ height: "64vh", width: "75vw" }}
                        rows={rows}
                        columns={columns}
                        pageSize={40}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </div>
            </div>
            <NotificationContainer />
        </div>
    )
}

export default Table