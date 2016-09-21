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

function createInsight($this, userData = null) {
  ajax({
    url: '/api/insights/',
    type: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data: userData
  }).then(
    function successHandler(data) {
      $this.setState({
        createdInsideStatus: true
      });
    },
    function errorHandler(error, textStatus, errorThrown) {
      $this.setState({
        error: error
      });
    }
  ).catch(function errorHandler(error) {
    console.error(error)
  })
}


module.exports = {
  getInsights,
  createInsight
};