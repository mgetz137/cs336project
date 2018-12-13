import React from 'react';
import Remarkable from 'remarkable';
import {Link} from 'react-router';


var imgStyle = {
    width: '200px',
    height: '200px',
}

module.exports = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    },
    render: function () {
        return (
            <div className="map">
                <h2 className="map_title">
                    {this.props.title}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
                <div className="mapContent">
                    <section className="mapCountry">Country: {this.props.country} State: {this.props.state} City: {this.props.city} Year: {this.props.year} Scale: {this.props.scale} Type: {this.props.type}</section>
                    <a href={this.props.imgUrl}>
                        <img src={this.props.imgUrl} style={imgStyle}/>
                    </a>
                    <Link to={'/' + this.props.id} style={{display: 'block'}}>Edit</Link>
                </div>
            </div>
        );
    }
});
