
import React, { Component } from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'



class Blog extends Component {



    render() {

        if (this.props.allPostsQuery && this.props.allPostsQuery.loading) {
            return <div>Loading</div>
        }

        if (this.props.allPostsQuery && this.props.allPostsQuery.error) {
            return <div>Error</div>
        }

        const postsToRender = this.props.allPostsQuery.allPosts
        console.log(this.props.allPostsQuery.allPosts)
        return (

            <Col md={11} lg={11} className="component">

                <Row className="big_padding">
                    <div className="container-fluid center">

                            <h2>Blog Preview</h2>

                    </div>
                </Row>



                <hr></hr>

                <Row>

                    {postsToRender.map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}

                </Row>

            </Col>



        )
    }


}

const ALL_POSTS_QUERY = gql`

    query AllPostsQuery {
        allPosts {
            id
            date
            title
            content
        }
    }

`


export default graphql(ALL_POSTS_QUERY, { name: 'allPostsQuery' }) (Blog)
