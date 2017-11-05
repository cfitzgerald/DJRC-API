import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Landing from './Landing';
import Navbar from './Navbar';

class Main extends Component {

  componentDidMount() {
    console.log('componentDidMount: Main');
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" component={Landing} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
