import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Form, Col, Row, Container, FormGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import axios from "axios";
// import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TableView from "../TableView/Table";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import ReactFlags from "react-flags-select";
import { cities } from "./cities";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
// import StepSeven from "./StepSeven";
// const useStyles = makeStyles((theme) => ({
//   button: {
//     marginRight: theme.spacing(1),
//   },
// }));
// const moment = require("moment");

// function getSteps() {
//   return [
//     "Personal Information",
//     "Address & Region",
//     "Education Information",
//     "Previous Information",
//     "Employement Details",
//     "Bank Details",
//   ];
// }

// function getStepContent({ props, activeStep, handleNext,steps }) {
//   let navigate = useNavigate();
//   const url2 = "/departments";
//   const url = "/employees";
//   const url1 = "/auth/register";
//   const [dep, setDep] = useState([]);
//   const [datas, setData] = useState();
//   // const [modalShow, setModalShow] = React.useState(false);
//   const handleClose = () => setShow(false);
//   const Closechildmodal = () => setShowChildModel(false);
//   const Closechildmodal1 = () => setShowChildModel1(false);
//   const showChildModel = () => setShowChildModel(true);
//   const showChildModel1 = () => setShowChildModel1(true);
//   const handleShow = () => setShow(true);
//   const [childModel, setShowChildModel] = useState(false);
//   const [childModel1, setShowChildModel1] = useState(false);
//   const [show, setShow] = useState(false);
//   const [birth, setbirth] = useState("");
//   const [testUpdate, setTestUpdate] = useState(false);

//   const [list, setlist] = useState(false);
//   //for profile pic
//   const [file, setfile] = useState();

// const [emp, setEmp] = useState({
//   profilepic: "",
//   firstname: "",
//   lastname: "",
//   dob: "",
//   cnic: "",
//   gender: "",
//   martialStatus: "",
//   religion: "",
//   jobtitle: "",
//   username: "",
//   primaryemail: "",
//   secondaryemail: "",
//   password: "",
//   primaryphone: "",
//   secondaryphone: "",
//   permanentaddress: "",
//   temporaryaddress: "",
//   province: "",
//   city: "",
//   postalCode: "",
//   departments: "",
//   designation: "",
//   joiningdate: "",
//   educationdetails: "",
//   employementhistory: "",

//   currentSalary: "",
//   employementstatus: "",
//   //bank information
//   bankname: "",
//   paymentmode: "",
//   accounttitle: "",
//   accountno: "",
//   IBAN: "",
//   branchcode: "",
//   country: "",
//   //degree info
// });
//   //educaion details add and remove //
//   const [education, seteducation] = useState([]);
//   const [selected, setSelected] = useState("");
//   const [country, setcountry] = useState("");
//   const [employement, setemployement] = useState([]);
//   const [empdetails, setempdetails] = useState({
//     company: "",
//     position: "",
//     joiningdate: "",
//     resignationdate: "",
//     duration: "",
//     jobdescription: "",
//   });
//   const [details, setdetails] = useState({
//     degreetitle: "",
//     institute: "",
//     start: "",
//     end: "",
//     status: "",
//   });
//   const removeitem = (i) => {
//     const temp = education;
//     temp.splice(i, 1);
//     console.log("splice", temp);
//     seteducation(temp);
//     setTestUpdate(!testUpdate);
//   };
//   const removemployement = (i) => {
//     const temp = employement;
//     employement.splice(i, 1);
//     console.log("splice", temp);
//     setemployement(temp);
//     setTestUpdate(!testUpdate);
//   };
//   const addhistory = () => {
//     var empl = employement;
//     empl.push({
//       company: empdetails.company,
//       position: empdetails.position,
//       joiningdate: empdetails.joiningdate,
//       resignationdate: empdetails.resignationdate,
//       duration: empdetails.duration,
//       jobdescription: empdetails.jobdescription,
//     });
//     console.log("emplllllllll", empl);
//     setemployement(empl);
//     setEmp({ ...emp, employementhistory: empl });
//   };

