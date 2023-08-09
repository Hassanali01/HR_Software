import React, { useState } from "react";
import validator from "validator";
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
const StepFive = ({ nextStep, handleFormData, prevStep, values }) => {
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
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
    if (
      validator.isEmpty(values.bankname)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };
  console.log("values", values);
  return (
    <>
      <Card style={{ marginTop: "8%" }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <h3 style={{ color: "rgb(0,105,92)" }}>Bank Details</h3>
            <hr></hr>
            <Row>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Select
                    required
                    name="bankname"
                    placeholder="bank name.."
                    defaultValue={values.bankname}
                    onChange={handleFormData("bankname")}
                  >
                    <option>Please Select</option>
                    <option>MCB Limited</option>
                    <option>Bank Islami Limited</option>
                    <option>Allied Bank Limited</option>
                    <option>Bank Al-Habib Limited</option>
                    <option>Faysal Bank Limited</option>
                    <option>Mezaan Bank Limited</option>
                    <option>National Bank of Pakistan</option>
                    <option>MCB Islamic Limited</option>
                    <option>HBL</option>
                    <option>UBL</option>
                    <option>Askari Bank </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Account Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="accounttitle"
                    placeholder="account title.."
                    defaultValue={values.accounttitle}
                    onChange={handleFormData("accounttitle")}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Account No</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountno"
                    placeholder="account no.."
                    defaultValue={values.accountno}
                    onChange={handleFormData("accountno")}
                  />
                </Form.Group>
              </Col>
            </Row>
            <></>
            <Row className="p-0">
              <Col xxl={4}>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label> IBAN</Form.Label>
                  <Form.Control
                    type="text"
                    name="IBAN"
                    placeholder="iban.."
                    defaultValue={values.iban}
                    onChange={handleFormData("iban")}
                  />
                </Form.Group>
              </Col>

              <Col xxl={4}>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Branch code</Form.Label>
                  <Form.Control
                    type="text"
                    name="branchcode"
                    placeholder="branch code.."
                    defaultValue={values.branchcode}
                    onChange={handleFormData("branchcode")}
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

export default StepFive;
