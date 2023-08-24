import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Employee.css";
import { useState } from "react";
import Card from "../Emp Card/EmpCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  Modal,
  Button,
  Form,
  Col,
  Row,
  Container,
  FormGroup,
} from "react-bootstrap";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TableView from "../TableView/Table";
import { useNavigate } from "react-router-dom";
import HeaderContext from "./../../../Context/HeaderContext"
import "react-datepicker/dist/react-datepicker.css";
import EmployeeData from "./EmployeeData";
const moment = require("moment");

const AllEmployees = () => {
  let navigate = useNavigate();
  const url2 = "/departments";
  const url = "/employees";
  const url1 = "/auth/register";
  const [dep, setDep] = useState([]);
  const [datas, setData] = useState();
  const handleClose = () => setShow(false);
  const Closechildmodal = () => setShowChildModel(false);
  const Closechildmodal1 = () => setShowChildModel1(false);
  const showChildModel = () => setShowChildModel(true);
  const showChildModel1 = () => setShowChildModel1(true);
  const handleShow = () => setShow(true);
  const [childModel, setShowChildModel] = useState(false);
  const [childModel1, setShowChildModel1] = useState(false);
  const [show, setShow] = useState(false);
  const [birth, setbirth] = useState("");
  const [testUpdate, setTestUpdate] = useState(false);
  const [update, setUpdate] = useState(false);

  const [list, setlist] = useState(false);
  //for profile pic
  const [file, setfile] = useState();
  //Employee Add
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
  //educaion details add and remove //
  const [education, seteducation] = useState([]);
  const [selected, setSelected] = useState("");
  const [country, setcountry] = useState("");
  const [employement, setemployement] = useState([]);
  const [empdetails, setempdetails] = useState({
    company: "",
    position: "",
    joiningdate: "",
    resignationdate: "",
    duration: "",
    jobdescription: "",
  });
  const [details, setdetails] = useState({
    degreetitle: "",
    institute: "",
    start: "",
    end: "",
    status: "",
  });
  const removeitem = (i) => {
    const temp = education;
    temp.splice(i, 1);
    seteducation(temp);
    setTestUpdate(!testUpdate);
  };
  const removemployement = (i) => {
    const temp = employement;
    employement.splice(i, 1);

    setemployement(temp);
    setTestUpdate(!testUpdate);
  };
  const addhistory = () => {
    var empl = employement;
    empl.push({
      company: empdetails.company,
      position: empdetails.position,
      joiningdate: empdetails.joiningdate,
      resignationdate: empdetails.resignationdate,
      duration: empdetails.duration,
      jobdescription: empdetails.jobdescription,
    });

    setemployement(empl);
    setEmp({ ...emp, employementhistory: empl });
  };

  let name, value;
  const handleinput = (e) => {

    name = e.target.name;
    value = e.target.value;
    setEmp({ ...emp, [name]: value });
  };

  const handleeducationdetails = async (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;

    await setdetails({
      ...details,
      [name]: value,
    });
  };

  //handle user input form data
  const handleempinput = async (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;

    await setempdetails({
      ...empdetails,
      [name]: value,
    });
  };

  const addeducation = () => {
    var temp = education;
    temp.push({
      degreetitle: details.degreetitle,
      institute: details.institute,
      start: details.start,
      end: details.end,
      status: details.status,
    });
    seteducation(temp);
    setEmp({ ...emp, educationdetails: education });
  };

  const handleempinputJoiningDate = async (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;


    var a = moment(empdetails.resignationdate);
    var b = moment(e.target.value);

    var years = a.diff(b, "year");
    b.add(years, "years");

    var months = a.diff(b, "months");
    b.add(months, "months");

    var days = a.diff(b, "days");


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


    await setempdetails({
      ...empdetails,
      [name]: e.target.value,
      duration: `${years}  years  ${months}  months  ${days} days`,
    });
  };
  ///education & employement details code end;

  //list and grid view start
  const [view, setView] = useState(false);
  const handleChange = (event, nextView) => {
    setView(!view);
    setView(nextView);
    setView(!view);

  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      emp.profilepic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {

        NotificationManager.error("Pic not Uploaded");
      }
    }

    try {
      const res = await axios.post(url1, emp);

      res && NotificationManager.success("Sucessfully Added Employee");

    } catch (error) {
;
      NotificationManager.error("Something went wrong ");
    }
  };

  //fetching employees data
  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      const data = res.data.employees;
      setData(data);
    } catch (error) {

      NotificationManager.error("Api Error 404");
    }
  };

  //getting Employees
  const getEmp = async () => {
    try {
      const res = await axios.get(url2);
      const datas = res.data.departments;

      setDep(datas);
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchData();
    getEmp();
  }, [update]);
  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Employee ")
  })

  const PF = "http://localhost:5002/images/";

  return (
    <>
      <div className="content-wrapper" style={{ backgroundColor: "#f7f7f7" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              {/* <div className="col">
                <h3 className="page-title">Employee</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                    Human Resource
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Employee</li>
                </ul>
              </div> */}
              <div className="col-auto float-start ms-auto">
                <a
                  className="btn add-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#add_employee"
                >
                  <i
                    className="fa fa-plus"
                    style={{ fontSize: "14px", marginRight: "2px" }}
                  >
                    {" "}
                  </i>
                  <Link to="/employeeData">Add Employee</Link>
                </a>
              </div>

              <div
                className="mt-4"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <div>
                  <ToggleButtonGroup
                    orientation="horizontal"
                    value={view}
                    exclusive
                    onChange={handleChange}
                  >
                    <ToggleButton
                      value="module"
                      aria-label="module"
                      selected={!view}
                    >
                      <ViewModuleIcon />
                    </ToggleButton>
                    <ToggleButton
                      value="list"
                      aria-label="list"
                      selected={view}
                    >
                      <ViewListIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Main content */}
        <section className="content" style={{ paddingBottom: "70px" }}>
          <div className="container-fluid">
            <div
              className="row  gy-3  vertical-scrollable"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {/* list and grid view */}
              {view
                ? datas && <TableView data={datas} />
                : datas &&
                  datas.map((p, i) => {
                    return (
                      <div
                        className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                        key={i}
                      >
                        <div>
                          <Card data={p} setUpdate={setUpdate} />
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </section>
        <NotificationContainer />
        <Container style={{ alignSelf: "center" }}>
          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
            dialogClassName="my-modal"

            style={{ alignSelf: "center" }}
          >
            <Modal.Header closeButton>
              <Modal.Title
                id="contained-modal-title-vcenter "
                style={{ textAlign: "center" }}
              >
                <h5> Add Employee</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container fluid>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    {/* <Row>
                  <div className="py-3">
                    <h4>Personal Information</h4>
                    <hr
                      style={{
                        fontWeight: "bold",
                        borderWidth: "2px",
                        border: "1px solid black",
                      }}
                    ></hr>
                  </div>
                  
                   <div className="responsiveform d-lg-flex d-lg-flex d-md-flex justify-content-between  ">
                   <div className="w-75" id="responsivewidth">
                  <Col>
                    <Row >
                      <Col xxl="6" xl="6" lg="6" md="6">
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
                          />
                        </Form.Group>
                      </Col>
                      <Col xxl="6" xl="6" lg="6" md="6">
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
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xxl='6' xl='6' lg='6' md='6'>
                        <Form.Group
                          as={Col}
                          controlId="formGridgender"
                          className="formmargin"
                        >
                          <Form.Label>Gender</Form.Label>
                          <Form.Select
                            required
                            name="gender"
                            value={emp.gender}
                            onChange={handleinput}
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
                      <Col xl='6' lg="6" md="6">
                        <Form.Group
                          as={Col}
                          controlId="formGridFirstName"
                          className="formmargin"
                        >
                          <Form.Label>National ID </Form.Label>
                          <Form.Control
                            type="number"
                            required
                            name="cnic"
                            placeholder="CNIC"
                            value={emp.cnic}
                            onChange={handleinput}
                            //   disabled={disableFields}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xxl='6' xl='6' lg='6'>
                        <Form.Group
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>D-0-B</Form.Label> */}
                    {/* <DatePicker
                            required
                            selected={emp.dob}
                            onChange={(date)=>{setEmp({...emp,dob:moment(date).format('dd/mm/yyyy')})}}
                            // dateFormat='d MMMM, yyyy'
                            dateFormat='dd/mm/yyyy'
                            dropDownMode="select"
                          /> */}
                    {/* <Form.Control 
                            type="date"
                            required
                            placeholder="dd/mm/yyyy"
                            name="dob"
                            value={emp.dob}
                            onChange={handleinput}
                            //   disabled={disableFields}
                          />
                        </Form.Group>
                      </Col>

                      <Col  xl='6' lg="6" >
                        <Form.Group
                          as={Col}
                          controlId="formGridMartialStatus"
                          className="formmargin"
                        >
                          <Form.Label>Martial Status</Form.Label>
                          <Form.Select
                            required
                            name="martialStatus"
                            placeholder="martial status.."
                            value={emp.martialStatus}
                            onChange={handleinput}
                            //   disabled={disableFields}
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
                      <Col xl='6' lg='6'>
                        <Form.Group
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>Religion</Form.Label>
                          <Form.Select
                            required
                            name="religion"
                            placeholder="Religion"
                            value={emp.religion}
                            onChange={handleinput}
                            //   disabled={disableFields}
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
                  </Col>
                  </div>
                  <div className=" reswidth ">
                  <Col xxl="4" xl="4" lg="4" >
                 
                 <div style={{ width: "100%" }}>
                   <div className="d-flex align-items-center responsiveimg">
                     <div>
                     <Form className='mb-3' controlId="formGridProfilePic">
                                
                                   
                                  
                                    
                                 <Form.Label htmlFor='uploadpic' > 
                                     {file ? <img  className="rounded-circle" style={{ width: "200px", height: "200px" }} src={URL.createObjectURL(file)} alt="" /> : <img  className="rounded-circle" src={pp} alt="" style={{ width: "200px", height: "200px" }} />}
                                 </Form.Label>
                                 
                                 
                                 <Form.Control type="file"
                                     name='file'
                                     value={emp.profilepic}
                                     style={{ display: "none" }}
                                     id='uploadpic'
                                     
                                     onChange={(e) => setfile(e.target.files[0])}
                                 />
                                 <div className="w-100 text-center">
                                   <label>Upload Picture</label>
                                 </div>
                                 
                       </Form>
                     </div>
                   </div>
                 </div>
               </Col>
                  </div>
                   </div>
                </Row>

                <Row className="py-4">
                  <div>
                    <h4>Contacts Details</h4>
                    <hr
                      style={{
                        fontWeight: "bold",
                        borderWidth: "2px",
                        border: "1px solid black",
                      }}
                    ></hr>
                  </div>
                  <Row>
                    <h5
                      className="py-2 "
                      style={{ fontSize: "22px", padding: "0px 19px" }}
                    >
                      Primary
                    </h5>
                    <Col xxl="6" xl="6" lg="6" md="6">
                      <Form.Group
                        as={Col}
                        controlId="formGridphone"
                        className="formmargin "
                      >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          name="primaryphone"
                          placeholder="phone"
                          value={emp.primaryphone}
                          onChange={handleinput}
                        />
                      </Form.Group>
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
                          value={emp.primaryemail}
                          onChange={handleinput}
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
                      <Form.Group
                        as={Col}
                        controlId="formGridcompanyemail"
                        className="formmargin "
                      >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          name="secondaryphone"
                          placeholder="secondary phone"
                          value={emp.secondaryphone}
                          onChange={handleinput}
                        />
                      </Form.Group>
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
                          name="secondaryemail"
                          placeholder="secondary Email"
                          value={emp.secondaryemail}
                          onChange={handleinput}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
                <div>
                  <h4>Address & Region</h4>
                  <hr
                    style={{
                      fontWeight: "bold",
                      borderWidth: "2px",
                      border: "1px solid black",
                    }}
                  ></hr>
                </div>
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
                      value={emp.temporaryaddress}
                      onChange={handleinput}
                      //   disabled={disableFields}
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
                      required
                      name="permanentaddress"
                      placeholder="complete address"
                      value={emp.permanentaddress}
                      onChange={handleinput}
                      //   disabled={disableFields}
                    />
                  </Form.Group>
                </Col> */}
                    {/* </Row> */}
                    {/* <Row>
                  <Col>
                    <Form.Label>City</Form.Label>
                    <Form.Group
                      as={Col}
                      controlId="formGridLastName"
                      className="formmargin"
                    >
                      <Form.Select
                        required
                        onChange={handleinput}
                        name="city"
                        value={emp.city}
                      >
                        <option value="" selected hidden disabled>
                          Select City
                        </option>
                        {cities.map((d, i) => {
                          return <option key={i}>{d}</option>;
                        })}
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
                        required
                        name="province"
                        placeholder="province"
                        value={emp.province}
                        onChange={handleinput}
                        //   disabled={disableFields}
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
                      <ReactFlags
                        countries={["PK"]}
                        selected={selected}
                        onSelect={(code) => {
                          setSelected(code);
                          code === "PK" && setcountry("Pakistan");
                          setEmp({...emp,country:"Pakistan"})
                        }}
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
                        name="postalCode"
                        placeholder="postal code"
                        value={emp.postalCode}
                        onChange={handleinput}
                        //   disabled={disableFields}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <div className="py-3">
                    <h4>Education Information</h4>
                    <hr
                      style={{
                        fontWeight: "bold",
                        borderWidth: "2px",
                        border: "1px solid black",
                      }}
                    ></hr>
                    
                    <Container>
                    <div className="d-flex justify-content-end ">
                      <Button
                        onClick={() => {
                          setShowChildModel1(true);
                        }}
                      >
                        Add Education
                      </Button>
                    </div>
                      <Row className="my-3">
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th style={{textAlign:"center"}}>Institute</th>
                              <th style={{textAlign:"center"}}>Degree</th>
                              <th style={{textAlign:"center"}}>start</th>
                              <th style={{textAlign:"center"}}>end</th>
                              <th style={{textAlign:"center"}}>Status</th>
                              <th style={{textAlign:"center"}}>Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {education &&
                              education.map((d, i) => {
                                return (
                                 
                                    <tr >
                                      <th>{i+1}</th>
                                      <td>{d.institute}</td>
                                      <td>{d.degreetitle}</td>
                                      <td>{d.start}</td>
                                      <td>{d.end}</td>
                                      <td>{d.status}</td>
                                      <td><i class="fa fa-trash-can" aria-hidden="true" style={{color:'red'}} onClick={()=>removeitem(i)}></i></td>
                                    </tr>
                                 
                                );
                              })}
                          </tbody>
                        </Table>
                      </Row>
                    </Container>
                  </div>
                </Row>
                <Row className="mb-3">
                  <div className="py-3">
                    <h4>Previous Employment</h4>
                    <hr
                      style={{
                        fontWeight: "bold",
                        borderWidth: "2px",
                        border: "1px solid black",
                      }}
                    ></hr>
                   
                    <Container>
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => {
                          setShowChildModel(true);
                        }}
                      >
                        Add Employement
                      </Button>
                    </div>
                      <Row className="my-3">
                      <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th style={{textAlign:"center"}}>Company</th>
                              <th style={{textAlign:"center"}}>Position</th>
                              <th style={{textAlign:"center"}}>start Date</th>
                              <th style={{textAlign:"center"}}>Left Date</th>
                              <th style={{textAlign:"center"}}>duration</th>
                              <th style={{textAlign:"center"}}>Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employement &&
                              employement.map((d, i) => {
                                return (
                                  <>
                                    <tr key={i}>
                                      <th>{i+1}</th>
                                      <td>{d.company}</td>
                                      <td>{d.position}</td>
                                      <td>{d.joiningdate}</td>
                                      <td>{d.resignationdate}</td>
                                      <td>{d.duration}</td>
                                      <td><i class="fa fa-trash-can" aria-hidden="true" style={{color:'red'}} onClick={()=>removemployement(i)}></i></td>
                                    </tr>
                                  </>
                                );
                              })}
                          </tbody>
                        </Table>
                      </Row>
                    </Container>
                  </div>
                </Row> */}
                    {/* <Row>
                  <div className="py-3">
                    <h4>Previous Employment</h4>
                    <hr
                      style={{
                        fontWeight: "bold",
                        borderWidth: "2px",
                        border: "1px solid black",
                      }}
                    ></hr>
                  </div>
                  <Container>
                      <Row className="my-3">
                        
                      </Row>
                    </Container>
                  <div className="my-3 d-flex ">
                    

                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => {
                          setShowChildModel(true);
                        }}
                      >
                        Add Employement
                      </Button>
                    </div>
                  </div> */}
                    {/* <Col>
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
                  placeholder="company name.."
                  value={emp.username}
                  onChange={handleinput}
                //   disabled={disableFields}
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
                  value={emp.password}
                  onChange={handleinput}
                //   disabled={disableFields}
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
                //   disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Label>Resignation  Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  name="resignation date"
                  placeholder="resignation date"
                  value={emp.terminationdate}
                  onChange={handleinput}
                //   disabled={disableFields}
                />
              </Form.Group>
            </Col>
            
          </Row> */}
                    {/* </Row> */}
                    {/* <Row>
                  <div className="py-3">
                    <h4>Employement Details</h4>
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
                        //   disabled={disableFields}
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
                        value={emp.password}
                        onChange={handleinput}
                        //   disabled={disableFields} */}
                    {/* />
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
                        onChange={handleinput} */}
                    {/* //   disabled={disableFields}
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
                        required
                        name="currentSalary"
                        placeholder="salary"
                        value={emp.currentSalary}
                        onChange={handleinput}
                        //   disabled={disableFields}
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
                        required
                        name="designation"
                        placeholder="designation.."
                        value={emp.terminationreason}
                        onChange={handleinput}
                        //   disabled={disableFields}
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
                        //   disabled={disableFields}
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
                      <Form.Select onChange={handleinput} name="departments">
                        <option disabled selected defaultValue={""}>
                          Select department..
                        </option>
                        {dep.map((d) => {
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
                  <Col xl='4'>
                  <Form.Group
                      as={Col}
                      controlId="formGriddepartments"
                      className="formmargin"
                    >
                      <Form.Label>Employement Status</Form.Label>
                      <Form.Select onChange={handleinput} name="employementstatus" value={emp.employementstatus}>
                        <option defaultValue={""} disbaled selected hidden>Select Please</option>
                        <option>Intern</option>
                        <option>Probation</option>
                        <option>Permanent</option>
                        <option>Left</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <div className="py-3">
                    <h4>Bank Details</h4>
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
                      <Form.Label>Bank Name</Form.Label>
                      <Form.Select
                        
                        required
                        name="bankname"
                        placeholder="bank name.."
                        value={emp.bankname}
                        onChange={handleinput}
                        //   disabled={disableFields}
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
                        required
                        name="accounttitle"
                        placeholder="account title.."
                        value={emp.accounttitle}
                        onChange={handleinput}
                        //   disabled={disableFields}
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
                        required
                        name="accountno"
                        placeholder="account no.."
                        value={emp.accountno}
                        onChange={handleinput}
                        //   disabled={disableFields}
                      />
                    </Form.Group>
                  </Col>
                </Row>
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
                        required
                        name="IBAN"
                        placeholder="iban.."
                        value={emp.IBAN}
                        onChange={handleinput}
                        //  disabled={disableFields}
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
                        required
                        name="branchcode"
                        placeholder="branch code.."
                        value={emp.branchcode}
                        onChange={handleinput}
                        //  disabled={disableFields}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="my-3 d-flex justify-content-center">
                  <Button
                    type="submit"
                  >
                    Add Employee
                  </Button>
                </div> */}
                    <EmployeeData
                      // showModel={   showChildModel1     }

                      value={emp.firstname}
                      onChange={handleinput}
                      onChange1={(e) => setfile(e.target.files[0])}
                      value1={emp.lastname}
                      value2={emp.gender}
                      value3={emp.cnic}
                      value4={emp.dob}
                      value5={emp.martialStatus}
                      value6={emp.religion}
                      value7={emp.profilepic}
                      value8={emp.primaryphone}
                      value9={emp.primaryemail}
                      value10={emp.secondaryphone}
                      value11={emp.secondaryemail}
                      value12={emp.temporaryaddress}
                      value13={emp.permanentaddress}
                      value14={emp.city}
                      value15={emp.province}
                      value16={emp.postalCode}
                      value17={emp.username}
                      value18={emp.password}
                      value19={emp.joiningdate}
                      value20={emp.terminationdate}
                      value21={emp.username}
                      value22={emp.password}
                      value23={emp.currentSalary}
                      value24={emp.terminationreason}
                      value25={emp.paymentmode}
                      value26={emp.bankname}
                      value27={emp.accounttitle}
                      value28={emp.accountno}
                      value29={emp.IBAN}
                      value30={emp.branchcode}
                      value31={details.institute}
                      onChange2={handleeducationdetails}
                      value32={details.degreetitle}
                      onChange3={handleeducationdetails}
                      value33={details.start}
                      value34={details.end}
                      value35={details.status}
                      value36={empdetails.company}
                      value37={empdetails.position}
                      onChange4={handleempinput}
                      value38={empdetails.joiningdate}
                      onChange5={async (e) =>
                        await handleempinputJoiningDate(e)
                      }
                      value39={empdetails.resignationdate}
                      onChange6={async (e) =>
                        await handleempinputResignationDate(e)
                      }
                      value40={empdetails.jobdescription}
                      value41={emp.employementstatus}
                    />
                  </Form.Group>
                </Form>
              </Container>
            </Modal.Body>
          </Modal>
        </Container>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={childModel1}
          onHide={Closechildmodal1}
          // size="lg"
          // style={{width:'50%',height:'40%'}}
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
              <Row className="mb-3">
                {/* <div className="py-3">
                    <h4>Education Information</h4>
                    <hr
                      style={{
                        fontWeight: "bold",
                        borderWidth: "2px",
                        border: "1px solid black",
                      }}
                    ></hr>
                  </div> */}

                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Label>Institution</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="institute"
                      placeholder="institution.."
                      value={details.institute}
                      onChange={handleeducationdetails}
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
                    <Form.Label>Degree Title</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="degreetitle"
                      placeholder="degree.."
                      value={details.degreetitle}
                      onChange={handleeducationdetails}
                      // disabled={disableFields}
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
                    <Form.Label>Start</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      name="start"
                      value={details.start}
                      onChange={handleeducationdetails}
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
                    <Form.Label>End</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      name="end"
                      value={details.end}
                      onChange={handleeducationdetails}
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
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      required
                      name="status"
                      placeholder="status"
                      value={details.status}
                      onChange={handleeducationdetails}
                      // disabled={disableFields}
                    >
                      <option value="" selected hidden disabled>
                        Please Select
                      </option>
                      <option>Completed</option>
                      <option>In progress</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center my-3">
                <Button
                  onClick={() => {
                    addeducation();
                    Closechildmodal1();
                    showChildModel1();
                  }}
                >
                  Add Education
                </Button>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
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
                  ></hr>
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
                      value={empdetails.company}
                      // onChange={handleempinput}
                      onChange={handleinput}
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
                      value={empdetails.position}
                      onChange={handleempinput}
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
                      value={empdetails.joiningdate}
                      onChange={async (e) => await handleempinputJoiningDate(e)}
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
                      value={empdetails.resignationdate}
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
                    value={empdetails.jobdescription}
                    onChange={handleempinput}
                    // disabled={disableFields}
                  />
                </FormGroup>
              </Row>
              <div className="d-flex justify-content-center my-3">
                <Button
                  onClick={() => {
                    addhistory();
                    Closechildmodal();
                  }}
                >
                  Add Employement
                </Button>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AllEmployees;
