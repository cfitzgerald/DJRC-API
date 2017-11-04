import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components

class Main extends Component {

  componentDidMount() {
  }
  render() {
    return (
      <div className="container">
        <Switch>
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
