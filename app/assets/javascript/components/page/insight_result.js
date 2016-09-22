import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Table } from 'reactable';
import _ from 'underscore';


class ReportTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      reportHeader:null,
      reportData:null
    };
  }

  cancel() {
    browserHistory.goBack()
  }

  componentWillMount() {
    let result_data_raw = sessionStorage.getItem('currentResultSet');
    let result_data = result_data_raw.split("\n");
    let header = result_data[0].split(',');
    let dataSet = result_data.slice(1,result_data.length);

    let updatedData = [];
    dataSet.map(function(row, k1){
      let rowData = {}
      row.split(',').map(function(item, k2){
        rowData[header[k2]] = item
      })
      updatedData.push(rowData)
    });

    this.setState({
      dataSet: updatedData,
      headerKey: header
    });
  }

  render(){
    return (
      <div className="container tableContainer">
        <div className="btn-group">
          <button onClick={this.cancel} className="btn btn-link">
            goBack
          </button>
        </div>
        {this.state.dataSet.length > 2
          ? <Table
              className="table table-striped"
              itemsPerPage={10}
              pageButtonLimit={10}
              sortable={this.state.headerKey}
              filterable={this.state.headerKey}
              data={this.state.dataSet} />
          : <h1>No Data</h1>
        }
      </div>
    )
  }
};

export default ReportTable;