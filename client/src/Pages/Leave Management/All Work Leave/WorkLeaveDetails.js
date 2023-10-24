import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Card, Container, Form, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useReactToPrint } from "react-to-print";
import { useContext } from "react";
import { Context } from "../../../Context/Context";
import "../../Leaves/leaves.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import HeaderContext from '../../../Context/HeaderContext'
import { useLocation } from 'react-router-dom';
function WorkLeaveDetails() {

    const [from, setFirstdate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [to, setSecond] = useState(new Date());
    const [attachedFile, setAttachedFile] = useState();
    const [workabsence, setWorkabsence] = useState("");
    const [applicationdate, setapplicationdate] = useState("")
    const { user } = useContext(Context);
    const [Info, setinfo] = useState([]);
    const [assignedBy, setAssignedBy] = useState("")
    const [leave_status, setLeave_status] = useState("")
    const [leaves, setLeaves] = useState([]);
    const [depemp, setdepemp] = useState([])
    const [fromTime, setFromTime] = useState("")
    const [toTime, setToTime] = useState("")
    const [details, setDetails] = useState([]);
    const [workStatus, setWorkStatus] = useState([]);
    const [task, setTask] = useState("");
    const [project, setProject] = useState("");
    const [superviser, setSuperviser] = useState("");
    const [superviserid, setSuperviserid] = useState("");
    const [placeToVisit, setPlaceToVisit] = useState("");
    const [reasonToVisit, setReasonToVisit] = useState("");
    const [personToMeet, setPersonToMeet] = useState("");
    const [remarks, setRemarks] = useState("");
    const [meterStartReading, setMeterStartReading] = useState("");
    const [meterEndReading, setMeterEndReading] = useState("");
    const [overallRemarks, setOverallRemarks] = useState("");
    const [childModel, setShowChildModel] = useState(false);
    const [testUpdate, setTestUpdate] = useState(false);
    const [expense, setExpense] = useState([]);
    const [addExpense, setAddExpense] = useState({})
    const a = useContext(HeaderContext)
    useEffect(() => {
        a.update("Human Resource / Work Leave Detail")
    })
    const location = useLocation();
    const customData = location.state && location.state;

    console.log("location", location)
    console.log("custom", customData)
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
                                                                    type="date"
                                                                    required
                                                                    className="form-control-sm my-0"
                                                                    value={customData.applicationdate}
                                                                    style={{ backgroundColor: "white" }}
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
                                                                    type="date"
                                                                    required
                                                                    className="form-control-sm my-0"
                                                                    value={customData.workabsence}
                                                                    style={{ backgroundColor: "white" }}
                                                                />
                                                                {/* <Form.Select
                                                                    className="form-select-sm"                                                               
                                                                    value={workabsence}
                                                                >
                                                                    <option disabled selected hidden value={""}>Please Select</option>
                                                                    <option value={"Clientt Visit"}>Client Visit</option>
                                                                    <option value={"Project Site Visit"}>Project Site Visit</option>
                                                                    <option value={"Branch Office"}>Branch Office</option>
                                                                    <option value={"Bank Visit"}>Bank Visit</option>
                                                                    <option value={"Govt. Organization Visit"}>Govt. Organization Visit</option>
                                                                    <option value={"Market Visit"}>Market Visit</option>
                                                                    <option value={"Vendor Visit"}>Vendor Visit</option>
                                                                    <option value={"Others"}>Others</option>
                                                                </Form.Select> */}
                                                            </Form.Group>
                                                        </Col>

                                                        <Col>
                                                            <Form.Group
                                                                className="mb-3"
                                                                controlId="formBasicEmail"
                                                            >
                                                                <Form.Label className="fieldLabel font-weight-normal">Assigned By</Form.Label>
                                                                <Form.Select
                                                                    className="form-select-sm"
                                                                // onChange={(e) => { setAssignedBy(e.target.value) }}
                                                                >
                                                                    <option disabled selected hidden defaultValue={""}>Please Select</option>
                                                                    <option value={setSuperviserid}>{superviser}</option>
                                                                    {/* {
                                          array.map((d, i) => {
                                            return (
                                              <>
                                                <option key={i} value={d._id}>{d.firstname}</option>
                                              </>)
                                          })
                                        } */}
                                                                </Form.Select>
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
                                                                    required
                                                                    value={customData.task}
                                                                // onChange={(e) => {
                                                                //     setTask(e.target.value);
                                                                // }}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="fieldLabel font-weight-normal">Project</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control-sm"
                                                                value={customData.Project}
                                                            // onChange={(e) => {
                                                            //     setProject(e.target.value);
                                                            // }}
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="fieldLabel font-weight-normal">Description</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control-sm"
                                                                value={customData.description}
                                                            // onChange={(e) => {
                                                            //     setDescription(e.target.value);
                                                            // }}
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
                                                                    type="date"
                                                                    className="form-control-sm my-o"
                                                                    value={customData.from}
                                                                    // onChange={(e) => {
                                                                    //     setFirstdate(e.target.value);
                                                                    // }}
                                                                    style={{ backgroundColor: "white" }}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">To</Form.Label>
                                                                <Form.Control
                                                                    className="form-control-sm my-0"
                                                                    type="date"
                                                                    value={customData.to}
                                                                    style={{ backgroundColor: "white" }}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Total Days</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    className="form-control-sm"
                                                                    // value={diffDays}
                                                                    disabled
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
                                                                    required
                                                                    value={customData.toTime}
                                                                // onChange={(e) => {
                                                                //   setToTime(e.target.value)
                                                                // }}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Arrival Time</Form.Label>
                                                                <Form.Control
                                                                    type="time"
                                                                    className="form-control-sm"
                                                                    // required
                                                                    value={customData.fromTime}
                                                                // onChange={(e) => {
                                                                //   setFromTime(e.target.value)
                                                                // }}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal"> Duration</Form.Label>
                                                                <Form.Select
                                                                    className="form-select-sm"
                                                                    value={customData.Short_leave}
                                                                // onChange={(e) => { setLeave_status(e.target.value) }}
                                                                // required
                                                                >
                                                                    <option disabled selected hidden value="">{customData.Short_leave}</option>
                                                                    <option value="True">Short day</option>
                                                                    <option value="False">Full day</option>
                                                                </Form.Select>
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
                                                                <Form.Select
                                                                    className="form-select-sm"
                                                                    value={workStatus}
                                                                // onChange={(e) => { setWorkStatus(e.target.value) }}
                                                                >
                                                                    <option disabled selected hidden value="">Please Select</option>
                                                                    <option value="No Progress">No progress</option>
                                                                    <option value="Partially Progress">Partial progress</option>
                                                                    <option value="Completed">Completed</option>
                                                                </Form.Select>
                                                            </Col>
                                                            <Col xs={8}>
                                                                <Form.Label className="fieldLabel font-weight-normal">Remarks</Form.Label>
                                                                <Form.Control
                                                                    className="form-control-sm"
                                                                    type="text"
                                                                    value={customData.remarks}
                                                                // onChange={(e) => {
                                                                //   setRemarks(e.target.value);
                                                                // }}
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
                                                                // onChange={(e) => {
                                                                //   setReasonToVisit(e.target.value);
                                                                // }}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Person To Meet</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.personToMeet}
                                                                // onChange={(e) => {
                                                                //   setPersonToMeet(e.target.value);
                                                                // }}
                                                                />
                                                            </Col>

                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Place To Visit</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.placeToVisit}
                                                                // onChange={(e) => {
                                                                //   setPlaceToVisit(e.target.value);
                                                                // }}
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
                                                                // onChange={(e) => {
                                                                //   setMeterStartReading(e.target.value);
                                                                // }}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Meter End Reading</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.meterEndReading}
                                                                // onChange={(e) => {
                                                                //   setMeterEndReading(e.target.value);
                                                                // }}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="fieldLabel font-weight-normal">Overall Remarks</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    className="form-control-sm"
                                                                    value={customData.overallRemarks}
                                                                // onChange={(e) => {
                                                                //   setOverallRemarks(e.target.value);
                                                                // }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>

                                                    <br />
                                                    <Row style={{ marginTop: "1%" }}>
                                                        <Col lg={12}>
                                                            <Table striped bordered hover>
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
                                                            </Table>
                                                        </Col>
                                                    </Row>

                                                    <Form.Group>
                                                        <Row>
                                                            <Form.Label className="fieldLabel font-weight-normal">Attachment</Form.Label>
                                                            <Col sm={10}>
                                                                <input
                                                                    type="file"
                                                                    id="files"
                                                                    name="files"
                                                                    onChange={(f) => {
                                                                        var ext = f.target.value.match(
                                                                            /\.([^\.]+)$/
                                                                        )[1];
                                                                        switch (ext) {
                                                                            case "jpeg":
                                                                            case "jpg":
                                                                            case "jpgv":
                                                                            case "png":
                                                                            case "svg":
                                                                            case "xls":
                                                                            case "xlam":
                                                                            case "xlsm":
                                                                            case "pptx":
                                                                            case "xlsx":
                                                                            case "docx":
                                                                            case "dotx":
                                                                            case "ppt":
                                                                            case "doc":
                                                                            case "pdf":
                                                                            case "txt":
                                                                            case "7z":
                                                                            case "ace":
                                                                            case "acc":
                                                                            case "avi":
                                                                            case "csv":
                                                                            case "texinfo":
                                                                            case "html":
                                                                            case "m3u":
                                                                            case "m4v":
                                                                            case "mpeg":
                                                                            case "mp4a":
                                                                            case "mp4":
                                                                            case "mp4":
                                                                            case "weba":
                                                                            case "webm":
                                                                            case "psd":
                                                                            case "pic":
                                                                            case "au":
                                                                            case "tar":
                                                                            case "wav":
                                                                            case "webp":
                                                                            case "xml":
                                                                            case "zip":
                                                                                //   setAttachedFile(f.target.files[0]);
                                                                                break;
                                                                            default:
                                                                                alert(
                                                                                    "Please select the valid file extension!"
                                                                                );
                                                                                f.target.value = "";
                                                                        }
                                                                        //   setAttachedFile(f.target.files[0]);
                                                                    }}
                                                                />
                                                            </Col>

                                                        </Row>
                                                    </Form.Group>

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