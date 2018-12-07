/*
/CS 336 Final Project
/Austin Gibson, Matt Getz, Daniel Garcia
*/
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Map from './map';

module.exports = React.createClass({
  render: function() {
    var mapNodes = this.props.data.map(function(map) {
      return (
        <Map mapID={map.mapID}>
          {map.state}
          {map.year}
          {map.country}
          {map.type}
        </Map>
      );
    });
    return (
      <div className="mapList">
        {mapNodes}
      </div>
    );
  }
})