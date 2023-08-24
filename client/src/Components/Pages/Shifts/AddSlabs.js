import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import {
    Modal,
    Form,
    Card,
} from "react-bootstrap";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import HeaderContext from '../../../Context/HeaderContext'

function AddSlabs() {
    const [shift, setShift] = useState([])
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [slabstime, setSlabstime] = useState("");
    const [slabsdeduction, setSlabsdeduction] = useState("");
    const [slabs, setSlabs] = useState([])
    const location = useLocation();
    const id = location.state.id

    React.useEffect((i) => {
    }, [])


    const handleChange = (event, nextView) => {
        setView(!view);
        setView(nextView);
        setView(!view);
    };
    let count = 1
    const url = `/shifts/${id}`;
    const postData = async (e) => {
        e.preventDefault();
        try {
            const save = await axios.put(url, {
                slabs: [
                    {
                        laterthen: slabstime
                    },
                    {
                        deduction: slabsdeduction
                    }
                ]
            });
            save && NotificationManager.success("Successfully Added");
        } catch (error) {
            NotificationManager.error("Failed to add Slabs");
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/shifts/${id}`);
            setShift(response.data)
            setSlabs(response.data.slabs);
        } catch (error) {
            setShift([]);
            console.error('Axios error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])
    const a = useContext(HeaderContext)
    useEffect(() => {
      a.update("Human Resource / Job Shifts / Add Slabs")
    })

    return (
        <>
            <div className="content-wrapper " style={{ backgroundColor: "#f7f7f7" }}>
                <section className="content-header ">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Add Slabs</h3>
                                <ul
                                    className="breadcrumb"
                                    style={{ backgroundColor: "#f7f7f7" }}
                                >
                                    <li className="breadcrumb-item">
                                        <Link to="/" style={{ color: "#1f1f1f" }}>
                                        Human Resource
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/shifts" style={{ color: "#1f1f1f" }}>Job Shifts </Link>
                                    </li >
                                    <li className="breadcrumb-item">
                                        <Link to="/addslabs" style={{ color: "#1f1f1f" }}>Add Slabs </Link>
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
                            <Table className="striped bordered hover" >
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
                                    Shift Slabs
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
                                    Add Slab
                                </a>
                            </div>
                            <Table className="striped bordered hover" >
                                <tbody>
                                    <tr>
                                        <th>Sr #</th>
                                        <th> Later than</th>
                                        <th> Deduction</th>
                                    </tr>
                                    {shift.slabs && shift.slabs.map((i) => {
                                        return (<>

                                            <tr>
                                                <td>{count++}</td>
                                                <td>{i.later_than}</td>
                                                <td>{i.deduction}</td>
                                            </tr>

                                        </>)
                                    })}

                                </tbody>
                            </Table>
                        </CardContent>
                    </Card>
                </Container>
            </div >

            <NotificationContainer />

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Slab</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={postData}>
                        <Form.Label>Slab Time</Form.Label>
                        <Form.Control
                            type="time"
                            required
                            onChange={(e) => {
                                setSlabstime(e.target.value);
                            }}
                        ></Form.Control>
                        <br />
                        <Form.Label>Slab Deduction</Form.Label>
                        <Form.Select
                            type="text"
                            required
                            onChange={(e) => {
                                setSlabsdeduction(e.target.value);
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

export default AddSlabs