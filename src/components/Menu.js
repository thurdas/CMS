import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Grid, Row, Col, FormGroup, FormControl,
    ButtonToolbar, Button, Modal,  Nav, Navbar, NavItem } from 'react-bootstrap'
import '../App.css';
import Login from './Login'

class Menu extends Component {
    render() {
        const loginbutton = this._login()
        return (

                <Col md={1} lg={1} sm={3} xs={3} className="menu">


                                    <Nav >

                                            <li><Link to='/dashboard'>Dashboard</Link></li>
                                            <li><Link to='/newpost'>Add Post <i className="fas fa-plus"></i></Link></li>
                                            <li><Link to='/posts'>Posts <i className="fas fa-th-list"></i></Link></li>
                                            <li><Link to='/blog'>Blog <i className="fab fa-blogger-b"></i></Link></li>


                                    </Nav>




                </Col>

        );
    }

    _login() {
        return(
            <Login/>
        )


    }
}

export default Menu;
