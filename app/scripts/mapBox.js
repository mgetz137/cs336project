/*
/CS 336 Final Project
/Austin Gibson, Matt Getz, Daniel Garcia
*/

import React from 'react';
import $ from 'jquery';

import MapList from './mapList';
import MapForm from './mapForm';
import { API_URL, POLL_INTERVAL } from './global';


var row = {
    display: 'flex'
}

var col = {
    flex: '1',
    padding: '1em'
}

var filterStyle = {
    padding: '10px 10px',
    borderRadius: '5px',
    width: '200px'
}


module.exports = React.createClass({
    getInitialState: function() {
        return {data: [], dataList: [],_isMounted: false, _isInitial: true};
    },
    loadMapsFromServer: function() {
        if (this.state._isMounted && this.state._isInitial) {
            $.ajax({
                url: API_URL,
                dataType: 'json',
                cache: false,
            })
                .done(function (result) {
                    this.setState({data: result});
                    this.setState({dataList: result});
                }.bind(this))
                .fail(function (xhr, status, errorThrown) {
                    console.error(API_URL, status, errorThrown.toString());
                }.bind(this));
        } else {
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
    handleMapSubmit: function(map) {
        var maps= this.state.data;
        var newMaps = maps.concat([map]);
        this.setState({data: newMaps});
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: map,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: maps});
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.state._isMounted = true;
        this.loadMapsFromServer();
        setInterval(this.loadMapsFromServer, POLL_INTERVAL);
    },
    componentWillUnmount: function() {
        // Reset the isMounted flag so that the loadCommentsFromServer callback
        // stops requesting state updates when the commentList has been unmounted.
        // This switch is optional, but it gets rid of the warning triggered by
        // setting state on an unmounted component.
        // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
        this.state._isMounted = false;
    },
    filterData: function() {

        var maps = this.state.data;
        var newMaps = maps.filter(function(item) {
            return item.type.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        
        this.setState({dataList: newMaps});
        this.state._isInitial = false;
        
    },
    render: function() {
        return (
            <div className="mapBox" style={row}>
                <div style={col}>
                    <h1>Geography Department Maps</h1>
                    <input type="text" style={filterStyle}
                        placeholder="Search by map type" onChange={this.filterData}/>
                    
                    <MapList data={this.state.dataList} />

                </div>
                <div style={col}>
                    <h1> Add New Map </h1>
                    <MapForm onMapSubmit={this.handleMapSubmit} />
                </div>
            </div>
        );
    }
});
