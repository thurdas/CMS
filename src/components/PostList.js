
import React, { Component } from 'react'
import {Grid, Row, Col, Table} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EditPost from './EditPost'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'



class PostList extends Component {



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
                        <Col md={12}>
                            <h2>Post list</h2>

                        </Col>
                    </div>
                </Row>

                <Row className="big_padding">
                    <div className="container-fluid center">
                        <Col md={12}>


                        </Col>
                    </div>
                </Row>

                <hr></hr>

                <Row>
<Table>
    <tbody>
    <tr>
        <th>Title</th>
        <th>Created At</th>
        <th>Updated At</th>
        <th>Tools</th>
    </tr>
    {postsToRender.map((post) => (
        <EditPost key={post.id} post={post}/>
    ))}
    </tbody>

</Table>
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
            createdAt
            updatedAt
        }
    }

`


export default graphql(ALL_POSTS_QUERY, { name: 'allPostsQuery' }) (PostList)
