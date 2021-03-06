import { ajax } from './restutils'


function getInsights($this, userData = null) {
  ajax({
    url: '/api/insights/',
    type: 'GET',
    contentType: 'application/json',
    data: userData
  }).then(
    function successHandler(data) {
      $this.setState({
        insight: data,
        insightLoadingStatus: true
      });
    },
    function errorHandler(error, textStatus, errorThrown) {
      $this.setState({
        error: error,
        insightLoadingStatus: true
      });
    }
  ).catch(function errorHandler(error) {
    console.error(error)
  })
}

function getInsightDetails($this, insightId, userData = null) {
  ajax({
    url: '/api/insights/'+insightId,
    type: 'GET',
    contentType: 'application/json',
    data: userData
  }).then(
    function successHandler(data) {
      $this.setState({
        insightDetails: data,
        insQueryId: insightId,
        insightDetailsLoadingStatus: true
      });
    },
    function errorHandler(error, textStatus, errorThrown) {
      $this.setState({
        error: error,
        insightDetailsLoadingStatus: true
      });
    }
  ).catch(function errorHandler(error) {
    console.error(error)
  })
}

function createInsight($this, userData = null) {
  ajax({
    url: '/api/insights/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(userData)
  }).then(
    function successHandler(data) {
      console.log(data);
      $this.setState({
        formKey: Math.random(),
        createdInsideStatus: true
      });
    },

    function errorHandler(error, textStatus, errorThrown) {
      console.log(error);
      $this.setState({
        error: error
      });
    }
  ).catch(function errorHandler(error) {
    console.error(error)
  })
}

function executeQuery($this, userData = null) {
  ajax({
    url: '/api/insights/results',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(userData)
  }).then(
    function errorHandler(error, textStatus, errorThrown) {
      $this.setState({
        error: error
      });
    },
    function successHandler(data) {
      sessionStorage.setItem('currentResultSet', data.responseText);
      window.location='/#/insight_result';
    }
  ).catch(function errorHandler(error) {
    console.error(error)
  })
}


module.exports = {
  getInsights,
  getInsightDetails,
  createInsight,
  executeQuery
};