//   let name, value;
//   const handleinput = (e) => {
//     console.log(e);
//     name = e.target.name;
//     value = e.target.value;
//     setEmp({ ...emp, [name]: value });
//   };

//   const handleeducationdetails = async (e) => {
//     let name, value;

//     name = e.target.name;
//     value = e.target.value;

//     await setdetails({
//       ...details,
//       [name]: value,
//     });
//   };

//   //handle user input form data

//   const handleempinput = async (e) => {
//     let name, value;

//     name = e.target.name;
//     value = e.target.value;

//     await setempdetails({
//       ...empdetails,
//       [name]: value,
//     });
//   };

//   const addeducation = () => {
//     var temp = education;
//     temp.push({
//       degreetitle: details.degreetitle,
//       institute: details.institute,
//       start: details.start,
//       end: details.end,
//       status: details.status,
//     });
//     seteducation(temp);
//     setEmp({ ...emp, educationdetails: education });
//   };

//   const handleempinputJoiningDate = async (e) => {
//     let name, value;

//     name = e.target.name;
//     value = e.target.value;

//     console.log("change", empdetails);

//     var a = moment(empdetails.resignationdate);
//     var b = moment(e.target.value);

//     var years = a.diff(b, "year");
//     b.add(years, "years");

//     var months = a.diff(b, "months");
//     b.add(months, "months");

//     var days = a.diff(b, "days");

//     console.log(years + " years " + months + " months " + days + " days");

//     await setempdetails({
//       ...empdetails,
//       [name]: e.target.value,
//       duration: `${years}  years  ${months}  months  ${days} days`,
//     });
//   };

//   const handleempinputResignationDate = async (e) => {
//     let name, value;

//     name = e.target.name;
//     value = e.target.value;

//     var a = moment(e.target.value);
//     var b = moment(empdetails.joiningdate);

//     var years = a.diff(b, "year");
//     b.add(years, "years");

//     var months = a.diff(b, "months");
//     b.add(months, "months");

//     var days = a.diff(b, "days");

//     console.log(years + " years " + months + " months " + days + " days");

//     await setempdetails({
//       ...empdetails,
//       [name]: e.target.value,
//       duration: `${years}  years  ${months}  months  ${days} days`,
//     });
//   };
//   ///education & employement details code end;

//   //list and grid view start
//   const [view, setView] = useState(false);
//   const handleChange = (event, nextView) => {
//     setView(!view);
//     setView(nextView);
//     setView(!view);
//     // setlist(nextView)
//     console.log(nextView);
//   };
//   //   const handleChange = () => {
//   //     setlist(!list)
//   //   };
//   //submitting values of user
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       const data = new FormData();
//       const filename = Date.now() + file.name;
//       data.append("name", filename);
//       data.append("file", file);
//       emp.profilepic = filename;
//       try {
//         await axios.post("/upload", data);
//       } catch (err) {
//         console.log(err);
//         NotificationManager.error("Pic not Uploaded");
//       }
//     }

