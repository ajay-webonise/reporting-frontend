import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class pageNotFound extends Component {

  cancel() {
    browserHistory.goBack()
  }

  render() {
    return (
      <div className="container text-center">
        <div className="page-header">
          <h1><i className="glyphicon glyphicon-info-sign"></i>Page Not Found!</h1>
          <div className="btn-group">
            <button onClick={this.cancel} className="btn btn-link">
              goBack
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default pageNotFound;
