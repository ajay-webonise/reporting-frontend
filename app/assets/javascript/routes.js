import React, { PropTypes, Component } from 'react';
import { useRouterHistory, Router, Route, IndexRoute } from 'react-router';
import { createHashHistory } from 'history';

const history = useRouterHistory(createHashHistory)({ queryKey: false });

import HomeContainer from './containers/home';

import CreateInsights from './components/page/create_insights.js';
import About from './components/page/about';
import PageNotFound from './components/page/pageNotFound';
import Home from './components/page/home';
import Reports from './components/page/reportList';

const Root = React.createClass({
  render() {
    return (
      <Router history = {history}>
        <Route name='home' path='/' component={HomeContainer}>
          <IndexRoute component={Home} />
          <Route name="about" path='/about' component={About} />
          <Route name="nsightsPlaner" path='/insights-planer' component={CreateInsights} />
          <Route name="Reports" path='/reports' component={Reports} />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Router>
    );
  },
});

export default Root;