//     try {
//       const res = await axios.post(url1, emp);
//       console.log(res);
//       res && NotificationManager.success("Sucessfully Added Employee");
//       // res && window.location.replace("/employees");
//     } catch (error) {
//       console.log(error);
//       NotificationManager.error("Something went wrong ");
//     }
//   };
//   //fetching employees data
//   const fetchData = async () => {
//     try {
//       const res = await axios.get(url);
//       console.log(res.data);
//       const data = res.data.employees;
//       setData(data);
//     } catch (error) {
//       console.log(error);
//       NotificationManager.error("Api Error 404");
//     }
//   };
//   //getting Employees
//   const getEmp = async () => {
//     try {
//       const res = await axios.get(url2);
//       const datas = res.data.departments;
//       console.log("departments", datas);
//       setDep(datas);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//     getEmp();
//   }, []);
//   const PF = "http://localhost:5002/images/";
//   console.log("propss", props);
//   const step = activeStep;
//   switch (step) {
//     case 0:
//       return (
//         <>
//         <Form>
//           <div className="w-75" id="responsivewidth">
//             <Col>
//               {" "}
//               <Row>
//                 <Col xxl="6" xl="6" lg="6" md="6">
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridFirstName"
//                     className="formmargin"
//                   >
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       required
//                       name="firstname"
//                       placeholder="First Name"
//                       value={emp.firstname}
//                       // value={props.value}
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col xxl="6" xl="6" lg="6" md="6">
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridLastName"
//                     className="formmargin"
//                   >
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       required
//                       name="lastname"
//                       placeholder="Last Name"
//                       value={emp.lastname}
//                       // value={props.value1}
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xxl="6" xl="6" lg="6" md="6">
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridgender"
//                     className="formmargin"
//                   >
//                     <Form.Label>Gender</Form.Label>
//                     <Form.Select
//                       required
//                       name="gender"
//                       value={emp.gender}
//                       // value={props.value2}
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                     >
//                       <option value="" selected hidden disabled>
//                         Please Select
//                       </option>
//                       <option>Male</option>
//                       <option>Female</option>
//                       <option>Other</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col xl="6" lg="6" md="6">
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridFirstName"
//                     className="formmargin"
//                   >
//                     <Form.Label>National ID </Form.Label>
//                     <Form.Control
//                       type="number"
//                       required
//                       name="cnic"
//                       placeholder="CNIC"
//                       value={emp.cnic}
//                       // value={props.value3}
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                       //   disabled={disableFields}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xxl="6" xl="6" lg="6">
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridLastName"
//                     className="formmargin"
//                   >
//                     <Form.Label>D-0-B</Form.Label>
//                     {/* <DatePicker

//                             required
//                             selected={emp.dob}
//                             onChange={(date)=>{setEmp({...emp,dob:moment(date).format('dd/mm/yyyy')})}}
//                             // dateFormat='d MMMM, yyyy'
//                             dateFormat='dd/mm/yyyy'
//                             dropDownMode="select"
//                           /> */}
//                     <Form.Control
//                       type="date"
//                       required
//                       placeholder="dd/mm/yyyy"
//                       name="dob"
//                       value={emp.dob}
//                       // value={props.value4}
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                       //   disabled={disableFields}
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col xl="6" lg="6">
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridMartialStatus"
//                     className="formmargin"
//                   >
//                     <Form.Label>Martial Status</Form.Label>
//                     <Form.Select
//                       required
//                       name="martialStatus"
//                       placeholder="martial status.."
//                       value={emp.martialStatus}
//                       // value={props.value5}
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                       //   disabled={disableFields}
//                     >
//                       <option value="" selected hidden disabled>
//                         Please Select
//                       </option>
//                       <option>Single</option>
//                       <option>Married</option>
//                       <option>Divorced</option>
//                       <option>widow</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col xl="6" lg="6">
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridLastName"
//                     className="formmargin"
//                   >
//                     <Form.Label>Religion</Form.Label>
//                     <Form.Select
//                       required
//                       name="religion"
//                       placeholder="Religion"
//                       value={emp.religion}
//                       // value={props.value6}
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                       //   disabled={disableFields}
//                     >
//                       <option value="" selected hidden disabled>
//                         Please Select
//                       </option>
//                       <option>Islam</option>
//                       <option>Christianity</option>
//                       <option>Buddhism</option>
//                       <option> Sikhism</option>
//                       <option> Hinduism</option>
//                       <option>Bahá’í</option>
//                       <option>Confucianism</option>
//                       <option>Jainism</option>
//                       <option>Judaism</option>
//                       <option>Zoroastrianism</option>
//                       <option>Druze</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </Col>

//           </div>
//           <Button
//                     // className={classes.button}
//                     // variant="contained"
//                     // color="primary"
//                     onClick={()=>{

//                       handleNext()}}
//                     type="submit"
//                     //  onSubmit={handleSubmit}
//                   >
//                     {activeStep === steps.length - 1 ? "Finish" : "Next"}
//                   </Button>
//           </Form>
//         </>
//       );

