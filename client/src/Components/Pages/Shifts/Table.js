import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Table } from "react-bootstrap";
import "./table.css"

const Table = ({ data }) => {




    const columns = [

        { field: "Shift", headerName: "Shift", width: 210 },
        { field: "description", headerName: "Description", width: 210 },
        { field: "start_time", headerName: "start_time", width: 210 },
        { field: "end_time", headerName: "end_time", width: 210 },
        { field: "action", headerName: "Action", width: 210 },
    ]

    const rows = data.map((row) => ({

        id: row._id,
        Shift: row.shift_name,
        description: row.description,
        start_time: row.start_time,
        end_time: row.end_time,

    }))
    
    return (
        <>

            <div className='userList' style={{ width: "100%", height: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}

                />
     <Table className="striped bordered hover">
        <thead>
          <tr>
            <th>Sr #</th>
            <th>Shift Name</th>
            <th>From</th>
            <th>to</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((d, currElem) => {

            return (
              <>
                <tr key={d._id}>
                  <td>{srno++}</td>
                  <td>
                    {d.title}
                  </td>
                  <td>{moment(d.from).utc().format('YYYY-MM-DD')}</td>
                  <td>
                    {moment(d.to).utc().format('YYYY-MM-DD')}
                  </td>
                  <td>
                    <Button onClick={() => holidaydelete(d._id)} style={{ backgroundColor: "red" }}>Delete</Button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
            </div>
        </>
    )
}

export default Table