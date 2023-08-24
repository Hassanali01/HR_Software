import React from 'react'
import "./table.css"
import {  useEffect, useContext } from 'react'
import logo from './../logo3.jpg';
import HeaderContext from '../../../Context/HeaderContext';

 
const Table = ({ data }) => {

    const rows = data.map((row) => ({
        id: row.Employee_ID,
        Name: row.Name,
        Date: row.Date,
        Department: row.department,
        In: row.in,
        Out: row.out,
        Status: row.in.split(":")[0] != "NaN" ? "Present" : "Absent"
    }))
    const a = useContext(HeaderContext)
    useEffect(() => {
      a.update("Human Resource / Attendence / Report")
    })

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