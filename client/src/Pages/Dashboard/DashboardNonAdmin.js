import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import { Table } from "react-bootstrap";
import HeaderContext from "../../Context/HeaderContext";
import CountUp from 'react-countup';
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Context/Context";

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
                });
            });

            setinfo(InfoData)
            console.log(InfoData)
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
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        try {
            const attendence = await axios.get(process.env.React_APP_ORIGIN_URL + "attendance/employee", {
                params: {
                    "id": user.id,
                    "month": currentMonth,
                    "year": currentYear
                }
            })
            console.log("attendence.userattendance.length",attendence.data.userattendance)
            let Pcount = 0
           let  Status_P = attendence.data.userattendance.map((i)=>{
                if(i.status == "P"){
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
                        <Row style={{padding: "0px 16px"}}>
                            <Col>
                                <Card>
                                    <Card.Title className="px-3 py-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
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
                                        <Card.Body className="px-0">
                                            <div className="d-flex align-items-start align-items-center">
                                                <p style={{ fontSize: "2.3vw", fontWeight: "300" }}>
                                                    <CountUp start={0} end={appliedleaveCount} duration={1.0}>{appliedleaveCount}</CountUp>
                                                </p>
                                            </div>
                                        </Card.Body>
                                        <Card.Text>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    {/* <Link
                                                        to={"/departments"}
                                                        style={{
                                                            color: "black",
                                                            borderBottom: "1px solid rgb(160, 160, 160)",
                                                        }}
                                                    >
                                                        See All Departments
                                                    </Link> */}
                                                </div>
                                                <div>
                                                    <HomeWorkOutlinedIcon
                                                        className="iconDashboard"
                                                        style={{
                                                            color: "crimson",
                                                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                                                            fontSize: '1.8vw'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Title>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Title className="px-3 py-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
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
                                        <Card.Body className="px-0">
                                            <div className="d-flex align-items-start align-items-center">
                                                <p style={{ fontSize: "2.3vw", fontWeight: "300" }}>
                                                    <CountUp start={0} end={approvedleaveCount} duration={1.0}>{approvedleaveCount}</CountUp>
                                                </p>
                                            </div>
                                        </Card.Body>
                                        <Card.Text>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    {/* <Link
                                                        to={"/manageleaves"}
                                                        style={{
                                                            color: "black",
                                                            borderBottom: "1px solid rgb(160, 160, 160)",
                                                        }}
                                                    >
                                                        Leave Management
                                                    </Link> */}
                                                </div>
                                                <div>
                                                    <PersonOutlineIcon
                                                        className="iconDashboard"
                                                        style={{
                                                            backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green",
                                                            fontSize: '1.8vw'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Title>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Title className="px-3 py-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
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
                                        <Card.Body className="px-0">
                                            <div className="d-flex align-items-start align-items-center">
                                                <p style={{ fontSize: "2.3vw", fontWeight: "300" }}>
                                                    <CountUp start={0} end={pendingleaveCount} duration={1.0}>{pendingleaveCount}</CountUp>
                                                </p>
                                            </div>
                                        </Card.Body>
                                        <Card.Text>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    {/* <Link
                                                        to={"/employees"}
                                                        style={{
                                                            color: "black",
                                                            borderBottom: "1px solid rgb(160, 160, 160)",
                                                        }}
                                                      
                                                    >
                                                        See All Employees
                                                    </Link> */}
                                                    {/* <spam>See All Employee</spam> */}
                                                </div>
                                                <div>
                                                    <GroupsIcon
                                                        className="iconDashboard"
                                                        style={{
                                                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                                                            color: "goldenrod",
                                                            fontSize: '1.8vw'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Title>
                                </Card>
                            </Col>

                            <Col>
                                <Card>
                                    <Card.Title className="px-3 py-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
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
                                        <Card.Body className="px-0">
                                            <div className="d-flex align-items-start align-items-center">
                                                <p style={{ fontSize: "2.3vw", fontWeight: "300" }}>
                                                    <CountUp start={0} end={userattendenceCount} duration={1.0}>{userattendenceCount}</CountUp>
                                                </p>
                                            </div>
                                        </Card.Body>
                                        <Card.Text>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    {/* <Link
                                                        to={"/users"}
                                                        style={{
                                                            color: "black",
                                                            borderBottom: "1px solid rgb(160, 160, 160)",
                                                        }}
                                                    >
                                                        See All Attendance
                                                    </Link> */}
                                                </div>
                                                <div>
                                                    <TrendingUpOutlinedIcon
                                                        className="iconDashboard"
                                                        style={{
                                                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                                                            color: "purple",
                                                            fontSize: '1.8vw'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Title>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="px-3 py-3">
                    <Container>
                        <h4>Leaves History</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    {/* <th>Emp ID</th> */}
                                    {/* <th>Name</th> */}
                                    {/* <th>Department</th> */}
                                    <th>Leave Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Info.map((d) => {
                                    return (
                                        <tr>
                                            {/* <td>{d._id}</td> */}
                                            {/* <td>{d.name}</td> */}
                                            {/* <td>{d.department}</td> */}
                                            <td>{d.leaveType}</td>
                                            <td>{new Date(d.from).toDateString()}</td>
                                            <td>{new Date(d.to).toDateString()}</td>
                                            <td style={{textAlign: "left"}}>{d.reason ? d.reason : "N/A"}</td>
                                            <td><p className={`${d.status === 'Reject' ? "tableCell1" : ""}  ${d.status === 'Pending Aproval' ? "tableCell2" : ""}  ${d.status === 'Aproved' ? "tableCell " : ""}`} >{d.status}</p></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Container>
                </section>
            </div>
        </div>
    );
};

export default DashboardNonAdmin;
