import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import avatar from '../../../Employee Data/All Employees/avatar.png'
import { Link } from 'react-router-dom';

const Table = ({ data }) => {


    console.log("dataaaaaaaaaaa",data)


    const columns = [
        // { field: "id", headerName: "Sr#", width: 120 },
        // {
        //     field: "Employees", headerName: "Employees", width: 300, renderCell: (params) => {
        //         return (<>
        //             <div className="userListUser">
        //                 {/* {params}  */}
        //                 {/* {params.row.RenderCell && <img src={PP + params.row.}/>} */}
        //                 {console.log(params)}
        //                 {params.row.profilepic ? <img src={PP + params.row.profilepic} className="userListImg" /> : <img src={avatar} className="userListImg" />}
        //                 {params.row.Employees}
        //             </div>

        //         </>)

        //     }
        // },
        // { field: "Email", headerName: "Email", width: 220 },
        // { field: "Designation", headerName: "Designation", width: 220 },
        { field: "Department", headerName: "Department", width: 210 },

        { field: "NoOfEmployees", headerName: "No of Employees", width: 200 },
        { field: "description", headerName: "Description", width: 210 },

        // {
        //     field: "NoOfEmployees", headerName: "No of Employees", width: 200, renderCell: (params) => {
        //         return (<>
        //             <div>
                        
        //             </div>
        //         </>)
        //     }
        // }
    ]

    const rows = data.map((row) => ({

        id: row._id,
        // Employees: row.firstname + row.lastname,
        // profilepic: row.profilepic,
        // Email: row.email ? row.email : "N/A",
        // Designation: row.designation,
        Department: row.departmentname,
        description: row.description,

        // JoiningDate: new Date(row.joiningdate),
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