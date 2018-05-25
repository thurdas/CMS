import React, { Component } from 'react'
import { Grid, Row, Col, Image, Button } from 'react-bootstrap'
import { withApollo } from 'react-apollo'
import Post from './Post'
import { graphql } from 'react-apollo'
import ConfimEditPost from "./ConfirmEditPost"
import DeletePost from "./DeletePost"
import gql from 'graphql-tag'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


class LoadPost extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        post: {},
        postId: this.props.match.params.id,
        content: '',
        title: ''

    }


    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
    };


    componentDidMount() {
        this._executeSearch()
    }

    render() {


        const contentBlocks = htmlToDraft(this.state.content);
        const contentState = ContentState.createFromBlockArray(contentBlocks);
        const editorState = EditorState.createWithContent(contentState);

        var postId = this.state.postId
        var post = this.state

        return (


            <Col md={11} lg={11} className="component">
                <h2>New Blog Post</h2>
                <Row>
                    <Col md={6}>
                        <h3>Post Title</h3>
                        <input
                            value={this.state.title}
                            onChange={(e) => this.setState({ title: e.target.value })}
                            type='text'
                            placeholder='Post Title'
                        />
                    </Col>
                </Row>


                    <div>

                        <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                        <textarea
                            ref={input => this._name = input}
                            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                            onChange={(e) => this.setState({ content: draftToHtml(convertToRaw(editorState.getCurrentContent())) })}
                        />
                        <ConfimEditPost
                            key={postId} post={post} postId={postId} />

                        <DeletePost
                        key={postId} post={post} postId={postId}
                        />
                    </div>

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
        this.setState({  title:post.title, content:post.content})

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