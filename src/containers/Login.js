import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Login.css";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  //Checks that there is username and password
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(users);
  }

  //Get users from database button
  function handleDatabase(event) {
    event.preventDefault();
    getUsers();
  }

  //Request users from servers
  const getUsers = () => {
    axios.post('http://localhost:3001/getUsers', {
    })
      //Response from the server
      .then((response) => {
        console.log(response.data);
        setUsers(response.data)
      }, (error) => {
        console.log(error);
      });
  }

  //Shows and hides database, adds usernames to a list
  const Database = () => {
    console.log(count);
    var usernames = [];
    for (var i = 0; i < users.length; i++) {
      console.log(users[i].username);
      usernames.push(users[i].username);
    }
    console.log(usernames);
    if (count % 2 === 1) {
      return (
        <Form>
          <Button onClick={() => setCount(count + 1)}>
            Hide database
        </Button>
          {usernames.map(item => (
            <li key={item}>{item}</li>
          ))}
        </Form>
      )
    }
    else {
      return (
        <Form>
          <Button onClick={() => setCount(count + 1)}>
            Show database
        </Button>
        </Form>
      )
    }
  }

  //Saves users to a database
  function handleSave(e) {
    console.log("handleSave")
    e.preventDefault();

    //Sends post to server.js
    axios.post('http://localhost:3001/save', {
      username: username,
      password: password
    })
      //Response from the server
      .then((response) => {
        console.log(response);
        if (response.data === "ookoo") {
          console.log("Username and password saved");
        }
        else {
          console.log("Username and password not saved");
        }
      }, (error) => {
        console.log(error);
      });

      setUsername("");
      setPassword("");
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
        <Button type="submit" disabled={!validateForm()} onClick={handleSave}>
          Save to the database
        </Button>
        <Button onClick={handleDatabase}>
          Get users from database
      </Button>
      </Form>
      <Database />
    </div>
  );
}