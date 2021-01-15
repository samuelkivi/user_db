import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import axios from 'axios';
import { createHashHistory } from 'history'
import "./Login.css";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Browser history
  const history = createHashHistory()

  //Checks that there is username and password
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleClick(e) {
    e.preventDefault();
    console.log(username, password, "toimii");

    //Sends post to server.js
    axios.post('http://localhost:3001/auth', {
      username: username,
      password: password
    })
      //Response from the server
      .then((response) => {
        console.log(response);
        if(response == "ookoo",username,password){
          console.log("You in");
          history.push("/Home");
        }
        else{
          console.log("Wrong username or password");
        }
      }, (error) => {
        console.log(error);
      });

      

    //if true router
    //else nothing
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>username</Form.Label>
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
        <Button block size="lg" type="submit" disabled={!validateForm()} onClick={handleClick}>
          Login
        </Button>
      </Form>
    </div>
  );
}