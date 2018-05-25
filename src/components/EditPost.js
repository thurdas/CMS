import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Row, Col, Thumbnail, Modal, Media, Button } from 'react-bootstrap'


class EditPost extends Component {



    render() {

        var postId = this.props.post.id
        const postUrl = "/editpost/" + this.props.post.id
const te = this._test()
        return (
            <tr>
                <th>
                    <Link to={postUrl}>
                        <h4>{this.props.post.title}</h4>
                    </Link>
                </th>
               <th>
                   <h5>Date: {this.props.post.createdAt}</h5>
               </th>
                <th>
                    <h5>Date: {this.props.post.updatedAt}</h5>
                </th>
                <th>
                    {te}
                </th>
            </tr>

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

export default EditPost

