import React, { Component } from 'react';

import { Grid, Row, Col, FormGroup, FormControl,
    ButtonToolbar, Button, Modal, NavItem } from 'react-bootstrap'
import '../App.css';


class Dash extends Component {



    state = {

        test: '<h1>Hi there!</h1>'
    }




    render() {

        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        const currDate = "Current Date= "+date;


        return (

            <Col md={11} lg={11} className="">
                <Row>
                    <Col md={11} lg={11}>
                        <h3>Profile name</h3>
                        <p>{currDate}</p>
                        <div dangerouslySetInnerHTML={{ __html: this.state.test }} />

                    </Col>

                </Row>
            </Col>

        );
    }
}

export default Dash;
