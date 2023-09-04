import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { Card, Container, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './leaves.css'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import HeaderContext from '../../Context/HeaderContext'

const Leaves = () => {
  const [show, setShow] = useState(false);
  const [leaveType, setleaveType] = useState("");
  const [description, setDescription] = useState("");
  const [datamodal, setmodaldata] = useState({});
  const [leaves, setLeaves] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const url = "leaves";
  const url2 = "leaves/addleaves";
  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.React_APP_ORIGIN_URL + url);
      const dd = res.data.getLeave;
      setLeaves(dd);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Leaves")
  })

  const postData = async (e) => {
    e.preventDefault();
    try {
      const save = await axios.post(process.env.React_APP_ORIGIN_URL + url2, {
        leaveType: leaveType,
        description: description,
      });
      NotificationManager.success("Successfully Added");
      window.location.replace("/leaves");
    } catch (error) {
      NotificationManager.error("Failed to add leave Type");
    }
  };

  return (
    <>
      <div className="content-wrapper " style={{ backgroundColor: "#f7f7f7" }}>
        <section className="content-header ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
             
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container">
            <div className="card">
              <div
                className="card-header buttoncolor "  style={{ display: "block" }}   >
                <h3 className="card-title" style={{ color: "white" }}>
                  Leave Types
                </h3>
                <div className="col-auto float-end ms-auto">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <a
                      className="btn add-btn "
                      data-bs-toggle="modal"
                      data-bs-target="#add_calendar"
                      onClick={handleShow}
                      style={{ backgroundColor: "#89b353", color: "#ffffff"}}
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
              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ height: 550, width: "100%" }}>

                    <Container>
                      <Row>
                        {leaves.map((d, i) => {
                          return (
                            <Col xs="12" xl="3" lg="4" md="6" sm="6" key={i}>
                              <Card onClick={() => {
                                setmodaldata(d);
                                handleShow();
                              }}>
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
      <NotificationContainer />

    </>
  );
};

export default Leaves;
