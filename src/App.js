import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import Home from './containers/Home';
import './App.css';

const email = "samuel.kivi98@gmail.com"

const App = () => (
    <div className='app'>
        <h1>React User Database</h1>
        <Navigation />
        <Main />
    </div>
);

const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
            <li><NavLink to='/Login'>Insert</NavLink></li>
        </ul>
    </nav>
);

const About = () => (
    <div className='about'>
        <h1>About This Page</h1>
        <p>This is a simple user database. You can insert names and passwords to the database with Insert</p>
        <p></p>
    </div>
);

const Contact = () => (
    <div className='contact'>
        <h1>Contact Me</h1>
        <p>You can reach me via email: <a href={"mailto:" + email}>samuel.kivi98@gmail.com</a></p>
        <p>Here is my github: <a href="https://github.com/samuelkivi">GitHub</a></p>
    </div>
);

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/contact' component={Contact}></Route>
        <Route exact path='/Login' component={Login}></Route>
    </Switch>
);

export default App;