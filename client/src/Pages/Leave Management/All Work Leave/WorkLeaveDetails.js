import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Card, Container, Form, Row, } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import "../../Leaves/leaves.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import HeaderContext from '../../../Context/HeaderContext'
import { useLocation } from 'react-router-dom';

function WorkLeaveDetails() {

    const [disableFields, setDisableFields] = useState(true);
    const a = useContext(HeaderContext)
    useEffect(() => {
        a.update("Human Resource / Work Leave Detail")
    })
    const location = useLocation();
    const customData = location.state && location.state;
console.log(location.state,"hihi")

    return (
        <>
            <div
                className="content-wrapper my-1"
                style={{ backgroundColor: "#f7f7f7", marginTop: "20px" }}
            >
                <div className="card-body">
                    <Container>
                        <div>
                            <Row>
                                <Col >
                                    <Card>
                                        <Card.Body>
                                            <Container>
                                                <Form>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group
                                                                className="mb-3"
                                                                controlId="formDate"
                                                            >
                                                                <Form.Label className="fieldLabel font-weight-normal">Date</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm my-0"
                                                                    value={customData.applicationdate}
                                                                    style={{ backgroundColor: "white" }}
                                                                    disabled={disableFields}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group
                                                                className="mb-3"
                                                                controlId="formWorkType"
                                                            >
                                                                <Form.Label className="fieldLabel font-weight-normal">Work Type</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm my-0"
                                                                    value={customData.workabsence}
                                                                    style={{ backgroundColor: "white" }}
                                                                    disabled={disableFields}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group
                                                                className="mb-3"
                                                                controlId="formBasicEmail"
                                                            >
                                                                <Form.Label className="fieldLabel font-weight-normal">Assigned By</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm my-0"
                                                                    value={customData.assignedBy}
                                                                    style={{ backgroundColor: "white" }}
                                                                    disabled={disableFields}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group
                                                                className="mb-3"
                                                                controlId="formTask"
                                                            >
                                                                <Form.Label className="fieldLabel font-weight-normal">Task</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.task}
                                                                    disabled={disableFields}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="fieldLabel font-weight-normal">Project</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control-sm"
                                                                value={customData.project}
                                                                disabled={disableFields}
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="fieldLabel font-weight-normal">Description</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control-sm"
                                                                value={customData.description}
                                                                disabled={disableFields}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">From</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm my-o"
                                                                    value={customData.from}
                                                                    style={{ backgroundColor: "white" }}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">To</Form.Label>
                                                                <Form.Control
                                                                    className="form-control-sm my-0"
                                                                    type="text"
                                                                    value={customData.to}
                                                                    style={{ backgroundColor: "white" }}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Total Days</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    className="form-control-sm"
                                                                    value={customData.totaldays}
                                                                    disabled={disableFields}
                                                                    style={{ backgroundColor: "white" }}
                                                          
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Departure Time</Form.Label>
                                                                <Form.Control
                                                                    type="time"
                                                                    className="form-control-sm"
                                                                    value={customData.toTime}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Arrival Time</Form.Label>
                                                                <Form.Control
                                                                    type="time"
                                                                    className="form-control-sm"
                                                                    value={customData.fromTime}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal"> Duration</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.Short_leave ? "Short Day" : "Full Day"}
                                                                    disabled={disableFields}
                                                                    style={{ backgroundColor: "white" }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <Row>
                                                            <Col xs={4} >
                                                                <Form.Label className="fieldLabel font-weight-normal">Work Status</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.workStatus}
                                                                    disabled={disableFields}
                                                                    style={{ backgroundColor: "white" }}
                                                                />
                                                            </Col>
                                                            <Col xs={8}>
                                                                <Form.Label className="fieldLabel font-weight-normal">Remarks</Form.Label>
                                                                <Form.Control
                                                                    className="form-control-sm"
                                                                    type="text"
                                                                    value={customData.remarks}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <br />
                                                    <h5>Visit Details :</h5>
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Reason For Visit</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.reasonToVisit}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Person To Meet</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.personToMeet}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Place To Visit</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.placeToVisit}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <br />
                                                    <h5>Distance Covered :</h5>
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Meter Start Reading</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.meterStartReading}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Meter End Reading</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.meterEndReading}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Overall Remarks</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.overallRemarks}
                                                                    disabled={disableFields}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <br />
                                                    <Row style={{ marginTop: "1%" }}>
                                                        <Col lg={12}>
                                                            {/* <Table striped bordered hover>
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th style={{ textAlign: "center" }}>
                                                                            Expense type
                                                                        </th>
                                                                        <th style={{ textAlign: "center" }}>amount</th>
                                                                        <th style={{ textAlign: "center" }}>description</th>
                                                                        <th style={{ textAlign: "center" }}>Remove</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {expense.length > 0 &&
                                                                        expense.map((d, i) => {
                                                                            return (
                                                                                <tr>
                                                                                    <th>{i + 1}</th>
                                                                                    <td>{d.expenseType}</td>
                                                                                    <td>{d.amount}</td>
                                                                                    <td>
                                                                                        {d.description}
                                                                                    </td>

                                                                                    <td>
                                                                                        <i
                                                                                            class="fa fa-trash-can"
                                                                                            aria-hidden="true"
                                                                                            style={{ color: "red" }}
                                                                                        // onClick={() => removeitem(i)}
                                                                                        ></i>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                </tbody>
                                                            </Table> */}
                                                        </Col>
                                                    </Row>
                                              
                                                </Form>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default WorkLeaveDetails