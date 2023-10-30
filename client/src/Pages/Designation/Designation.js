import React from "react";
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
import HeaderContext from '../../Context/HeaderContext'

function Designation() {

    const [getdata, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [title, settitle] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Designation = async () => {
        try {
            const des = await axios.get(process.env.React_APP_ORIGIN_URL + "designation");
            const res = des.data
            console.log("res", res.designation)
            setData(res.designation);
        } catch (error) {
            console.log(error);
        }
    };


    const postData = async (e) => {
        e.preventDefault();
        try {
            const save = await axios.post(process.env.React_APP_ORIGIN_URL + "designation/adddesignation", {
                title: title,
            });
            save && NotificationManager.success("Successfully Added");
            window.location.replace("/dasignation");
        } catch (error) {
            NotificationManager.error("Failed to add designation");
        }
    };

    useEffect(() => {
        Designation();
    }, []);

    const a = useContext(HeaderContext)
    useEffect(() => {
        a.update("Human Resource / Designation")
    })
    return (
        <>
            <div className="content-wrapper ">
                <section className="content">
                    <div className="container">
                        <div className="card">
                            <div className="card-header  buttoncolor" style={{ paddingRight: "40px" }}>
                                <h3 className="card-title" style={{ fontWeight: "700" }}>
                                    Designation
                                </h3>

                                <div className="icon-button">
                                    <div
                                        style={{ display: "flex", alignItems: "center" }}
                                        onClick={handleShow}
                                    >
                                        <a
                                            className="btn add-btn "
                                            data-bs-toggle="modal"
                                            data-bs-target="#add_calendar"
                                        >
                                            <i
                                                className="fa fa-plus"
                                            >
                                                {" "}
                                            </i>
                                            Add Designation
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <div style={{ height: 700, width: "100%" }}>
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
                                                                    <Card.Title className="id" >
                                                                        {d.title}
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
                    <Modal.Title>Add Designation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={postData}>
                        <Form.Label>Designation Title</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => {
                                settitle(e.target.value);
                            }}
                        ></Form.Control>
                        <br />
                        <div className="mt-2 d-flex align-items-center justify-content-center">
                            <Button type="submit" style={{ backgroundColor: "rgb(137, 179, 83)" }}>Submit</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Designation