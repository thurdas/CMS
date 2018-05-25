import React, { Component } from 'react';
import logo from '../logo.svg';
import { Grid, Row, Col, FormGroup, FormControl,
    ButtonToolbar, Button, Modal, NavItem } from 'react-bootstrap'
import Menu from './Menu'
import Dash from './Dash'
import AddBpost from './AddBpost'
import LoadPost from "./LoadPost";
import LoadEditPost from "./LoadEditPost"
import EditPost from "./EditPost"
import PostList from "./PostList"
import Blog from './Blog'
import Page404 from "./Page404"
import '../App.css';

import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Grid className="App" fluid={true}>
        <Menu/>
          <Switch>
              <Route exact path='/dashboard' component={Dash}/>
              <Route exact path='/newpost' component={AddBpost}/>
              <Route exact path='/posts' component={PostList}/>
              <Route exact path='/editpost' component={EditPost}/>
              <Route exact path='/editpost/:id' component={LoadEditPost}/>
              <Route exact path='/blog' component={Blog}/>
              <Route exact path='/blog/:id' component={LoadPost}/>
              <Route exact path='*' component={Page404}/>
          </Switch>
      </Grid>
    );
  }
}

export default App;

