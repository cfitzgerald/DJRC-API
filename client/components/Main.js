import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Landing from './Landing';
import Spotify from './Spotify';
// import Navbar from './Navbar';

// store
import { fetchVenues } from '../store';

class Main extends Component {

  componentDidMount() {
    this.props.fetchInitialData();
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialData: () => {
      dispatch(fetchVenues());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
