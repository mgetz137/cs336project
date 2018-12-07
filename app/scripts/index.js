/*
/CS 336 Final Project
/Austin Gibson, Matt Getz, Daniel Garcia
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import MapBox from './mapBox';
//import CommentEdit from './commentEdit';
//code for edit : <Route path="/:id" component={CommentEdit} />

import '../css/base.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={MapBox}/>
    </Router>
), document.getElementById('content'));