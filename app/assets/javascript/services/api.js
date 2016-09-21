import { ajax } from './restutils'


function getNasaPlanetary($this, userData = null) {
  ajax({
    url: 'https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo',
    type: 'GET',
    contentType: 'application/json',
    data: userData
  }).then(
    function successHandler(data) {
      $this.setState({
        planetary: data,
        planetaryLoadingStatus: true
      });
    },
    function errorHandler(error, textStatus, errorThrown) {
      $this.setState({
        error: error,
        planetaryLoadingStatus: true
      });
    }
  ).catch(function errorHandler(error) {
    console.error(error)
  })
}

function getGithubUsers($this, userData = null) {
  ajax({
    url: 'https://api.github.com/users',
    type: 'GET',
    contentType: 'application/json',
    data: userData
  }).then(
    function successHandler(data) {
      $this.setState({
        githubUsers: data,
        githubUsersLoadingStatus: true
      });
    },
    function errorHandler(error, textStatus, errorThrown) {
      $this.setState({
        error: error,
        githubUsersLoadingStatus: true
      });
    }
  ).catch(function errorHandler(error) {
    console.error(error)
  })
}


module.exports = {
  getNasaPlanetary,
  getGithubUsers
};