import React from 'react';
import $ from 'jquery';

import '../css/base.css';

module.exports = React.createClass({
  getInitialState: function() {
    return {mapID: '', state:'', year:'', country:'', type:''};
  },
  handleMapIDChange: function(e) {
    this.setState({mapID: e.target.value});
  },
  handleStateChange: function(e) {
    this.setState({state: e.target.value});
  },
  handleYearChange: function(e) {
    this.setState({year: e.target.value});
  },
  handleCountryChange: function(e) {
    this.setState({country: e.target.value});
  },
  handleTypeChange: function(e) {
    this.setState({type: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var mapID = this.state.mapID.trim();
    var state = this.state.state.trim();
    var year = this.state.year.trim();
    var country = this.state.country.trim();
    var type = this.state.type.trim();
    if (!mapID || !state || !year || !country || !type) {
      return;
    }
    this.props.onMapSubmit({mapID: mapID, state: state, year: year, country: country, type: type});
    this.setState({mapID: '', state:'', year:'', country:'', type:''});
  },
  render: function() {
    return (
      <form className="mapForm" onSubmit={this.handleSubmit}>
        <h3> Add New Map </h3>
        <input
          type="text"
          placeholder="Map ID..."
          value={this.state.mapID}
          onChange={this.handleMapIDChange}
        />
        <input
          type="text"
          placeholder="state...."
          value={this.state.state}
          onChange={this.handleStateChange}
        />
        <input
          type="text"
          placeholder="year...."
          value={this.state.year}
          onChange={this.handleYearChange}
        />
        <input
          type="text"
          placeholder="country......"
          value={this.state.country}
          onChange={this.handleCountryChange}
        />
        <input
          type="text"
          placeholder="type......"
          value={this.state.type}
          onChange={this.handleTypeChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});