import React from 'react';
import $ from 'jquery';

import CommentList from './userList';
import CommentForm from './userForm';
import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: [], _isMounted: false};
    },
    loadCommentsFromServer: function() {
        if (this.state._isMounted) {
            $.ajax({
                url: API_URL,
                dataType: 'json',
                cache: false,
            })
                .done(function (result) {
                    this.setState({data: result});
                }.bind(this))
                .fail(function (xhr, status, errorThrown) {
                    console.error(API_URL, status, errorThrown.toString());
                }.bind(this));
        }
    },
    handleCommentSubmit: function(user) {
        var users = this.state.data;
        user.id = Date.now();
        var newUsers = users.concat([user]);
        this.setState({data: newUsers});
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: user,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: users});
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.state._isMounted = true;
        this.loadCommentsFromServer();
        setInterval(this.loadUsersFromServer, POLL_INTERVAL);
    },
    componentWillUnmount: function() {
        // Reset the isMounted flag so that the loadCommentsFromServer callback
        // stops requesting state updates when the commentList has been unmounted.
        // This switch is optional, but it gets rid of the warning triggered by
        // setting state on an unmounted component.
        // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
        this.state._isMounted = false;
    },
    render: function() {
        return (
            <div className="userBox">
                <h1>Users</h1>
                <UserList data={this.state.data} />
                <UserForm onUserSubmit={this.handleUserSubmit} />
            </div>
        );
    }
});
