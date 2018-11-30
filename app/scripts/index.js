import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import CommentBox from './commentBox';
import CommentEdit from './commentEdit';

import '../css/base.css';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={UserBox}/>
            <Route path="/:id" component={UserEdit}/>
        </Router>
    ), document.getElementById('content')
);
