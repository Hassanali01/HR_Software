import React from "react";
import { Link } from "@mui/material";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import App from "./FormulaInput/FormulaEditor";
const Setup = () => {


  const [payrollSetups, setPayrollSetups] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [setupTitle, setSetupTitle] = useState("");
  const [setupFormula, setSetupFormula] = useState("");




  useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get('payrollsetup/')
        setPayrollSetups(res.data)
    }
    fetchData()
}, [])




  return (
    <div>
      <div className="content-wrapper " style={{ backgroundColor: "#f7f7f7" }}>
        <section className="content-header ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Payroll</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Payroll</li>
                </ul>
                <div className="col-auto float-end ms-auto">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button variant="primary" onClick={handleShow}>
                      Add Setup
                    </Button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container">
            <div className="card">
              <div className="card-header buttoncolor ">
                <h3 className="card-title" style={{ color: "white" }}>
                  Payroll Setups
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ height: "min-content", width: "100%" }}>
                    <Container >
                      {payrollSetups.map((ps) =>
                        <Card>
                          <Row className="px-3">
                            <Col xxl='3' xl='3' md='3' lg='3' sm='3'>
                              <Row>
                                <Col xl='6' lg='6' md='6'>
                                  <div className="d-flex flex-column justify-content-center py-3">
                                    <div><h6 className="font-weight-bold">Title</h6></div>
                                    <div><p>{ps.title}</p></div>
                                  </div>
                                </Col>
                                <Col xl='6' lg='6' md='6'>
                                  <div className="d-flex flex-column justify-content-center py-3">
                                    <div><h6 className="font-weight-bold">Formula</h6></div>
                                    <div><p>{ps.npd_formula}</p></div>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Card>
                      )
                      }

                    </Container>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <App setSetupTitle={setSetupTitle} setSetupFormula={setSetupFormula}></App></Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={async () => {

                          const saveHoliday = await axios.post("payrollsetup", { title: setupTitle, npd_formula: setupFormula });


                          handleClose()
                        }}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Setup;
