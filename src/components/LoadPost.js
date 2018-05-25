import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import { withApollo } from 'react-apollo'
import Post from './Post'
import gql from 'graphql-tag'


class LoadPost extends Component {

    state = {
        post: {},
        postId: this.props.match.params.id,

    }

    componentDidMount() {
        this._executeSearch()
    }

    render() {


        return (
            <Col md={11} lg={11} className="">

                <Row>

                    <Col md={12} className="center">
                        <h1>{this.state.post.title} </h1>
                        <p>{this.state.post.date}</p>
                        <div  dangerouslySetInnerHTML={{ __html: this.state.post.content }}></div>
                    </Col>
                </Row>
            </Col>

        )
    }

    _executeSearch = async () => {
        const { postId } = this.state
        const result = await this.props.client.query({
            query: GET_POST,
            variables: { postId }
        })
        const post = result.data.Post
        this.setState({ post })

        console.log(this.state.user)
    }


}



const GET_POST = gql`
    query getPost($postId: ID!) {
        Post(id: $postId) {
            id
            date
            title
            content

        }
    }
`

export default withApollo(LoadPost)