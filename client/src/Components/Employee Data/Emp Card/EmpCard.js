import React from "react";
import { Button, Card, Modal, Form, Col, Row } from "react-bootstrap";
import pp from "../All Employees/avatar.png";
import avatar from "../../../Assets/DataTables img/2.jpg";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useNavigate } from "react-router-dom";

const EmpCard = ({ data, setUpdate }) => {
  const navigate = useNavigate();
  console.log("data", data);

  //userStates
  const [firstname, setfirstname] = useState(data.firstname);
  const [lastname, setlastname] = useState(data.lastname);
  const [email, setemail] = useState(data.setemail);
  const [designation, setdesignation] = useState(data.designation);
  //modal states
  const [show, setShow] = useState(false);
  const [file, setfile] = useState();

  const handleCloseModal = () => setShow(false);
  const handleShow = () => {
    handleClose();
    setShow(true);
  };

  //modal states end

  const PP = "http://localhost:5002/images/";

  //deleting an employee

  const handledelete = async () => {
    try {
      const deleteUser = await axios.delete(`/employees/${data._id}`);
      console.log("deleted user", deleteUser);
      NotificationManager.success("sucessfully deleted");
      // setUpdate(true)
    } catch (error) {
      console.log(error);
    }
  };

  //  useEffect(()=>{

  //  },[update])

  const handleupdateform = {
    userId: data._id,
    firstname,
    lastname,
    email,
    designation,
    //handle user input form data
  };
  console.log(handleupdateform);
  const handleSubmit = async (e) => {
    e.preventDefault(e);
    const url = `employees/${data._id}`;
    try {
      const updateUser = await axios.put(url, handleupdateform);
      console.log("updatedUser", updateUser);
      if (updateUser) {
        return (
          (data.firstname = firstname),
          (data.lastname = lastname),
          (data.email = email),
          (data.designation = designation)
        );
      }
      NotificationManager.success("Successfully Updated");
      handleCloseModal();
    } catch (error) {
      console.log(error);
      NotificationManager.error("Failed to update");
    }
  };

  //more option button code
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const applyImgStyle = {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    marginTop: "2px",
  };
  const cardImg = {
    display: "flex",
    justifyContent: "center",
  };
  const cardDetail = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    // {PP+d.profile.pic}{

    <>
      <Card>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            style={{ color: "black" }}
          >
            <MoreVertIcon />
          </IconButton>
        </div>

        <Menu
          id="long-button"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleShow}>Edit</MenuItem>
          <MenuItem
            onClick={() => {
              handledelete();
              setUpdate(true);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
        {/* <MoreVertIcon style={{ marginLeft: "auto", marginTop: "5px" }} /> */}
        <div style={cardImg}>
          {/* //         {/* PP+d.profilepic */}
          {data.profilepic ? (
            <Card.Img
              variant="top"
              src={data.profilepic}
              style={applyImgStyle}
            />
          ) : (
            <Card.Img variant="top" src={pp} style={applyImgStyle} />
          )}
        </div>

        <Card.Body>
          <div style={cardDetail}>
            {/* {data.firstname} */}
            <div>
              <h4>{data.firstname}</h4>
            </div>
            {/* {d.designation} */}
            <div className="small text-muted">{data.designation}</div>
            <div>
              <Link to={`/employees/${data._id}`}>
                <button
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#26ad9d",
                    color: "#fff",
                    marginTop: "5px",
                  }}
                >
                  See Details
                </button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            style={{ textAlign: "center" }}
          >
            <h5> Update Employee</h5>
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer className="fm">
          <Form className="fm" type="submit" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  defaultValue={data.firstname}
                  onChange={(e) => {
                    setfirstname(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  defaultValue={data.lastname}
                  onChange={(e) => {
                    setlastname(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Email"
                name="email"
                defaultValue={data.email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  placeholder="Designation"
                  name="designation"
                  defaultValue={data.designation}
                  onChange={(e) => {
                    setdesignation(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            {/* <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" className="btn">
                Update Employee
              </Button>
            </div>
          </Form>
        </Modal.Footer>
      </Modal>
      <NotificationContainer />
    </>
  );
};

export default EmpCard;
