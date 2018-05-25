import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ButtonToolbar, Button, FormGroup, FormControl } from 'react-bootstrap'

import { Link } from 'react-router-dom'


class ConfirmEditPost extends Component {

    state = {
        postId: this.props.post.postId,
        nid: this.props.post.id,
        title: this.props.post.title,
        content: this.props.post.content

    }


    render() {

        this.state.postId = this.props.post.postId
        this.state.title = this.props.post.title
        this.state.content = this.props.post.content

        const link = "/u/"+this.state.userId
console.log(this.props.post.postId)
        return (
            <div>
<h3>{this.state.nid}</h3>

                <Button bsStyle="success" onClick={async () => await this._updatePost()}>Confirm Edit Post</Button>

            </div>
        )
    }


    _updatePost = async () => {

        const { title, content, postId } = this.state
        await this.props.updatePostMutation({
            variables: {
                title,
                content,
                postId

            }
        })
    window.location.reload()
    }

}
// 1
const UPDATE_POST_MUTATION = gql`
    mutation UpdatePostMutation($title: String, $content: String, $postId: ID!) {
        updatePost(
            id: $postId,
            title: $title,
            content: $content
        ) {
            id
            title
            content
        }
    }
`

// 3
export default graphql(UPDATE_POST_MUTATION, { name: 'updatePostMutation' })(ConfirmEditPost)