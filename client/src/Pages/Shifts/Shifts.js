import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
    Modal,
    Form,
    Button,
    Container,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Table from "./Table";
import HeaderContext from '../../Context/HeaderContext'

function Shifts() {

    const [getdata, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [view, setView] = useState('module');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const url2 = "shifts/addShifts"
    const url1 = "shifts/allShifts";
    const [shiftname, setshiftname] = useState("");
    const [description, setDescription] = useState("");
    const [fromTime, setFromTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const Shifts = async () => {
        try {
            const shift = await axios.get(process.env.React_APP_ORIGIN_URL + url1);
            setData(shift.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event, nextView) => {
        setView(!view);
        setView(nextView);
        setView(!view);
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            const save = await axios.post(process.env.React_APP_ORIGIN_URL + url2, {
                shift_name: shiftname,
                description: description,
                start_time: fromTime,
                end_time: endTime,
            });
            console.log(shiftname, description, fromTime, endTime)
            save && NotificationManager.success("Successfully Added");
        } catch (error) {
            NotificationManager.error("Failed to add department");
        }
    };

    useEffect(() => {
        Shifts()
    }, []);

    const a = useContext(HeaderContext)
    useEffect(() => {
        a.update("Human Resource / Job Shifts")
    })

    return (
        <>
            <div className="content-wrapper " style={{ backgroundColor: "#f7f7f7" }}>
            

                <section className="content">
                    <div className="container">
                        <div className="card">
                            <div className="card-header  buttoncolor" style={{ display: "block" , paddingBottom: "0px" ,height: "57px"}}>
                                <h3 className="card-title" style={{ color: "white" , fontWeight: "700"}}>
                                    Job Shifts
                                </h3>
                                <div className="col" >
                                    <div className="col-auto float-end ms-auto" style={{ display: "flex" }}>

                                        <div
                                            className="mb-3"
                                            style={{
                                                display: "flex",
                                                gap: "12px"
                                            }}
                                        >
                                            <div>
                                                <ToggleButtonGroup
                                                    orientation="horizontal"
                                                    value={view}
                                                    style={{height: "38px"}}
                                                    exclusive
                                                    onChange={handleChange}
                                                >
                                                    <ToggleButton value="module" aria-label="module" selected={!view}>
                                                        <ViewListIcon />
                                                    </ToggleButton>

                                                    <ToggleButton value="list" aria-label="list" selected={view}>
                                                        <ViewModuleIcon />
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            </div>
                                            <div
                                                style={{ display: "flex" }}
                                                onClick={handleShow}
                                            >
                                                <a
                                                    className="btn add-btn "
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add_calendar"
                                                    style={{ backgroundColor: "rgb(137, 179, 83)", color: "#ffffff", padding: "6px 5px" }}
                                                >
                                                    <i
                                                        className="fa fa-plus"
                                                        style={{ fontSize: "14px", marginRight: "2px" }}
                                                    >
                                                        {" "}
                                                    </i>
                                                    Add Shifts
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <div style={{ height: 500, width: "100%" }}>
                                        {view ? (
                                            <Table data={getdata}></Table>
                                        ) : (
                                            <Container>
                                                <Row>
                                                    {getdata.map((d, i) => {
                                                        let demo = d.description
                                                        let arr = []
                                                        console.log(demo)
                                                        for (let a in demo) {
                                                            arr.push(demo[a])
                                                        }
                                                        let value = arr.slice(0, 20).join('')
                                                        return (
                                                            <>
                                                                <Col xs="12" xl="3" lg="4" md="6" sm="6">
                                                                    <Card>
                                                                        <Card.Title className="id">
                                                                            {d.shift_name}
                                                                        </Card.Title>
                                                                        <Card.Body>
                                                                            <Card.Text>{value}</Card.Text>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Col>
                                                            </>
                                                        );
                                                    })}
                                                </Row>
                                            </Container>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <NotificationContainer />
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Shift</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={postData}>
                        <Form.Label>Shift Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => {
                                setshiftname(e.target.value);
                            }}
                        ></Form.Control>
                        <br />
                        <Form.Label>Description</Form.Label>
                        <textarea
                            class="form-control"
                            required
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        ></textarea>
                        <br />
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={fromTime}
                            onChange={(e) => {
                                setFromTime(e.target.value)
                            }}
                        />
                        <br />
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={endTime}
                            onChange={(e) => {
                                setEndTime(e.target.value)
                            }}
                        />
                        <div className="mt-2 d-flex align-items-center justify-content-center">
                            <Button type="submit" style={{backgroundColor: "rgb(137, 179, 83)"}}>Submit</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Shifts