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
} from "react-bootstrap";
// import validator from "validator";
import Card from "react-bootstrap/Card";
import ReactFlags from "react-flags-select";
// creating functional component ans getting props from app.js and destucturing them
const StepThree = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [country, setcountry] = useState("");
  const [selected, setSelected] = useState("");
  const [emp, setEmp] = useState({
    primaryphone: "",
    secondaryphone: "",
    permanentaddress: "",
    temporaryaddress: "",
    province: "",
    city: "",

    //bank information

    country: "",
    //degree info
  });
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
    if (
      validator.isEmpty(values.temporaryaddress) 
      // validator.isEmpty(values.permanentaddress) ||
      // validator.isEmpty(values.city) ||
      // validator.isEmpty(values.province) ||
      // validator.isEmpty(values.postalcode) ||
      // validator.isEmpty(values.country)
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
            <h3 style={{ color: "rgb(0,105,92)" }}>Address & Region</h3>
            <hr></hr>
            <Col lg={12}>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Label>Temporary Address</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="temporaryaddress"
                  placeholder="complete address"
                  // defaultValue={emp.temporaryaddress}
                  defaultValue={values.temporaryaddress}
                  // value={props.value12}
                  // onChange={handleinput}
                  // onChange={props.onChange}
                  //   disabled={disableFields}
                  onChange={handleFormData("temporaryaddress")}
                />
              </Form.Group>
            </Col>

            <Col lg={12}>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Label>Permanent Address</Form.Label>
                <Form.Control
                  type="text"
                  // required
                  name="permanentaddress"
                  placeholder="complete address"
                  // defaultValue={emp.permanentaddress}
                  defaultValue={values.permanentaddress}
                  // value={props.value13}
                  // onChange={handleinput}
                  // onChange={props.onChange}
                  //   disabled={disableFields}
                  onChange={handleFormData("permanentaddress")}
                />
              </Form.Group>
            </Col>

            <div style={{ marginLeft: "0.75%" }}>
              <Row>
                <Col>
                  <Form.Label style={{ marginLeft: "2%" }}>City</Form.Label>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Select
                      // required
                      // onChange={handleinput}
                      // onChange={props.onChange}
                      name="city"
                      // defaultValue={emp.city}
                      defaultValue={values.city}
                      // value={props.value14}
                      onChange={handleFormData("city")}
                    >
                      <option value="" selected hidden disabled>
                        Select City
                      </option>
                      <option>Lahore</option>
                      <option>Karachi</option>
                      <option>Faisalabad</option>
                      <option>Peshawar</option>
                      <option>Islamabad</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Province</Form.Label>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Select
                      // required
                      name="province"
                      placeholder="province"
                      // defaultValue={emp.province}
                      // value={props.value15}
                      defaultValue={values.province}
                      // onChange={handleinput}
                      // onChange={props.onChange}
                      //   disabled={disableFields}
                      onChange={handleFormData("province")}
                    >
                      <option value="" selected hidden disabled>
                        Select Province
                      </option>
                      <option>Punjab</option>
                      <option>Sindh</option>
                      <option>KPK</option>
                      <option>Gilgit Baltistan</option>
                      <option>Islamabad(Capital Territory)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Country</Form.Label>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Select
                      // required
                      name="country"
                      placeholder="country"
                      // defaultValue={emp.province}
                      // value={props.value15}
                      defaultValue={values.country}
                      // onChange={handleinput}
                      // onChange={props.onChange}
                      //   disabled={disableFields}
                      onChange={handleFormData("country")}
                    >
                      <option value="" selected hidden disabled>
                        Select Country
                      </option>
                      <option>Pakistan</option>
                    </Form.Select>
                    {/* <ReactFlags
                      countries={["PK"]}
                      selected={selected}
                      defaultValue={values.country}
                      onSelect={(code) => {
                        setSelected(code);
                        code === "PK" && setcountry("Pakistan");
                        setEmp({ ...emp, country: "Pakistan" });
                        handleFormData("country")
                      }}
                    /> */}
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
                      // required
                      name="postalCode"
                      placeholder="postal code"
                      // defaultValue={emp.postalCode}
                      defaultValue={values.postalcode}
                      // value={props.value16}
                      // onChange={handleinput}
                      // onChange={props.onChange}
                      //   disabled={disableFields}
                      onChange={handleFormData("postalcode")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

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

export default StepThree;
