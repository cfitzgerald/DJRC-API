import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// components


export default class Spotify extends Component {
    constructor() {
        super();
        this.state = {
            songs: ''
        }
    }

    render() {
        return (
            <div id="landing-container" className="container">
                <div id="landing-header">
                    <a href='/passportAuth/spotify'><h1 id="landing-title" className="text-center">Log in with spotify</h1></a>
                </div>
            </div>
        );
    }
}


