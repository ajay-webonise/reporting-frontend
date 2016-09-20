import React, { Component } from 'react';
import { Link } from 'react-router';

class reportList extends Component {
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Reports <small>Page</small></h1>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Key</th>
              <th>Exectue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td><Link className="btn btn-default" to="#">Exectue</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default reportList;