//     case 1:
//       return (
//         <>
//           <div style={{ height: "20%" }}>
//             <Row>
//               <h5
//                 className="py-2 "
//                 style={{ fontSize: "22px", padding: "0px 19px" }}
//               >
//                 Primary
//               </h5>
//               <Col xxl="6" xl="6" lg="6" md="6">
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridphone"
//                   className="formmargin "
//                 >
//                   <Form.Label>Phone</Form.Label>
//                   <Form.Control
//                     type="number"
//                     required
//                     name="primaryphone"
//                     placeholder="phone"
//                     value={emp.primaryphone}
//                     // value={props.value8}
//                     onChange={handleinput}
//                     // onChange={props.onChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col xxl="6" xl="6" lg="6" md="6">
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridcompanyemail"
//                   className="formmargin "
//                 >
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     required
//                     name="primaryemail"
//                     placeholder="email"
//                     value={emp.primaryemail}
//                     // value={props.value9}
//                     onChange={handleinput}
//                     // onChange={props.onChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <h5
//                 className="py-2 "
//                 style={{ fontSize: "22px", padding: "0px 19px" }}
//               >
//                 Secondary
//               </h5>
//               <Col xxl="6" xl="6" lg="6" md="6">
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridcompanyemail"
//                   className="formmargin "
//                 >
//                   <Form.Label>Phone</Form.Label>
//                   <Form.Control
//                     type="number"
//                     required
//                     name="secondaryphone"
//                     placeholder="secondary phone"
//                     value={emp.secondaryphone}
//                     // value={props.value10}
//                     onChange={handleinput}
//                     // onChange={props.onChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col xxl="6" xl="6" lg="6" md="6">
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridcompanyemail"
//                   className="formmargin "
//                 >
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     required
//                     name="secondaryemail"
//                     placeholder="secondary Email"
//                     value={emp.secondaryemail}
//                     // value={props.value11}
//                     onChange={handleinput}
//                     // onChange={props.onChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </div>
//         </>
//       );
//     case 2:
//       return (
//         <>
//           <div style={{ height: "20%" }}>
//             <Col lg={12}>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridFirstName"
//                 className="formmargin"
//               >
//                 <Form.Label>Temporary Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   name="temporaryaddress"
//                   placeholder="complete address"
//                   value={emp.temporaryaddress}
//                   // value={props.value12}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>

//             <Col lg={12}>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridFirstName"
//                 className="formmargin"
//               >
//                 <Form.Label>Permanent Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   name="permanentaddress"
//                   placeholder="complete address"
//                   value={emp.permanentaddress}
//                   // value={props.value13}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>
//             {/* </Row> */}
//             <div style={{ marginLeft: "0.75%" }}>
//               <Row>
//                 <Col>
//                   <Form.Label style={{ marginLeft: "2%" }}>City</Form.Label>
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridLastName"
//                     className="formmargin"
//                   >
//                     <Form.Select
//                       required
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                       name="city"
//                       value={emp.city}
//                       // value={props.value14}
//                     >
//                       <option value="" selected hidden disabled>
//                         Select City
//                       </option>
//                       <option>Lahore</option>
//                       <option>Karachi</option>
//                       <option>Faisalabad</option>
//                       <option>Peshawar</option>
//                       <option>Islamabad</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Label>Province</Form.Label>
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridLastName"
//                     className="formmargin"
//                   >
//                     <Form.Select
//                       required
//                       name="province"
//                       placeholder="province"
//                       value={emp.province}
//                       // value={props.value15}
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                       //   disabled={disableFields}
//                     >
//                       <option value="" selected hidden disabled>
//                         Select Province
//                       </option>
//                       <option>Punjab</option>
//                       <option>Sindh</option>
//                       <option>KPK</option>
//                       <option>Gilgit Baltistan</option>
//                       <option>Islamabad(Capital Territory)</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Label>Country</Form.Label>
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridLastName"
//                     className="formmargin"
//                   >
//                     <ReactFlags
//                       countries={["PK"]}
//                       selected={selected}
//                       onSelect={(code) => {
//                         setSelected(code);
//                         code === "PK" && setcountry("Pakistan");
//                         setEmp({ ...emp, country: "Pakistan" });
//                       }}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col lg={4} xl={4}>
//                   <Form.Group
//                     as={Col}
//                     controlId="formGridLastName"
//                     className="formmargin"
//                   >
//                     <Form.Label>Postal Code</Form.Label>
//                     <Form.Control
//                       type="text"
//                       required
//                       name="postalCode"
//                       placeholder="postal code"
//                       value={emp.postalCode}
//                       // value={props.value16}
//                       onChange={handleinput}
//                       // onChange={props.onChange}
//                       //   disabled={disableFields}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </div>
//           </div>
//         </>
//       );
//     case 3:
//       return (
//         <>
//           <div style={{ width: "auto", marginRight: "2%", height: "20%" }}>
//             <Row>
//               <Container>
//                 <Row className="my-3"></Row>
//               </Container>
//               <div className="my-3 d-flex ">
//                 <div className="d-flex justify-content-end">
//                   <Button
//                     className="btn ml-2"
//                     // onClick={()=>{props.onClick}}
//                     onClick={() => {
//                       setShowChildModel(true);
//                     }}
//                   >
//                     Add Employement
//                   </Button>
//                 </div>
//               </div>

