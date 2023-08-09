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
  });
  //creating error state for validation
  const [error, setError] = useState(false);
  const [file, setfile] = useState();
  const [company, setCompany] = useState();
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    console.log("function caling..........")

    // checking if value of first name and last name is empty show error else take to step 2
    console.log("value", values);
    if (
      validator.isEmpty(values.firstName) ||
      validator.isEmpty(values.lastName) ||
      validator.isEmpty(values.gender) ||

      // validator.isEmpty(values.dob) ||
      // validator.isEmpty(values.martialStatus) ||
      // validator.isEmpty(values.religion) ||
      // validator.isEmpty(values.profilepic)
      validator.isEmpty(values.cnic)
    ) {
      setError(true);
      console.log("setError");
    } else {
      nextStep();
      console.log("nextstep");
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
    // document.getElementById("avatar").src = `${base64}`;

    return base64;
    // avatar.src = base64;
    // textArea.innerText = base64;
  }



  const getdata = async () => {
    try {
      const companies = await axios.get(`/allCompany`)
      const cs = companies.data
      setCompany(cs)
      console.log("company", cs)
    }
    catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    console.log("hi im useeffect...")

    getdata()

  }, [])


  return (
    <>
      {/* <div className="col">
    <h3 className="page-title">Add Employees</h3>
  <ul className="breadcrumb" style={{ backgroundColor: "#f7f7f7" }}>
     <li className="breadcrumb-item">
       <Link to="/" style={{ color: "#1f1f1f" }}>
         Dashboard
       </Link>
     </li>
     <li className="breadcrumb-item active">Add Employee</li>
  </ul>
  </div> */}
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
                            {/* {console.log("picinsrc",URL.createObjectURL(file))} */}

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
                        // value={emp.profilepic}
                        defaultValue={values.profilepic}
                        style={{ display: "none" }}
                        id="uploadpic"
                        onChange={async (e) => {
                          await uploadImage(e);
                        }}
                      />
                      {console.log("profilepiccc", setfile)}
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
                      // style={{ border: error ? "2px solid red" : "" }}
                      name="firstName"
                      defaultValue={values.firstName}
                      // defaultValue={emp.firstname}
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
                      // style={{ border: error ? "2px solid red" : "" }}
                      name="lastName"
                      // defaultValue={emp.lastname}
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
                      // defaultValue={emp.gender}
                      // value={props.value2}
                      //   onChange={handleinput}
                      // onChange={props.onChange}
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
                      // required
                      name="religion"
                      placeholder="Religion"
                      // defaultValue={emp.religion}
                      defaultValue={values.religion}
                      // value={props.value6}
                      //   onChange={handleinput}
                      // onChange={props.onChange}
                      //   disabled={disableFields}
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
                    {/* <DatePicker
                          
                            required
                            selected={emp.dob}
                            onChange={(date)=>{setEmp({...emp,dob:moment(date).format('dd/mm/yyyy')})}}
                            // dateFormat='d MMMM, yyyy'
                            dateFormat='dd/mm/yyyy'
                            dropDownMode="select"
                          /> */}
                    <Form.Control
                      type="date"
                      // required
                      placeholder="dd/mm/yyyy"
                      name="dob"
                      // defaultValue={emp.dob}
                      // value={props.value4}
                      defaultValue={values.dob}
                      //   onChange={handleinput}
                      // onChange={props.onChange}
                      //   disabled={disableFields}
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
                      // required
                      name="martialStatus"
                      placeholder="martial status.."
                      // defaultValue={emp.martialStatus}
                      defaultValue={values.martialStatus}
                      // value={props.value5}
                      //   onChange={handleinput}
                      // onChange={props.onChange}
                      //   disabled={disableFields}
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
                      }} // type="number"
                      name="cnic"
                      required
                      // value={""}
                      format="#####-#######-#"
                      // placeholder="xxxxx-xxxxxxx-x"
                      allowEmptyFormatting
                      mask="x"
                      // defaultValue={emp.cnic}
                      defaultValue={values.cnic}
                      // value={props.value3}
                      //   onChange={handleinput}
                      // onChange={props.onChange}
                      //   disabled={disableFields}
                      onChange={handleFormData("cnic")}
                    />
                  </Form.Group>
                </Col>
                {/* //company filled */}
                <Col xl="6" lg="6" md="6">
                  <Form.Label>Payroll Company</Form.Label>
                  <Form.Control
                    required
                    // style={{ border: error ? "2px solid red" : "" }}
                    name="company_payroll"
                    // defaultValue={emp.lastname}
                    defaultValue={values.company_payroll}
                    type="text"
                    placeholder="company_payroll"
                    onChange={handleFormData("company_payroll")}
                  />

                  {/* 
                  <Form.Select
                    required
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                  >
                    <option disabled selected hidden defaultValue={""}>Please Select</option>
                    {company.map((d) => {
                      return (
                        <option
                          key={d._id}
                          value={d.title}
                          name={d.title}
                        >
                          {d.title}
                        </option>
                      );
                    })}
                  </Form.Select> */}



                  {/* <Form.Group
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
                      name="company_payroll"
                      required
                      allowEmptyFormatting
                      mask="x"
                      defaultValue={values.company_payroll}
                      onChange={handleFormData("company_payroll")}
                    />
                  </Form.Group> */}
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