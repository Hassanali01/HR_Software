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
import HeaderContext from '../../Context/HeaderContext'

function AddSlabs() {
    const [shift, setShift] = useState([])
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [slabstime, setSlabstime] = useState("");
    const [slabsdeduction, setSlabsdeduction] = useState("");
    const [earlyslabstime, setEarlylabstime] = useState("");
    const [earlyslabsdeduction, setEarlyslabsdeduction] = useState("");
    const [slabs, setSlabs] = useState([])
    const [earlyslabs, setEarlySlabs] = useState([]);
    const location = useLocation();
    const [show2, setShow2] = useState(false)
    const [view2, setView2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const id = location.state.id



    const handleChange = (event, nextView) => {
        setView(!view);
        setView(nextView);
        setView(!view);

        setView2(!view2);
        setView2(nextView);
        setView2(!view2);

    };
    let count = 1
    let count2 = 1
    const url = `shifts/${id}`;

    const postData = async (e) => {
        e.preventDefault();
        try {
            const save = await axios.put(process.env.React_APP_ORIGIN_URL + url, {
                slabs: [
                    {
                        later_than: slabstime
                    },
                    {
                        deduction: slabsdeduction
                    }
                ],
                early_leave_slabs: [
                    {
                        early_leave_time: earlyslabstime
                    },
                    {
                        deduction: earlyslabsdeduction
                    }
                ]
            });

            save && NotificationManager.success("Successfully Added");
        } catch (error) {
            NotificationManager.error("Failed to add Slabs");
        }
    };


    const handleDelete = async (i) => {

        try {
            const response = await axios.delete(process.env.React_APP_ORIGIN_URL + `shifts/deleteslabs/${id}`, {
                data: {
                    slabs: i,
                    early_leave_slabs: i
                }
            });

        } catch (error) {
            console.error(error);

        }
    };



    const fetchData = async () => {
        try {
            const response = await axios.get(process.env.React_APP_ORIGIN_URL + `shifts/${id}`);
            setShift(response.data)
            setSlabs(response.data.slabs);
            setEarlySlabs(response.data.early_leave_slabs)
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
                                    Late Arrival Slabs
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
                                        <th>Delete</th>
                                    </tr>
                                    {shift.slabs && shift.slabs.map((i) => {
                                        return (<>
                                            <tr>
                                                <td>{count++}</td>
                                                <td>{i.later_than}</td>
                                                <td>{i.deduction}</td>
                                                <td>
                                                    <i
                                                        class=" fa-regular fa-trash-can"
                                                        title="Delete"
                                                        style={{ color: 'red', fontSize: "20px", cursor: 'pointer', float: "center" }}
                                                        onClick={() => handleDelete(i.later_than)}
                                                    ></i>
                                                </td>
                                            </tr>
                                        </>)
                                    })}
                                </tbody>
                            </Table>
                        </CardContent>
                    </Card>
                </Container>

                <Container>
                    <Card>
                        <CardContent>
                            <div style={{ widows: "50%", float: "left" }}>
                                <h2>
                                    Early Leave Slabs
                                </h2>
                            </div>
                            <div
                                style={{ float: "right" }}
                                onClick={handleShow2}
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
                                        <th> Early than</th>
                                        <th> Deduction</th>
                                        <th>Delete</th>
                                    </tr>
                                    {shift.early_leave_slabs && shift.early_leave_slabs.map((i) => {
                                        return (<>
                                            <tr>
                                                <td>{count2++}</td>
                                                <td>{i.early_leave_time}</td>
                                                <td>{i.deduction}</td>
                                                <td>
                                                    <i
                                                        class=" fa-regular fa-trash-can"
                                                        title="Delete"
                                                        style={{ color: 'red', fontSize: "20px", cursor: 'pointer', float: "center" }}
                                                        onClick={() => handleDelete(i.early_leave_time)}
                                                    ></i>
                                                </td>
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

            {/* late arrival deduction */}
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
            {/* //Early Leaves slabs model */}
            <Modal show={show2} onHide={handleClose2} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Slab</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={postData}>
                        <Form.Label>Early Leave Slab Time </Form.Label>
                        <Form.Control
                            type="time"
                            required
                            onChange={(e) => {
                                setEarlylabstime(e.target.value);
                            }}
                        ></Form.Control>
                        <br />
                        <Form.Label>Slab Deduction</Form.Label>
                        <Form.Select
                            type="text"
                            required
                            onChange={(e) => {
                                setEarlyslabsdeduction(e.target.value);
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