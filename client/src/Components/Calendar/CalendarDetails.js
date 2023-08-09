import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Form, Modal, Button } from 'react-bootstrap'
import moment from 'moment';
import { NotificationContainer, NotificationManager } from 'react-notifications'
const CalendarDetails = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show, setShow] = useState(false);
    const [calendar, setcalendar] = useState([]);
    const [calendarId, setStoreId] = useState("");
    const [title, settitle] = useState("");
    const [from, setfrom] = useState("");
    const [type, settype] = useState("");
    const [to, setto] = useState("")
    const url = "/holiday/addholiday";
    const [details, setdetails] = useState({})
    const [arr, setarr] = useState([])

    const handlePost = async (e) => {
        e.preventDefault();
        const newHoliday = {
            title,
            from,
            to,
            type,
            calendarId: details._id
        }
        try {
            const saveHoliday = await axios.post(url, newHoliday)
            saveHoliday && handleClose();
            NotificationManager.success("Successfully Created")
        } catch (error) {
            NotificationManager.error("Something went wrong")
        }
    }

    useEffect(() => {
        const fetchEmp = async () => {
            const res = await axios.get('/calendar/' + path)
            setdetails(res.data)
            setarr(res.data.holidays)
        }
        fetchEmp()
    }, [path])



    const columns = [
        { field: 'id', headerName: 'Sr #', width: 120 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'from', headerName: 'from', width: 200 },
        { field: 'to', headerName: 'to', width: 200 },
        { field: 'type', headerName: 'Holiday Type', width: 250 },
        { field: 'calendarname', headerName: 'Calendar', width: 250 }
    ]

    const rows = [];
    arr.map((d) => {
        rows.push({
            id: d.srno,
            title: d.title,
            type: d.type,
            from: moment(d.from).format('Do MMMM  YYYY'),
            to: moment(d.to).format('Do MMMM  YYYY'),
            calendarname: details.calendarname
        })
    })


    return (
        <>
            <div className='content-wrapper' style={{ backgroundColor: '#f7f7f7' }}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className='row align-items-center'>
                            <div className='col'>
                                <h3 className='page-title'>Calendar</h3>
                                <ul className='breadcrumb' style={{ backgroundColor: '#f7f7f7' }}>
                                    <li className="breadcrumb-item">
                                        <Link to='/' style={{ color: '#1f1f1f' }}>Dashboard</Link>
                                    </li>
                                    <li className='breadcrumb-item active'>
                                        calendar
                                    </li>
                                </ul>
                                <div className='col-auto float-end ms-auto'>
                                    <a className='btn add-btn ' data-bs-toggle="modal" data-bs-target="#add_calendar"><i className='fa fa-plus' onClick={handleShow}> Add Holidays</i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='centent'>
                    <div className='container-fluid'>
                        <div className="card">
                            <div className="card-header  " style={{ backgroundColor: "#26ad9d" }}>
                                <h3 className="card-title" style={{ color: "white" }}>Calendar Details</h3>
                            </div>
                            <div className='card-body'>
                                <div className='table-responsive' style={{ height: "500px" }}>
                                    <DataGrid columns={columns} rows={rows} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <NotificationContainer />
            <Modal size="md"
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
            >
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter" className='header-modal'>
                        <CalendarMonthIcon style={{ color: "#ff9b44" }} /> <span>Add Holidays</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form type="submit" onSubmit={handlePost}>
                        <Form.Group>
                            <Form.Label><span>Calendar</span></Form.Label>
                            <Form.Control value={details.calendarname} disabled  >
                            </Form.Control>

                            <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                                <Form.Label>Holiday Name </Form.Label>
                                <Form.Control type="text" name="holiday" placeholder="Holiday Name" onChange={(e) => { settitle(e.target.value) }} />
                            </Form.Group>

                            <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                                <Form.Label>From</Form.Label>
                                <Form.Control type="date" name="from" onChange={(e) => { setfrom(e.target.value) }} />
                            </Form.Group>

                            <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                                <Form.Label>To</Form.Label>
                                <Form.Control type="date" name="to" onChange={(e) => { setto(e.target.value) }} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Holiday Type</Form.Label>
                                <Form.Control type="text" name='type' onChange={(e) => { settype(e.target.value) }} />
                            </Form.Group>



                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button type="submit" className='btn mt-4'  >
                                    Add Holidays
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CalendarDetails