import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import { Button } from "react-bootstrap";
import { colors } from '@mui/material';
import axios from "axios";
import { Link } from 'react-router-dom';


const Table = ({ data }) => {

  console.log("dataaaaaaaaaaa", data)
  const columns = [
    { field: "shift_name", headerName: "Shift Name", width: 210 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "start_time", headerName: "Start Time", width: 210 },
    { field: "end_time", headerName: "End Time", width: 210 },
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

        <Link to="/addslabs" state={{ id: params.row.id }} style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }} >
          Detail
        </Link>
      ),
    },
  ]


  const rows = data.map((row) => ({
    id: row._id,
    shift_name: row.shift_name,
    description: row.description,
    start_time: row.start_time,
    end_time: row.end_time
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