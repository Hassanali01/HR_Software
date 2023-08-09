import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import CountUp from 'react-countup';
import DepartmentEmployees from '../charts/DepartmentEmployees/DepartmentEmployees'
import Hiring from "../charts/Hirring/Hiring";
import axios from "axios";
const Dashboard = () => {

  const [depCount, setDepCount] = useState()
  const [depEmp, setDepEmp] = useState()
  const [leavCount, setleavCount] = useState()
  const counted = async () => {
    try {
      const department = await axios.get("/departments")
      const saveresult = department.data.counted;
      setDepCount(saveresult)
      try {
        const employees = await axios.get('/employees')
        const emp = employees.data.counted;
        setDepEmp(emp)
      } catch (error) {
      }
      try {
        const leaves = await axios.get('leaverequest/all')
        const leav = leaves.data.counted;
        setleavCount(leav)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    counted()
  }, [])

  return (
    <div>
      <div className="content-wrapper" style={{ backgroundColor: "#f7f7f7" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Dashboard</h3>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Container fluid>
            <Row>
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
                          Departments
                        </h5>
                      </div>
                      <div>
                        <p>
                          <ExpandLessIcon style={{ color: "green" }} />
                          <span style={{ fontSize: "1vw", color: "green" }}>
                            +5%
                          </span>
                        </p>
                      </div>
                    </div>
                    <Card.Body className="px-0">
                      <div className="d-flex align-items-start align-items-center">
                        <p style={{ fontSize: "2.3vw", fontWeight: "300" }}>
                          <CountUp start={0} end={depCount} duration={1.0}>{depCount}</CountUp>
                        </p>
                      </div>
                    </Card.Body>
                    <Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <Link
                            to={"/departments"}
                            style={{
                              color: "black",
                              borderBottom: "1px solid rgb(160, 160, 160)",
                            }}
                          >
                            See All Departments
                          </Link>
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
                          Employees
                        </h5>
                      </div>
                      <div>
                        <p>
                          <ExpandLessIcon style={{ color: "green" }} />
                          <span style={{ fontSize: "1vw", color: "green" }}>
                            +45%
                          </span>
                        </p>
                      </div>
                    </div>
                    <Card.Body className="px-0">
                      <div className="d-flex align-items-start align-items-center">
                        <p style={{ fontSize: "2.3vw", fontWeight: "300" }}>
                          <CountUp start={0} end={depEmp} duration={1.0}>{depEmp}</CountUp>
                        </p>
                      </div>
                    </Card.Body>
                    <Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <Link
                            to={"/employees"}
                            style={{
                              color: "black",
                              borderBottom: "1px solid rgb(160, 160, 160)",
                            }}
                          >
                            See All Employees
                          </Link>
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
                          Leaves
                        </h5>
                      </div>
                      <div>
                        <p>
                          <ExpandLessIcon style={{ color: "green" }} />
                          <span style={{ fontSize: "1vw", color: "green" }}>
                            +25%
                          </span>
                        </p>
                      </div>
                    </div>
                    <Card.Body className="px-0">
                      <div className="d-flex align-items-start align-items-center">
                        <p style={{ fontSize: "2.3vw", fontWeight: "300" }}>
                          <CountUp start={0} end={leavCount} duration={1.0}>{leavCount}</CountUp>
                        </p>
                      </div>
                    </Card.Body>
                    <Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <Link
                            to={"/manageleaves"}
                            style={{
                              color: "black",
                              borderBottom: "1px solid rgb(160, 160, 160)",
                            }}
                          >
                            Leave Management
                          </Link>
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
                          Attendance
                        </h5>
                      </div>
                      <div>
                        <p>
                          <ExpandLessIcon style={{ color: "green" }} />
                          <span style={{ fontSize: "1vw", color: "green" }}>
                            +15%
                          </span>
                        </p>
                      </div>
                    </div>
                    <Card.Body className="px-0">
                      <div className="d-flex align-items-start align-items-center">
                        <p style={{ fontSize: "2.3vw", fontWeight: "300" }}>
                          N/A
                        </p>
                      </div>
                    </Card.Body>
                    <Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <Link
                            to={"/users"}
                            style={{
                              color: "black",
                              borderBottom: "1px solid rgb(160, 160, 160)",
                            }}
                          >
                            See All Attendance
                          </Link>
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
        <section className=" py-3">
          <Container fluid>
            <Row>
              <Col>
                <Card style={{ width: "100%" }}>
                  <Card.Header className="bg-white"><h4>Hiring</h4></Card.Header>
                  <div className="d-flex justify-content-center bg-white">
                    <Hiring />
                  </div>
                </Card>
              </Col>
              <Col>
                <Card style={{ height: '380px' }}>
                  <Card.Header className="bg-white" ><h4>Employees In Departments</h4></Card.Header>
                  <div className="d-flex align-items-center justify-content-center " style={{ height: '100%' }}>
                    <div>
                      <DepartmentEmployees />
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
