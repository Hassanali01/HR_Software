import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Container, Form } from "react-bootstrap";
import "./login.css";
import { Context } from "../../Context/Context"
import { useRef, useContext } from "react";
import  {loginCall}  from "./appicall"
import { useNavigate } from "react-router-dom";
import { NotificationContainer,NotificationManager } from "react-notifications";

const Login = () => {
  const { user, isFetching, dispatch } = useContext(Context)
  const username = useRef();
  const password = useRef();
  let navigate = useNavigate()
  const handleClick = async(e) => {
    e.preventDefault();
   const res =  await loginCall({ username: username.current.value, password: password.current.value }, dispatch)
   console.log("resssssssssssssssss",res)
   if (res){
    navigate("/dashboard")
   }
   else{
    NotificationManager.error("Failed to login")
    
   }
  } 
  
  // const handleClick = async(e) => {
  //   e.preventDefault();
  //   await loginCall({ username: username.current.value, password: password.current.value }, dispatch)
  //   navigate("/dashboard")
  // } 

  console.log("Context", user)


  return (
    <>
      <Container className="plogin ">
        <Card
          style={{ width: "40%", backgroundColor: "white", padding: "40px" }}
          className="page-header"
        >
          <Card.Header
            className="text-center"
            style={{ backgroundColor: "white", }}
          >
            <div className="p-3">
              <h5 style={{ fontSize: "24px" }}>Login</h5>
            </div>
          </Card.Header>
          <Card.Body style={{ backgroundColor: "white", }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username" required ref={username} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required ref={password} />
              </Form.Group>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button variant="success" type="submit" className="px-5 mt-5" onClick={handleClick} >
                  Login
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <NotificationContainer/>
    </>
  );
};


export default Login;
