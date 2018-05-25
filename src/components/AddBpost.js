import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl,
    ButtonToolbar, Button, Modal, NavItem } from 'react-bootstrap'
import '../App.css';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class AddBpost extends Component {


    state = {
        editorState: EditorState.createEmpty(),
        test: '<h1>Hi there!</h1>',
        content: '',
        date: '',
        title: ''
    }


    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
    };


    render() {


        const { editorState } = this.state;

        return (


                    <Col md={11} lg={11} xs={9} sm={9} className="component">
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
                        <Row>
                            <Col md={8}>
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

                        </div>
                            </Col>
                            <Col md={4}>

                                <input
                                    value={this.state.date}
                                    onChange={(e) => this.setState({ date: e.target.value })}
                                    type='datetime-local'
                                    placeholder=''
                                />
                                <br/>
                                <Button bsStyle="success" onClick={() => this._createPost()}>Submit Post</Button>
                            </Col>
                        </Row>
                    </Col>


        );
    }


_createPost = async () => {

const content = this._name.value
    const { date, title } = this.state
    await this.props.createPostMutation({
        variables: {
            content,
            date,
            title
        }
    })

}

}
const CREATE_POST_MUTATION = gql`
    mutation CreatePost($content: String!, $date: String!,
    $title: String!) {
        createPost(
            content: $content,
            date: $date,
            title: $title
        ) {
            id
            content
            date
            title

        }
    }
`

// 3
export default graphql(CREATE_POST_MUTATION, { name: 'createPostMutation' })(AddBpost)
