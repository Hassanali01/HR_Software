import React, { useState, useRef } from "react";
import { useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
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
    const [leaves, setLeaves] = useState([]);
    const [leaveType, setLeaveType] = useState("");


    const { user } = useContext(Context);
    const [Info, setinfo] = useState([]);
    const [assignedBy, setAssignedBy] = useState("")
    const [depemp, setdepemp] = useState([])
    const [meterStartReading, setMeterStartReading] = useState("");
    const [meterEndReading, setMeterEndReading] = useState("");
    const [overallRemarks, setOverallRemarks] = useState("");
    const [childModel, setShowChildModel] = useState(false);
    const [testUpdate, setTestUpdate] = useState(false);
    const [expense, setExpense] = useState([]);
    const [addExpense, setAddExpense] = useState({})
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

    // const userInformation = async () => {
    //     try {
    //         const res = await axios.get(process.env.React_APP_ORIGIN_URL + getEmp);
    //         const empinfo = res.data;
    //         const InfoData = [];
    //         await empinfo.Leaves.map((d) => {
    //             InfoData.push({
    //                 from: d.from,
    //                 workStatus: d.workStatus,
    //                 to: d.to,
    //                 status: d.status,
    //                 workabsence: d.workabsence,
    //                 name: empinfo.firstname,
    //                 _id: empinfo.emp_id,
    //                 department: empinfo.departments.map((d) => d.departmentname),
    //                 description: d.description,
    //                 applicationdate: d.applicationdate,
    //                 empid: empinfo.emp_id,
    //                 designation: empinfo.designation,
    //                 leavesId: empinfo.Leaves.slice(empinfo.Leaves.length - 1),
    //                 assignedBy: d.assignedBy,
    //                 task: d.task,
    //                 project: d.project,
    //                 leave_status: d.leave_status,
    //             });
    //         });
    //         setinfo(InfoData);

    //         // const departments = [];
    //         // await empinfo.departments.map((d) => {
    //         //     departments.push({
    //         //         department: d.departmentname,
    //         //         name: empinfo.firstname,
    //         //         email: empinfo.email,
    //         //         empid: empinfo.emp_id,
    //         //         designation: empinfo.designation,
    //         //         supervisors: empinfo.supervisors[0].username
    //         //     });
    //         // });

    //         setDetails(departments);
    //         setSuperviser(empinfo.supervisors[0].username)
    //         setSuperviserid(empinfo.supervisors[0]._id)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
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
        formData.append("meterStartReading", meterStartReading);
        formData.append("meterEndReading", meterEndReading);
        formData.append("overallRemarks", overallRemarks);
 
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





    const fetchData = async () => {
        try {
            const res = await axios.get(process.env.React_APP_ORIGIN_URL + "leaves");
            const dd = res.data.getLeave;
            setLeaves(dd);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        // userInformation();
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
                                    Leave Allocation
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
                                                                            controlId="formBasicEmail"
                                                                        >
                                                                            <Form.Label className="fieldLabel font-weight-normal">Leave type</Form.Label>
                                                                            <Form.Select
                                                                                required
                                                                                value={leaveType}
                                                                                onChange={(e) => {
                                                                                    setLeaveType(e.target.value);
                                                                                }}
                                                                                style={{ padding: "3px 3px" }}
                                                                            >
                                                                                <option disabled selected hidden value="">Please Select</option>
                                                                                {leaves.map((d) => {
                                                                                    return (
                                                                                        <option
                                                                                            key={d._id}
                                                                                            value={d.leaveType}
                                                                                            name={d.leaveType}
                                                                                        >
                                                                                            {d.leaveType}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="fieldLabel font-weight-normal">Allocated once</Form.Label><br></br>
                                                                        <Checkbox {...label} />
                                                                    </Col>

                                                                </Row>

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