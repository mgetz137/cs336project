import React from 'react';

import User from './users';

module.exports = React.createClass({
    render: function () {
        var userNodes = this.props.data.map(function (users) {
            return (
                <User id={user.id} role={user.role}
                         key={user.id}>
                    {user.handle}
                </User>
            );
        });
        return (
            <div className="userList">
                {userNodes}
            </div>
        );
    }
});
