import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Card, Container, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import { Context } from "../../../Context/Context";
import "../../Leaves/leaves.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useReactToPrint } from "react-to-print";
import HeaderContext from '../../../Context/HeaderContext'

function WorkLeave() {

  const [from, setFirstdate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [to, setSecond] = useState(new Date());
  const [attachedFile, setAttachedFile] = useState();
  const [workabsence, setWorkabsence] = useState("");
  const [applicationdate, setapplicationdate] = useState("")
  const { user } = useContext(Context);
  const [Info, setinfo] = useState([]);
  const [assignedBy, setAssignedBy] = useState("")
  const [leave_status, setLeave_status] = useState("")
  const [leaves, setLeaves] = useState([]);
  const [depemp, setdepemp] = useState([])
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [details, setDetails] = useState([]);
  const [workStatus, setWorkStatus] = useState([]);
  const [task, setTask] = useState("");
  const [project, setProject] = useState("");
  const [superviser, setSuperviser] = useState("");
  const [superviserid, setSuperviserid] = useState("");

  const [placeToVisit, setPlaceToVisit] = useState("");
  const [reasonToVisit, setReasonToVisit] = useState("");
  const [personToMeet, setPersonToMeet] = useState("");
  const [remarks, setRemarks] = useState("");
  const [meterStartReading, setMeterStartReading] = useState("");
  const [meterEndReading, setMeterEndReading] = useState("");
  const [overallRemarks, setOverallRemarks] = useState("");

  const url = "leaves";
  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Work Leave Request")
  })

  const employee = user.id;
  const getEmp = `employees/${user.id}`;
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const userInformation = async () => {
    try {
      const res = await axios.get(process.env.React_APP_ORIGIN_URL + getEmp);
      const empinfo = res.data;
      const InfoData = [];
      await empinfo.Leaves.map((d) => {
        InfoData.push({
          from: d.from,
          workStatus: d.workStatus,
          to: d.to,
          status: d.status,
          workabsence: d.workabsence,
          name: empinfo.firstname,
          _id: empinfo.emp_id,
          department: empinfo.departments.map((d) => d.departmentname),
          description: d.description,
          applicationdate: d.applicationdate,
          empid: empinfo.emp_id,
          designation: empinfo.designation,
          leavesId: empinfo.Leaves.slice(empinfo.Leaves.length - 1),
          assignedBy: d.assignedBy,
          task: d.task,
          project: d.project,
          leave_status: d.leave_status,
        });
      });
      setinfo(InfoData);

      const departments = [];
      await empinfo.departments.map((d) => {
        departments.push({
          department: d.departmentname,
          name: empinfo.firstname,
          email: empinfo.email,
          empid: empinfo.emp_id,
          designation: empinfo.designation,
          supervisors: empinfo.supervisors[0].username
        });
      });

      setDetails(departments);
      setSuperviser(empinfo.supervisors[0].username)
      setSuperviserid(empinfo.supervisors[0]._id)
    } catch (error) {
      console.log(error);
    }
  };
  const depurl = user.departments.map((d) => d._id);
  const depemployees = `departments/${depurl}`
  const allemployees = async () => {
    try {
      const res = await axios.get(process.env.React_APP_ORIGIN_URL + depemployees);
      const data = res.data.department.employees;
      setdepemp(data)
    } catch (error) {
      console.log(error)
    }
  }

  const addWorkAbsence = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("workabsence", workabsence);
    formData.append("from", from);
    formData.append("description", description);
    formData.append("to", to);
    formData.append("workStatus", workStatus);
    formData.append("employee", employee);
    formData.append("file", attachedFile);
    formData.append("applicationdate", applicationdate);
    formData.append("assignedBy", assignedBy)
    formData.append("fromTime", fromTime)
    formData.append("toTime", toTime)
    formData.append("task", task);
    formData.append("leave_status", leave_status);
    formData.append("project", project);
    formData.append("placeToVisit", placeToVisit);
    formData.append("personToMeet", personToMeet);
    formData.append("reasonToVisit", reasonToVisit);
    formData.append("remarks", remarks);
    formData.append("meterStartReading", meterStartReading);
    formData.append("meterEndReading", meterEndReading);
    formData.append("overallRemarks", overallRemarks);
    console.log("formData", formData)
    try {
      const addreq = await axios({
        method: "post",
        url: process.env.React_APP_ORIGIN_URL + `workLeave`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("formdata", formData)
      addreq && NotificationManager.success("Successfully Added");
    } catch (error) {
      NotificationManager.error("Failed to Add");
    }
  };

  // disabled previous datesurl
  var dd, today, mm, yyyy;
  const disableDate = () => {
    today = new Date();
    dd = String(today.getDate() + 1).padStart(2, "0");
    mm = String(today.getMonth() + 1).padStart(2, "0");
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  //total no of days between dates
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(from); // 29th of Feb at noon your timezone
  var secondDate = new Date(to);
  var diffDays = Math.round(
    Math.abs((secondDate.getTime() - firstDate.getTime()) / oneDay) + 1
  );

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.React_APP_ORIGIN_URL + url);
      const dd = res.data.getLeave;
      setLeaves(dd);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    userInformation();
    allemployees();
  }, []);
  const array = depemp.filter((d) => d.firstname !== "Hafiz Raheel" & d.firstname !== `${user.firstname}`);
  return (
    <>
      <div
        className="content-wrapper my-1"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <section className="content" style={{ marginTop: "30px" }}>
          <div className="container">
            <div className="card">
              <div className="card-header buttoncolor ">
                <h3 className="card-title" style={{ color: "white" }}>
                  Add Work Absence Request
                </h3>
              </div>
              <div className="card-body">
                <Container>
                  <div>
                    <h4>Work Absence Form</h4>
                    <hr />
                    <Row>
                      <Col >
                        <Card>
                          <Card.Body>
                            <Container>
                              <Form onSubmit={addWorkAbsence}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Row>
                                    <Col>
                                      <Form.Label>Work Types</Form.Label>
                                      <Form.Select
                                        required
                                        onChange={(e) => {
                                          setWorkabsence(e.target.value);
                                        }}
                                      >
                                        <option disabled selected hidden defaultValue={""}>Please Select</option>
                                        <option value={"Clinet Visit"}>Clinet Visit</option>
                                        <option value={"Project Site Visit"}>Project Site Visit</option>
                                        <option value={"Branch Office"}>Branch Office</option>
                                        <option value={"Bank Visit"}>Bank Visit</option>
                                        <option value={"Govt. Organization Visit"}>Govt. Organization Visit</option>
                                        <option value={"Market Visit"}>Market Visit</option>
                                        <option value={"Vendor Visit"}>Vendor Visit</option>
                                        <option value={"Others"}>Others</option>
                                      </Form.Select>
                                    </Col>
                                    <Col>
                                      <Form.Label>Status</Form.Label>
                                      <div className="status">
                                        <Form.Control
                                          type="text"
                                          required
                                          value={"open"}
                                          disabled
                                        ></Form.Control>
                                      </div>
                                    </Col>
                                    <Col>
                                      <Form.Label>Project</Form.Label>
                                      <div className="reason">
                                        <Form.Control
                                          type="text"
                                          onChange={(e) => {
                                            setProject(e.target.value);
                                          }}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                >
                                  <Row>
                                    <Col>
                                      <Form.Label>From</Form.Label>
                                      <Form.Control
                                        type="date"
                                        required
                                        onChange={(e) => {
                                          setFirstdate(e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>To</Form.Label>
                                      <Form.Control
                                        type="date"
                                        reuired
                                        onChange={(e) => {
                                          setSecond(e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>Total Days</Form.Label>
                                      <Form.Control
                                        type="number"
                                        value={diffDays}
                                        disabled
                                      />
                                    </Col>
                                  </Row>
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                >
                                  <Row>
                                    <Col>
                                      <Form.Label>Task</Form.Label>
                                      <div className="reason">
                                        <Form.Control
                                          type="text"
                                          onChange={(e) => {
                                            setTask(e.target.value);
                                          }}
                                        />
                                      </div>
                                    </Col>
                                    <Col>
                                      <Form.Label>Time From</Form.Label>
                                      <Form.Control
                                        type="time"
                                        value={fromTime}
                                        onChange={(e) => {
                                          setFromTime(e.target.value)
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>Time To</Form.Label>
                                      <Form.Control
                                        type="time"
                                        value={toTime}
                                        onChange={(e) => {
                                          setToTime(e.target.value)
                                        }}
                                      />
                                    </Col>

                                  </Row>
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                >
                                  <Row>
                                    <Col>
                                      <Form.Label>Description</Form.Label>
                                      <div className="reason">
                                        <Form.Control
                                          type="text"
                                          onChange={(e) => {
                                            setDescription(e.target.value);
                                          }}
                                        />
                                      </div>
                                    </Col>
                                    <Col  >
                                      <Form.Label>Work Status</Form.Label>
                                      <Form.Select
                                        value={workStatus}
                                        onChange={(e) => { setWorkStatus(e.target.value) }}
                                      >
                                        <option disabled selected hidden value="">Please Select</option>
                                        <option value="Partially Progress">Partially Progress</option>
                                        <option value="No Progress">No Progress</option>
                                        <option value="Completed">Completed</option>
                                      </Form.Select>
                                    </Col>
                                    <Col>
                                      <Form.Label>Short leave</Form.Label>
                                      <Form.Select
                                        value={leave_status}
                                        onChange={(e) => { setLeave_status(e.target.value) }}
                                      >
                                        <option disabled selected hidden value="">Please Select</option>
                                        <option value="True">Short Leave</option>
                                        <option value="False">Full Leave</option>
                                      </Form.Select>
                                    </Col>
                                  </Row>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                >
                                  <Row>
                                    <Col>
                                      <Form.Label>Assigned By</Form.Label>
                                      <Form.Select
                                        onChange={(e) => { setAssignedBy(e.target.value) }}
                                      >
                                        <option disabled selected hidden defaultValue={""}>Please Select</option>
                                        <option value={setSuperviserid}>{superviser}</option>
                                        {
                                          array.map((d, i) => {
                                            return (
                                              <>
                                                <option key={i} value={d._id}>{d.firstname}</option>
                                              </>)
                                          })
                                        }
                                      </Form.Select>
                                    </Col>
                                    <Col>
                                      <Form.Label>Application Date</Form.Label>
                                      <Form.Control
                                        type="date"
                                        onChange={(e) => {
                                          setapplicationdate(e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>Place To Visit</Form.Label>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => {
                                          setPlaceToVisit(e.target.value);
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                >
                                  <Row>
                                    <Col>
                                      <Form.Label>Reason For Visit</Form.Label>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => {
                                          setReasonToVisit(e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>Person To Meet</Form.Label>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => {
                                          setPersonToMeet(e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>Remarks</Form.Label>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => {
                                          setRemarks(e.target.value);
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                >
                                  <Row>
                                    <Col>
                                      <Form.Label>Meter Start Reading</Form.Label>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => {
                                          setMeterStartReading(e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>Meter End Reading</Form.Label>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => {
                                          setMeterEndReading(e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>Overall Reamrks</Form.Label>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => {
                                          setOverallRemarks(e.target.value);
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </Form.Group>

                                <Form.Group>
                                  <Row>
                                    <Form.Label>Attachment</Form.Label>
                                    <Col sm={10}>
                                      <input
                                        type="file"
                                        id="files"
                                        name="files"
                                        onChange={(f) => {
                                          var ext = f.target.value.match(
                                            /\.([^\.]+)$/
                                          )[1];
                                          switch (ext) {
                                            case "jpeg":
                                            case "jpg":
                                            case "jpgv":
                                            case "png":
                                            case "svg":
                                            case "xls":
                                            case "xlam":
                                            case "xlsm":
                                            case "pptx":
                                            case "xlsx":
                                            case "docx":
                                            case "dotx":
                                            case "ppt":
                                            case "doc":
                                            case "pdf":
                                            case "txt":
                                            case "7z":
                                            case "ace":
                                            case "acc":
                                            case "avi":
                                            case "csv":
                                            case "texinfo":
                                            case "html":
                                            case "m3u":
                                            case "m4v":
                                            case "mpeg":
                                            case "mp4a":
                                            case "mp4":
                                            case "mp4":
                                            case "weba":
                                            case "webm":
                                            case "psd":
                                            case "pic":
                                            case "au":
                                            case "tar":
                                            case "wav":
                                            case "webp":
                                            case "xml":
                                            case "zip":
                                              setAttachedFile(f.target.files[0]);
                                              break;
                                            default:
                                              alert(
                                                "Please select the valid file extension!"
                                              );
                                              f.target.value = "";
                                          }
                                          setAttachedFile(f.target.files[0]);
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      <Button variant="primary" type="submit" className="submitButton" style={{ backgroundColor: "rgb(137, 179, 83)" }}>
                                        Submit
                                      </Button>
                                    </Col>
                                  </Row>
                                </Form.Group>
                              </Form>
                            </Container>
                          </Card.Body>
                        </Card>
                      </Col>
                      {/* <Col> */}
                      {/* <Card>
                          <Card.Header className="buttoncolor ">
                            <Card.Title style={{ width: "100%" }}>
                              <h4 className="text-center">
                                Employee Information
                              </h4>
                            </Card.Title>
                          </Card.Header>

                          <Card.Body>
                            <Container>
                              {details.map((d) => {
                                return (
                                  <>
                                    <div style={{ display: 'flex', width: '100%' }}>
                                      <div style={{ width: "50%" }}>
                                        <h5 style={{ fontWeight: 'bold' }}>
                                          Employee ID
                                        </h5>
                                      </div>
                                      <div style={{ width: "50%" }}>
                                        <p>{d.empid}</p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", width: "100%", marginTop: '1%' }}>
                                      <div style={{ width: '50%' }}>
                                        <h5 style={{ fontWeight: "bold" }}>
                                          {" "}
                                          Name
                                        </h5>
                                      </div>
                                      <div style={{ width: '50%' }}>
                                        <p>{d.name}</p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", width: "100%", marginTop: '1%' }}>
                                      <div style={{ width: '50%' }}>
                                        <h5 style={{ fontWeight: "bold" }}>
                                          {" "}
                                          Email
                                        </h5>
                                      </div>
                                      <div style={{ width: '50%' }}>
                                        <p>{d.email}</p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", width: "100%", marginTop: '1%' }}>
                                      <div style={{ width: '50%' }}>
                                        <h5 style={{ fontWeight: "bold" }}>
                                          Designation
                                        </h5>
                                      </div>
                                      <div style={{ width: '50%' }}>
                                        <p>{d.designation}</p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", width: "100%", marginTop: '1%' }}>
                                      <div style={{ width: '50%' }}>
                                        <h5 style={{ fontWeight: "bold", fontSize: 'auto' }}>
                                          Department
                                        </h5>
                                      </div>
                                      <div style={{ width: '50%' }}>
                                        <p>{d.department}</p>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </Container>
                          </Card.Body>
                        </Card>  */}
                      {/* </Col> */}
                    </Row>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </section>
        <NotificationContainer />
      </div>
    </>
  )
}

export default WorkLeave