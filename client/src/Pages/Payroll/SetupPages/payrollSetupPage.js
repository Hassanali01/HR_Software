import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import App from "./FormulaInput/FormulaEditor";
import HeaderContext from '../../../Context/HeaderContext'

const Setup = () => {

  const [payrollSetups, setPayrollSetups] = useState([])
  const [show, setShow] = useState(false);
  const [setupTitle, setSetupTitle] = useState("");
  const [setupFormula, setSetupFormula] = useState("");
  const [applyGazettedHoliday, setApplyGazettedHoliday] = useState(true);
  const [sundayDayoff, setSundayDayoff] = useState(true);
  const [lastSaturdayDayoff, setLastSaturdayDayoff] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(process.env.React_APP_ORIGIN_URL + 'payrollsetup/')
      setPayrollSetups(res.data)
    }
    fetchData()
  }, [])

  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Payroll setup")
  })

  return (
    <div>
      <div className="content-wrapper " style={{ backgroundColor: "#f7f7f7" }}>
        <section className="content">
          <div className="container">
            <div className="card">
              <div className="card-header buttoncolor " style={{ display: "block", height: "57px" }}>
                <h3 className="card-title" style={{ color: "white", fontWeight: "700" }}>
                  Payroll Setups
                </h3>
                <div className="col">
                  <div className="col-auto float-end ms-auto">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button variant="primary" onClick={handleShow}
                        style={{ backgroundColor: "#89b353", color: "#ffffff", padding: "6px 5px" }}>
                        <i
                          className="fa fa-plus"
                          style={{ fontSize: "14px", marginRight: "2px" }}
                        >
                          {" "}
                        </i>
                        Add Setup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ height: "min-content", width: "100%" }}>
                    <Container >
                      {payrollSetups.map((ps) =>
                        <Card style={{ width: "91%" }}>
                          <Row className="px-3">
                            <Col xxl='12' xl='12' md='12' lg='12' sm='12'>
                              <Row>
                                <Col xl='3' lg='3' md='3'>
                                  <div className="d-flex flex-column justify-content-center py-3">
                                    <div><h6 className="font-weight-bold">Title</h6></div>
                                    <div><p>{ps.title}</p></div>
                                  </div>
                                </Col>
                                <Col xl='9' lg='9' md='9'>
                                  <div className="d-flex flex-column justify-content-center py-3">
                                    <div><h6 className="font-weight-bold">Formula</h6></div>
                                    <div><p>{ps.npd_formula}</p></div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl='6' lg='6' md='6'>
                                  <div className="d-flex flex-column justify-content-center py-3">
                                    <div><h6 className="font-weight-bold">Gazetted holidays applied</h6>{JSON.stringify(ps.applyGazettedHoliday)}</div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl='6' lg='6' md='6'>
                                  <div className="d-flex flex-column justify-content-center py-3">
                                    <div><h6 className="font-weight-bold">Days off:</h6>{JSON.stringify(ps.daysoff)}</div>
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
                        <App setSetupTitle={setSetupTitle} setSetupFormula={setSetupFormula}></App>
                        <label>apply gazetted holidays:</label> &nbsp;<input type="checkbox" value={applyGazettedHoliday} defaultChecked="true" onClick={(e) => { setApplyGazettedHoliday(e.target.checked) }} />
                        <br />
                        <label>Days off observed on:</label><br />
                        <p>
                          <label>Sunday:</label> &nbsp;  <input type="checkbox" value={sundayDayoff} defaultChecked="true" onClick={(e) => { setSundayDayoff(e.target.checked) }} />
                          <br />
                          <label>Last Saturday:</label> &nbsp;  <input type="checkbox" value={lastSaturdayDayoff} defaultChecked="true" onClick={(e) => { setLastSaturdayDayoff(e.target.checked) }} />
                        </p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "rgb(137, 179, 83)" }}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={async () => {
                          const savesetup = await axios.post(process.env.React_APP_ORIGIN_URL + "payrollsetup", {
                            title: setupTitle, npd_formula: setupFormula, applyGazettedHoliday: applyGazettedHoliday,
                            daysoff: { sundayDayoff, lastSaturdayDayoff }
                          });
                          handleClose()
                        }} style={{ backgroundColor: "rgb(137, 179, 83)" }}>
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
