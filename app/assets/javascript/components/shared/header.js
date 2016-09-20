import React, { Component } from 'react';

class header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-9" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Insights</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
            <ul className="nav navbar-nav">
              <li><a href="#/flight-planer">Create Insight</a></li>
              <li><a href="#/reports">All Insights</a></li>
             </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default header;
