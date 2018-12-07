import React from 'react';
import Remarkable from 'remarkable';
//import {Link} from 'react-router';
// code for link: <Link to={'/' + this.props.id}>Edit</Link>

module.exports = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    },
    render: function () {
        return (
            <div className="map">
                <h2 className="mapTitle">
                    {this.props.title}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
});