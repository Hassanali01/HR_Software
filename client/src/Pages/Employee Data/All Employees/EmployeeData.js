import React, { useState } from "react";
import {    Row, Container, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";


import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";


function EmployeeData() {
  const [step, setstep] = useState(1);
  const [formData, setFormData] = useState({
    profilepic: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phone1: "",
    email1: "",
    martialStatus: "",
    religion: "",
    gender: "",
    cnic: "",
    dob: "",
    temporaryaddress: "",
    permanentaddress: "",
    city: "",
    country: "",
    province: "",
    postalcode: "",
    employementhistory: [],
    username: "",
    password: "",
    joiningdate: "",
    salary: "",
    designation: "",
    paymentmode: "",
    employementstatus: "",
    bankname: "",
    accounttitle: "",
    accountno: "",
    iban: "",
    branchcode: "",
    educationdetails: [],
  });
  const nextStep = () => {
    setstep(step + 1);
    console.log("nextstep", nextStep);
  };

  const prevStep = () => {
    setstep(step - 1);
  };
  const handleInputData = (input) => (e) => {
    console.log("eee", e);
    // input value from the form
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div>
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 3 }} className="custom-margin">
                <StepOne
                  nextStep={nextStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 2:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 3 }} className="custom-margin">
                <StepTwo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 3:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 3 }} className="custom-margin">
                <StepThree
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 4:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 3 }} className="custom-margin">
                <StepFour
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    

    case 5:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 3 }} className="custom-margin">
                <StepFive
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
      case 6:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 3 }} className="custom-margin">
                <StepSix
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    default:
      return "unknown step";
  }
}
export default EmployeeData;
