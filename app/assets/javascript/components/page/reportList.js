import React, { Component } from 'react';
import { Link } from 'react-router';

import { getNasaPlanetary, getGithubUsers } from '../../services/api'

class reportList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planetaryLoadingStatus: false,
      githubUsersLoadingStatus: false,
    }
  }

  componentWillMount(){
    getNasaPlanetary(this);
    getGithubUsers(this);
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>All Insights</h1>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Key</th>
              <th>Execute</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td><Link className="btn btn-default" to="#">Execute</Link></td>
            </tr>
          </tbody>
        </table>
        <div className="row">
          <div className="col-md-6">
            {!this.state.planetaryLoadingStatus
              ? <img src={require('../../../images/loader.gif')} alt="image" />
              : <NasaPlanetary planetary={this.state.planetary} />
            }
          </div>
          <div className="col-md-6">
            {!this.state.githubUsersLoadingStatus
              ? <img src={require('../../../images/loader.gif')} alt="image" />
              : <GithubUsers githubUsers={this.state.githubUsers} />
            }
          </div>
        </div>
      </div>
    );
  }
}


class NasaPlanetary extends Component {
  render() {
    return (
      <div>
        <p>{this.props.planetary.title}</p>
        <p>{this.props.planetary.date}</p>
        <p>{this.props.planetary.explanation}</p>
        <p>{this.props.planetary.media_type}</p>
        <p>{this.props.planetary.service_version}</p>
        <p>{this.props.planetary.url}</p>
      </div>
    )
  }
}

class GithubUsers extends Component {
  render() {
    return (
      <div className="row">
        {this.props.githubUsers.map(function(user, key){
          return (
            <div className="thumbnail col-sm-4" key={key}>
              <img src={user.avatar_url} alt="..." style={{height: "150px"}}/>
              <div className="caption">
                <h3>{user.login}</h3>
                <p>User Type: {user.type}</p>
                <p>Site Admin: {user.site_admin ? "true" : "false"}</p>
                <p>
                  <a href={user.html_url} target="_blank" className="btn btn-primary">Show Profile</a>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default reportList;
