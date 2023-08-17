import React, { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import {
  Modal,
  Form,
  Col,
  Row,
  Container,
  FormGroup,
  Button,
} from "react-bootstrap";

import Card from "react-bootstrap/Card";

// creating functional component ans getting props from app.js and destucturing them
const StepFour = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [dep, setDep] = useState([]);
  const [empl, setEmpl] = useState([])
  const [shift ,setShift] = useState([])
  const url2 = "/departments";
  const url = "/employees";
  const url3 = "/shifts/allShifts"
  let name, value;
  const handleinput = (e) => {

    name = e.target.name;
    value = e.target.value;
    setEmp({ ...emp, [name]: value });
  };

  const [emp, setEmp] = useState({
    profilepic: "",
    firstname: "",
    lastname: "",
    dob: "",
    cnic: "",
    gender: "",
    martialStatus: "",
    religion: "",
    jobtitle: "",
    username: "",
    primaryemail: "",
    secondaryemail: "",
    password: "",
    emp_id: "",
    primaryphone: "",
    secondaryphone: "",
    permanentaddress: "",
    temporaryaddress: "",
    province: "",
    city: "",
    postalCode: "",
    departments: "",
    designation: "",
    joiningdate: "",
    educationdetails: "",
    employementhistory: "",

    currentSalary: "",
    employementstatus: "",
    //bank information
    bankname: "",
    paymentmode: "",
    accounttitle: "",
    accountno: "",
    IBAN: "",
    branchcode: "",
    country: "",
    //degree info
    // department: ""
    supervisors: "",
    work_shift: ""
  });
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    console.log(values.username, values.password, values.emp_id, values.departments, values.supervisors)
    // checking if value of first name and last name is empty show error else take to next step
    if (
      validator.isEmpty(values.username) ||
      validator.isEmpty(values.password) ||
      validator.isEmpty(values.emp_id) ||
      validator.isEmpty(values.departments)
    ) {
      setError(true);
      console.log("error")
    } else {
      nextStep();
    }
  };


  useEffect(() => {

    axios.get(url2).then(resp => {
      setDep(resp.data)
    }, [1, 1]);

    axios.get(url3).then(resp => {
      setShift(resp.data)
    }, [1, 1]);



    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        const data = res.data.employees;
        setEmpl(data);
      } catch (error) {

      }
    };
    fetchData()
  })
  return (
    <>
      <Card style={{ marginTop: "8%" }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <h3 style={{ color: "rgb(0,105,92)" }}>Employement Details </h3>
            <hr></hr>
            <Row>
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
                    defaultValue={values.username}
                    onChange={handleFormData("username")}
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
                    type="password"
                    required
                    name="password"
                    placeholder="password"
                    defaultValue={values.password}
                    onChange={handleFormData("password")}
                  />
                </Form.Group>
              </Col>
              {/* asad data1 */}
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="emp_id"
                    placeholder="Employee ID"

                    defaultValue={values.emp_id}
                    onChange={handleFormData("emp_id")}
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
                    name="joiningdate"
                    placeholder="joining date"
                    defaultValue={values.joiningdate}
                    onChange={handleFormData("joiningdate")}
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
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="Number"
                    name="currentSalary"
                    placeholder="salary"
                    defaultValue={values.salary}
                    onChange={handleFormData("salary")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    placeholder="designation.."
                    defaultValue={values.designation}
                    onChange={handleFormData("designation")}
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
                    name="paymentmode"
                    defaultValue={values.paymentmode}
                    onChange={handleFormData("paymentmode")}
                  >
                    <option value="" selected hidden disabled>
                      Please Select
                    </option>
                    <option>Cheque</option>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>

              <Col lg={4}>
                <Form.Group
                  as={Col}
                  controlId="formGriddepartments"
                  className="formmargin"
                >
                  <Form.Label>Department</Form.Label>
                  <Form.Select name="departments"
                    defaultValue={values.departments}
                    onChange={handleFormData("departments")}>
                    <option disabled selected defaultValue={""}>
                      Select department..
                    </option>
                    {dep.departments && dep.departments.map((d, i) => {

                      return (
                        <>
                          <option key={d._id} value={d._id}>
                            {d.departmentname}
                          </option>
                        </>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>


              <Col xl="4">
                <Form.Group
                  as={Col}
                  controlId="formGriddepartments"
                  className="formmargin"
                >
                  <Form.Label>Employement Status</Form.Label>
                  <Form.Select
                    name="employementstatus"
                    defaultValue={values.employementstatus}
                    onChange={handleFormData("employementstatus")}
                  >
                    <option defaultValue={""} disbaled selected hidden>
                      Select Please
                    </option>
                    <option>Intern</option>
                    <option>Probation</option>
                    <option>Permanent</option>
                    <option>Left</option>
                  </Form.Select>
                </Form.Group>
              </Col>


              <Col xl="4">
                <Form.Group
                  as={Col}
                  controlId="formGriddepartments"
                  className="formmargin"
                >
                  <Form.Label>Supervisors</Form.Label>
                  <Form.Select
                    name="supervisors"
                    defaultValue={values.supervisors}
                    onChange={handleFormData("supervisors")}
                  >
                    <option defaultValue={""} disbaled selected hidden>
                      Select Please
                    </option>
                    {empl && empl.map((d, i) => {

                      return (
                        <>
                          <option key={d._id} value={d._id}>
                            {d.firstname}
                          </option>
                        </>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={4}>
                <Form.Group
                  as={Col}
                  controlId="formGriddepartments"
                  className="formmargin"
                >
                  <Form.Label>Work Shift</Form.Label>
                  <Form.Select name="work_shift"
                    defaultValue={values.work_shift}
                    onChange={handleFormData("work_shift")}>
                    <option disabled selected defaultValue={""}>
                      Select Work Shift..
                    </option>
                    {shift && shift.map((d, i) => {

                      return (
                        <>
                          <option key={d._id} value={d._id}>
                            {d.shift_name}
                          </option>
                        </>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div style={{ display: "flex" }}>
              <Button variant="primary" onClick={prevStep}>
                Previous
              </Button>

              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "2%" }}
              >
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepFour;
