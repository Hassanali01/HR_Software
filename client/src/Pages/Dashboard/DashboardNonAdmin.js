import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import HeaderContext from "../../Context/HeaderContext";
import CountUp from 'react-countup';
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import "./DashboardnonAdmin.css"

const DashboardNonAdmin = () => {
    const { user } = useContext(Context);
    const [depCount, setDepCount] = useState()
    const [appliedleaveCount, setAppliedleaveCount] = useState(0)
    const [pendingleaveCount, setPendingleaveCount] = useState(0)
    const [approvedleaveCount, setApprovedleaveCount] = useState(0)
    const [userattendenceCount, setUserattendenceCount] = useState(0)
    const [depEmp, setDepEmp] = useState()
    const [leavCount, setleavCount] = useState()
    const [Info, setinfo] = useState([])
    const [details, setDetails] = useState([])
    let SNo = 1;
    const options = { day: "numeric", month: "short", year: "numeric" };
    const dateFormatter = new Intl.DateTimeFormat("en-GB", options);
    const getEmp = `employees/${user.id}`

    const userInformation = async () => {
        try {
            const res = await axios.get(process.env.React_APP_ORIGIN_URL + getEmp);
            const empinfo = res.data;
            const InfoData = [];
            await empinfo.Leaves.map((d) => {
                InfoData.push({
                    from: d.from,
                    to: d.to,
                    status: d.status,
                    leaveType: d.leaveType,
                    name: empinfo.firstname,
                    _id: empinfo.emp_id,
                    department: empinfo.departments.map((d) => d.departmentname),
                    reason: d.reason,
                    leaveNature: d.leaveNature,
                    Short_leave: d.Short_leave,
                    fromTime: d.fromTime,
                    toTime: d.toTime
                });
            });

            setinfo(InfoData)
            let approve = 0;
            let pending = 0;
            InfoData.map((i) => {
                if (i.status == "Approved") {
                    approve++;
                }
                else {
                    pending++
                }
                setApprovedleaveCount(approve)
                setPendingleaveCount(pending)
            })
            setAppliedleaveCount(InfoData.length)
            const departments = []
            await empinfo.departments.map((d) => {
                departments.push({
                    department: d.departmentname,
                    name: empinfo.firstname,
                    email: empinfo.email,
                    empid: empinfo.emp_id,
                    designation: empinfo.designation
                });
            })
            setDetails(departments)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userInformation();
    }, []);

    const a = useContext(HeaderContext)
    useEffect(() => {
        a.update("Human Resource / Dashboard")
    })

    const counted = async () => {
        try {
            const department = await axios.get(process.env.React_APP_ORIGIN_URL + "departments")
            const saveresult = department.data.counted;
            setDepCount(saveresult)
            try {
                const employees = await axios.get(process.env.React_APP_ORIGIN_URL + 'employees')
                const emp = employees.data.counted;
                setDepEmp(emp)
            } catch (error) {
                console.log(error)
            }
            try {
                const leaves = await axios.get(process.env.React_APP_ORIGIN_URL + 'leaverequest/allForHR')
                const leav = leaves.data.counted;
                let totalLeave = 0
                leaves.data.allRequest.map((j) => {
                    var currentDate = new Date();
                    var currentMonth = currentDate.getMonth();
                    const leaveDate = new Date(j.from);
                    var leaveMonth = leaveDate.getMonth();
                    if (currentMonth == leaveMonth) {
                        totalLeave++
                    }
                })
                setleavCount(totalLeave)
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const totalNumberofAttendence = async () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth()+1;
        const currentYear = currentDate.getFullYear();
        try {
            const attendence = await axios.get(process.env.React_APP_ORIGIN_URL + "attendance/employee", {
                params: {
                    "id": user.id,
                    "month": currentMonth,
                    "year": currentYear
                }
            })

            let Pcount = 0
            let Status_P = attendence.data.userattendance.map((i) => {
                if (i.status == "P") {
                    console.log("yes")
                    Pcount++
                }
            })
            setUserattendenceCount(Pcount)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        counted();
        totalNumberofAttendence();
    }, [])

    return (
        <div>
            <div className="content-wrapper" style={{ backgroundColor: "#f7f7f7", marginTop: "20px" }}>
                <section>
                    <Container fluid>
                        <Row style={{ padding: "0px 16px" }}>
                            <Col>
                                <Card>
                                    <Card.Title className="px-3 py-3">
                                        <Card.Body className="px-0">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <div
                                                    className="d-flex align-items-start align-items-center counterCard">
                                                    <p >
                                                        <CountUp start={0} end={appliedleaveCount} duration={1.0}>{appliedleaveCount}</CountUp>
                                                    </p>
                                                </div>
                                                <div style={{ marginRight: "30px" }}>
                                                    <h5
                                                        style={{
                                                            color: "rgb(160, 160, 160)",
                                                            fontSize: "1.3vw",
                                                        }}
                                                    >
                                                        Applied Leaves
                                                    </h5>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card.Title>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Title className="px-3 py-3">
                                        <Card.Body className="px-0">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-start align-items-center counterCard">
                                                    <p >
                                                        <CountUp start={0} end={approvedleaveCount} duration={1.0}>{approvedleaveCount}</CountUp>
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div style={{ marginRight: "30px" }}>
                                                        <h5
                                                            style={{
                                                                color: "rgb(160, 160, 160)",
                                                                fontSize: "1.3vw",
                                                            }}
                                                        >
                                                            Approved  Leaves
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card.Title>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Title className="px-3 py-3">
                                        <Card.Body className="px-0">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-start align-items-center counterCard">
                                                    <p>
                                                        <CountUp start={0} end={pendingleaveCount} duration={1.0}>{pendingleaveCount}</CountUp>
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div style={{ marginRight: "30px" }}>
                                                        <h5
                                                            style={{
                                                                color: "rgb(160, 160, 160)",
                                                                fontSize: "1.3vw",
                                                            }}
                                                        >
                                                            Pending Leaves
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card.Title>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Title className="px-3 py-3">
                                        <Card.Body className="px-0">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-start align-items-center counterCard">
                                                    <p>
                                                        <CountUp start={0} end={userattendenceCount} duration={1.0}>{userattendenceCount}</CountUp>
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div style={{ marginRight: "30px" }}>
                                                        <h5
                                                            style={{
                                                                color: "rgb(160, 160, 160)",
                                                                fontSize: "1.3vw",
                                                            }}
                                                        >
                                                            Attendance
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card.Title>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <Card style={{ margin: "30px", padding: "10px 3px" }}>
                    <Container>
                        <div style={{ display: "flex", gap: "82%", padding: "20px 0px" }}>
                            <h4 style={{ display: "inline" }}>Leaves </h4>
                            <Link to={"/leaverequest"}>
                                <Button style={{ backgroundColor: "rgb(137, 179, 83)", fontSize: 15 }} >New request</Button>
                            </Link>
                        </div>
                        <Table style={{ backgroundColor: "white" }}>
                            <thead style={{ backgroundColor: "", fontSize: "15px" }}>
                                <tr>
                                    <th>SNo</th>
                                    <th style={{ width: "140px", textAlign: "left" }}>Leave Type</th>
                                    <th style={{ width: "210px", textAlign: "left" }}>From</th>
                                    <th style={{ width: "210px", textAlign: "left" }}>To</th>
                                    <th style={{ width: "130px", textAlign: "left" }}>Duration</th>
                                    <th style={{ textAlign: "left" }}>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody >
                                {Info.map((d) => {
                                    return (
                                        <tr style={{ backgroundClip: "white", fontSize: "14px" }}>
                                            <td>{SNo++}</td>
                                            <td style={{ width: "140px", textAlign: "left" }}>{d.leaveType}</td>
                                            <td style={{ width: "210px", textAlign: "left" }}>
                                                {dateFormatter.format(new Date(d.from))}{d.fromTime ? ` - ${d.fromTime}` : ''}
                                            </td>
                                            <td style={{ width: "210px", textAlign: "left" }}>
                                                {dateFormatter.format(new Date(d.to))}{d.toTime ? ` - ${d.toTime}` : ''}
                                            </td>
                                            <td style={{ width: "130px", textAlign: "left" }}>{d.Short_leave == "True" ? 'Short leave' : 'Full day'}</td>
                                            <td style={{ textAlign: "left" }}>{d.reason ? d.reason : "N/A"}</td>
                                            <td><p className={`${d.status === 'Reject' ? "tableCell1" : ""}  ${d.status === 'Pending Aproval' ? "tableCell2" : ""}  ${d.status === 'Aproved' ? "tableCell " : ""}`} >{d.status}</p></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Container>
                </Card>
            </div>
        </div>
    );
};

export default DashboardNonAdmin;
  