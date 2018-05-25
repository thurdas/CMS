import React, { Component } from 'react'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

import { Grid, Row, Col, FormGroup, FormControl,
    ButtonToolbar, Button, Modal, NavItem } from 'react-bootstrap'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {

    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        name: '',
        imageUrl: 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png',
        show: false,
    }

    render() {
        let close = () => this.setState({ show: false });
        return (
            <div>

                <NavItem onClick={() => this.setState({ show: true })}>Login</NavItem>

                <Modal
                    show={this.state.show}
                    onHide={close}

                    aria-labelledby="contained-modal-title"
                    className="modal"

                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            <h4>{this.state.login ? 'Login' : 'Sign Up'}</h4>
                        </Modal.Title>

                    </Modal.Header>
                    <Modal.Body >

                        <form>
                            <FormGroup>
                                {!this.state.login &&
                                <FormControl
                                    type="text"
                                    placeholder="Your name"
                                    value={this.state.name}
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                />
                                }
                                <FormControl
                                    type="text"
                                    placeholder="Your email adress"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                                <FormControl
                                    type="password"
                                    placeholder="Your password"
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />
                            </FormGroup>
                        </form>
                        <ButtonToolbar>
                            <Button
                                onClick={() => this._confirm()}
                            >{this.state.login ? 'login' : 'create account' }</Button>
                        </ButtonToolbar>
                        <div
                            className='pointer button'
                            onClick={() => this.setState({ login: !this.state.login })}
                        >
                            {this.state.login ? "Don't have an account? Sign up" : 'Have an accoint? Log in'}
                        </div>
                    </Modal.Body>

                </Modal>

            </div>
        )
    }

    _confirm = async () => {
        const { name, email, password, imageUrl } = this.state
        if (this.state.login) {
            const result = await this.props.authenticateUserMutation({
                variables: {
                    email,
                    password
                }
            })
            const { id, token } = result.data.authenticateUser
            this._saveUserData(id, token)
        } else {
            const result = await this.props.signupUserMutation({
                variables: {
                    name,
                    email,
                    password,
                    imageUrl
                }
            })
            const { id, token } = result.data.signupUser
            this._saveUserData(id, token)
        }

        window.location.reload()
    }

    _saveUserData = (id, token) => {
        localStorage.setItem(GC_USER_ID, id)
        localStorage.setItem(GC_AUTH_TOKEN, token)
    }

}

const SIGNUP_USER_MUTATION = gql`
    mutation SignupUserMutation($email: String!, $password: String!, $name: String!, $imageUrl: String!) {
        createUser(
            email: $email,
            password: $password,
            name: $name,
            imageUrl: $imageUrl
        ) {
            id
        }
    }
`

const AUTHENTICATE_USER_MUTATION = gql`
    mutation AuthenticateUserMutation($email: String!, $password: String!) {
        authenticateUser(
            email: $email,
            password: $password
        ) {
            id,
            token
        }
    }
`

export default compose(
    graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
    graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' })
)(Login)