import React, { Component } from 'react';
import _ from 'underscore';

import { createInsight} from '../../services/api';

class createInsights extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formKey: Math.random(),
      error: '',
      queryParams: [],
      insightQuery: {
        insQueryId: '',
        insQueryKey: '',
        insQueryTitle: '',
        insQueryDescription: '',
        insQueryIsActive: false,
        insQuery: ''
      },
      insQueryId: '',
      insQueryKey: '',
      insQueryTitle: '',
      insQueryDescription: '',
      insQueryIsActive: false,
      insQuery: ''
    };
  }

  change(key, event) {
    this.generateQuery()
  }

  generateQuery() {
    let queryParams=[];
    let paramsList=[];
    let queryText = document.getElementById("insightsQuery").value;
    if(queryText){
      let params = queryText.match(/\:[\w]+/g);
      _.each(params,function(param,i){
        if (_.where(queryParams, {'insQryParamName':param.split(':')[1]}).length == 0 )  {
            queryParams.push({"insQryParamId":"","insQueryId":"","insQryParamName":param.split(':')[1],"insQryQualifiedParamName":""});
            paramsList.push(param.split(':')[1])
        }
      }.bind(this));
     }
     this.updateQueryParams(queryParams);
  }

  updateQueryParams(params){
    this.setState({
      error:"",
      queryParams:params,
      insightQuery: {
        insQueryId:this.state.insQueryId,
        insQueryKey:document.getElementById("insightsKey").value,
        insQueryTitle:document.getElementById("insightsTitle").value,
        insQueryDescription:document.getElementById("insightsDescription").value,
        insQueryIsActive:document.getElementById("isActiveFlag").checked,
        insQuery:document.getElementById("insightsQuery").value
      },
      insQueryId:this.state.insQueryId,
      insQueryKey:document.getElementById("insightsKey").value,
      insQueryTitle:document.getElementById("insightsTitle").value,
      insQueryDescription:document.getElementById("insightsDescription").value,
      insQueryIsActive:document.getElementById("isActiveFlag").checked,
      insQuery:document.getElementById("insightsQuery").value
    });
  }

  queryIsActive() {
    this.setState({
      insQueryIsActive: document.getElementById("isActiveFlag").checked
    });
  }

  updateParams(key, event) {
    let queryParams = this.state.queryParams
    queryParams[key].insQryQualifiedParamName = event.target.value;

    this.setState({
      queryParams: queryParams
    })
  }

  submit(event) {
    event.preventDefault();
    let data = {
      insightQuery: this.state.queryParams,
      queryParam: this.state.insightQuery
    };

    createInsight(this, data);
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Create Insight</h1>
        </div>
        {this.state.error
          ? <div className="alert alert-warning">{JSON.stringify(this.state.error)}</div>
          : null
        }
        <form onSubmit={this.submit.bind(this)} key={this.state.formKey}>
          <div className="form-group">
            <label htmlFor="insightsTitle">Insights Title</label>
            <input type="text" className="form-control" id="insightsTitle" placeholder="Insights Title" defaultValue={this.state.insQueryTitle} onChange={this.change.bind(this, 'insQueryTitle')}/>
          </div>
          <div className="form-group">
            <label htmlFor="insightsDescription">Insights Description</label>
            <input type="text" className="form-control" id="insightsDescription" placeholder="Insights Description" defaultValue={this.state.insQueryDescription} onChange={this.change.bind(this, 'insQueryDescription')} />
          </div>
          <div className="form-group">
            <label htmlFor="insightsKey">Insights Key</label>
            <input type="text" className="form-control" id="insightsKey" placeholder="Insights Key" defaultValue={this.state.insQueryKey} onChange={this.change.bind(this, 'insQueryKey')} />
          </div>
          <div className="form-group">
            <label htmlFor="insightsQuery">Enter Query</label>
            <textarea className="form-control" rows="3" id="insightsQuery" onChange={this.change.bind(this, 'insightsQuery')} defaultValue={this.state.insQuery}></textarea>
          </div>
          <div className="form-group">
            <div className="checkbox">
              <label>
                <input type="checkbox" id="isActiveFlag" checked={this.state.insQueryIsActive} onChange={this.change.bind(this, 'isActiveFlag')} /> Is query active?
              </label>
            </div>
          </div>
          <h4>Please fill mapping for explicit params if any</h4>
          <div className="form-group">
            <div className="row">
              {this.state.queryParams !== null && this.state.queryParams.length > 0
                ? this.state.queryParams.map(function(item, key){
                    return (
                        <div className="col-sm-4" key={key}>
                          <div className="checkbox">
                            <label>
                              {item.insQryParamName}
                              <input type="text" disabled={!this.state.insQueryIsActive} defaultValue={item.insQryQualifiedParamName} onChange={this.updateParams.bind(this, key)}/>
                            </label>
                          </div>
                        </div>
                      )
                  }.bind(this))
                : null
              }
            </div>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}

export default createInsights;
