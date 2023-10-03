import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { Modal, Button, Form, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './calendar.css';
import axios from "axios"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from "react-router-dom";


const Calendar = () => {
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [calendar, setcalendar] = useState([])
    const [noofholidays, setnoofholidays] = useState([])
    const [Calendar, setCalendar] = useState({
        calendarname: ""
    })
    const url = "calendar/addcalendar";
    const url1 = "calendar";
    //handle input
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value
        setCalendar({ ...Calendar, [name]: value })
    }
    //posting calendars
    const postCalendar = async () => {
        try {
            const post = await axios.post(process.env.React_APP_ORIGIN_URL + url, Calendar);
            post && navigate('/calendar')
        } catch (error) {
            console.log(error)
        }
    }
    //get all calendars
    const getCalendars = async () => {
        try {
            const response = await axios.get(process.env.React_APP_ORIGIN_URL + url1);
            const data = response.data;
            setcalendar(data.calendar);
            setnoofholidays(data.totalholidays)
        } catch (error) { console.log(error) }
    }

    useEffect(() => {
        getCalendars();
    }, [])


    return (
        <>
            <div className='content-wrapper' style={{ backgroundColor: '#f7f7f7' }}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className='row align-items-center'>
                            <div className='col'>
                                <h3 className='page-title'>Calendars</h3>
                                <ul className='breadcrumb' style={{ backgroundColor: '#f7f7f7' }}>
                                    <li className="breadcrumb-item">
                                        <Link to='/' style={{ color: '#1f1f1f' }}>Dashboard</Link>
                                    </li>
                                    <li className='breadcrumb-item active'>
                                        Calendars
                                    </li>
                                </ul>
                                <div className='col-auto float-end ms-auto'>
                                    <div style={{ display: "flex", alignItems: "center" }}><a  href={#}className='btn add-btn ' data-bs-toggle="modal" data-bs-target="#add_calendar" onClick={handleShow}><i className='fa fa-plus' style={{ fontSize: "14px", marginRight: "2px" }} > </i>Add Calendar</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='container-fluid'>
                        <div className="card">
                            <div className="card-header  " style={{ backgroundColor: "#26ad9d" }}>
                                <h3 className="card-title" style={{ color: "white" }}>Available Calandars</h3>
                            </div>
                            <div className="card-body">
                                <div style={{ height: 600, width: '100%' }}>
                                    <Row>
                                        {
                                            calendar.map((d) => {
                                                return (<>
                                                    <Col xxl={3} xl={4} lg={4} md={4} xs={12} sm={12} key={d._id}>
                                                        <Card className='shadow-lg py-2 bg-white rounded mb-0'>
                                                            <Card.Header className='p-0' style={{ backgroundColor: '#26ad9d' }}>
                                                                <h4 className="mb-0 py-2" style={{ fontSize: "17px", textAlign: "center", color: '#fff' }} >{new Date(d.createdAt).getFullYear()}</h4>
                                                            </Card.Header>
                                                            <Card.Body className='p-0'>
                                                                <Card.Title className='p-0 w-100'>
                                                                    <div className='d-flex flex-column align-items-center justify-content-center w-100' >
                                                                        <div>
                                                                            <h4 className="mb-0 py-2" style={{ fontSize: "14px", textAlign: "center", color: 'black', fontWeight: '600' }}>Name: &nbsp;{d.calendarname} </h4>
                                                                        </div>
                                                                        <div className='d-flex'>
                                                                            <h4 className="mb-0 py-2" style={{ fontSize: "14px", textAlign: "center", color: 'black', fontWeight: '600' }}>No of Holidays: &nbsp;{noofholidays.map((d) => { return d.holidays })} </h4>
                                                                        </div>
                                                                    </div>
                                                                    <Link to={`/calendar/${d._id}`} className='rounded px-2 py-1' style={{ backgroundColor: '#26ad9d', color: '#fff', fontSize: '14px' }}  >See Details</Link>
                                                                </Card.Title>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </>)
                                            })
                                        }
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* add calendar popup modal */}
                <Modal size="sm"
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show}
                >
                    <Modal.Header closeButton >
                        <Modal.Title id="contained-modal-title-vcenter" className='header-modal'>
                            <CalendarMonthIcon style={{ color: "#ff9b44" }} /> <span style={{ marginLeft: "10px", fontSize: "18px" }}>Add Calendar</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form type="submit" onSubmit={postCalendar}>
                            <Form.Group>
                                <Form.Label><span> Calendar Name</span></Form.Label>
                                <Form.Control type='text' onChange={handleInput} name="calendarname"></Form.Control>

                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Button type="submit" className='btn mt-4' >
                                        Add Calendar
                                    </Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Calendar