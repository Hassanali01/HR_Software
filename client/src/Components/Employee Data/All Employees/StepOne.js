import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Col,
  Row,
  Container,
  FormGroup,
  Button,
} from "react-bootstrap";
import validator from "validator";
import { PatternFormat } from "react-number-format";
import pp from "./avatar.png";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";
// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values }) => {
  const [emp, setEmp] = useState({
    profilepic: "",
    firstname: "",
    company_payroll: "",
    lastname: "",
    dob: "",
    cnic: "",
    gender: "",
    martialStatus: "",
    religion: "",
    // company: "",
  });

  //creating error state for validation
  const [error, setError] = useState(false);
  const [file, setfile] = useState();
  const [company, setCompany] = useState();
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.firstName) ||
      validator.isEmpty(values.lastName) ||
      validator.isEmpty(values.gender) ||
      validator.isEmpty(values.cnic)
    ) {
      setError(true);

    } else {
      nextStep();

    }
  };
  const url2 = "/departments";
  const url = "/employees";
  const url1 = "/auth/register";

  function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async function uploadImage(event) {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setfile(base64);
    const object = {
      target: {
        value: base64,
      },
    };

    handleFormData("profilepic")(object);
    console.log("base64", base64);

    return base64;
  }



  const getdata = async () => {
    try {
      const companies = await axios.get(`/allCompany`)
      const cs = companies.data
      setCompany(cs)
      console.log(companies.data, "company")
    }
    catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    getdata()

  }, [])


  return (
    <>
      <div>
        <Card style={{ marginTop: "8%", height: "auto" }}>
          <Card.Body style={{ height: "auto" }}>
            <Form onSubmit={submitFormData}>
              <h4 style={{ color: "rgb(0,105,92)" }}>Personal Information</h4>
              <hr></hr>

              <div style={{ width: "100%", marginLeft: "40%" }}>
                <div className="d-flex align-items-center responsiveimg">
                  <div>
                    <Form className="mb-3" controlId="formGridProfilePic">
                      <Form.Label htmlFor="uploadpic">
                        {file ? (
                          <>
                            <img
                              className="rounded-circle"
                              style={{ width: "130px", height: "130px" }}
                              src={file}
                              alt=""
                            />
                          </>
                        ) : (
                          <img
                            className="rounded-circle"
                            src={pp}
                            alt=""
                            style={{ width: "130px", height: "130px" }}
                          />
                        )}
                      </Form.Label>

                      <Form.Control
                        type="file"
                        name="file"
                        defaultValue={values.profilepic}
                        style={{ display: "none" }}
                        id="uploadpic"
                        onChange={async (e) => {
                          await uploadImage(e);
                        }}
                      />
                      <div className="w-100 text-center">
                        <label>Upload Picture</label>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>

              <Row>
                <Col xxl="6" xl="6" lg="6" md="6">
                  <Form.Group
                    as={Col}
                    controlId="formGridgender"
                    className="formmargin"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      name="firstName"
                      defaultValue={values.firstName}
                      type="text"
                      placeholder="First Name"
                      onChange={handleFormData("firstName")}
                    />
                  </Form.Group>
                </Col>
                <Col xxl="6" xl="6" lg="6" md="6">
                  <Form.Group
                    as={Col}
                    controlId="formGridgender"
                    className="formmargin"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      name="lastName"
                      defaultValue={values.lastName}
                      type="text"
                      placeholder="Last Name"
                      onChange={handleFormData("lastName")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xxl="6" xl="6" lg="6" md="6">
                  <Form.Group
                    as={Col}
                    controlId="formGridgender"
                    className="formmargin"
                  >
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      required
                      name="gender"
                      defaultValue={values.gender}
                      onChange={handleFormData("gender")}
                    >
                      <option value="" selected hidden disabled>
                        Please Select
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xl="6" lg="6">
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Label>Religion</Form.Label>
                    <Form.Select
                      name="religion"
                      placeholder="Religion"
                      defaultValue={values.religion}
                      onChange={handleFormData("religion")}
                    >
                      <option value="" selected hidden disabled>
                        Please Select
                      </option>
                      <option>Islam</option>
                      <option>Christianity</option>
                      <option>Buddhism</option>
                      <option> Sikhism</option>
                      <option> Hinduism</option>
                      <option>Bahá’í</option>
                      <option>Confucianism</option>
                      <option>Jainism</option>
                      <option>Judaism</option>
                      <option>Zoroastrianism</option>
                      <option>Druze</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xxl="6" xl="6" lg="6">
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                    s
                  >
                    <Form.Label>D-0-B</Form.Label>
                    <Form.Control
                      type="date"

                      placeholder="dd/mm/yyyy"
                      name="dob"
                      defaultValue={values.dob}
                      onChange={handleFormData("dob")}
                    />
                  </Form.Group>
                </Col>

                <Col xl="6" lg="6">
                  <Form.Group
                    as={Col}
                    controlId="formGridMartialStatus"
                    className="formmargin"
                  >
                    <Form.Label>Martial Status</Form.Label>
                    <Form.Select
                      name="martialStatus"
                      placeholder="martial status.."
                      defaultValue={values.martialStatus}
                      onChange={handleFormData("martialStatus")}
                    >
                      <option value="" selected hidden disabled>
                        Please Select
                      </option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                      <option>widow</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xl="6" lg="6" md="6">
                  <Form.Label>National ID </Form.Label>

                  <Form.Group
                    as={Col}
                    controlId="formGridFirstName"
                    className="formmargin"
                  >
                    <PatternFormat
                      style={{
                        border: "0.5px solid",
                        borderRadius: "4px",
                        width: "100%",
                        borderColor: "grey",
                        paddingTop: "1%",
                        paddingBottom: "1%",
                      }}
                      name="cnic"
                      required
                      format="#####-#######-#"
                      allowEmptyFormatting
                      mask="x"
                      defaultValue={values.cnic}
                      onChange={handleFormData("cnic")}
                    />
                  </Form.Group>
                </Col>
                <Col xl="6" lg="6" md="6">
                  <Form.Label>Payroll Company</Form.Label>
                  <Form.Control
                    required
                    name="company_payroll"
                    defaultValue={values.company_payroll}
                    type="text"
                    placeholder="company_payroll"
                    onChange={handleFormData("company_payroll")}
                  />
             
                </Col>
                
              </Row>
              <Row>
              <Col xl="6" lg="6" md="6">
                  <Form.Label>Company</Form.Label>
                  <Form.Select
                    name="company"
                    defaultValue={values.company}
                    onChange={handleFormData("company")}
                  >
                    <option disabled selected hidden defaultValue={""}>Please Select</option>
                    {company && company.map((d) => {
                      return (
                        <option
                          key={d._id}
                          value={d._id}
                          // name={d.title}
                        >
                          {d.title}
                        </option>
                      );
                    })}
                  </Form.Select>  
                </Col>
              </Row>

              <Button variant="primary" type="submit">
                Next
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default StepOne;