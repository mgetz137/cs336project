import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
    getInitialState: function() {
        return {role: '', text: ''};
    },
    handleAuthorChange: function(e) {
        this.setState({role: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({fullname: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var role = this.state.role.trim();
        var fullname = this.state.fullname.trim();
        if (!fullname || !role) {
            return;
        }
        this.props.onUserSubmit({role: role, fullname: fullname});
        this.setState({role: '', fullname: ''});
    },
    render: function() {
        return (
            <form className="userForm" onSubmit={this.handleSubmit}>
                <input className="ui-widget ui-corner-all" type="fullname" placeholder="role..."
                    value={this.state.role} onChange={this.handleAuthorChange}
                />
                <input className="ui-widget ui-corner-all" type="fullname" placeholder="full name..."
                    value={this.state.fullname} onChange={this.handleFullnameChange}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
});
