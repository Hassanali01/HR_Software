import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import {
    Modal,
    Form,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";

function AddSlaps() {

    const [shift, setShift] = useState([])
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [slaptime, setSlaptime] = useState("");
    const [slapdeduction, setSlapdeduction] = useState("");
    const [slap, setSlap] = useState([])

    const location = useLocation();
    const id = location.state.id
    React.useEffect((i) => {
        console.log("yes use effect ", location)
    }, [])


    const handleChange = (event, nextView) => {
        setView(!view);
        setView(nextView);
        setView(!view);

        console.log(nextView);
    };
    const url = `/shifts/${id}`;
    const postData = async (e) => {
        e.preventDefault();
        try {
            const save = await axios.put(url, {
                slaps: [
                    {
                        laterthen: slaptime
                    },
                    {
                        deduction: slapdeduction
                    }
                ]
            });
            console.log("save", save)
            save && NotificationManager.success("Successfully Added");
            window.location.replace("/addslabs");
        } catch (error) {

            NotificationManager.error("Failed to add Slap");
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`/shifts/${id}`);

            console.log("res", response.data)

            setShift(response.data)
            setSlap(response.data.slaps)

        } catch (error) {
            setShift([]);
            console.error('Axios error:', error);
        }

    };
    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            <div className="content-wrapper " style={{ backgroundColor: "#f7f7f7" }}>
                <section className="content-header ">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Add Slaps</h3>
                                <ul
                                    className="breadcrumb"
                                    style={{ backgroundColor: "#f7f7f7" }}
                                >
                                    <li className="breadcrumb-item">
                                        <Link to="/" style={{ color: "#1f1f1f" }}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/shifts" style={{ color: "#1f1f1f" }}>Job Shifts </Link>
                                    </li >
                                    <li className="breadcrumb-item">
                                        <Link to="/addslabs" style={{ color: "#1f1f1f" }}>Add Slaps </Link>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </section>
                <Container>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <h2>Overview</h2>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Shift Name</th>
                                        <th>Start Time</th>
                                        <th>End Time </th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{shift.shift_name}</td>
                                        <td>{shift.start_time}</td>
                                        <td>{shift.end_time}</td>
                                        <td>{shift.description}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div style={{ widows: "50%", float: "left" }}>
                                <h2>
                                    Shift Slaps
                                </h2>
                            </div>

                            <div
                                style={{ float: "right" }}
                                onClick={handleShow}
                            >
                                <a
                                    className="btn add-btn "
                                    data-bs-toggle="modal"
                                    data-bs-target="#add_calendar"
                                >
                                    <i
                                        className="fa fa-plus"
                                        style={{ fontSize: "14px", marginRight: "2px" }}
                                    >
                                        {" "}
                                    </i>
                                    Add Slap
                                </a>

                            </div>
                            <Table className="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th colspan="2">1st Slap</th>
                                        <th colspan="2">2nd Slap</th>
                                        <th colspan="2">3rd Slap  </th>
                                        <th colspan="2">4th Slap </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th> Late</th>
                                        <th> Deduction</th>
                                        <th> Late</th>
                                        <th> Deduction</th>
                                        <th> Late</th>
                                        <th> Deduction</th>
                                        <th> Late</th>
                                        <th> Deduction</th>
                                    </tr>
                                    <tr>
                                        

                                    </tr>
                                </tbody>
                            </Table>
                        </CardContent>

                    </Card>

                </Container>





            </div >
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Slap</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={postData}>
                        <Form.Label>Slap Time</Form.Label>
                        <Form.Control
                            type="time"
                            required
                            onChange={(e) => {
                                setSlaptime(e.target.value);
                            }}
                        ></Form.Control>
                        <br />
                        <Form.Label>Slap Deduction</Form.Label>
                        <Form.Select
                            type="text"
                            required
                            onChange={(e) => {
                                setSlapdeduction(e.target.value);
                            }}
                        >
                            <option disabled selected hidden value="">Please Select</option>
                            <option value="0.25">0.25</option>
                            <option value="0.5">0.5</option>
                            <option value="0.75">0.75</option>
                            <option value="1">1</option>
                        </Form.Select>
                        <div className="mt-2 d-flex align-items-center justify-content-center">
                            <Button type="submit">Submit</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddSlaps