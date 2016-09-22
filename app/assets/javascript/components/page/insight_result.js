
import React, { Component } from 'react';
import { Link } from 'react-router';
import {Table} from 'Reactable'
//var Table = Reactable.Table;

var filter = '';

var TableRowColumn = React.createClass({
  render:function(){
    return (
      <div className="dispTCell">
        {this.props.columnData}
      </div>
    );
  }
});

var TableRow = React.createClass({
  getInitialState: function(){
        return {rowData:this.props.rowData.split(",")};
  },
  render:function(){
    console.log("here!")
    return (
      <li className="dispTRow">
        {this.state.rowData.map(function(columnData,key) {
        return <TableRowColumn key={key} index={key} columnData={columnData}
          setComponentTorender = {this.props.setComponentTorender}/>;
        }.bind(this))}
      </li>
    );
  }
});


var TableHeader = React.createClass({
  render:function(){
    return (
      <div className="dispTCell">
        {this.props.columnHead}
      </div>
    );
  }
});

var result_data_raw = "USER_ID,USER_NAME,EMAIL_ID,PASSWORD,FIRST_TIME_USER,LOGOUT_TIME\n1,admin,admin@get-proof.com,a5080605a10503060203a1010201a5a30304a4a405040206a2070902a405a20303a0a508a2020207,true,\"\"\n1,admin,admin@get-proof.com,a5080605a10503060203a1010201a5a30304a4a405040206a2070902a405a20303a0a508a2020207,true,\"\"";
var result_data = result_data_raw.split("\n")
console.log(result_data)
var ReportTable = React.createClass({
  
  getInitialState: function(){
        return {
                reportHeader:result_data[0].split(","),
                reportData:result_data.slice(1,result_data.length)};
  },
  render:function(){
    if(result_data && result_data.length > 0){
      var report
      return (
        <div className="insightsListWrapper">
        <ul className="dispTable insightsList">
          <li className="dispTRow tHead">
            {this.state.reportHeader.map(function(columnHead,key) {
            return <TableHeader key={key} index={key} columnHead={columnHead}
              setComponentTorender = {this.props.setComponentTorender} />;
         }.bind(this))}
        </li>

          {this.state.reportData.map(function(rowData,key) {
          return <TableRow key={key} index={key} rowData={rowData}
            setComponentTorender = {this.props.setComponentTorender}/>;
          }.bind(this))}
      </ul>
      </div>
  );
  }
  else{
    return(
      <div>No data to show</div>
    )
  }
}
});


var ReportView = React.createClass({
  getInitialState: function(){
        return {report:"",query:{},searchParams:''};
  },
  componentWillMount: function(){
    doGet("insights/reportresult?insRprtReqId="+this.props.reportData.insRprtReqId,
    false, true, this.listAllQueriesCallSuccess,this.listAllQueriesCallfailure);
  },
  listAllQueriesCallSuccess: function(result){
    var data = JSON.parse(result.queryResult)
    this.setState({report:data,query:result});
  },
  listAllQueriesCallfailure: function(error){

  },
  downloadReport:function(){
    doGetFile("insights/reportresult?csvfile&&insRprtReqId="+this.props.reportData.insRprtReqId+"&&searchParam=" + filter,false,
    true, this.reportDownloadSucces, this.reportDownloadFailure);
  },
  reportDownloadSucces:function(result){
    var reportExecutedAt = new Date().getTime();
    var reportFileName = "Report_"+reportExecutedAt+".csv";
    var downloadAnchorTag = document.createElement('a');
    downloadAnchorTag.setAttribute('id','downloadAnchorTag');
    downloadAnchorTag.setAttribute('href','data:text/csv;charset=utf-8;base64,' + btoa(result));
    downloadAnchorTag.setAttribute('download', reportFileName);
    document.body.appendChild(downloadAnchorTag);
    downloadAnchorTag.click();
    document.body.removeChild(downloadAnchorTag);
  },
  reportDownloadFailure:function(e){
    
  },
  componentDidMount: function(){
    setTimeout(function(){
      if(document.getElementsByClassName('reactable-filter-input').length)
        document.getElementsByClassName('reactable-filter-input')[0].setAttribute("placeholder","Universal Search");
    },200)
  },

  isFiltered:function(e){
    filter = arguments.length?arguments[0]:'';
  },
  render: function(){
    if(this.state.report){
    return (
      <div>
        <div className="queryWrapper">
        
            <h3 className="txtCenter">{this.state.query && this.state.query.insightTitle}  <a className="pull-right btn btnDownload" onClick={this.downloadReport}>Download Report</a></h3>
            <div className="reportView">   
              <Table className="table" data={this.state.report}  sortable={true} filterable={Object.keys(this.state.report[0])}  onFilter={this.isFiltered}/>
            </div>
        </div>
      </div>
    );
  }
  else{
    return <div></div>;
  }
}
});

export default ReportTable;