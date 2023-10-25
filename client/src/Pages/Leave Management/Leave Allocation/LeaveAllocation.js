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

function LeaveAllocation() {
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

    const Closechildmodal = () => setShowChildModel(false);
    const handleeducationdetails = async (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        await setAddExpense({
            ...addExpense,
            [name]: value,
        });
    };

    const removeitem = (i) => {
        const temp = expense;
        temp.splice(i, 1);
        setExpense(temp);
        setTestUpdate(!testUpdate);
    };

    const url = "leaves";
    const a = useContext(HeaderContext)
    useEffect(() => {
        a.update("Human Resource / Work Leave Request")
    })

    const employee = user.id;
    const getEmp = `employees/${user.id}`;
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const userInformation = async () => {
        try {
            const res = await axios.get(process.env.React_APP_ORIGIN_URL + getEmp);
            const empinfo = res.data;
            const InfoData = [];
            await empinfo.Leaves.map((d) => {
                InfoData.push({
                    from: d.from,
                    workStatus: d.workStatus,
                    to: d.to,
                    status: d.status,
                    workabsence: d.workabsence,
                    name: empinfo.firstname,
                    _id: empinfo.emp_id,
                    department: empinfo.departments.map((d) => d.departmentname),
                    description: d.description,
                    applicationdate: d.applicationdate,
                    empid: empinfo.emp_id,
                    designation: empinfo.designation,
                    leavesId: empinfo.Leaves.slice(empinfo.Leaves.length - 1),
                    assignedBy: d.assignedBy,
                    task: d.task,
                    project: d.project,
                    leave_status: d.leave_status,
                });
            });
            setinfo(InfoData);

            const departments = [];
            await empinfo.departments.map((d) => {
                departments.push({
                    department: d.departmentname,
                    name: empinfo.firstname,
                    email: empinfo.email,
                    empid: empinfo.emp_id,
                    designation: empinfo.designation,
                    supervisors: empinfo.supervisors[0].username
                });
            });

            setDetails(departments);
            setSuperviser(empinfo.supervisors[0].username)
            setSuperviserid(empinfo.supervisors[0]._id)
        } catch (error) {
            console.log(error);
        }
    };
    const depurl = user.departments.map((d) => d._id);
    const depemployees = `departments/${depurl}`
    const allemployees = async () => {
        try {
            const res = await axios.get(process.env.React_APP_ORIGIN_URL + depemployees);
            const data = res.data.department.employees;
            setdepemp(data)
        } catch (error) {
            console.log(error)
        }
    }

    const addWorkAbsence = async (event) => {
        event.preventDefault();

        console.log("expense to append", expense)

        const formData = new FormData();
        formData.append("workabsence", workabsence);
        formData.append("from", from);
        formData.append("description", description);
        formData.append("to", to);
        formData.append("workStatus", workStatus);
        formData.append("employee", employee);
        formData.append("file", attachedFile);
        formData.append("applicationdate", applicationdate);
        formData.append("assignedBy", assignedBy)
        formData.append("fromTime", fromTime)
        formData.append("toTime", toTime)
        formData.append("task", task);
        formData.append("leave_status", leave_status);
        formData.append("project", project);
        formData.append("placeToVisit", placeToVisit);
        formData.append("personToMeet", personToMeet);
        formData.append("reasonToVisit", reasonToVisit);
        formData.append("remarks", remarks);
        formData.append("meterStartReading", meterStartReading);
        formData.append("meterEndReading", meterEndReading);
        formData.append("overallRemarks", overallRemarks);
        // for (var i = 0; i < expense.length; i++) {
        //   formData.append('expense', JSON.stringify(expense[i]));
        // }
        formData.append("expense", JSON.stringify(expense));
        console.log("formData", formData)
        try {
            const addreq = await axios({
                method: "post",
                url: process.env.React_APP_ORIGIN_URL + `workLeave`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("formdata", formData)
            addreq && NotificationManager.success("Successfully Added");
        } catch (error) {
            NotificationManager.error("Failed to Add");
        }
    };

    // disabled previous datesurl
    var dd, today, mm, yyyy;
    const disableDate = () => {
        today = new Date();
        dd = String(today.getDate() + 1).padStart(2, "0");
        mm = String(today.getMonth() + 1).padStart(2, "0");
        yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    //total no of days between dates
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(from); // 29th of Feb at noon your timezone
    var secondDate = new Date(to);
    var diffDays = Math.round(
        Math.abs((secondDate.getTime() - firstDate.getTime()) / oneDay) + 1
    );

    const fetchData = async () => {
        try {
            const res = await axios.get(process.env.React_APP_ORIGIN_URL + url);
            const dd = res.data.getLeave;
            setLeaves(dd);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        userInformation();
        allemployees();
    }, []);
    const array = depemp.filter((d) => d.firstname !== "Hafiz Raheel" & d.firstname !== `${user.firstname}`);
    return (
        <>
            <div
                className="content-wrapper my-1"
                style={{ backgroundColor: "#f7f7f7" }}
            >
                <section className="content" style={{ marginTop: "30px" }}>
                    <div className="container">
                        <div className="card">
                            <div className="card-header buttoncolor ">
                                <h3 className="card-title" style={{ color: "white" }}>
                                    Work Absense Form
                                </h3>
                            </div>
                            <div className="card-body">
                                <Container>
                                    <div>

                                        <Row>
                                            <Col >
                                                <Card>
                                                    <Card.Body>
                                                        <Container>
                                                            <Form onSubmit={addWorkAbsence}>

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

                                                                                onChange={(e) => {
                                                                                    setapplicationdate(e.target.value);
                                                                                }}
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
                                                                            <Form.Select
                                                                                className="form-select-sm"
                                                                                onChange={(e) => {
                                                                                    setWorkabsence(e.target.value);
                                                                                }}
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
                                                                            </Form.Select>
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
                                                                                onChange={(e) => { setAssignedBy(e.target.value) }}
                                                                            >
                                                                                <option disabled selected hidden defaultValue={""}>Please Select</option>
                                                                                <option value={setSuperviserid}>{superviser}</option>
                                                                                {
                                                                                    array.map((d, i) => {
                                                                                        return (
                                                                                            <>
                                                                                                <option key={i} value={d._id}>{d.firstname}</option>
                                                                                            </>)
                                                                                    })
                                                                                }
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
                                                                                onChange={(e) => {
                                                                                    setTask(e.target.value);
                                                                                }}
                                                                            />

                                                                        </Form.Group>

                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="fieldLabel font-weight-normal">Project</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            className="form-control-sm"

                                                                            onChange={(e) => {
                                                                                setProject(e.target.value);
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="fieldLabel font-weight-normal">Description</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            className="form-control-sm"

                                                                            onChange={(e) => {
                                                                                setDescription(e.target.value);
                                                                            }}
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

                                                                                required
                                                                                onChange={(e) => {
                                                                                    setFirstdate(e.target.value);
                                                                                }}
                                                                                style={{ backgroundColor: "white" }}
                                                                            />
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="fieldLabel font-weight-normal">To</Form.Label>
                                                                            <Form.Control
                                                                                className="form-control-sm my-0"

                                                                                type="date"
                                                                                required
                                                                                onChange={(e) => {
                                                                                    setSecond(e.target.value);
                                                                                }}
                                                                                style={{ backgroundColor: "white" }}

                                                                            />
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="fieldLabel font-weight-normal">Total Days</Form.Label>
                                                                            <Form.Control
                                                                                type="number"
                                                                                className="form-control-sm"

                                                                                value={diffDays}
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
                                                                                value={toTime}
                                                                                onChange={(e) => {
                                                                                    setToTime(e.target.value)
                                                                                }}
                                                                            />
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="fieldLabel font-weight-normal">Arrival Time</Form.Label>
                                                                            <Form.Control
                                                                                type="time"
                                                                                className="form-control-sm"

                                                                                required
                                                                                value={fromTime}
                                                                                onChange={(e) => {
                                                                                    setFromTime(e.target.value)
                                                                                }}
                                                                            />
                                                                        </Col>


                                                                        <Col>
                                                                            <Form.Label className="fieldLabel font-weight-normal"> Duration</Form.Label>
                                                                            <Form.Select
                                                                                className="form-select-sm"
                                                                                value={leave_status}
                                                                                onChange={(e) => { setLeave_status(e.target.value) }}
                                                                                required
                                                                            >

                                                                                <option disabled selected hidden value="">Please Select</option>
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
                                                                                onChange={(e) => { setWorkStatus(e.target.value) }}
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
                                                                                onChange={(e) => {
                                                                                    setRemarks(e.target.value);
                                                                                }}
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

                                                                                onChange={(e) => {
                                                                                    setReasonToVisit(e.target.value);
                                                                                }}
                                                                            />
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="fieldLabel font-weight-normal">Person To Meet</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="form-control-sm"

                                                                                onChange={(e) => {
                                                                                    setPersonToMeet(e.target.value);
                                                                                }}
                                                                            />
                                                                        </Col>

                                                                        <Col>
                                                                            <Form.Label className="fieldLabel font-weight-normal">Place To Visit</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="form-control-sm"

                                                                                onChange={(e) => {
                                                                                    setPlaceToVisit(e.target.value);
                                                                                }}
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

                                                                                onChange={(e) => {
                                                                                    setMeterStartReading(e.target.value);
                                                                                }}
                                                                            />
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="fieldLabel font-weight-normal">Meter End Reading</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="form-control-sm"

                                                                                onChange={(e) => {
                                                                                    setMeterEndReading(e.target.value);
                                                                                }}
                                                                            />
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="fieldLabel font-weight-normal">Overall Remarks</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                className="form-control-sm"

                                                                                onChange={(e) => {
                                                                                    setOverallRemarks(e.target.value);
                                                                                }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>

                                                                <br />
                                                                <div style={{ display: "flex", justifyContent: "space-between", marginRight: 10 }}>

                                                                    <h5>Expenses during visit</h5>


                                                                    <a
                                                                        className="btn buttoncolor  "
                                                                        onClick={() => {
                                                                            setShowChildModel(true);
                                                                        }}
                                                                        style={{ backgroundColor: "rgb(137, 179, 83)", fontSize: "small" }}
                                                                    >
                                                                        Add
                                                                    </a>
                                                                </div>

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
                                                                                                        onClick={() => removeitem(i)}
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
                                                                                            setAttachedFile(f.target.files[0]);
                                                                                            break;
                                                                                        default:
                                                                                            alert(
                                                                                                "Please select the valid file extension!"
                                                                                            );
                                                                                            f.target.value = "";
                                                                                    }
                                                                                    setAttachedFile(f.target.files[0]);
                                                                                }}
                                                                            />
                                                                        </Col>

                                                                        <Col>
                                                                            <div style={{ display: "flex", justifyContent: "end" }}>
                                                                                <Button variant="primary" type="submit" className="submitButton" style={{ backgroundColor: "rgb(137, 179, 83)", marginLeft: "auto" }}>
                                                                                    Submit
                                                                                </Button>
                                                                            </div>
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


                                    {/* ///educational details modal  */}
                                    <Modal
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={childModel}
                                        onHide={Closechildmodal}
                                        size="lg"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title
                                                id="contained-modal-title-vcenter "
                                                style={{ textAlign: "center" }}
                                            >
                                                <h5>Add expense item</h5>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Container fluid>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group
                                                            as={Col}
                                                            controlId="formGridLastName"
                                                            className="formmargin"
                                                        >
                                                            <Form.Label>Expense type</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control-sm"


                                                                name="expenseType"
                                                                placeholder="type"
                                                                value={addExpense.expenseType}
                                                                onChange={handleeducationdetails}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group
                                                            as={Col}
                                                            controlId="formGridLastName"
                                                            className="formmargin"
                                                        >
                                                            <Form.Label>Amount</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control-sm"


                                                                name="amount"
                                                                placeholder="amount"
                                                                value={addExpense.amount}
                                                                onChange={handleeducationdetails}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Group
                                                            as={Col}
                                                            controlId="formGridLastName"
                                                            className="formmargin"
                                                        >
                                                            <Form.Label>Description</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control-sm"

                                                                name="description"
                                                                value={addExpense.description}
                                                                onChange={handleeducationdetails}
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                </Row>

                                                <div className="d-flex justify-content-center my-3">
                                                    <Button
                                                        onClick={() => {
                                                            expense.push(addExpense)
                                                            setExpense(expense)
                                                            Closechildmodal();

                                                            console.log("expense ", expense)

                                                            setAddExpense({})
                                                        }}
                                                        style={{ backgroundColor: "rgb(137, 179, 83)" }}
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </Container>
                                        </Modal.Body>
                                    </Modal>
                                </Container>
                            </div>
                        </div>
                    </div>
                </section>
                <NotificationContainer />
            </div>
        </>
    )
}

export default LeaveAllocation