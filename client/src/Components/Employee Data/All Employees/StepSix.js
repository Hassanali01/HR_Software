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
  Alert,
} from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
// import validator from "validator";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Table from "react-bootstrap/Table";
// import { NotificationContainer, NotificationManager } from 'react-notifications';
const moment = require("moment");
// creating functional component ans getting props from app.js and destucturing them
const StepSix = ({ nextStep, handleFormData, prevStep, values }) => {
  console.log("valuess", values);
  const [employement, setemployement] = useState([]);
  // const [education,setEducation] = useState([])
  const [emp, setEmp] = useState({
    profilepic: values.profilepic,
    firstname: values.firstName,
    company_payroll: values.company_payroll,
    lastname: values.lastName,
    dob: values.dob,
    cnic: values.cnic,
    gender: values.gender,
    martialStatus: values.martialStatus,
    religion: values.religion,
    jobtitle: values.jobtitle,
    username: values.username,
    primaryemail: values.email,
    secondaryemail: values.email1,
    password: values.password,
    primaryphone: values.phone,
    secondaryphone: values.phone1,
    permanentaddress: values.permanentaddress,
    temporaryaddress: values.temporaryaddress,
    province: values.province,
    city: values.city,
    postalCode: values.postalcode,
    departments: values.departments,
    designation: values.designation,
    joiningdate: values.joiningdate,
    educationdetails: values.educationdetails,
    employementhistory: values.employementhistory,
    currentSalary: values.salary,
    employementstatus: values.employementstatus,
    // bank information
    bankname: values.bankname,
    paymentmode: values.paymentmode,
    accounttitle: values.accounttitle,
    accountno: values.accountno,
    IBAN: values.iban,
    branchcode: values.branchcode,
    country: values.country,
    emp_id:values.emp_id,
    //degree info
    supervisors: values.supervisors
  });

  //creating error state for validation
  const url1 = "/auth/register";
  console.log("url", url1);
  const [error, setError] = useState(false);
  const [file, setfile] = useState();

  const [childModel, setShowChildModel] = useState(false);
  const showChildModel = () => setShowChildModel(true);
  const Closechildmodal = () => setShowChildModel(false);

  const [childModel1, setShowChildModel1] = useState(false);
  const showChildModel1 = () => setShowChildModel1(true);
  const Closechildmodal1 = () => setShowChildModel1(false);

  const [testUpdate, setTestUpdate] = useState(false);
  const [education, seteducation] = useState([]);
  const [empdetails, setempdetails] = useState({
    company: "",
    position: "",
    joiningdate: "",
    resignationdate: "",
    duration: "",
    jobdescription: "",
    departments: ""
  });

  // const [edudetails,setEdudetails] = useState({
  //   institude:"",
  //   degree:"",
  //   start:"",
  //   end:"",
  //   status:""
  // })

  const addhistory = async () => {
    var empl = employement;
    empl.push({
      company: empdetails.company,
      position: empdetails.position,
      joiningdate: empdetails.joiningdate,
      resignationdate: empdetails.resignationdate,
      duration: empdetails.duration,
      jobdescription: empdetails.jobdescription,
    });
    console.log("emplllllllll", empl);
    setemployement(empl);
    setEmp({ ...emp, employementhistory: empl && empl });
  };

  // const addEducation =async()=>{
  //   var edu =eduaction;
  //   edu.push({
  //     institude:edudetails.institude,
  //     degree: edudetails.degree,
  //     start:edudetails.start,
  //     end:edudetails.end,
  //     status:edudetails.status
  //   })
  //   setEdudetails(edu);
  //   setEmp({...emp,educationdetails:edu && edu})

  // }
  console.log(employement && emp.employementhistory, "history");
  const handleempinputJoiningDate = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    console.log("change", empdetails);

    var a = moment(empdetails.resignationdate);
    var b = moment(e.target.value);

    var years = a.diff(b, "year");
    b.add(years, "years");

    var months = a.diff(b, "months");
    b.add(months, "months");

    var days = a.diff(b, "days");

    console.log(years + " years " + months + " months " + days + " days");

    await setempdetails({
      ...empdetails,
      [name]: e.target.value,
      duration: `${years}  years  ${months}  months  ${days} days`,
    });
  };

  const handleempinputResignationDate = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    var a = moment(e.target.value);
    var b = moment(empdetails.joiningdate);

    var years = a.diff(b, "year");
    b.add(years, "years");

    var months = a.diff(b, "months");
    b.add(months, "months");

    var days = a.diff(b, "days");

    console.log(years + " years " + months + " months " + days + " days");

    await setempdetails({
      ...empdetails,
      [name]: e.target.value,
      duration: `${years}  years  ${months}  months  ${days} days`,
    });
  };

  const handleInputStartDate = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    // console.log("change", empdetails);

    var a = moment(details.start);
    var b = moment(e.target.value);

    var years = a.diff(b, "year");
    b.add(years, "years");

    var months = a.diff(b, "months");
    b.add(months, "months");

    var days = a.diff(b, "days");

    console.log(years + " years " + months + " months " + days + " days");

    await setdetails({
      ...details,
      [name]: e.target.value,
      duration: `${years}  years  ${months}  months  ${days} days`,
    });
  };

  const handleInputEndDate = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    var a = moment(e.target.value);
    var b = moment(details.end);

    var years = a.diff(b, "year");
    b.add(years, "years");

    var months = a.diff(b, "months");
    b.add(months, "months");

    var days = a.diff(b, "days");

    console.log(years + " years " + months + " months " + days + " days");

    await setdetails({
      ...details,
      [name]: e.target.value,
      duration: `${years}  years  ${months}  months  ${days} days`,
    });
  };

  const handleSubmit = async () => {
    console.log("hanlde");

    // e.preventDefault();
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      emp.profilepic = filename;
      // NotificationManager.success("sucessfully submitted")
      try {
        console.log(data,"my data 11111111111111")
        await axios.post("/upload", data);
        // NotificationManager.success("sucessfully submitted")
      } catch (err) {
        console.log(err);
        NotificationManager.error("Pic not Uploaded");
      }
    
    }

    try {
      console.log(emp,"my data")
      const res = await axios.post(url1, emp);
      console.log(res);

      res && NotificationManager.success("Sucessfully Added Employee");
      // res && window.location.replace("/employees");
    } catch (error) {
      console.log(error,"what is error");
      NotificationManager.error("Something went wrong ");
    }
    seteducation("")
    setemployement("")
    // console.log("onsubmit",handleSubmit)
  };

  //    const handleinput = (e) => {
  //         console.log(e);
  //         name = e.target.name;
  //         value = e.target.value;
  //         setEmp({ ...emp, [name]: value });
  //       };

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
    // if (
    //   validator.isEmpty(values.company) ||
    //   validator.isEmpty(values.position) ||
    //   validator.isEmpty(values.joiningdate) ||
    //   validator.isEmpty(values.resignationdate) ||
    //   validator.isEmpty(values.jobdescription)
    // ) {
    //   setError(true);
    //   console.log("setError1");
    // } else {
    //   nextStep();
    //   console.log("nextstep1");
    // }
  };
  const removeitem = (i) => {
    const temp = education;
    temp.splice(i, 1);
    console.log("splice", temp);
    seteducation(temp);
    setTestUpdate(!testUpdate);
  };
  const removemployement = (i) => {
    const temp = employement;
    employement.splice(i, 1);
    console.log("splice", temp);
    setemployement(temp);
    setTestUpdate(!testUpdate);
  };
  const [details, setdetails] = useState({
    degreetitle: "",
    institute: "",
    start: "",
    end: "",
    status: "",
  });

  const handleeducationdetails = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    await setdetails({
      ...details,
      [name]: value,
    });
  };

  const handleempinput = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    await setempdetails({
      ...empdetails,
      [name]: value,
    });
  };

  const addeducation = async () => {
    var temp = education;
    temp.push({
      degreetitle: details.degreetitle,
      institute: details.institute,
      start: details.start,
      end: details.end,
      status: details.status,
    
    });
    seteducation(temp);
    setEmp({ ...emp, educationdetails: temp && temp });
  };
  console.log("addeducation", addeducation);

  return (
    <>
      <Card style={{ marginTop: "8%" }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <h3 style={{ color: "rgb(0,105,92)" }}>Previous Information</h3>
            <hr></hr>

            <Row>
              <Container>
                {" "}
                <Row className="my-3"></Row>
              </Container>
              <div className="my-3 d-flex ">
                <div className="d-flex justify-content-end">
                  <Button
                    className="btn ml-2"
                    // onClick={()=>{props.onClick}}
                    onClick={() => {
                      setShowChildModel(true);
                    }}
                  >
                    Add Employement
                  </Button>
                </div>
              </div>

              <Row className="my-3">
                <Table striped bordered hover className="ml-4">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th style={{ textAlign: "center" }}>Company</th>
                      <th style={{ textAlign: "center" }}>Position</th>
                      <th style={{ textAlign: "center" }}>Start Date</th>
                      <th style={{ textAlign: "center" }}>Left Date</th>
                      <th style={{ textAlign: "center" }}>Duration</th>
                      <th style={{ textAlign: "center" }}>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employement &&
                      employement.map((d, i) => {
                        return (
                          <>
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <td>{d.company}</td>
                              <td>{d.position}</td>
                              <td>{d.joiningdate}</td>
                              <td>{d.resignationdate}</td>
                              <td>{d.duration}</td>
                              <td>
                                <i
                                  class="fa fa-trash-can"
                                  aria-hidden="true"
                                  style={{ color: "red" }}
                                  onClick={() => removemployement(i)}
                                ></i>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    {/* {props.employement} */}
                  </tbody>
                </Table>
              </Row>
            </Row>
            {/* </div> */}
            <Modal
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={childModel}
              onHide={Closechildmodal}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title
                  id="contained-modal-title-vcenter "
                  style={{ textAlign: "center" }}
                >
                  <h5>Employement Details</h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid>
                  <Row>
                    <div className="py-3">
                      <h4>Previous Employment</h4>
                      <hr
                        style={{
                          fontWeight: "bold",
                          borderWidth: "2px",
                          border: "1px solid black",
                        }}
                      >
                        
                      </hr>
                    </div>

                    <Col>
                      <Form.Group
                        as={Col}
                        controlId="formGridempcompany"
                        className="formmargin"
                      >
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          name="company"
                          placeholder="company name.."
                          // defaultValue={empdetails.company}
                          defaultValue={values.company}
                          onChange={handleempinput}
                          // onChange={handleempinput}
                          // onChange={handleempinput}
                          // disabled={disableFields}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        as={Col}
                        controlId="formGridLastName"
                        className="formmargin"
                      >
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          name="position"
                          placeholder="position.."
                          // defaultValue={empdetails.position}
                          defaultValue={values.position}
                          onChange={handleempinput}
                          // onChange={handleempinput}
                          // disabled={disableFields}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
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
                          defaultValue={values.joiningdate}
                          // defaultValue={empdetails.joiningdate}
                          onChange={async (e) =>
                            await handleempinputJoiningDate(e)
                          }
                          // disabled={disableFields}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        as={Col}
                        controlId="formGridFirstName"
                        className="formmargin"
                      >
                        <Form.Label>Resignation Date</Form.Label>
                        <Form.Control
                          type="date"
                          required
                          name="resignationdate"
                          placeholder="resignation date"
                          defaultValue={values.resignationdate}
                          // defaultValue={empdetails.resignationdate}
                          onChange={async (e) =>
                            await handleempinputResignationDate(e)
                          }
                          // disabled={disableFields}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label>Job Description</Form.Label>
                    <FormGroup
                      as={Col}
                      controlId="formGridFirstName"
                      className="formmargin"
                    >
                      <Form.Control
                        as="textarea"
                        rows={"3"}
                        style={{ resize: "none" }}
                        required
                        name="jobdescription"
                        placeholder="Tell us about your job role & experience in previous company "
                        // defaultValue={empdetails.jobdescription}
                        defaultValue={values.jobdescription}
                        onChange={handleempinput}
                        //   onChange={handleempinput}
                        // disabled={disableFields}
                      />
                    </FormGroup>
                  </Row>
                  <div className="d-flex justify-content-center my-3">
                    <Button
                      className="btn ml-2"
                      onClick={() => {
                        addhistory();
                        Closechildmodal();
                        values.employementhistory = employement;
                      }}
                    >
                      Add Employement
                    </Button>
                  </div>
                </Container>
              </Modal.Body>
            </Modal>

            <div style={{ display: "flex" }}>
              {/* <Button variant="primary" onClick={prevStep}>
                Previous 
              </Button>

              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "2%" }}
                // onClick={handleSubmit}
                onClick={handleSubmit}
                
              >
                Submit
              </Button> */}
            </div>

            <Row>
              <Container>
                {" "}
                <Row className="my-3"></Row>
              </Container>
              <div className="my-3 d-flex ">
                <div className="d-flex justify-content-end">
                  <Button
                    className="btn ml-2"
                    // onClick={()=>{props.onClick}}
                    onClick={() => {
                      setShowChildModel1(true);
                    }}
                  >
                    Add Education
                  </Button>
                </div>
              </div>

              {/* <Row className="my-3">
                <Table striped bordered hover className="ml-4">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th style={{ textAlign: "center" }}>Institude</th>
                      <th style={{ textAlign: "center" }}>Degree</th>
                      <th style={{ textAlign: "center" }}>Start Date</th>
                      <th style={{ textAlign: "center" }}>End Date</th>
                      <th style={{ textAlign: "center" }}>Status</th>
                      <th style={{ textAlign: "center" }}>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {education &&
                      education.map((d, i) => {
                        {
                          console.log("d", d);
                        }
                        return (
                          <>
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <td>{d.institute}</td>
                              <td>{d.degreetitle}</td>
                              <td>{d.start}</td>
                              <td>{d.end}</td>
                              <td>{d.status}</td>
                              <td>
                                <i
                                  class="fa fa-trash-can"
                                  aria-hidden="true"
                                  style={{ color: "red" }}
                                  onClick={() => removeitem(i)}
                                ></i>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    {/* {props.employement} */}
                  {/* </tbody> */}
                {/* </Table> */}
              {/* </Row>  */}

              {/* Asad Work........................... */}
              <Row className="my-3">
                <Table striped bordered hover className="ml-4">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th style={{ textAlign: "center" }}>Institude</th>
                      <th style={{ textAlign: "center" }}>Degree</th>
                      <th style={{ textAlign: "center" }}>Start Date</th>
                      <th style={{ textAlign: "center" }}>End Date</th>
                      <th style={{ textAlign: "center" }}>Status</th>
                      <th style={{ textAlign: "center" }}>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {education &&
                      education.map((d, i) => {
                        {
                          console.log("d", d);
                        }
                        return (
                          <>
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <td>{d.institute}</td>
                              <td>{d.degreetitle}</td>
                              <td>{d.start}</td>
                              <td>{d.end}</td>
                              <td>{d.status}</td>
                              <td>
                                <i
                                  class="fa fa-trash-can"
                                  aria-hidden="true"
                                  style={{ color: "red" }}
                                  onClick={() => removeitem(i)}
                                ></i>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    {/* {props.employement} */}
                  </tbody>
                </Table>
              </Row>
               {/* Asad work................................... */}
            </Row>
            {/* </div> */}
            <Modal
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={childModel1}
              onHide={Closechildmodal1}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title
                  id="contained-modal-title-vcenter "
                  style={{ textAlign: "center" }}
                >
                  <h5>Education Details</h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid>
                  <Row>
                    <div className="py-3">
                      <h4>education Employment</h4>
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
                        controlId="formGridempcompany"
                        className="formmargin"
                      >
                        <Form.Label>Institude</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          name="institute"
                          placeholder="institude"
                          // defaultValue={empdetails.company}
                          defaultValue={values.institute}
                          onChange={handleeducationdetails}
                          // onChange={handleempinput}
                          // onChange={handleempinput}
                          // disabled={disableFields}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        as={Col}
                        controlId="formGridLastName"
                        className="formmargin"
                      >
                        <Form.Label>degree</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          name="degreetitle"
                          placeholder="degree.."
                          // defaultValue={empdetails.position}
                          defaultValue={values.degreetitle}
                          onChange={handleeducationdetails}
                          // onChange={handleempinput}
                          // disabled={disableFields}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group
                        as={Col}
                        controlId="formGridFirstName"
                        className="formmargin"
                      >
                        <Form.Label>start Date</Form.Label>
                        <Form.Control
                          type="date"
                          required
                          name="start"
                          placeholder="Start date"
                          defaultValue={values.start}
                          // defaultValue={empdetails.joiningdate}
                          onChange={async (e) => await handleInputStartDate(e)}
                          // disabled={disableFields}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        as={Col}
                        controlId="formGridFirstName"
                        className="formmargin"
                      >
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                          type="date"
                          required
                          name="end"
                          placeholder="End date"
                          defaultValue={values.end}
                          // defaultValue={empdetails.resignationdate}
                          onChange={async (e) => await handleInputEndDate(e)}
                          // disabled={disableFields}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label>Status</Form.Label>
                    <FormGroup
                      as={Col}
                      controlId="formGridFirstName"
                      className="formmargin"
                    >
                      <Form.Control
                        as="textarea"
                        rows={"3"}
                        style={{ resize: "none" }}
                        required
                        name="status"
                        placeholder="Tell us about your education status"
                        // defaultValue={empdetails.jobdescription}
                        defaultValue={values.status}
                        onChange={handleeducationdetails}
                        //   onChange={handleempinput}
                        // disabled={disableFields}
                      />
                    </FormGroup>
                  </Row>
                  <div className="d-flex justify-content-center my-3">
                    <Button
                      className="btn ml-2"
                      onClick={() => {
                        addeducation();
                        Closechildmodal1();
                        values.educationdetails = education;
                      }}
                    >
                      Add Education
                    </Button>
                  </div>
                </Container>
              </Modal.Body>
            </Modal>

            <div style={{ display: "flex" }}>
              <Button variant="primary" onClick={prevStep}>
                Previous
              </Button>

              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "2%" }}
                // onClick={handleSubmit}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <NotificationContainer />
    </>
  );
};

export default StepSix;
