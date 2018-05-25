import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Row, Col, Thumbnail, Modal, Media, Button } from 'react-bootstrap'


class Post extends Component {


    render() {

        const postUrl = "/blog/" + this.props.post.id
        return (
            <div>
                <Link to={postUrl}>
                    <Col xs={12} sm={12} md={4} lg={4} >



                        <h2>{this.props.post.title}</h2>
                        <h5>Date: {this.props.post.date}</h5>


                    </Col>
                </Link>

            </div>

        )
    }

    _test() {
        var tempDate = new Date();
        if(this.props.post.date > this.props.post.createdAt) {
            return(
                <p>yessss</p>
            )
        }
    }

}

export default Post

