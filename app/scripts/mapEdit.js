import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import {API_URL} from './global';

module.exports = React.createClass({
    getInitialState: function () {
        return {title: '', country:'', state:'', city:'', year:'', scale:'', type:''};
    },
    componentDidMount: function () {
        this.loadData();
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.params.mapID != prevProps.params.mapID) {
            this.loadData();
        }
    },
    loadData: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.mapID,
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
    handleTitleChange: function(e) {
    this.setState({title: e.target.value});
    },
    handleCountryChange: function(e) {
    this.setState({country: e.target.value});
    },
    handleStateChange: function(e) {
    this.setState({state: e.target.value});
    },
    handleCityChange: function(e) {
    this.setState({city: e.target.value});
    },
    handleYearChange: function(e) {
    this.setState({year: e.target.value});
    },
    handleScaleChange: function(e) {
    this.setState({scale: e.target.value});
    },
    handleTypeChange: function(e) {
    this.setState({type: e.target.value});
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function () {
        var updatedMap = {
            title: this.state.title.trim(),
            country: this.state.country.trim(),
            state: this.state.state.trim(),
            city: this.state.city.trim(),
            year: this.state.year.trim(),
            scale: this.state.scale.trim(),
            type: this.state.type.trim()
        };
        $.ajax({
            url: API_URL + "/" + this.props.params.mapID,
            dataType: 'json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedMap)
        })
            .done(function (maps) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    handleDelete: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.mapID,
            type: 'DELETE',
        })
            .done(function (maps) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <form className="mapForm">
                    <h1>Map Edit - {this.props.params.mapID}</h1>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <input
                        type="text"
                        value={this.state.country}
                        onChange={this.handleCountryChange}
                    />
                    <input
                        type="text"
                        value={this.state.state}
                        onChange={this.handleStateChange}
                    />
                    <input
                        type="text"
                        value={this.state.city}
                        onChange={this.handleCityChange}
                    />
                    <input
                        type="text"
                        value={this.state.year}
                        onChange={this.handleYearChange}
                    />
                    <input
                        type="text"
                        value={this.state.scale}
                        onChange={this.handleScaleChange}
                    />
                    <input
                        type="text"
                        value={this.state.type}
                        onChange={this.handleTypeChange}
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
