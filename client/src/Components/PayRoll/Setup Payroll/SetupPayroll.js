import React from "react";
import { Link } from "@mui/material";
import { Container ,Row,Col, Card} from "react-bootstrap";
import { useState ,useEffect} from "react";
import axios from "axios";
const Setup = () => {
     const url ="/setup"
     const payperiodurl = '/payperiod'
     const [setup,setsetup] = useState([])
     const [payperiod,setpayperiod] = useState([])
     const [newarray,setnewarray] = useState([])
     
   const fetchPaycycle = async () =>{
      try{
             const getdata = await axios.get(url);
               console.log(getdata.data);
               const data = getdata.data;
               setsetup(data.setup);
               try{
                const getperiod = await axios.get(payperiodurl)
                 console.log([getperiod.data])
                 const data = getperiod.data.payperiod;
                 setpayperiod(data);

               }catch(error){
                console.log(error)
               }
              
             
      }catch(error){
        console.log(error)
      }
   }
 
    
   useEffect(()=>{
        fetchPaycycle();
   },[])
   let alldata =[];
   setup.map((d)=>{
     alldata.push({
      payrollname:d.payrollname,
      paycycle:d.paycycle.frequency,
      payperiod:payperiod.map((d)=>{
        return {
          start:d.start,
          end:d.end
        }
      })
      
     })
   })
   console.log("all data",alldata)
  return (
    <div>
      <div className="content-wrapper " style={{ backgroundColor: "#f7f7f7" }}>
        <section className="content-header ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">PayRoll</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">PayRoll</li>
                </ul>
                <div className="col-auto float-end ms-auto">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <a
                      className="btn add-btn "
                      data-bs-toggle="modal"
                      data-bs-target="#add_calendar"
                    >
                      <i
                        className="fa fa-plus"
                        style={{ fontSize: "14px", marginRight: "2px" }}
                      ></i>
                      PayRoll Setup
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container">
            <div className="card">
              <div className="card-header buttoncolor ">
                <h3 className="card-title" style={{ color: "white" }}>
                  Available Processes
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ height:"min-content", width: "100%" }}>
                    <Container >
                    <Card>
                      <Row className="px-3">
                        <Col xxl='3' xl='3' md='3' lg='3' sm='3'>
                          
                              
                               <Row>
                               <Col xl='6' lg='6' md='6'>
                                   <div className="d-flex flex-column justify-content-center py-3">
                                      <div><h6 className="font-weight-bold">PayRoll</h6></div>
                                      <div><p>My payroll</p></div>
                                   </div>
                                </Col>
                                <Col xl='6' lg='6' md='6'>
                                <div className="d-flex flex-column justify-content-center py-3">
                                      <div><h6 className="font-weight-bold">PayCycle</h6></div>
                                      <div><p>Monthly</p></div>
                                   </div>
                                </Col>
                               </Row>
                         
                        </Col>
                       
                        <Col xxl='6' xl='5' lg='6'>
                        <Row>
                               <Col xl='4' lg='4' md='4'>
                                   <div className="d-flex flex-column justify-content-center py-3">
                                      <div><h6 className="font-weight-bold">PayCycle(Monthly)</h6></div>
                                      <div><p>Monthly</p></div>
                                   </div>
                                </Col>
                                <Col xl='8' lg='8' md='8'>
                                <div className="d-flex flex-column justify-content-center py-3">
                                      <div><h6 className="font-weight-bold">PayPeriod</h6></div>
                                      <div>
                                      <p>
                                       (1-01-2023)
                                      </p>
                                      </div>
                                      <div>
                                        <p>(31-01-2023)</p>
                                      </div>
                                   </div>
                                </Col>
                               </Row>
                           
                           
                      </Col>
                      <Col xxl='2' xl='3' lg='3'>
                        <div className="d-flex flex-column justify-content-center py-3">
                                      <div><h6 className="font-weight-bold">PayPeriod(Monthly)</h6></div>
                                      <div>
                                      <p>
                                       (1-01-2023)
                                      </p>
                                      </div>
                                      <div>
                                        <p>(31-01-2023)</p>
                                      </div>
                                   </div>
                        </Col>
                       
                        
                        
                       
                      </Row>
                      </Card>
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Setup;
