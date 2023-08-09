import React, { Component } from 'react'
import $ from 'jquery'
import { data1 } from './LeavesData'

export default class Table extends Component {
    render() {

        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Employee Leaves</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Leaves</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                        </div>{/* /.container-fluid */}
                    </section>

                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className='row'>
                                <div className='col-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5 className='text-center'>Present employe</h5>
                                            <h5 className='text-center'>12/18</h5>
                                        </div>

                                    </div>

                                </div>
                                <div className='col-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5 className='text-center'>Planned Leaves</h5>
                                            <h5 className='text-center'>8 <span className='font-weight-thick small'>Today</span></h5>
                                        </div>

                                    </div>

                                </div>
                                <div className='col-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5 className='text-center'>Unplanned Leaves</h5>
                                            <h5 className='text-center'>0 <span className='font-weight-thick small'>Today</span></h5>
                                        </div>

                                    </div>

                                </div>
                                <div className='col-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5 className='text-center '  >Pending Requests</h5>
                                            <h5 className='text-center'>2</h5>

                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div className="row">
                                <div className="col-12">

                                    <div className="card">
                                        <div className="card-header  " style={{ backgroundColor: "#ff9b44" }}>
                                            <h3 className="card-title" style={{ color: "white" }}>Employees Attendance</h3>
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body">
                                            <div className='table-responsive'>
                                                <table id="table_id" className="table table-bordered table-hover responsive">
                                                    <thead>
                                                        <tr>
                                                            <td>Employee</td>
                                                            <td>Leave Type</td>
                                                            <td>From</td>
                                                            <td>to</td>
                                                            <td>No Of Days</td>
                                                            <td>Reason</td>
                                                            <td>Status</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data1.map((n) => {
                                                                return (<>
                                                                    <tr key={n.id}>
                                                                        <td><div style={{ display: "flex", alignItems: "center", }}><img src={n.image} style={{ borderRadius: "50%", width: "40px" }} /><span><p className='font-weight-bold ml-2'>{n.name}</p></span></div></td>
                                                                        <td>{n.leaveType}</td>
                                                                        <td>{n.from}</td>
                                                                        <td>{n.to}</td>
                                                                        <td>{n.noofdays}</td>
                                                                        <td>{n.reason}</td>
                                                                        <td>{n.status ? <i class="fa-solid fa-check" style={{ color: "greenYellow" }}></i> : <i class="fa-solid fa-xmark" style={{ color: "orangered" }}></i>}</td>

                                                                    </tr>
                                                                </>)
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></section></div>
            </div>
        )
    }
}
