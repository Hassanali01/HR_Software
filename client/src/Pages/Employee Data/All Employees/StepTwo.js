import React, { useState } from "react";
import validator from "validator";
import {
  Form,
  Col,
  Row,
  Button,
  InputGroup,
} from "react-bootstrap";
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
  });
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    // checking if value of first name and last name is empty show error else take to next step
    if (
      validator.isEmpty(values.phone) ||
      validator.isEmpty(values.email)
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
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                    onChange={handleFormData("phone")}
                  />

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
                    defaultValue={values.email}
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
                    name="secondaryphone"
                    placeholder="secondary phone"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                    defaultValue={values.phone1}
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
                    name="secondaryemail"
                    placeholder="secondary Email"
                    defaultValue={values.email1}
                    onChange={handleFormData("email1")}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div style={{ display: "flex" }}>
              <Button variant="primary" onClick={prevStep} style={{backgroundColor: "rgb(137, 179, 83)"}}>
                Previous
              </Button>

              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "2%" ,backgroundColor: "rgb(137, 179, 83)"}}
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
