import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Login.css";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Checks that there is username and password
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleSave(e) {
    console.log("handleSave")
    e.preventDefault();
    console.log(username, password, "toimii");

    //Sends post to server.js
    axios.post('http://localhost:3001/save', {
      username: username,
      password: password
    })
      //Response from the server
      .then((response) => {
        console.log(response);
        if(response.data == "ookoo"){
          console.log("Username and password saved");
        }
        else{
          console.log("Username and password not saved");
        }
      }, (error) => {
        console.log(error);
      });
  }

  function handleShow(e) {
    console.log("handleShow")
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()} onClick={handleSave}>
          Save to the database
        </Button>
        <Button block size="lg" type="submit" onClick={handleShow}>
          Show database
        </Button>
      </Form>
    </div>
  );
}