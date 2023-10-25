import React from "react";
import { useContext } from "react";
import Select from 'react-select';
import { Context } from "../../../Context/Context";
import pp from "../All Employees/avatar.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Modal, Form, Button, InputGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "./card.css";
import Table from "react-bootstrap/Table";
import HeaderContext from "../../../Context/HeaderContext"
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Accordion from "react-bootstrap/Accordion";
const moment = require("moment");


const Cards = ({ data }) => {
  
  const [empID, setEmpID] = useState();
  const [firstname, setfirstname] = useState(data.firstname);
  const [lastname, setlastname] = useState(data.lastname);
  const [email, setemail] = useState(data.setemail);
  const [designation, setDesignation] = useState(data.designation);
  const [supervisors, setsupervisors] = useState(data.supervisors);
  const [work_shift, setWork_shift] = useState([]);
  const [disableFields, setDisableFields] = useState(true);
  const [empl, setEmpl] = useState([])
  const [shift, setShift] = useState([]);
  const [payrollsetup, setPayrollsetup] = useState([]);
  const [workshift, setWorkShift] = useState([]);
  const [childModel, setShowChildModel] = useState(false);
  const [childModel1, setShowChildModel1] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPayrollSetupModal, setShowPayrollSetupModal] = useState(false);
  const [showWorkshiftSetupModal, setShowWorkshiftSetupModal] = useState(false);
  const [testUpdate, setTestUpdate] = useState(false);
  const [leaves, setLeaves] = useState(false)
  const [leavesData, setLeavesData] = useState([]);
  const { user } = useContext(Context);
  const [show, setShow] = useState(false);
  const [education, seteducation] = useState([]);
  const [employement, setemployement] = useState([]);
  const [company, setCompany] = useState();
  // const [designation, setDesignation] = useState([]);
  const [addPayrollSetup, setAddPayrollSetup] = useState({
    payrollSetup: "",
    dateFrom: "",
    dateTo: ""
  })
  const [addWorkShift, setAddWorkShift] = useState({
    workShift: "",
    dateFrom: "",
    dateTo: ""
  })
  const Closechildmodal = () => setShowChildModel(false);
  const Closechildmodal1 = () => setShowChildModel1(false);
  const handleCloseModal = () => setShow(false);

  const url3 = "shifts/allShifts"
  const getUrl = "leaverequest/all/";

  const [emp, setEmp] = useState({
    profilepic: data.profilepic,
    firstname: data.firstname,
    lastname: data.lastname,
    dob: data.dob,
    cnic: data.cnic,
    gender: data.gender,
    maritalStatus: data.maritalStatus,
    religion: data.religion,
    jobtitle: data.jobtitle,
    username: data.username,
    primaryemail: data.primaryemail,
    secondaryemail: data.secondaryemail,
    phone_no: data.phone_no,
    secondaryphone: data.secondaryphone,
    address: data.address,
    permanentaddress: data.permanentaddress,
    primaryAddress: data.primaryAddress,
    province: data.province,
    city: data.city,
    postalCode: data.postalCode,
    departments: data.departments,
    designation: data.designation,
    joiningdate: data.joiningdate,
    educationdetails: data.educationdetails,
    employementhistory: data.employementhistory,
    currentSalary: data.currentSalary,
    employementstatus: data.employeementstatus,
    payroll_setup: data.payroll_setup,
    bankname: data.bankname,
    paymentmode: data.paymentmode,
    accounttitle: data.accounttitle,
    accountno: data.accountno,
    IBAN: data.IBAN,
    branchcode: data.branchcode,
    country: data.country,
    date_of_resignation: data.date_of_resignation,
    work_shift: data.work_shift,
    company: data.company,
    supervisors: data.supervisors
  });


  useEffect(() => {
    setEmp({
      profilepic: data.profilepic,
      firstname: data.firstname,
      lastname: data.lastname,
      dob: data.dob,
      cnic: data.cnic,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      religion: data.religion,
      jobtitle: data.jobtitle,
      username: data.username,
      primaryemail: data.primaryemail,
      secondaryemail: data.secondaryemail,
      phone_no: data.phone_no,
      secondaryphone: data.secondaryphone,
      address: data.address,
      permanentaddress: data.permanentaddress,
      primaryAddress: data.primaryAddress,
      province: data.province,
      city: data.city,
      postalCode: data.postalCode,
      departments: data.departments,
      designation: data.designation,
      joiningdate: data.joiningdate,
      educationdetails: data.educationdetails,
      employementhistory: data.employementhistory,
      currentSalary: data.currentSalary,
      employementstatus: data.employeementstatus,
      supervisors: data.supervisors,
      payroll_setup: data.payroll_setup,
      //bank information
      bankname: data.bankname,
      paymentmode: data.paymentmode,
      accounttitle: data.accounttitle,
      accountno: data.accountno,
      IBAN: data.IBAN,
      branchcode: data.branchcode,
      country: data.country,
      leaves: data.leaves,
      date_of_resignation: data.date_of_resignation,
      work_shift: data.work_shift,
      company: data.company,
    });
    setemployement(data.employementhistory);
    seteducation(data.educationdetails);
    setLeaves(data.leaves)
  }, [data]);

  useEffect(() => {
    axios.get(process.env.React_APP_ORIGIN_URL + url3).then(resp => {
      setShift(resp.data)
    }, [1, 1]);

    axios.get(process.env.React_APP_ORIGIN_URL + "payrollsetup/").then(resp => {
      setPayrollsetup(resp.data)
    }, [1, 1]);


    axios.get(process.env.React_APP_ORIGIN_URL + "shifts/allShifts/").then(resp => {
      setWorkShift(resp.data)
    }, [1, 1]);


    axios.get(process.env.React_APP_ORIGIN_URL + `allCompany`).then(resp => {
      setCompany(resp.data)
    }, [1, 1]);


    let localstoragevalue = JSON.parse(localStorage.getItem("user"));
    for (let i in localstoragevalue) {
      if (i == "id") {
        let userid = localstoragevalue[i]
      }
    }
    getLeavesrequests();
    fetchData();
    DesignationData();
  }, []);

  const DesignationData = async () => {
    try {
        const des = await axios.get(process.env.React_APP_ORIGIN_URL + "designation");
        const res = des.data
        console.log("res",res.designation)
        setDesignation(res.designation);
    } catch (error) {
        console.log(error);
    }
};

  const handleinput = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setEmp({ ...emp, [name]: value });

  };

  const handleShow = () => {
    setShow(true);
  };

  const handleupdateform = {
    userId: data._id,
    firstname,
    lastname,
    email,
    designation,
    supervisors,
    work_shift,
  };

  const getLeavesrequests = async () => {
    var getLeaves = [];
    {
      if (user.isAdmin) {
        getLeaves = await axios.get(process.env.React_APP_ORIGIN_URL + `${getUrl}${user.id}`);
      } else {
        getLeaves = await axios.get(process.env.React_APP_ORIGIN_URL + `leaverequest/allForHR`);
      }
    }
    const data = getLeaves.data;
    setLeavesData(data.allRequest);
  };

  const newArray = [];
  leavesData.map((d) => {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(d.from); // 29th of Feb at noon your timezone
    var secondDate = new Date(d.to);
    var diffDays = Math.round(
      Math.abs((secondDate.getTime() - firstDate.getTime()) / oneDay) + 1
    );

    newArray.push({
      id: d._id,
      Emp_id: d.employee && d.employee.emp_id,
      leavetype: d.leaveType,
      employeename: d.employee && d.employee.firstname,
      department: d.employee && d.employee.departments.map((d) => d.departmentname),
      from: new Date(d.from).toDateString(),
      to: new Date(d.to).toDateString(),
      reason: d.reason,
      totaldays: diffDays,
      status: d.status,
      designation: d.employee && d.employee.designation,
      supervisorApproval: d.employee && d.supervisorApproval,
      attachment: d.attachment,
      applicationdate: d.applicationdate,
      leaves: d.employee && d.employee.Leaves.map((d) => d),
      work_shift: d.employee && d.employee.work_shift,
      payroll_setup: d.employee && d.employee.payroll_setup,
      joiningdate: d.employee && d.employee.joiningdate,
      company: d.employee && d.employee.company
    });
  });


  var demo = handleupdateform.userId
  const handleSubmit = async (e) => {
    const url = `${data._id}`;
    try {
      const updateUser = await axios
        .put(process.env.React_APP_ORIGIN_URL + "employees/" + url, {
          profilepic: emp.profilepic,
          firstname: emp.firstname,
          lastname: emp.lastname,
          dob: emp.dob,
          cnic: emp.cnic,
          gender: emp.gender,
          maritalStatus: emp.maritalStatus,
          religion: emp.religion,
          jobtitle: emp.jobtitle,
          username: emp.username,
          primaryemail: emp.primaryemail,
          secondaryemail: emp.secondaryemail,
          phone_no: emp.phone_no,
          address: emp.address,
          secondaryphone: emp.secondaryphone,
          permanentaddress: emp.permanentaddress,
          primaryAddress: emp.primaryAddress,
          province: emp.province,
          city: emp.city,
          currentSalary: emp.currentSalary,
          postalCode: emp.postalCode,
          departments: emp.departments,
          designation: emp.designation,
          joiningdate: emp.joiningdate,
          educationdetails: emp.educationdetails,
          employementhistory: emp.employementhistory,
          currentSalary: emp.currentSalary,
          employementstatus: emp.employementstatus,
          supervisors: emp.supervisors,
          //bank information
          bankname: emp.bankname,
          paymentmode: emp.paymentmode,
          accounttitle: emp.accounttitle,
          accountno: emp.accountno,
          IBAN: emp.IBAN,
          branchcode: emp.branchcode,
          country: emp.country,
          leaves: data.leaves,
          date_of_resignation: emp.date_of_resignation,
          work_shift: emp.work_shift,
          payroll_setup: emp.payroll_setup,
          company: emp.company
        })
        .then((user) => {
          data.firstname = user.data.updateData.firstname;
          data.lastname = user.data.updateData.lastname;
          data.dob = user.data.updateData.dob;
          data.cnic = user.data.updateData.cnic;
          data.salary = user.data.updateData.salary;
          data.primaryemail = user.data.updateData.primaryemail;
          data.primaryphone = user.data.updateData.primaryphone;
          data.secondaryemail = user.data.updateData.secondaryemail;
          data.secondaryphone = user.data.updateData.secondaryphone;
          data.maritalStatus = user.data.updateData.maritalStatus;
          data.designation = user.data.updateData.designation;
          data.supervisors = user.data.updateData.supervisors;
          data.currentSalary = user.data.updateData.currentSalary;
          data.IBAN = user.data.updateData.IBAN;
          data.address = user.data.updateData.address;
          data.primaryAddress = user.data.updateData.primaryAddress;
          data.secondaryaddress = user.data.updateData.secondaryaddress;
          data.bankname = user.data.updateData.bankname;
          data.bankbranchno = user.data.updateData.bankbranchno;
          data.country = user.data.updateData.country;
          data.date_of_resignation = user.data.updateData.date_of_resignation
          data.joiningdate = user.data.updateData.joiningdate
          data.work_shift = user.data.updateData.work_shift
          data.payroll_setup = user.data.updateData.payroll_setup
          data.company = user.data.updateData.company
        });

      updateUser && NotificationManager.success("Successfully Updated");
      handleCloseModal();

    } catch (error) {
      NotificationManager.error("Failed to update");
    }
  };


  const departmentemployees = async () => {
    try {
      const getdep = await axios
        .get(process.env.React_APP_ORIGIN_URL + "employeesofdepartments", {
          params: {
            departments: data.departments.map((d) => d._id),
          },
        })
        .then((d) => {
          console.log("employee", getdep.data)
        });
    } catch (error) {
    }
  };

  useEffect(() => {
    departmentemployees();
    axios.get(process.env.React_APP_ORIGIN_URL + `employees/${data._id}`)
      .then(response => {
        setEmpID(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [data]);

  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Employee")
  })

  const myshift = emp.work_shift
  const [empdetails, setempdetails] = useState({
    company: "",
    position: "",
    joiningdate: "",
    resignationdate: "",
    duration: "",
    jobdescription: "",
    supervisors: "",
  });

  const [details, setdetails] = useState({
    degreetitle: "",
    institute: "",
    start: "",
    end: "",
    status: "",
  });

  const [addressInput, setAddressInput] = useState({
    address: "",
    city: "",
    province: "",
    country: ""
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
      supervisors: empdetails.supervisors,
      position: empdetails.position,
      joiningdate: empdetails.joiningdate,
      resignationdate: empdetails.resignationdate,
      duration: empdetails.duration,
      jobdescription: empdetails.jobdescription,
    });
    setemployement(empl);
    setEmp({ ...emp, employementhistory: empl });
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

  const handleempinput = async (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    await setempdetails({
      ...empdetails,
      [name]: value,
    });
  };

  const handleChangeAddressInput = async (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    await setAddressInput({
      ...addressInput,
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
  }

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

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.React_APP_ORIGIN_URL + "employees");
      const data = res.data.employees;
      setEmpl(data);
    } catch (error) {

    }
  };

  return (
    <>
      <NotificationContainer />
      {user.isAdmin &&
        <div className="d-flex">
          <div style={{ marginLeft: "59vw", marginRight: 10 }}>
            <Button
              onClick={() => {
                setDisableFields(false);
              }}
              style={{ backgroundColor: "rgb(137, 179, 83)" }}
            >
              Edit
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                handleSubmit();
                setDisableFields(true);
                Closechildmodal();
              }}
              style={{ backgroundColor: "rgb(137, 179, 83)" }}
            >
              Save
            </Button>
          </div>
        </div>
      }
      <div style={{ height: "auto" }}>
        <Accordion
          defaultActiveKey="0"
          style={{ color: "grey", marginTop: "2%" }}
        >
          <div className="container" style={{ display: "flex" }}>
            <Container fluid>
              <Accordion.Item eventKey="0">
                <Row>
                  <Accordion.Header style={{ color: "grey" }}>
                    <h5 style={{ color: "rgb(0,105,92)" }}>
                      Employee Information
                    </h5>
                  </Accordion.Header>

                  <Accordion.Body>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Col sm={4}>
                        <div className="d-flex justify-content-center">
                          {emp.profilepic ? (
                            <img
                              src={emp.profilepic}
                              alt="Admin"
                              className="rounded-circle"
                              width={150}
                            />
                          ) : (
                            <img
                              src={pp}
                              alt="Admin"
                              className="rounded-circle"
                              width={150}
                            />
                          )}
                        </div>
                      </Col>
                    </div>
                    <div style={{ marginTop: "2%" }}>
                      <Row>
                        <Col>
                          <Form.Group
                            as={Col}
                            controlId="formGridFirstName"
                            className="formmargin"
                          >
                            <Form.Label className="formLabel">First Name</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              name="firstname"
                              placeholder="First Name"
                              value={emp.firstname}
                              onChange={handleinput}
                              disabled={disableFields}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
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
                              disabled={disableFields}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            as={Col}
                            controlId="formGridLastName"
                            className="formmargin"
                          >
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                              required
                              name="gender"
                              placeholder="gender"
                              value={emp.gender}
                              onChange={handleinput}
                              disabled={disableFields}
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
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            as={Col}
                            controlId="formGridFirstName"
                            className="formmargin"
                          >
                            <Form.Label>National ID </Form.Label>
                            <Form.Control
                              type="text"
                              required
                              name="cnic"
                              value={emp.cnic}
                              onChange={handleinput}
                              disabled={disableFields}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            as={Col}
                            controlId="formGridLastName"
                            className="formmargin"
                          >
                            <Form.Label>D-0-B</Form.Label>
                            <Form.Control
                              type="date"
                              name="dob"
                              required
                              value={emp.dob && emp.dob.split("T")[0]}
                              onChange={handleinput}
                              disabled={disableFields}
                            />
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group
                            as={Col}
                            controlId="formGridLastName"
                            className="formmargin"
                          >
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Select
                              required
                              name="maritalStatus"
                              value={emp.maritalStatus}
                              onChange={handleinput}
                              disabled={disableFields}
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
                      </Row>
                      <Row sm={8}>

                        <Col lg={4} xl={4}>
                          <Form.Group
                            as={Col}
                            controlId="formGridLastName"
                            className="formmargin"
                          >
                            <Form.Label>Designation</Form.Label>
                            {/* <Form.Control
                              type="text"
                              required
                              name="designation"
                              placeholder="designation.."
                              value={emp.designation}
                              onChange={handleinput}
                              disabled={disableFields}
                            /> */}
                             <Form.Select
                              name="designation"
                              value={emp.designation && emp.designation.title}
                              onChange={handleinput}
                              disabled={disableFields}
                            >
                              <option disabled selected hidden defaultValue={""}>{emp.designation && emp.designation.title}</option>
                              {designation && designation.map((d) => {
                                return (
                                  <option
                                    key={d._id}
                                    value={d._id}
                                  >
                                    {d.title}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group
                            as={Col}
                            controlId="formGridLastName"
                            className="formmargin"
                          >
                            <Form.Label>Employee ID</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              name="EmpID"
                              placeholder="Employee ID"
                              value={empID && empID.emp_id}
                              disabled={disableFields}
                            />
                          </Form.Group>
                        </Col>

                        <Col sm={4}>
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
                              disabled={disableFields}
                            >
                              <option value="" selected hidden disabled>
                                Please Select
                              </option>
                              <option>Islam</option>
                              <option>Christianity</option>
                              <option>Buddhism</option>
                              <option>Sikhism</option>
                              <option>Hinduism</option>
                              <option>Baháí</option>
                              <option>Confucianism</option>
                              <option>Jainism</option>
                              <option>Judaism</option>
                              <option>Zoroastrianism</option>
                              <option>Druze</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        {/* DAte of resignation */}
                        <Col sm={4}>
                          <Form.Group
                            as={Col}
                            controlId="formGridLastName"
                            className="formmargin"
                          >
                            <Form.Label>Date of Resignation</Form.Label>
                            <Form.Control
                              type="date"
                              name="date_of_resignation"
                              value={emp.date_of_resignation && emp.date_of_resignation.split("T")[0]}
                              disabled={disableFields}
                              onChange={handleinput}
                            />
                          </Form.Group>
                        </Col>

                        {/* <Col lg={4}>
                            <Form.Group
                              as={Col}
                              controlId="formGriddepartments"
                              className="formmargin"
                            >
                              <Form.Label>Work Shift</Form.Label>
                              <Form.Select name="work_shift"
                                defaultValueValue={myshift && myshift.shift_name}
                                onChange={handleinput}
                                disabled={disableFields}
                              >
                                <option disabled selected value={""}>
                                  {myshift && myshift.shift_name}
                                </option>
                                {shift && shift.map((d, i) => {

                                  return (
                                    <>
                                      <option key={d._id} value={d._id}>
                                        {d.shift_name}
                                      </option>
                                    </>
                                  );
                                })}
                              </Form.Select>
                            </Form.Group>
                          </Col> */}

                        <Col sm={4}>
                          <Form.Group
                            as={Col}
                            controlId="formGridLastName"
                            className="formmargin"
                          >
                            <Form.Label>Date of Joining</Form.Label>
                            <Form.Control
                              type="date"
                              name="joiningdate"
                              value={emp.joiningdate && emp.joiningdate.split("T")[0]}
                              disabled={disableFields}
                              onChange={handleinput}
                            />
                          </Form.Group>
                        </Col>

                        <Col sm={4}>
                          <Form.Group
                            as={Col}
                            controlId="formGridLastName"
                            className="formmargin"
                          >
                            <Form.Label>Company</Form.Label>
                            <Form.Select
                              name="company"
                              value={emp.company && emp.company.title}
                              onChange={handleinput}
                              disabled={disableFields}
                            >
                              <option disabled selected hidden defaultValue={""}>{emp.company && emp.company.title}</option>
                              {company && company.map((d) => {
                                return (
                                  <option
                                    key={d._id}
                                    value={d._id}
                                  >
                                    {d.title}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col></Col>
                        <Col lg={4}>
                          {/* <Form.Group
                              as={Col}
                              controlId="formGriddepartments"
                              className="formmargin"
                            >
                              <Form.Label>Payroll Setup</Form.Label>
                              <Form.Select name="payroll_setup"
                                Value={emp.payroll_setup && emp.payroll_setup.title}
                                onChange={handleinput}
                                disabled={disableFields}
                              >
                                <option disabled selected defaultValue={""}>
                                  {emp.payroll_setup && emp.payroll_setup.title}
                                </option>
                                {payrollsetup && payrollsetup.map((d, i) => {
                                  return (
                                    <>
                                      <option key={d._id} value={d._id}>
                                        {d.title}
                                      </option>
                                    </>
                                  );
                                })}
                              </Form.Select>
                            </Form.Group> */}
                          {user.isAdmin &&
                            <Button
                              className="btn buttoncolor"
                              onClick={() => {
                                setShowPayrollSetupModal(true);
                                console.log("payroll setup")
                              }}
                              style={{ backgroundColor: "rgb(137, 179, 83)", float: "right" }}
                            >
                              Change payroll setups
                            </Button>
                          }
                        </Col>

                        <Col lg={4}>
                          {user.isAdmin &&
                            <Button
                              className="btn buttoncolor"
                              onClick={() => {
                                setShowWorkshiftSetupModal(true);
                              }}
                              style={{ backgroundColor: "rgb(137, 179, 83)", float: "right" }}
                            >
                              Change work shifts
                            </Button>
                          }
                        </Col>

                        <Modal
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          show={showPayrollSetupModal}
                          onHide={() => { setShowPayrollSetupModal(false) }}
                          size="lg"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title
                              id="contained-modal-title-vcenter "
                              style={{ textAlign: "center" }}
                            >
                              <h5>Payroll Setup</h5>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Container fluid>

                              <Form.Label>Payroll Setup</Form.Label>
                              <Form.Select name="payroll_setup"
                                Value={emp.payroll_setup && emp.payroll_setup.title}
                                onChange={(e) => { setAddPayrollSetup({ ...addPayrollSetup, payrollSetup: e.target.value }) }}
                                disabled={disableFields}
                              >
                                <option disabled selected defaultValue={""}>
                                  {emp.payroll_setup && emp.payroll_setup.title}
                                </option>
                                {payrollsetup && payrollsetup.map((d, i) => {
                                  return (
                                    <option key={d._id} value={d._id}>
                                      {d.title}
                                    </option>);
                                })}
                              </Form.Select>

                              <Form.Group
                                as={Col}
                                controlId="formGridLastName"
                                className="formmargin"
                              >
                                <Form.Label>Date From</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="joiningdate"
                                  // value={emp.joiningdate && emp.joiningdate.split("T")[0]}
                                  onChange={(e) => { setAddPayrollSetup({ ...addPayrollSetup, dateFrom: e.target.value }) }}
                                />
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                controlId="formGridLastName"
                                className="formmargin"
                              >
                                <Form.Label>Date To</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="joiningdate"
                                  // value={emp.joiningdate && emp.joiningdate.split("T")[0]}
                                  onChange={(e) => {
                                    setAddPayrollSetup({ ...addPayrollSetup, dateTo: e.target.value })
                                  }}
                                />
                              </Form.Group>
                              <div className="d-flex justify-content-center my-3">
                                <Button
                                  onClick={() => {
                                    data.payroll_setup.push(addPayrollSetup)
                                    setShowPayrollSetupModal(false)
                                  }}
                                  style={{ backgroundColor: "rgb(137, 179, 83)" }}
                                >
                                  Add Setup
                                </Button>



                              </div>
                              <div>{emp.payroll_setup && emp.payroll_setup.map((ps, index) => <>
                                <div>payroll setup: {payrollsetup.filter((pf) => pf._id == ps.payrollSetup)[0] && ps.payrollSetup[0].title}</div>
                                <div>Date from:{ps.dateFrom}</div>
                                <div>Date to:{ps.dateTo}</div>
                                <button onClick={() => { emp.payroll_setup.splice(index, 1) }}>Delete</button>
                              </>)}</div>
                            </Container>
                          </Modal.Body>
                        </Modal>


                        <Modal
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          show={showWorkshiftSetupModal}
                          onHide={() => { setShowWorkshiftSetupModal(false) }}
                          size="lg"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title
                              id="contained-modal-title-vcenter "
                              style={{ textAlign: "center" }}
                            >
                              <h5>Work Shift Setup</h5>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Container fluid>

                              <Form.Label>Work Shift Setup</Form.Label>
                              <Form.Select name="payroll_setup"
                                value={emp.work_shift && emp.work_shift.title}
                                onChange={(e) => { setAddWorkShift({ ...addWorkShift, workShift: e.target.value }) }}
                                disabled={disableFields}
                              >
                                <option disabled selected defaultValue={""}>
                                  {emp.work_shift && emp.work_shift.title}
                                </option>
                                {workshift && workshift.map((d, i) => {
                                  return (
                                    <option key={d._id} value={d._id}>
                                      {d.shift_name}
                                    </option>
                                  );
                                })}
                              </Form.Select>

                              <Form.Group
                                as={Col}
                                controlId="formGridLastName"
                                className="formmargin"
                              >
                                <Form.Label>Date From</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="joiningdate"
                                  // value={emp.joiningdate && emp.joiningdate.split("T")[0]}
                                  onChange={(e) => { setAddWorkShift({ ...addWorkShift, dateFrom: e.target.value }) }}
                                />
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                controlId="formGridLastName"
                                className="formmargin"
                              >
                                <Form.Label>Date To</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="joiningdate"
                                  // value={emp.joiningdate && emp.joiningdate.split("T")[0]}
                                  onChange={(e) => {
                                    setAddWorkShift({ ...addWorkShift, dateTo: e.target.value })
                                  }}
                                />
                              </Form.Group>

                              <div className="d-flex justify-content-center my-3">
                                <Button
                                  onClick={() => {
                                    data.work_shift.push(addWorkShift)
                                    setShowPayrollSetupModal(false)
                                  }}
                                  style={{ backgroundColor: "rgb(137, 179, 83)" }}
                                >
                                  Add workshift
                                </Button>


                              </div>


                              <div>{emp.work_shift && emp.work_shift.map((ws, index) => <>
                                <div>workshifts:{workshift.filter((wf) => wf._id == ws.workShift)[0] && ws.workShift[0].shift_name}</div>
                                <div>Date from:{ws.dateFrom}</div>
                                <div>Date to:{ws.dateTo}</div>
                                <button onClick={() => { emp.work_shift.splice(index, 1) }}>Delete</button>
                              </>)}</div>
                            </Container>
                          </Modal.Body>
                        </Modal>

                      </Row>
                    </div>
                  </Accordion.Body>
                </Row>
              </Accordion.Item>
              <Accordion.Item eventKey="1" style={{ marginTop: "2%" }}>
                <Row>
                  <Accordion.Header>
                    <h5 style={{ color: "rgb(0,105,92)" }}>Contact Details</h5>
                    <hr />
                  </Accordion.Header>
                  <Accordion.Body eventKey="1">
                    <div>

                      <div style={{ display: "flex" }}>
                        <Form.Group
                          style={{ width: "40%" }}
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            name="primaryemail"
                            placeholder="email..."
                            value={emp.primaryemail}
                            onChange={handleinput}
                            disabled={disableFields}
                          />
                        </Form.Group>


                        <Form.Group
                          style={{ width: "40%" }}
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>Secondary Email</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            name="primaryemail"
                            placeholder="email..."
                            value={emp.primaryemail}
                            onChange={handleinput}
                            disabled={disableFields}
                          />
                        </Form.Group>

                      </div>


                      <div style={{ display: "flex" }}>
                        <Form.Label
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                          style={{ fontWeight: "bold" }}
                        >
                          Phone numbers
                        </Form.Label>
                        {user.isAdmin &&
                          <Button onClick={() => {
                            emp.phone_no.push("")
                            setEmp({ ...emp, phone_no: emp.phone_no })
                          }}>add</Button>

                        }
                      </div>
                      <Row>
                        {
                          emp.phone_no && emp.phone_no.map((pn, index) => (

                            <Col sm={6}>

                              <InputGroup style={{ marginTop: "5px" }}>
                                {/* <InputGroup.Text id="basic-addon1">
                              +92
                            </InputGroup.Text> */}
                                <Form.Control
                                  type="number"
                                  required
                                  name="phone_no"
                                  placeholder="mobile no"
                                  onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                      .toString()
                                      .slice(0, 11);
                                  }}
                                  value={pn}
                                  onChange={(e) => {
                                    const tempArr = emp.phone_no;
                                    tempArr[index] = e.target.value
                                    setEmp({ ...emp, phone_no: tempArr });
                                    data.phone_no = emp.phone_no
                                  }}
                                  disabled={disableFields}
                                />
                              </InputGroup>
                            </Col>
                          ))
                        }
                      </Row>

                    </div>

                  </Accordion.Body>
                </Row>
              </Accordion.Item>
              <Accordion.Item eventKey="2" style={{ marginTop: "2%" }}>
                <div>
                  <Accordion.Header>
                    <h5 style={{ color: "rgb(0,105,92)" }}>Address & Region</h5>
                    <hr />
                  </Accordion.Header>
                </div>
                <Accordion.Body>

                  {user.isAdmin &&
                    <Button
                      onClick={() => {
                        setShowAddressModal(true)

                      }}
                      style={{ backgroundColor: "rgb(137, 179, 83)" }}
                    >
                      Add
                    </Button>
                  }

                  <Row style={{ marginTop: "3%" }}>
                    <Col lg={12}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th style={{ textAlign: "center" }}>
                              Address
                            </th>
                            <th style={{ textAlign: "center" }}>City</th>
                            <th style={{ textAlign: "center" }}>Province</th>
                            <th style={{ textAlign: "center" }}>Country</th>

                          </tr>
                        </thead>
                        <tbody>
                          {emp.address && emp.address.map((d, i) => {
                            return (
                              <tr>
                                <th>{i + 1}</th>
                                <td>{d.address}</td>
                                <td>{d.city}</td>
                                <td>{d.province}</td>
                                <td>{d.country}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" style={{ marginTop: "2%" }}>
                <Row>
                  <div>
                    <Accordion.Header>
                      <h5 style={{ color: "rgb(0,105,92)" }}>
                        Education Information
                      </h5>{" "}
                      <hr />
                    </Accordion.Header>
                  </div>
                  <div>
                    <Accordion.Body>
                      {user.isAdmin &&
                        <div style={{ marginLeft: "57.5vw", marginRight: 10 }}>
                          <a
                            className="btn buttoncolor  "
                            onClick={() => {
                              setShowChildModel1(true);
                            }}
                            style={{ backgroundColor: "rgb(137, 179, 83)" }}
                          >
                            Edit
                          </a>
                        </div>
                      }
                      <Row style={{ marginTop: "3%" }}>
                        <Col lg={12}>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th style={{ textAlign: "center" }}>
                                  Institude
                                </th>
                                <th style={{ textAlign: "center" }}>Degree</th>
                                <th style={{ textAlign: "center" }}>Start</th>
                                <th style={{ textAlign: "center" }}>End</th>
                                <th style={{ textAlign: "center" }}>Status</th>
                                <th style={{ textAlign: "center" }}>Remove</th>
                              </tr>
                            </thead>
                            <tbody>
                              {education &&
                                education.map((d, i) => {
                                  return (
                                    <tr>
                                      <th>{i + 1}</th>
                                      <td>{d.institute}</td>
                                      <td>{d.degreetitle}</td>
                                      <td>
                                        {d.start && d.start.split("T")[0]}
                                      </td>
                                      <td>{d.end && d.end.split("T")[0]}</td>
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
                                  );
                                })}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </div>
                </Row>
              </Accordion.Item>
              <Accordion.Item eventKey="4" style={{ marginTop: "2%" }}>
                <Row>
                  <div>

                    <Accordion.Header>
                      <h5 style={{ color: "rgb(0,105,92)" }}>
                        Previous Employments
                      </h5>{" "}
                      <hr />
                    </Accordion.Header>
                  </div>
                  <div >
                    <Accordion.Body>
                      {user.isAdmin &&
                        <div style={{ marginLeft: "57.5vw", marginRight: 10 }}>
                          <a
                            className="btn buttoncolor "
                            onClick={() => {
                              setShowChildModel(true);
                            }}
                            style={{ backgroundColor: "rgb(137, 179, 83)" }}
                          >
                            add
                          </a>
                        </div>
                      }
                      <Row style={{ marginTop: "3%" }}>
                        <Col lg={12}>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th style={{ textAlign: "center" }}>Company</th>
                                <th style={{ textAlign: "center" }}>Position</th>
                                <th style={{ textAlign: "center" }}>Start Date</th>
                                <th style={{ textAlign: "center" }}>Resignation Date</th>
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
                                        <td>{d.joiningdate && d.joiningdate.split("T")[0]}</td>
                                        <td>
                                          {d.resignationdate &&
                                            d.resignationdate.split("T")[0]}
                                        </td>
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
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </div>
                </Row>
              </Accordion.Item>


              <Accordion.Item eventKey="5" style={{ marginTop: "2%" }}>
                <Row>
                  <div>
                    <Accordion.Header>
                      <h5 style={{ color: "rgb(0,105,92)" }}>
                        Credentials{" "}
                      </h5>{" "}
                      <hr />
                    </Accordion.Header>
                  </div>
                  <Accordion.Body>
                    <div>
                      <Row>
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
                              disabled={disableFields}
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
                              type="String"
                              required
                              name="password"
                              placeholder="*******"
                              value={emp.password}
                              onChange={handleinput}
                              disabled={disableFields}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>


                  </Accordion.Body>
                </Row>
              </Accordion.Item>

              <Accordion.Item eventKey="6" style={{ marginTop: "2%" }}>

                <Accordion.Header>
                  <h5 style={{ color: "rgb(0,105,92)" }}>Bank Details </h5>{" "}
                  <hr />
                </Accordion.Header>

                <Accordion.Body>
                  <Row>
                    <Col>
                      <Form.Group
                        as={Col}
                        controlId="formGridLastName"
                        className="formmargin"
                      >
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Select
                          selected={emp.bankname}
                          required
                          name="bankname"
                          placeholder="bank name.."
                          value={emp.bankname}
                          onChange={handleinput}
                          disabled={disableFields}
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
                          disabled={disableFields}
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
                          value={emp.accountno && emp.accountno}
                          onChange={handleinput}
                          disabled={disableFields}
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
                          disabled={disableFields}
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
                          disabled={disableFields}
                        />
                      </Form.Group>
                    </Col>
                    {/* </Accordion.Body> */}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>

              <NotificationContainer />


              <Accordion.Item eventKey="7" style={{ marginTop: "2%" }}>
                <Row>
                  <div>
                    <Accordion.Header>
                      <h5 style={{ color: "rgb(0,105,92)" }}>
                        Employment Details{" "}
                      </h5>{" "}
                      <hr />
                    </Accordion.Header>
                  </div>
                  <Accordion.Body>

                    <Row>
                      <Col >
                        <Form.Group
                          as={Col}
                          controlId="formGridFirstName"
                          className="formmargin"
                        >
                          <Form.Label>Employment Status</Form.Label>
                          <Form.Select
                            required
                            name="empStatus"
                            value={emp.paymentmode}
                            onChange={handleinput}
                            disabled={disableFields}
                          >
                            <option value="" selected hidden disabled>
                              Please Select
                            </option>
                            <option>Intern</option>
                            <option>Probation</option>
                            <option>Permanent</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          as={Col}
                          controlId="formGriddepartments"
                          className="formmargin"
                        >
                          <Form.Label>Supervisors</Form.Label>
                        
                          <Form.Select
                            name="supervisors"
                            value={emp.supervisors && emp.supervisors[0] && emp.supervisors[0]._id}
                            onChange={(e) => {
                              setEmp({ ...emp, supervisors: [e.target.value] });
                            }}
                            disabled={disableFields}
                          >
                            <option disabled selected hidden defaultValue={""}>{emp.supervisors && emp.supervisors.firstname}</option>
                            {empl && empl.map((d, i) => {
                              return (
                                <option key={d._id} value={d._id}>
                                  {d.firstname}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <h5 style={{ color: "rgb(0,105,92)" }}>Internship</h5>
                      <Col sm={6}>
                        <Form.Group
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>Remarks</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            name="internshipRemarks"
                            placeholder="username"
                            value={emp.username}
                            onChange={handleinput}
                            disabled={disableFields}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>start date</Form.Label>
                          <Form.Control
                            type="date"
                            required
                            name="internshipStartDate"
                            value={details.start}
                            onChange={handleeducationdetails}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>end date</Form.Label>
                          <Form.Control
                            type="date"
                            required
                            name="internshipEndDate"
                            value={details.start}
                            onChange={handleeducationdetails}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <h5 style={{ color: "rgb(0,105,92)" }}>Probation</h5>
                      <Col sm={6}>
                        <Form.Group
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>Remarks</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            name="username"
                            placeholder="username"
                            value={emp.username}
                            onChange={handleinput}
                            disabled={disableFields}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>start date</Form.Label>
                          <Form.Control
                            type="date"
                            required
                            name="probationStartDate"
                            value={details.start}
                            onChange={handleeducationdetails}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group
                          as={Col}
                          controlId="formGridLastName"
                          className="formmargin"
                        >
                          <Form.Label>end date</Form.Label>
                          <Form.Control
                            type="date"
                            required
                            name="probationEndDate"
                            value={details.start}
                            onChange={handleeducationdetails}
                          />
                        </Form.Group>
                      </Col>
                    </Row>


                  </Accordion.Body>
                </Row>
              </Accordion.Item>
            </Container>
            <NotificationContainer />
          </div>
        </Accordion >
      </div >
      <div style={{ height: "15%" }}></div>






      {/* ///educational details modal  */}
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
            <Row className="mb-3">
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
                }}
                style={{ backgroundColor: "rgb(137, 179, 83)" }}
              >
                Add Education
              </Button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>




      {/* //employement history modal */}
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
                <hr />
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
                    onChange={handleempinput}
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
                    onChange={async (e) => await handleempinputResignationDate(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Label>Job Description</Form.Label>
              <Form.Group
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
                />
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center my-3">
              <Button
                onClick={() => {
                  addhistory();
                  Closechildmodal();
                }}
                style={{ backgroundColor: "rgb(137, 179, 83)" }}
              >
                Add Employement
              </Button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>





      {/* Address input modal */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showAddressModal}
        onHide={() => { setShowAddressModal(false) }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            style={{ textAlign: "center" }}
          >
            <h5>Enter Address</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridempcompany"
                  className="formmargin"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="address"
                    placeholder="address"
                    value={addressInput.address}
                    onChange={handleChangeAddressInput}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="city"
                    value={addressInput.city}
                    onChange={handleChangeAddressInput}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridempcompany"
                  className="formmargin"
                >
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    type="text"
                    name="province"
                    placeholder="province"
                    value={addressInput.province}
                    onChange={handleChangeAddressInput}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="country"
                    placeholder="country"
                    value={addressInput.country}
                    onChange={handleChangeAddressInput}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center my-3">
              <Button
                onClick={() => {

                  setEmp({ ...emp, address: emp.address.push(addressInput) });
                  setShowAddressModal(false)

                }}
                style={{ backgroundColor: "rgb(137, 179, 83)" }}
              >
                Add Address
              </Button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default Cards;
