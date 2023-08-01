import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Card, Container, Modal, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapTable from "react-bootstrap-table-next";
import { useContext } from "react";
import { Context } from "../../../../Context/Context";
import "../../Leaves/leaves.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import img from "../../../../Assets/logo3.jpg";
import Report from "../report leave request/Report";
import './LeaveRequest.css'

const LeaveRequest = () => {
  const navigate = useNavigate();
  const [from, setFirstdate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [to, setSecond] = useState(new Date());
  const [attachedFile, setAttachedFile] = useState();
  const [latest, setlatest] = useState([]);
  const [diff, setdiff] = useState("0");
  const [leaveType, setLeaveType] = useState("");
  const [applicationdate,setapplicationdate] = useState("")
  const { user } = useContext(Context);
  const [Info, setinfo] = useState([]);
  const[backupresourse,setbackupresourse]= useState("")
  const [leaveDuration,setLeaveDuration] = useState("")
  console.log("user from Context", user);
  const [leaves, setLeaves] = useState([]);
  const url = "/leaves";
  const posturl = "/leaverequest/addrequest";
  const getLeave = "leaverequest/all";
  const [depemp,setdepemp] = useState([])

  const [userInfo, setUserinfo] = useState({});
  const [details, setDetails] = useState([]);
  const employee = user.id;
  // console.log(employee);
  const getEmp = `/employees/${user.id}`;
  //leave with backup resource
 
  // const [status,setstatus] = useState("Pending Aproval")
  const componentRef = useRef();
  // const url2 =`/departments/${}`
  // console.log(url2)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const userInformation = async () => {
    try {
      const res = await axios.get(getEmp);
      const empinfo = res.data;

      console.log("info", empinfo);
      const InfoData = [];
      console.log("infoooo", Info.Leaves)

      await empinfo.Leaves.map((d) => {
        
        InfoData.push({
          from: d.from,
          to: d.to,
          status: d.status,
          leaveType: d.leaveType,
          name: empinfo.firstname,
          _id: empinfo.emp_id,
          department: empinfo.departments.map((d) => d.departmentname),
          reason: d.reason,
          applicationdate: d.applicationdate,
          empid: empinfo.emp_id,
          designation: empinfo.designation,
          leavesId:empinfo.Leaves.slice(empinfo.Leaves.length-1),
          backupresourse: d.backupresourse,
          leaveDuration: d.leaveDuration
        });
        console.log(InfoData,"pushing data")
      });
      console.log("************", InfoData);
      setinfo(InfoData);
      console.log("Info", Info);
      console.log("latest", latest);
      const departments = [];
      await empinfo.departments.map((d) => {
        departments.push({
          department: d.departmentname,
          name: empinfo.firstname,
          email: empinfo.email,
          empid: empinfo.emp_id,
          designation: empinfo.designation,
        });
      });
      console.log("departments", departments);
      setDetails(departments);
    } catch (error) {
      console.log(error);
    }
  };
  //generating report using jspdf
    
  // define a generatePDF function that accepts a argument
  console.log("dep",depurl)
  const depurl = user.departments.map((d)=>d._id);
  const depemployees = `/departments/${depurl}`
  // console.log(depemployees,"departmental employees")
  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      const dd = res.data.getLeave;
      console.log("data", dd);
      setLeaves(dd);
    } catch (error) {
      console.log(error);
    }
  };
  const allemployees = async()=>{
        try{
             const res = await axios.get(depemployees);
              console.log(res.data.department.employees,"recent response");
              // const data = await res.data.department.employee
              // data &&  setdepemp(res.data.department.employees);
              const data = res.data.department.employees;
              console.log("nomis data ",data);
              setdepemp(data)
            
        }catch(error){
            console.log(error)
        }
  }
  const addleaveRequest = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    console.log("attachedfile++++++++++++++++++++++++++++++++++++++++++++++++", attachedFile,leaveType,from,reason);
    console.log("formData12", formData);
    formData.append("leaveType", leaveType);
    formData.append("from", from);
    formData.append("reason", reason);
    formData.append("to", to);
    formData.append("employee", employee);
    formData.append("file", attachedFile);
    formData.append("applicationdate",applicationdate);
    formData.append("backupresourse",backupresourse);
    formData.append("leaveDuration",leaveDuration);

    try {
      console.log("formData12", formData);

      const addreq = await axios({
        method: "post",
        url: `${posturl}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("post data", addreq);
      addreq && NotificationManager.success("Successfully Added");
    } catch (error) {
      console.log("erorr==================123", error);
      NotificationManager.error("Failed to Add");
    }
  };

  // disabled previous dates
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
  // console.log(
  //   firstDate,
  //   "to",
  //   secondDate,
  //   "\nDifference: " + diffDays + " day"
  // );

  
    
  //   const backupresourses = async() =>{
  //     try{    
  // const leavesId = await Info.slice(Info.length-1,Info.length).map((d)=>d.leavesId.map((d)=>d._id))
  // console.log("leavesFilter",leavesId);
  //  const specleave = `leaverequest/${leavesId}`;
  // console.log("specific leave",specleave)
  //     console.log("in Try")
    
    
  //        const response = leavesId && await axios.get(specleave);
  //        console.log(response,"response specific")
  //        const data = response
  //        console.log("specific leaves data",data)
  //    }catch(error){
  //          console.log(error)
  //    }
  //  }
  
  

  useEffect(() => {
    fetchData();
    userInformation();
    allemployees();
    
  }, []);
//  console.log("after setting state",depemp);
 const array = depemp.filter((d)=>d.firstname!=="Hafiz Raheel" & d.firstname !==`${user.firstname}`);
//  console.log("after filter method call",array)
  return (
    <>
      <div
        className="content-wrapper my-1"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <section className="content-header py-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Leave Request</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Leave Request</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container">
            <div className="card">
              <div className="card-header buttoncolor ">
                <h3 className="card-title" style={{ color: "white" }}>
                  Add Leave Request
                </h3>
              </div>
              <div className="card-body">
                <Container>
                  <div>
                    <h4>Leave Form</h4>

                    <hr />
                    <Row>
                      <Col xs="7">
                        <Card>
                          <Card.Body>
                            {/* <Card.Text>
                              <div>
                                <h5
                                  style={{
                                    fontWeight: "600",
                                    textAlign: "center",
                                    padding:'5px 0px'
                                  }}
                                >
                                  Leave Form
                                </h5>
                              </div>
                            </Card.Text> */}
                            <Container>
                              <Form onSubmit={addleaveRequest}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Row>
                                    <Col>
                                      <Form.Label>Leave Type</Form.Label>
                                      <Form.Select
                                        required
                                        onChange={(e) => {
                                          setLeaveType(e.target.value);
                                        }}
                                      >
        
                                        {leaves.map((d) => {
                                          return (
                                            <option
                                              key={d._id}
                                              value={d.leaveType}
                                              name={d.leaveType}
                                            >
                                              {d.leaveType}
                                            </option>
                                          );
                                        })} 
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
                                        // min={disableDate()}
                                        onChange={(e) => {
                                          setFirstdate(e.target.value);
                                        }}
                                        // defaultValue={Date.now()}
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
                                  </Row>
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                >
                                  <Row>
                                    <Col>
                                      <Form.Label>Total Days</Form.Label>
                                      <Form.Control
                                        type="number"
                                        value={diffDays}
                                        disabled
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>Reason</Form.Label>
                                      <div className="reason">
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => {
                                          setReason(e.target.value);
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
                                    <Col xs={"4"} lg={6} xl={6} xxl={6}>
                                      <Form.Label>Backup Resourse</Form.Label>
                                      <Form.Select
                                        // required                   
                                        onChange={(e)=>{setbackupresourse(e.target.value)}}
                                      > 
                                        <option disabled  selected hidden defaultValue={""}>Please Select</option>
                                        {
                                          array.map((d,i)=>{
                                           
                                           return(
                                            <>
                                                  
                                                 <option key={i} value={d._id}>{d.firstname}</option>
                                           </>)
                                          })
                                        }
                                      </Form.Select>
                                    </Col>
                                    <Col>
                                      <Form.Label>Leave Duration</Form.Label>
                                      <Form.Select
                                        // required                  
                                        
                                        value={leaveDuration}
                                        onChange={(e)=>{setLeaveDuration(e.target.value)}}
                                      > 
                                        <option disabled  selected hidden defaultValue={""}>Please Select</option>
                                        <option value="full time" >Full Time</option>
                                        <option value="0.2" >0.2</option>
                                        <option value="0.2" >0.5</option>
                                        <option value="0.75">0.75</option>

                                      
                                      </Form.Select>
                                    </Col>
                                  </Row>
                                  <Row>
                                  <Col>
                                      <Form.Label>Application Date</Form.Label>
                                      <Form.Control
                                        type="date"
                                        onChange={(e) => {
                                          setapplicationdate(e.target.value);
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
                                          console.log(
                                            "fileess",
                                            f.target.value
                                          );
                                          var ext = f.target.value.match(
                                            /\.([^\.]+)$/
                                          )[1];
                                          console.log("extension", ext);
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
                                      <Button variant="primary" type="submit" className="submitButton">
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
                      <Col>
                        <Card>
                          <Card.Header className="buttoncolor ">
                            <Card.Title style={{ width: "100%" }}>
                              <h4 className="text-center">
                                Employee Information

                              </h4>
                              
                            </Card.Title>
                          </Card.Header>

                          <Card.Body>
                            <Container>
                              {/* <Row>
                                <Col xs={"12"}> */}
                                    {details.map((d) => {  
                                      // console.log("details", details);
                                      return (
                                        <>                    
                                          <div style={{display:'flex',width:'100%'}}>
                                            <div style={{width:"50%"}}>
                                              <h5 style={{ fontWeight:'bold'}}>
                                                Employee ID 
                                              </h5>
                                            </div>
                                            <div style={{width:"50%"}}>
                                              <p>{d.empid}</p>
                                            </div>
                                          </div>
                                          <div style={{display:"flex",width:"100%",marginTop:'1%'}}>
                                            <div style={{width:'50%'}}>
                                              <h5 style={{ fontWeight: "bold" }}>
                                                {" "}
                                                Name 
                                              </h5>
                                            </div>
                                            <div style={{width:'50%'}}>
                                              <p>{d.name}</p>
                                            </div>
                                          </div>
                                          <div style={{display:"flex",width:"100%",marginTop:'1%'}}>
                                            <div style={{width:'50%'}}>
                                              <h5 style={{ fontWeight: "bold" }}>
                                                {" "}
                                                Email 
                                              </h5>
                                            </div>
                                            <div style={{width:'50%'}}>
                                              <p>{d.email}</p>
                                            </div>
                                          </div>
                                          <div style={{display:"flex",width:"100%",marginTop:'1%'}}>
                                            <div style={{width:'50%'}}>
                                              <h5 style={{ fontWeight: "bold" }}>
                                                Designation 
                                              </h5>
                                            </div>
                                            <div style={{width:'50%'}}>
                                              <p>{d.designation}</p>
                                            </div>
                                          </div>
                                          <div style={{display:"flex",width:"100%",marginTop:'1%'}}>
                                            <div style={{width:'50%'}}>
                                              <h5 style={{ fontWeight: "bold",fontSize:'auto' }}>
                                                Department 
                                              </h5>
                                            </div>
                                            <div style={{width:'50%'}}>
                                              <p>{d.department}</p>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                               
                                {/* </Col>
                              </Row> */}
                            </Container>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="py-4">
            {
              Info.length >0 ? <Container>
              <Button
                onClick={() => {
                  handlePrint();
                }}
                
              >
                Generate Report
              </Button>
              {/* <LeaveReport leave={Info}/> */}
            </Container> :""
            }
          </div>
          <Container>
            {
              Info.length>0? <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Srno</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Leave Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* {console.log("leave data final", leaveData)} */}

                { 
                  Info.slice(Info.length - 6, Info.length).map((d, i) => {
                  // console.log("infooooooooo#$$$", Info)
                  return (
                    <tr>
                      <td>{i+1}</td>
                      <td>{d.name}</td>
                      <td>{d.department}</td>
                      <td>{d.leaveType}</td>
                      <td>{new Date(d.from).toDateString()}</td>
                      <td>{new Date(d.to).toDateString()}</td>
                      <td>{d.reason}</td>
                      <td>{d.leaveDuration}</td>
                      <td>
                        {/* <p
                          className={`${
                            d.status === "Reject" ? "tableCell1" : ""
                          }  ${
                            d.status === "Pending Approval" ? "tableCell2" : ""
                          }  ${d.status === "Approved" ? "tableCell " : ""}`}
                        >
                          {d.status}
                        </p> */}
                        <span className={`${d.status === 'Pending Approval' ? "badge badge-warning" : d.status === "Approved" ? "badge badge-success" :d.status === "Reject" ? "badge badge-danger":""} border-0`}>{d.status}</span>
                      </td>
                    </tr>
                  );
                }) 
                }
              </tbody>
            </Table> :<div><h4 className="text-center">No leaves Data available</h4></div>
            }
          </Container>
        </section>
        <NotificationContainer />
      </div>
      {/* //style={{display:"none"}} */}
      <div className="pb-5 mb-5"  style={{display:"none"}}>
        <div ref={componentRef} className=" content-wrapper">
             <Report Info={Info}/>
        </div>
          
        

      </div>
    </>
  );
};

export default LeaveRequest;
