import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Header from '../../components/shared/header'


class homeContainer extends Component {
  render() {
    return (
      <section>
        <Header />
        <div className="content">
          {this.props.children}
        </div>
        <footer>
          <div className="container">
            <hr />
            <p>&copy; 2016.</p>
          </div>
        </footer>
      </section>
    );
  }
}

export default homeContainer;
