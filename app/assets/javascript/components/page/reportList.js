import React, { Component } from 'react';
import { Link } from 'react-router';

import { getInsights} from '../../services/api';

class reportList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      insightLoadingStatus: false
    }
  }

  componentWillMount(){
    getInsights(this);
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>All Insights</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            {!this.state.insightLoadingStatus
              ? <img src={require('../../../images/loader.gif')} alt="image" />
              : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>insQueryKey</th>
                        <th>insQueryTitle</th>
                        <th>insQueryDescription</th>
                        <th>Execute</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Insight insight={this.state.insight[0]} />
                    </tbody>
                  </table>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}


class Insight extends Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.insight.insQueryId}</th>
        <td>{this.props.insight.insQueryKey}</td>
        <td>{this.props.insight.insQueryTitle}</td>
        <td>{this.props.insight.insQueryDescription}</td>
        <td>
          {this.props.insight.insQueryIsActive
            ? <Link className="btn btn-default" to="#">Execute</Link>
            : <button className="btn btn-default" disabled>Execute</button>
          }
        </td>
      </tr>
    )
  }
}

export default reportList;
