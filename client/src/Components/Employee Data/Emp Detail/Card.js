import React from "react";
import pp from "../All Employees/avatar.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const Cards = ({ data }) => {
  const [update, setUpdate] = useState(true);
  const navigate = useNavigate();
  console.log("propsdata", data);
  const [firstname, setfirstname] = useState(data.firstname);
  const [lastname, setlastname] = useState(data.lastname);
  const [email, setemail] = useState(data.setemail);
  const [designation, setdesignation] = useState(data.designation);
  const [supervisor, setsupervisor] = useState([]);
  const [supervisors, setsupervisors] = useState([]);
  const [disableFields, setDisableFields] = useState(true);
  const PP = "http://localhost:5002/images/";
  console.log("supervisors", supervisor);
  const [emp, setEmp] = useState({
    profilepic: "",
    firstname: data.firstname,
    lastname: data.lastname,
    username: data.username,
    email: data.email,
    supervisors: data.supervisors,
    phone: data.phone,
    address: data.address,
    departments: data.departments,
    dob: data.dob,
    employeementstatus: data.employeementstatus,
    designation: data.designation,
    joiningdate: data.joiningdate,
    company: data.company,
    postalCode: data.postalCode,
    city: data.city,
    country: data.country,
    terminationdate: data.terminationdate,
    terminationreason: data.terminationreason,
    salary: data.salary,
    paymentmode: data.paymentmode,
    bankaccountno: data.bankaccountno,
    IBAN: data.IBAN,
    swiftcode: data.swiftcode,
    bankbranchno: data.bankbranchno,
    bankname: data.bankname,
  });

  useEffect(() => {
    setEmp({
      profilepic: "",
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      supervisors: data.supervisors,
      phone: data.phone,
      address: data.address,
      departments: data.departments,
      designation: data.designation,
      joiningdate: data.joiningdate,
      company: data.company,
      postalCode: data.postalCode,
      city: data.city,
      employeementstatus: data.employeementstatus,
      country: data.country,
      terminationdate: data.terminationdate,
      terminationreason: data.terminationreason,
      salary: data.salary,
      paymentmode: data.paymentmode,
      bankaccountno: data.bankaccountno,
      IBAN: data.IBAN,
      swiftcode: data.swiftcode,
      bankbranchno: data.bankbranchno,
      bankname: data.bankname,
      dob: data.dob,
    });
  }, [data]);

  const handleinput = (e) => {
    let name, value;

    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setEmp({ ...emp, [name]: value });
  };

  const handleCloseModal = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const [show, setShow] = useState(false);
  const handleupdateform = {
    userId: data._id,
    firstname,
    lastname,
    email,
    designation,
    supervisors,
    //handle user input form data
  };

  console.log(handleupdateform);
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const url = `${data._id}`;

    try {
      const updateUser = await axios
        .put(url, {
          // profilepic: "",
          firstname: emp.firstname,
          lastname: emp.lastname,
          username: emp.username,
          email: emp.email,
          phone: emp.phone,
          address: emp.address,
          departments: emp.departments,
          designation: emp.designation,
          joiningdate: emp.joiningdate,
          supervisors: emp.supervisors,
          company: emp.company,
          employeementstatus: emp.employeementstatus,
          paymentmode: emp.paymentmode,
          bankaccountno: emp.bankaccountno,
          IBAN: emp.IBAN,
          dob: emp.dob,
          swiftcode: emp.swiftcode,
          bankname: emp.bankname,
          gender: emp.gender,
          jobtitle: emp.jobtitle,
          salary: emp.salary,
        })
        .then((user) => {
          console.log("updateUser", user.data.updateData);
          data.firstname = user.data.updateData.firstname;
          data.lastname = user.data.updateData.lastname;
          data.email = user.data.updateData.email;
          data.designation = user.data.updateData.designation;
          data.supervisors = user.data.updateData.supervisors;
          data.salary = user.data.updateData.salary;
          data.terminationdate = user.data.updateData.terminationdate;
          data.IBAN = user.data.updateData.IBAN;
          data.bankname = user.data.updateData.bankname;
          data.bankbranchno = user.data.updateData.bankbranchno;
          data.dob = user.data.updateData.dob;
        });

      updateUser && NotificationManager.success("Successfully Updated");

      handleCloseModal();

      // console.log({data})

      // const updateUser = await axios.put(url, handleupdateform);
      // NotificationManager.success("Successfully Updated");
      // handleCloseModal();
      // console.log("fistname",firstname)
      // // setUpdate(!update)
    } catch (error) {
      console.log(error);
      NotificationManager.error("Failed to update");
    }
  };
  const departmentemployees = async () => {
    // setsupervisors(data.departments)
    try {
      const getdep = await axios
        .get("employeesofdepartments", {
          params: {
            departments: data.departments.map((d) => d._id),
          },
        })
        .then((d) => {
          console.log("then data", setsupervisor(d.data.employees));
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    departmentemployees();
  }, [data]);

  return (
    <>
      <div className="d-flex">
        <div style={{ marginLeft: "59vw", marginRight: 10 }}>
          <h1 class="text-3xl font-bold underline">Hello world!</h1>
          <a
            className="btn buttoncolor "
            onClick={() => {
              setDisableFields(false);
            }}
          >
            Edit
          </a>
        </div>
        <div>
          <a
            className="btn buttoncolor "
            onClick={() => {
              handleSubmit();
              setDisableFields(true);
            }}
            // style={{opacity:"60%"}}
          >
            Save
          </a>
        </div>
      </div>
      <div className="container">
        <Container fluid>
          <Row>
            <div className="py-3">
              <h4>General</h4>
              <hr
                style={{
                  fontWeight: "bold",
                  borderWidth: "2px",
                  border: "1px solid black",
                }}
              ></hr>
            </div>
            <Col sm={8}>
              <Row>
                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridFirstName"
                    className="formmargin"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="firstname"
                      placeholder="First Name"
                      value={emp.firstname}
                      onChange={handleinput}
                      disabled={disableFields}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="lastname"
                      placeholder="Last Name"
                      value={emp.lastname}
                      onChange={handleinput}
                      disabled={disableFields}
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
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="company"
                      placeholder="company"
                      value={emp.company}
                      onChange={handleinput}
                      disabled={disableFields}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Label>D-0-B</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      name="dob"
                      value={emp.dob}
                      onChange={handleinput}
                      disabled={disableFields}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col sm={4}>
              <div className="d-flex justify-content-center">
                {data.profilepic ? (
                  <img
                    src={PP + data.profilepic}
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />
                ) : (
                  <img
                    src={pp}
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="email"
                  placeholder="email..."
                  value={emp.email}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  required
                  name="company"
                  placeholder="mobile no"
                  value={emp.phone}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col xl={4} lg={4}>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  required
                  name="gender"
                  placeholder="gender"
                  value={emp.lastname}
                  onChange={handleinput}
                  disabled={disableFields}
                >
                  <option value=" " selected hidden disabled>
                    Please Select
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-start">
            <Col xl={4} lg={4}>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="jobtitle"
                  placeholder="Jobtitle"
                  value={emp.designation}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <div className="py-3">
              <h4>Supervisors</h4>
              <hr
                style={{
                  fontWeight: "bold",
                  borderWidth: "2px",
                  border: "1px solid black",
                }}
              ></hr>
            </div>
            {console.log("beforre error", emp)}

            <ul style={{ marginLeft: "35px" }}>
              {emp.supervisors &&
                emp.supervisors.map((s) => (
                  <li style={{ color: "black" }}>{s.firstname}</li>
                ))}
            </ul>
            <Form.Group as={Col} controlId="formGridDesignation">
              <Form.Label>Add Supervisor</Form.Label>
              <Form.Select
                name="supervisor"
                onChange={(e) => {
                  const newSupervisor = supervisor.filter(
                    (f) => f._id == e.target.value
                  )[0];
                  const empSupervisors = emp.supervisors.push(newSupervisor);
                  console.log("new", emp.supervisors);

                  setEmp({ ...emp, supervisors: emp.supervisors });
                }}
                disabled={disableFields}
              >
                <option value="" disabled selected hidden>
                  Please Select
                </option>
                {supervisor.map((d) => {
                  return (
                    <option value={d._id} key={d._id}>
                      {d.firstname}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <div></div>
          </Row>
          <Row>
            <div>
              <h4>Address & Contact</h4>
              <hr
                style={{
                  fontWeight: "bold",
                  borderWidth: "2px",
                  border: "1px solid black",
                }}
              ></hr>
            </div>
            <Col lg={6}>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="address"
                  placeholder="complete address"
                  value={emp.address}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Private Phone No</Form.Label>
                <Form.Control
                  type="number"
                  required
                  name="pvtphoneno"
                  placeholder="+92......"
                  value={emp.phone}
                  onChange={handleinput}
                  disabled={disableFields}
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
                <Form.Label>Company Email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="company"
                  placeholder="company"
                  value={emp.email}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="city"
                  placeholder="city"
                  value={emp.city}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="country"
                  placeholder="country"
                  value={emp.country}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xl={4}>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="postalcode"
                  placeholder="postal code"
                  value={emp.postalCode}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <div className="py-3">
              <h4>Administration</h4>
              <hr
                style={{
                  fontWeight: "bold",
                  borderWidth: "2px",
                  border: "1px solid black",
                }}
              ></hr>
            </div>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="username"
                  placeholder="username"
                  value={emp.username}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="password"
                  placeholder="password"
                  value={emp.password}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  name="joiningdate"
                  placeholder="joining date"
                  value={emp.joiningdate}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Label>Termination Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  name="termination date"
                  placeholder="termination date"
                  value={emp.terminationdate}
                  onChange={handleinput}
                  disabled={disableFields}
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
                <Form.Label>Termination Reason</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="termination reason"
                  placeholder="termination reason"
                  value={emp.terminationreason}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>salary</Form.Label>
                <Form.Control
                  type="Number"
                  required
                  name="salary"
                  placeholder="salary"
                  value={emp.salary}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Label>Payment Mode</Form.Label>
                <Form.Select
                  required
                  name="paymentmode"
                  value={emp.paymentmode}
                  onChange={handleinput}
                  disabled={disableFields}
                >
                  <option value="" selected hidden disabled>
                    Please Select
                  </option>
                  <option>Cheque</option>
                  <option>Cash</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Label>Bank Account No</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="bankaccountno"
                  placeholder="bankaccountno"
                  value={emp.bankaccountno}
                  onChange={handleinput}
                  disabled={disableFields}
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
                <Form.Label>IBAN No</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="IBAN No"
                  placeholder="IBAN No"
                  value={emp.IBAN}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Swift Code</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="swiftcode"
                  placeholder="swiftcode"
                  value={emp.swiftcode}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Label>Bank Branch No</Form.Label>
                <Form.Control
                  type="text"
                  name="bankbranchno"
                  placeholder="bankbranchno"
                  value={emp.bankbranchno}
                  onChange={handleinput}
                  disabled={disableFields}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <div className="my-3 d-flex justify-content-center">
            <Button>Add Employee</Button>
          </div>
        </Container>
        <NotificationContainer />
        {/* <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter "
              style={{ textAlign: "center" }}
            >
              <h5> Update Employee</h5>
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer className="fm">
            <Form className="fm" type="submit" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    defaultValue={data.firstname}
                    onChange={(e) => {
                      setfirstname(e.target.value);
                      console.log(firstname);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    defaultValue={data.lastname}
                    onChange={(e) => {
                      setlastname(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Email"
                  name="email"
                  defaultValue={data.email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridDesignation">
                  <Form.Label>Supervisor</Form.Label>
                 
                </Form.Group>
              
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridDesignation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    placeholder="Designation"
                    name="designation"
                    defaultValue={data.designation}
                    onChange={(e) => {
                      setdesignation(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

           

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" className="btn">
                  Update Employee
                </Button>
              </div>
            </Form>
          </Modal.Footer>
        </Modal> */}
      </div>
    </>
  );
};

export default Cards;
