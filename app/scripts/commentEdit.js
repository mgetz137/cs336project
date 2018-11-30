import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import {API_URL} from './global';

module.exports = React.createClass({
    getInitialState: function () {
        return {role: '', fullname: ''};
    },
    componentDidMount: function () {
        this.loadData();
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            cache: false,
        })
            .done(function (result) {
                this.setState(result[0]);
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    handleAuthorChange: function (e) {
        this.setState({role: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({fullname: e.target.value});
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function () {
        var updatedComment = {
            role: this.state.role.trim(),
            fullname: this.state.fullname.trim()
        };
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedComment)
        })
            .done(function (users) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    handleDelete: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            type: 'DELETE',
        })
            .done(function (users) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <form className="userForm">
                    <h1>User Edit - {this.props.params.id}</h1>
                    <input
                        type="fullnamet"
                        value={this.state.role}
                        onChange={this.handleAuthorChange}
                    />
                    <input
                        type="fullname"
                        value={this.state.fullname}
                        onChange={this.handleTextChange}
                    />
                    <button type="button" onClick={this.handleUpdate}>Update
                    </button>
                    <button type="button" onClick={this.handleDelete}>Delete
                    </button>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});
