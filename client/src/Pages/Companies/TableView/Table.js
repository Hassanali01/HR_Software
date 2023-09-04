import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import { Button } from "react-bootstrap";
import axios from "axios";
const Table = ({ data }) => {

    let count = 1
    const columns = [
        { field: "Sr", headerName: "Sr #", width: 250},
        { field: "Company", headerName: "Company", width: 250 },
        { field: "NoOfEmployees", headerName: "No of Employees", width: 250 },
        { field: "description", headerName: "Description", width: 250 },
        {
            field: "action",
            headerName: "Action",
            width: 210,

            renderCell: (params) => (
                 <i onClick={() => {
                    const id = params.row.id;
                    axios.delete(process.env.React_APP_ORIGIN_URL + `company/${id}`)
                        .then(response => {
                            console.log("Data deleted successfully!");
                        })
                        .catch(error => {
                            console.error("Error deleting data:", error);
                        });
                }}
                    style={{ color: 'red',fontSize: "20px", cursor: 'pointer', float: "center"}} class=" fa-regular fa-trash-can"  title="Delete"></i>
            ),
        },
    ]

    const rows = data.map((row) => ({
        Sr: count++,
        id: row._id,
        Company: row.title,
        description: row.description,
        NoOfEmployees: row.employees.length
    }))
    
    return (
        <>
            <div className='userList' style={{ width: "100%", height: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </div>
        </>
    )
}

export default Table