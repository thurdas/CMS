import React, { Component } from 'react';

import { Grid, Row, Col, FormGroup, FormControl,
    ButtonToolbar, Button, Modal, NavItem } from 'react-bootstrap'
import '../App.css';


class Page404 extends Component {


    render() {


        return (

            <Col md={11} lg={11} className="menu">
                <Row>
                    <Col md={11} lg={11}>
                        <h3>404 not found</h3>

                    </Col>

                </Row>
            </Col>

        );
    }
}

export default Page404;