//               <Row className="my-3">
//                 <Table striped bordered hover className="ml-4">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th style={{ textAlign: "center" }}>Company</th>
//                       <th style={{ textAlign: "center" }}>Position</th>
//                       <th style={{ textAlign: "center" }}>Start Date</th>
//                       <th style={{ textAlign: "center" }}>Left Date</th>
//                       <th style={{ textAlign: "center" }}>Duration</th>
//                       <th style={{ textAlign: "center" }}>Remove</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {employement &&
//                       employement.map((d, i) => {
//                         return (
//                           <>
//                             <tr key={i}>
//                               <th>{i + 1}</th>
//                               <td>{d.company}</td>
//                               <td>{d.position}</td>
//                               <td>{d.joiningdate}</td>
//                               <td>{d.resignationdate}</td>
//                               <td>{d.duration}</td>
//                               <td>
//                                 <i
//                                   class="fa fa-trash-can"
//                                   aria-hidden="true"
//                                   style={{ color: "red" }}
//                                   onClick={() => removemployement(i)}
//                                 ></i>
//                               </td>
//                             </tr>
//                           </>
//                         );
//                       })}
//                     {/* {props.employement} */}
//                   </tbody>
//                 </Table>
//               </Row>
//             </Row>
//           </div>
//           <Modal
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             show={childModel}
//             onHide={Closechildmodal}
//             size="lg"
//           >
//             <Modal.Header closeButton>
//               <Modal.Title
//                 id="contained-modal-title-vcenter "
//                 style={{ textAlign: "center" }}
//               >
//                 <h5>Employement Details</h5>
//               </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Container fluid>
//                 <Row>
//                   <div className="py-3">
//                     <h4>Previous Employment</h4>
//                     <hr
//                       style={{
//                         fontWeight: "bold",
//                         borderWidth: "2px",
//                         border: "1px solid black",
//                       }}
//                     ></hr>
//                   </div>

