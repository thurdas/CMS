import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ButtonToolbar, Button, FormGroup, FormControl } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class DeletePost extends Component {

    state = {
        postId: this.props.post.postId
    }


    render() {
        this.state.postId = this.props.post.postId

        return (
            <div>



                <Button   bsStyle="danger"  onClick={() => this._deletePost()}>Delete Post</Button>

            </div>
        )
    }


    _deletePost = async () => {
        const { postId } = this.state
        await this.props.deletePostMutation({
            variables: {
                postId
            }
        })
        this.context.history.push(`/posts`)
    }

}
// 1
const DELETE_POST_MUTATION = gql`
    mutation deletePostMutation($postId: ID!) {
        deletePost(
            id: $postId,
        ) {
            id
        }
    }
`

// 3
export default graphql(DELETE_POST_MUTATION, { name: 'deletePostMutation' })(DeletePost)