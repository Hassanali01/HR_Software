import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import {  Button } from "react-bootstrap";
import { colors } from '@mui/material';
import axios from "axios";
const Table = ({ data }) => {


  console.log("dataaaaaaaaaaa", data)


  const columns = [
    { field: "shift_name", headerName: "shift_name", width: 210 },
    { field: "description", headerName: "description", width: 200 },
    { field: "start_time", headerName: "start_time", width: 210 },
    { field: "end_time", headerName: "end_time", width: 210 },
    {
      field: "action",
      headerName: "Action",
      width: 210,
      renderCell: (params) => (
        <Button 
          onClick={() => {
            const id = params.row.id;
            axios.delete(`shifts/${id}`)
              .then(response => {
                console.log("Data deleted successfully!");
                // You might want to refresh the data in your table after deletion
              })
              .catch(error => {
                console.error("Error deleting data:", error);
              });
          }}
          style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 210,
      renderCell: (params) => (
        <Button
          onClick={() => {
            console.log("Button clicked for row with ID:", params.row.id);
          }}
        >
          Detail
        </Button>
      ),
    },
  ]
  const rows = data.map((row) => ({
    id: row._id,
    shift_name: row.shift_name,
    description: row.description,
    start_time: row.start_time,
    end_time: row.end_time
    // Department: row.departmentname,
    // description: row.description,
    // NoOfEmployees: row.employees.length

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