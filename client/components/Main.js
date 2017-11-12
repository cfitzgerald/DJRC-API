import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Landing from './Landing';
import Spotify from './Spotify';
// import Navbar from './Navbar';

class Main extends Component {

  componentDidMount() {
    // console.log('componentDidMount: Main');
  }

  render() {
    return (
      <div className="container-fluid">

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/spotify" component={Spotify} />
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