//                   <Col>
//                     <Form.Group
//                       as={Col}
//                       controlId="formGridempcompany"
//                       className="formmargin"
//                     >
//                       <Form.Label>Company</Form.Label>
//                       <Form.Control
//                         type="text"
//                         required
//                         name="company"
//                         placeholder="company name.."
//                         value={empdetails.company}
//                         // onChange={handleempinput}
//                         onChange={handleempinput}
//                         // disabled={disableFields}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group
//                       as={Col}
//                       controlId="formGridLastName"
//                       className="formmargin"
//                     >
//                       <Form.Label>Position</Form.Label>
//                       <Form.Control
//                         type="text"
//                         required
//                         name="position"
//                         placeholder="position.."
//                         value={empdetails.position}
//                         onChange={handleempinput}
//                         // disabled={disableFields}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                     <Form.Group
//                       as={Col}
//                       controlId="formGridFirstName"
//                       className="formmargin"
//                     >
//                       <Form.Label>Joining Date</Form.Label>
//                       <Form.Control
//                         type="date"
//                         required
//                         name="joiningdate"
//                         placeholder="joining date"
//                         value={empdetails.joiningdate}
//                         onChange={async (e) =>
//                           await handleempinputJoiningDate(e)
//                         }
//                         // disabled={disableFields}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group
//                       as={Col}
//                       controlId="formGridFirstName"
//                       className="formmargin"
//                     >
//                       <Form.Label>Resignation Date</Form.Label>
//                       <Form.Control
//                         type="date"
//                         required
//                         name="resignationdate"
//                         placeholder="resignation date"
//                         value={empdetails.resignationdate}
//                         onChange={async (e) =>
//                           await handleempinputResignationDate(e)
//                         }
//                         // disabled={disableFields}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Form.Label>Job Description</Form.Label>
//                   <FormGroup
//                     as={Col}
//                     controlId="formGridFirstName"
//                     className="formmargin"
//                   >
//                     <Form.Control
//                       as="textarea"
//                       rows={"3"}
//                       style={{ resize: "none" }}
//                       required
//                       name="jobdescription"
//                       placeholder="Tell us about your job role & experience in previous company "
//                       value={empdetails.jobdescription}
//                       onChange={handleempinput}
//                       // disabled={disableFields}
//                     />
//                   </FormGroup>
//                 </Row>
//                 <div className="d-flex justify-content-center my-3">
//                   <Button
//                     className="btn ml-2"
//                     onClick={() => {
//                       addhistory();
//                       Closechildmodal();
//                     }}
//                   >
//                     Add Employement
//                   </Button>
//                 </div>
//               </Container>
//             </Modal.Body>
//           </Modal>
//         </>
//       );
//     case 4: {
//       return (
//         <div style={{ height: "20%" }}>
//           <Row>
//             <Col>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridLastName"
//                 className="formmargin"
//               >
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   name="username"
//                   placeholder="username"
//                   value={emp.username}
//                   // value={props.value21}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridLastName"
//                 className="formmargin"
//               >
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   required
//                   name="password"
//                   placeholder="password"
//                   value={emp.password}
//                   // value={props.value22}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridFirstName"
//                 className="formmargin"
//               >
//                 <Form.Label>Joining Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   required
//                   name="joiningdate"
//                   placeholder="joining date"
//                   value={emp.joiningdate}
//                   // value={props.value19}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridLastName"
//                 className="formmargin"
//               >
//                 <Form.Label>Salary</Form.Label>
//                 <Form.Control
//                   type="Number"
//                   required
//                   name="currentSalary"
//                   placeholder="salary"
//                   value={emp.currentSalary}
//                   // value={props.value23}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridLastName"
//                 className="formmargin"
//               >
//                 <Form.Label>Designation</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   name="designation"
//                   placeholder="designation.."
//                   value={emp.terminationreason}
//                   // value={props.value20}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridFirstName"
//                 className="formmargin"
//               >
//                 <Form.Label>Payment Mode</Form.Label>
//                 <Form.Select
//                   required
//                   name="paymentmode"
//                   value={emp.paymentmode}
//                   // value={props.value25}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 >
//                   <option value="" selected hidden disabled>
//                     Please Select
//                   </option>
//                   <option>Cheque</option>
//                   <option>Cash</option>
//                   <option>Bank Transfer</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col lg={4}>
//               <Form.Group
//                 as={Col}
//                 controlId="formGriddepartments"
//                 className="formmargin"
//               >
//                 <Form.Label>Department</Form.Label>
//                 <Form.Select name="departments">
//                   onChange={handleinput}
//                   {/* onChange={props.onChange} */}
//                   <option disabled selected defaultValue={""}>
//                     Select department..
//                   </option>
//                   {dep.map((d) => {
//                     return (
//                       <>
//                         <option key={d._id} value={d._id}>
//                           {d.departmentname}
//                         </option>
//                       </>
//                     );
//                   })}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col xl="4">
//               <Form.Group
//                 as={Col}
//                 controlId="formGriddepartments"
//                 className="formmargin"
//               >
//                 <Form.Label>Employement Status</Form.Label>
//                 <Form.Select
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   name="employementstatus"
//                   value={emp.employementstatus}
//                   // value={props.value41}
//                 >
//                   <option defaultValue={""} disbaled selected hidden>
//                     Select Please
//                   </option>
//                   <option>Intern</option>
//                   <option>Probation</option>
//                   <option>Permanent</option>
//                   <option>Left</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>
//         </div>
//       );
//     }
//     case 5: {
//       return (
//         <div style={{ height: "20%" }}>
//           <Row>
//             <Col>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridLastName"
//                 className="formmargin"
//               >
//                 <Form.Label>Bank Name</Form.Label>
//                 <Form.Select
//                   required
//                   name="bankname"
//                   placeholder="bank name.."
//                   value={emp.bankname}
//                   onChange={handleinput}
//                   //   disabled={disableFields}
//                 >
//                   <option>Please Select</option>
//                   <option>MCB Limited</option>
//                   <option>Bank Islami Limited</option>
//                   <option>Allied Bank Limited</option>
//                   <option>Bank Al-Habib Limited</option>
//                   <option>Faysal Bank Limited</option>
//                   <option>Mezaan Bank Limited</option>
//                   <option>National Bank of Pakistan</option>
//                   <option>MCB Islamic Limited</option>
//                   <option>HBL</option>
//                   <option>UBL</option>
//                   <option>Askari Bank </option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridLastName"
//                 className="formmargin"
//               >
//                 <Form.Label>Account Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   name="accounttitle"
//                   placeholder="account title.."
//                   value={emp.accounttitle}
//                   // value={props.value27}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridLastName"
//                 className="formmargin"
//               >
//                 <Form.Label>Account No</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   name="accountno"
//                   placeholder="account no.."
//                   value={emp.accountno}
//                   // value={props.value28}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //   disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="p-0">
//             <Col xxl={4}>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridLastName"
//                 className="formmargin"
//               >
//                 <Form.Label> IBAN</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   name="IBAN"
//                   placeholder="iban.."
//                   value={emp.IBAN}
//                   // value={props.value29}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //  disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>

