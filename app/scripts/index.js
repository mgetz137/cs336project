/*
/CS 336 Final Project
/Austin Gibson, Matt Getz, Daniel Garcia
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import MapBox from './mapBox';
import MapEdit from './mapEdit';

import '../css/base.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={MapBox}/>
        <Route path="/:mapID" component={MapEdit} />
    </Router>
), document.getElementById('content'));