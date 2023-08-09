import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import { Link } from 'react-router-dom';
import ReactToPrint from "react-to-print";
import { useRef } from 'react'
import logo from './../logo3.jpg';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';


const Table = ({ data }) => {
    let componentRef = useRef();
    const doc = new jsPDF()
    const columns = [
        { field: "id", headerName: "Employee_ID", width: 180 },
        { field: "Name", headerName: "Name", width: 320 },
        { field: "Department", headerName: "Department", width: 200 },
        { field: "Date", headerName: "Date", width: 100 },
        {
            field: "In", headerName: "In", width: 100, renderCell: (params) => {
                return (<>
                    <div style={{ color: params.value > 9.15 ? "red" : "green" }}>
                        {params.value.split(".")[0] != "NaN" ?
                            `${params.value.toString().split(".")[0]} : ${params.value.toString().split(".")[1] || "00"}`
                            : "NaN"}
                    </div>
                </>)
            }
        },
        { field: "Out", headerName: "Out", width: 100 },
        {
            field: "Status", headerName: "Status", width: 200, renderCell: (params) => {
                return (<>
                    <div style={{ color: params.value == "Absent" ? "red" : "green" }}>
                        {params.value}
                    </div>
                </>)
            }
        },
    ]


    const rows = data.map((row) => ({
        id: row.Employee_ID,
        Name: row.Name,
        Date: row.Date,
        Department: row.department,
        In: row.in,//((row.in.split(":")[0] * 1) + (row.in.split(":")[1] * 0.01)).toFixed(2),
        Out: row.out,
        Status: row.in.split(":")[0] != "NaN" ? "Present" : "Absent"
    }))


    return (
        <div>
            <div className="d-flex justify-content-center"  >
                <div >
                    <div className="d-flex justify-content-between">
                        <img src={logo} alt="Sagacious" width={170} height={100} />
                        <div>
                            <div style={{ fontSize: "26px", paddingTop: "10px" }}>Attendance Report</div>
                            <div className="d-flex justify-content-center">
                                <div style={{ fontSize: "18px" }}>{rows[0] && rows[0].Date}</div>
                            </div>
                        </div>
                        <div style={{ width: 170 }}></div>
                    </div>
                    <table style={{ width: "77vw", marginBottom: "60px", marginTop: "1px" }} id="mytable" >
                        <tr style={{ backgroundColor: "#89CFF0" }}>
                            <th style={{ border: "1px solid black", width: "10%" }}>Employee ID</th>
                            <th style={{ border: "1px solid black", width: "30%" }}>Name</th>
                            <th style={{ border: "1px solid black", width: "20%" }}>Department</th>
                            <th style={{ border: "1px solid black", width: "10%", textAlign: "center" }}>In</th>
                            <th style={{ border: "1px solid black", width: "10%", textAlign: "center" }}>Out</th>
                            <th style={{ border: "1px solid black", width: "20%", textAlign: "center" }}>Status</th>
                        </tr>


                        {rows.map((r) => {
                            return (
                                <tr>
                                    <td>{r.id}</td>
                                    <td style={{ textAlign: "left" }}>{r.Name}</td>
                                    <td style={{ textAlign: "left" }}>{r.Department}</td>
                                    <td style={{ color: ((r.In.split(":")[0] * 1) + (r.In.split(":")[1] * 0.01)).toFixed(2) > 9 ? "red" : "green", fontSize: ((r.In.split(":")[0] * 1) + (r.In.split(":")[1] * 0.01)).toFixed(2) == "NaN" ? 0 : 14 }}>{r.In}</td>
                                    <td style={{ fontSize: ((r.In.split(":")[0] * 1) + (r.In.split(":")[1] * 0.01)).toFixed(2) == "NaN" ? 0 : 14 }}>{r.Out}</td>
                                    <td style={{ color: r.Status == "Absent" ? "red" : "green" }}>{r.Status}</td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>
        </div>
    )
}


export default Table