import React, { Component } from 'react';
import { Link } from 'react-router';
import serialize from 'form-serialize';
import Popup from 'react-popup';
import _ from 'underscore';

import { getInsights, getInsightDetails, executeQuery } from '../../services/api';

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
        <Popup />
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
                      {this.state.insight.map(function(insight,key){
                          return <Insight insight={insight} key = {key} />
                      })
                    }
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

  constructor(props) {
    super(props);
    this.state = {
      insightDetails: {},
      insightDetailsLoadingStatus: false
    }
  }

  executeQuery(insQueryId, event) {
    getInsightDetails(this, insQueryId);
  }

  shouldComponentUpdate(oldData, newData) {
    Popup.create({
        title: null,
        content: <FormBuilder data={newData} />,
        className: 'alert'
    });
    return true
  }

  render() {
    return (
      <tr key  = {this.props.key}>
        <th scope="row">{this.props.insight.insQueryId}</th>
        <td>{this.props.insight.insQueryKey}</td>
        <td>{this.props.insight.insQueryTitle}</td>
        <td>{this.props.insight.insQueryDescription}</td>
        <td>
          {this.props.insight.insQueryIsActive
            ? <button className="btn btn-default" onClick={this.executeQuery.bind(this, this.props.insight.insQueryId)}>Execute</button>
            : <button className="btn btn-default" disabled>Execute</button>
          }
        </td>
      </tr>
    )
  }
}

class FormBuilder extends Component {

  submit(event) {
    event.preventDefault();
    let form = document.querySelector('#query-form');
    let obj = serialize(form, { hash: true });

    let payload = {};
    _.mapObject(obj, function(val, key){
      payload['"'+key+'"'] = val
    });
    let formData = {};
    formData.params = payload;
    formData.queryId = this.props.data.insQueryId;
    console.log(formData)
    executeQuery(this, formData);
  }

  render() {
    return (
      <form onSubmit={this.submit.bind(this)} id="query-form">
        {this.props.data.insightDetails.queryParam.map(function(field, key){
          return (
              <div className="form-group" key={key}>
                <label htmlFor={field.insQryParamId +'-'+ field.insQryParamName}>{field.insQryQualifiedParamName}</label>
                <input type="text" className="form-control" id={field.insQryParamId +'-'+ field.insQryParamName} name={field.insQryParamName} />
              </div>
            )
        })}
        <button className="btn btn-default">Submit</button>
      </form>
    )
  }
}

export default reportList;
