import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import axios from "axios";
import { Link } from 'react-router-dom';


const Table = ({ data }) => {
  const columns = [
    { field: "shift_name", headerName: "Shift Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "start_time", headerName: "Start Time", width: 200 },
    { field: "end_time", headerName: "End Time", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 210,
      renderCell: (params) => (
        <i onClick={() => {
          const id = params.row.id;
          axios.delete(process.env.React_APP_ORIGIN_URL + `shifts/${id}`)
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
    {
      field: "detail",
      headerName: "Detail",
      width: 210,
      renderCell: (params) => (
        <Link to="/addslabs" state={{ id: params.row.id }} style={{ backgroundColor: '#17a392', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }} >
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