import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"

const Table = ({ data }) => {

    const columns = [
        { field: "Department", headerName: "Department", width: 210 },
        { field: "NoOfEmployees", headerName: "No of Employees", width: 200 },
        { field: "description", headerName: "Description", width: 210 },
    ]

    const rows = data.map((row) => ({
        id: row._id,
        Department: row.departmentname,
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