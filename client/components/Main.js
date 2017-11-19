import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Landing from './Landing';
import Spotify from './Spotify';
import WebAdmin from './WebAdmin';
// import Navbar from './Navbar';

// store
// import { fetchVenueCount } from '../store';

class Main extends Component {

  // componentDidMount() {
  //   this.props.fetchVenueCount();
  // }

  render() {
    return (
      <div className="container-fluid">

        <Switch>
          <Route exact path="/" component={ Landing } />
          <Route exact path="/spotify" component={Spotify} />
          <Route exact path="/admin" component={WebAdmin} />
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
    // fetchVenueCount: () => {
    //   dispatch(fetchVenueCount());
    // },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
