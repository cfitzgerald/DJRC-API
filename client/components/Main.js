import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Landing from './Landing';
import Spotify from './Spotify';
import WebAdmin from './WebAdmin';

class Main extends Component {
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

const mapDispatchToProps = () => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
