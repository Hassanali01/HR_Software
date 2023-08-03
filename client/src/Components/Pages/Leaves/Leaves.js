import React, { useState } from "react";
import { useEffect } from "react";
import { Card, Container, Modal,  Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './leaves.css'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const Leaves = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [leaveType, setleaveType] = useState("");
  const [description, setDescription] = useState("");

  const [datamodal, setmodaldata] = useState({});
  const [leaves, setLeaves] = useState([]);
  const url = "/leaves";
  const url2 = "/leaves/addleaves";
  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      const dd = res.data.getLeave;
      console.log("data", dd);
      setLeaves(dd);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const postData = async (e) => {
    console.log("function hittt",url2, " " , leaveType, " " , description)
    e.preventDefault();
    try {
      const save = await axios.post(url2, {
        leaveType: leaveType,
        description: description,
      });
      console.log("data",save)  
      NotificationManager.success("Successfully Added");
      window.location.replace("/leaves");
    } catch (error) {
      NotificationManager.error("Failed to add leave Type");
      console.log(error,"error from client......." );
    }
  };


  return (
    <>
      <div className="content-wrapper " style={{ backgroundColor: "#f7f7f7" }}>
        <section className="content-header ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Leaves</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Leaves</li>
                </ul>
                <div className="col-auto float-end ms-auto">
                  <div style={{ display: "flex", alignItems: "center" }}>
                  <a
                      className="btn add-btn "
                      data-bs-toggle="modal"
                      data-bs-target="#add_calendar"
                      onClick={handleShow}
                    >
                      <i
                        className="fa fa-plus"
                        style={{ fontSize: "14px", marginRight: "2px" }}
                      >
                        {" "}
                      </i>
                      Add Leave Types
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container">
            <div className="card">
              <div
                className="card-header buttoncolor "
               
              >
                <h3 className="card-title" style={{ color: "white" }}>
                  Leave Types
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ height: 550, width: "100%" }}>
             
                    <Container>
                 
                      <Row>

                        {leaves.map((d, i) => {
                          return (
                            <Col xs="12" xl="3" lg="4" md="6" sm="6" key={i}>
                              <Card onClick={()=>{ setmodaldata(d);
                                    handleShow();}}>
                                <Card.Title className="id">Leave Type</Card.Title>
                                <Card.Body>
                                  <Card.Text>{d.leaveType}</Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
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
      <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
          <Modal.Title>Add Leave Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Label>Leave Type</Form.Label>
            <Form.Control
              type="text"
              name="leaveType"
              required
              onChange={(e) => {
                setleaveType(e.target.value);
              }}
            ></Form.Control>
            <br />
            <Form.Label>Description</Form.Label>
            <textarea
              class="form-control"
              required
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <div className="mt-2 d-flex align-items-center justify-content-center">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
 
    </>
  );
};

export default Leaves;
