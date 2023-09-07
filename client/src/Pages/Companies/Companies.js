import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  Modal,
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Table from "./TableView/Table";
import HeaderContext from '../../Context/HeaderContext'
import '../Companies/companies.css'


const Companies = () => {
  const [getdata, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [view, setView] = useState('module');
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = "allCompany";

  const companies = async () => {
    try {
      const companies = await axios.get(process.env.React_APP_ORIGIN_URL + url);
      const res = companies.data;
      setData(res);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, nextView) => {
    setView(!view);
    setView(nextView);
    setView(!view);
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const save = await axios.post(process.env.React_APP_ORIGIN_URL + 'company', {
        title: companyName,
        description: description,
      });
      save && NotificationManager.success("Successfully Added");
      window.location.replace("/companies");
    } catch (error) {
      NotificationManager.error("Failed to add companies");
    }
  };

  useEffect(() => {
    companies();
  }, []);
  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Companies")
  })

  return (
    <>
      <div className="content-wrapper ">
        <section className="content">
          <div className="container">
            <div className="card">
              <div className="card-header  buttoncolor " style={{paddingRight: "0px"}}>
                <h3 className="card-title" style={{ fontWeight: "700"}} >
                  Companies
                </h3>
                <div className="icon-button">
                  <div>
                    <ToggleButtonGroup
                      orientation="horizontal"
                      style={{height: "38px"}}
                      value={view}
                      exclusive
                      onChange={handleChange}
                    >
                      <ToggleButton value="module" aria-label="module" selected={!view}>
                        <ViewModuleIcon />
                      </ToggleButton>
                      <ToggleButton value="list" aria-label="list" selected={view}>
                        <ViewListIcon />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center"}}
                    onClick={handleShow}
                  >
                    <a
                      className="btn add-btn "
                      data-bs-toggle="modal"
                      data-bs-target="#add_calendar"
                    >
                      <i
                        className="fa fa-plus"
                      >
                        {" "}
                      </i>
                      Add Companies
                    </a>
                  </div>
                </div>

              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ height: 500, width: "100%" }}>
                    {view ? (
                      <Table data={getdata}></Table>
                    ) : (
                      <Container>
                        <Row>
                          {getdata.map((d, i) => {
                            let demo = d.description
                            let arr = []
                            console.log(demo)
                            for (let a in demo) {
                              arr.push(demo[a])
                            }
                            let value = arr.slice(0, 20).join('')
                            return (
                              <>
                                <Col xs="12" xl="3" lg="4" md="6" sm="6">
                                  <Card>
                                    <Card.Title className="id">
                                      {d.title}
                                    </Card.Title>
                                    <Card.Body>
                                      <Card.Text>{value}</Card.Text>

                                    </Card.Body>
                                  </Card>
                                </Col>
                              </>
                            );
                          })}
                        </Row>
                      </Container>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <NotificationContainer />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            ></Form.Control>
            <br />
            <Form.Label>Description</Form.Label>
            <textarea
              class="form-control"
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <div className="mt-2 d-flex align-items-center justify-content-center">
              <Button type="submit" style={{backgroundColor: "rgb(137, 179, 83)"}}>Submit</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Companies;