//             <Col xxl={4}>
//               <Form.Group
//                 as={Col}
//                 controlId="formGridLastName"
//                 className="formmargin"
//               >
//                 <Form.Label>Branch code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   name="branchcode"
//                   placeholder="branch code.."
//                   value={emp.branchcode}
//                   // value={props.value30}
//                   onChange={handleinput}
//                   // onChange={props.onChange}
//                   //  disabled={disableFields}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//         </div>
//       );
//     }
//     default:
//       return "unknown step";
//   }
// }

// const EmployeeData = (props) => {
//   console.log("props1", props);
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = useState(0);
//   const [skippedSteps, setSkippedSteps] = useState([]);
//   const steps = getSteps();

//   const isStepOptional = (step) => {
//     return step === 1 || step === 2;
//   };

//   const isStepSkipped = (step) => {
//     return skippedSteps.includes(step);
//   };

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//     setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepSkipped(activeStep)) {
//       setSkippedSteps([...skippedSteps, activeStep]);
//     }
//     setActiveStep(activeStep + 1);
//   };

//   return (
//     <div className="content-wrapper ">
//       <div className="col">
//         <h3 className="page-title">Add Employees</h3>
//         <ul className="breadcrumb" style={{ backgroundColor: "#f7f7f7" }}>
//           <li className="breadcrumb-item">
//             <Link to="/" style={{ color: "#1f1f1f" }}>
//               Dashboard
//             </Link>
//           </li>
//           <li className="breadcrumb-item active">Add Employee</li>
//         </ul>
//       </div>
//       <div
//         className=" d-flex justify-content-center "
//         style={{ marginTop: "5%" }}
//       >
//         <Card>
//           <div style={{ height: "40%", width: "auto" }}>
//             <Card.Body>
//               <div style={{ width: "auto" }}>
//                 <Stepper alternativeLabel activeStep={activeStep}>
//                   {steps.map((step, index) => {
//                     const labelProps = {};
//                     const stepProps = {};
//                     // if (isStepOptional(index)) {
//                     //   labelProps.optional = (
//                     //     <Typography
//                     //       variant="caption"
//                     //       align="center"
//                     //       style={{ display: "block" }}
//                     //     >
//                     //       optional
//                     //     </Typography>
//                     //   );
//                     // }
//                     if (isStepSkipped(index)) {
//                       stepProps.completed = false;
//                     }
//                     return (
//                       <Step {...stepProps} key={index}>
//                         <StepLabel {...labelProps}>{step}</StepLabel>
//                       </Step>
//                     );
//                   })}
//                 </Stepper>
//               </div>
//               {activeStep === steps.length ? (
//                 <Typography variant="h3" align="center">
//                   Thank You
//                 </Typography>
//               ) : (
//                 <>
//                   <form>{getStepContent({ props, activeStep,handleNext, steps  })}</form>
//                   <Button
//                     className={classes.button}
//                     disabled={activeStep === 0}
//                     onClick={handleBack}
//                   >
//                     back
//                   </Button>
//                   {/* {isStepOptional(activeStep) && (
//                 <Button
//                   className={classes.button}
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSkip}
//                 >
//                   skip
//                 </Button>
//               )} */}
//                   {/* <Button
//                     className={classes.button}
//                     variant="contained"
//                     color="primary"
//                     onClick={handleNext}
//                     type="submit"
//                     //  onSubmit={handleSubmit}
//                   >
//                     {activeStep === steps.length - 1 ? "Finish" : "Next"}
//                   </Button> */}
//                 </>
//               )}
//             </Card.Body>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };
// export default EmployeeData;
function EmployeeData() {
  const [step, setstep] = useState(1);
  // const [employement, setemployement] = useState([]);
  // const [emp, setEmp] = useState({
  //    profilepic: "",
  //   firstname: "",
  //   lastname: "",
  //   dob: "",
  //   cnic: "",
  //   gender: "",
  //   martialStatus: "",
  //   religion: "",
  //   jobtitle: "",
  //   username: "",
  //   primaryemail: "",
  //   secondaryemail: "",
  //   password: "",
  //   primaryphone: "",
  //   secondaryphone: "",
  //   permanentaddress: "",
  //   temporaryaddress: "",
  //   province: "",
  //   city: "",
  //   postalCode: "",
  //   departments: "",
  //   designation: "",
  //   joiningdate: "",
  //   educationdetails: "",
  //   employementhistory: "",

  //   currentSalary: "",
  //   employementstatus: "",
  //   //bank information
  //   bankname: "",
  //   paymentmode: "",
  //   accounttitle: "",
  //   accountno: "",
  //   IBAN: "",
  //   branchcode: "",
  //   country: "",
  //   //degree info

  // });

  //state for form data
  const [formData, setFormData] = useState({
    profilepic: "",
    firstName: "",
    lastName: "",
    // age: "",
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
    // company:"",
    // position:"",
    // joiningdate:"",
    // resignationdate:"",
    // jobdescription:"",
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
  // const url1 = "/auth/register";
  // const handleSubmit = async () => {
  //       // e.preventDefault();
  //       // if (file) {
  //       //   const data = new FormData();
  //       //   const filename = Date.now() + file.name;
  //       //   data.append("name", filename);
  //       //   data.append("file", file);
  //       //   emp.profilepic = filename;
  //       //   try {
  //       //     await axios.post("/upload", data);
  //       //   } catch (err) {
  //       //     console.log(err);
  //       //     NotificationManager.error("Pic not Uploaded");
  //       //   }
  //       // }

  //       try {
  //         const res = await axios.post(url1, emp);
  //         console.log(res);
  //         res && NotificationManager.success("Sucessfully Added Employee");
  //         // res && window.location.replace("/employees");
  //       } catch (error) {
  //         console.log(error);
  //         NotificationManager.error("Something went wrong ");
  //       }
  //     };
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
