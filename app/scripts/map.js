import React from 'react';
import Remarkable from 'remarkable';
import {Link} from 'react-router';


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
                <section className="mapCountry">Country: {this.props.country} State: {this.props.state} 
                    City: {this.props.city} Year: {this.props.year} Scale: {this.props.scale} Type: {this.props.type} Image: {this.props.imgURL}</section>
                <Link to={'/' + this.props.id}>Edit</Link>
            </div>
        );
    }
});
