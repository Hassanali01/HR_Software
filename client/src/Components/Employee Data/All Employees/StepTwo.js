import React, { useState } from "react";
// import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import {
  Modal,
  Form,
  Col,
  Row,
  Container,
  FormGroup,
  Button,
  InputGroup,
} from "react-bootstrap";
// import validator from "validator";
import Card from "react-bootstrap/Card";
// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
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
  });
  //creating error state for validation
  const [error, setError] = useState(false);
  console.log("values", values);
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
    if (
      validator.isEmpty(values.phone) ||
      validator.isEmpty(values.email) 
      // validator.isEmpty(values.phone1) ||
      // validator.isEmpty(values.email1)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <>
      <Card style={{ marginTop: "8%" }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <h3 style={{ color: "rgb(0,105,92)" }}>Contact Details</h3>
            <hr></hr>
            <Row>
              <h5
                className="py-2 "
                style={{ fontSize: "22px", padding: "0px 19px" }}
              >
                Primary
              </h5>
              <Col xxl="6" xl="6" lg="6" md="6">
                {/* <Form.Group
                  as={Col}
                  controlId="formGridphone"
                  className="formmargin "
                > */}
                <Form.Label
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                  style={{ fontWeight: "bold" }}
                >
                  Phone
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">+92</InputGroup.Text>
                  <Form.Control
                    type="number"
                    required
                    name="primaryphone"
                    placeholder="phone"
                    defaultValue={values.phone}
                    // minLength="10"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                    // defaultValue={emp.primaryphone}
                    // value={props.value8}
                    // onChange={handleinput}
                    // onChange={props.onChange}
                    onChange={handleFormData("phone")}
                  />
                  {/* </Form.Group> */}
                </InputGroup>
              </Col>
              <Col xxl="6" xl="6" lg="6" md="6">
                <Form.Group
                  as={Col}
                  controlId="formGridcompanyemail"
                  className="formmargin "
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    name="primaryemail"
                    placeholder="email"
                    // defaultValue={emp.primaryemail}
                    defaultValue={values.email}
                    // value={props.value9}
                    // onChange={handleinput}
                    // onChange={props.onChange}
                    onChange={handleFormData("email")}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <h5
                className="py-2 "
                style={{ fontSize: "22px", padding: "0px 19px" }}
              >
                Secondary
              </h5>
              <Col xxl="6" xl="6" lg="6" md="6">
                {/* <Form.Group
                  as={Col}
                  controlId="formGridcompanyemail"
                  className="formmargin "
                > */}
                <Form.Label
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                  style={{ fontWeight: "bold" }}
                >
                  Phone
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">+92</InputGroup.Text>
                  <Form.Control
                    type="number"
                    // required
                    name="secondaryphone"
                    placeholder="secondary phone"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                    // defaultValue={emp.secondaryphone}
                    // value={props.value10}
                    // onChange={handleinput}
                    defaultValue={values.phone1}
                    // onChange={props.onChange}
                    onChange={handleFormData("phone1")}
                  />
                </InputGroup>
                {/* </Form.Group> */}
              </Col>
              <Col xxl="6" xl="6" lg="6" md="6">
                <Form.Group
                  as={Col}
                  controlId="formGridcompanyemail"
                  className="formmargin "
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    // required
                    name="secondaryemail"
                    placeholder="secondary Email"
                    // defaultValue={emp.secondaryemail}
                    defaultValue={values.email1}
                    // value={props.value11}
                    // onChange={handleinput}
                    // onChange={props.onChange}
                    onChange={handleFormData("email1")}
                  />
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

export default StepTwo;
