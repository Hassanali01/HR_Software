import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useLocation } from "react-router-dom";
import HolidaysDetails from "./HolidaysDetails/HolidaysDetails";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import HeaderContext from '../../Context/HeaderContext'




const Holiday = () => {



  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [calendar, setcalendar] = useState([]);
  const [calendarId, setStoreId] = useState("");
  const [title, settitle] = useState("");
  const [from, setfrom] = useState("");
  const [type, settype] = useState("");
  const [to, setto] = useState("");
  const [error, setError] = useState(false);
  const [update, setupdate] = useState(true);


  // (date) => {
  //   setSavedate(date.getFullYear())}


  const [validation, setvalidate] = useState({
    calendarId: "",
    title: "",
    from: "",
    type: "",
    to: "",
  });
  const url = "/holiday/addholiday";



  //posting calendar with holidays 
  const fetchData = async () => {
    try {
      const res = await axios.get("/calendar");
      const data = res.data.calendar;
      setcalendar(data);
    } catch (error) {

      NotificationManager.error("error");
    }
  };
  const handlePost = async (e) => {
    e.preventDefault();
    const newHoliday = {
      title,
      from,
      to,
    };
    let errors = { ...validation };
    //titlevalidation
    if (!title.trim()) {
      errors.title = "Required Field";
    } else if (!title.trim().length <= 5) {
      errors.title = "Title is very short";
    } else {
      errors.title = "";
    }
    //date validation
    if (!from) {
      errors.from = "Date is required";
    } else if (!to) {
      errors.from = "date is required";
    }
    setvalidate(errors);
    try {
      const saveHoliday = await axios.post(url, newHoliday);

      saveHoliday && handleClose();
      NotificationManager.success("Successfully Created");
    } catch (error) {

      NotificationManager.error("Something went wrong");
    }


  };

  useEffect(() => {
    fetchData();
  }, [update]);


  const a = useContext(HeaderContext)
  useEffect(() => {
    a.update("Human Resource / Holidays")
  })


  const handleInput = (e) => {
    e.preventDefault();

    setStoreId(e.target.value);
  };

  return (
    <>
      <div className="content-wrapper" style={{ backgroundColor: "#f7f7f7" , marginTop:"30px"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                {/* <h3 className="page-title">Holidays</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                    Human Resource
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Holidays</li>
                </ul> */}

                <div className="col-auto float-end ms-auto">
                  <a
                    className="btn add-btn "
                    data-bs-toggle="modal"
                    data-bs-target="#add_calendar"
                    onClick={handleShow}
                  >
                    <i className="fa fa-plus">
                      {" "}
                      Add Holiday
                    </i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="centent">
          <div className="container-fluid">
            <div className="card">
              <div
                className="card-header  "
                style={{ backgroundColor: "#26ad9d" }}
              >
                <h3 className="card-title" style={{ color: "white" }}>
                  Available Holidays
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive" style={{ height: "500px" }}>
                  <HolidaysDetails />

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <NotificationContainer />

      {/* add holiday popup modal */}
      <Modal
        size="md"
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="header-modal"
          >
            <CalendarMonthIcon style={{ color: "#ff9b44" }} />{" "}
            <span>Add Holidays</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form type="submit" onSubmit={handlePost}>
            <Form.Group>
              <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                <Form.Label>Holiday Name </Form.Label>

                <Form.Control
                  type="text"
                  name="holiday"
                  placeholder="Holiday Name"
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="date"
                  name="from"
                  onChange={(e) => {
                    setfrom(e.target.value);
                  }}
                />
              </Form.Group>
              {validation.from && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {validation.from}
                </p>
              )}
              <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="date"
                  name="to"
                  onChange={(e) => {
                    setto(e.target.value);
                  }}
                />
              </Form.Group>
              {validation.to && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {validation.to}
                </p>
              )}
              <Form.Group>
                <Form.Label>Holiday Type</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                />
              </Form.Group>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" className="btn mt-4">
                  Add Holidays
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Holiday;
