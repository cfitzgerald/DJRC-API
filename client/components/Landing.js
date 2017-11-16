import React from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import SignupForm from './SignupForm';

// store
import { fetchVenueCount } from '../store';

const Landing = (props) => {

  const venueCount = props.venueCount();
  // const { venueCount } = props;
  console.log('props: venueCount = ', venueCount);

  return (
    <div id="landing-container" className="container">

      <div id="landing-header">
        <h1 id="landing-title" className="text-center">(BarCast Logo)</h1>
        <p id="landing-lead" className="text-center">A curated suggestion engine to find local bars playing the genre of music you want to hear right now.</p>
      </div>

      <div className="row landing-cards">

        <div className="col-sm-4">
          <div className="card border-dark mb-3" style={{maxWidth: 20 + 'rem'}}>
            <div className="card-header">ICON?</div>
            <div className="card-body text-dark">
              <h4 className="card-title">Why use it...</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">We've got { venueCount ? venueCount : <em>so many</em> } venues!</li>
                <li className="list-group-item">For users...</li>
                <li className="list-group-item">For venue owners...</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card border-dark mb-3" style={{maxWidth: 20 + 'rem'}}>
            <div className="card-header">ICON?</div>
            <div className="card-body text-dark">
              <h4 className="card-title">How to use it...</h4>
              <p className="card-text">Animated gifs / screenshots here?</p>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card border-dark mb-3" style={{maxWidth: 20 + 'rem'}}>
            <div className="card-header">ICON?</div>
            <div className="card-body text-dark">
              <h4 className="card-title">Technologies/APIs</h4>
              <p className="card-text">We've got:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">React Native</li>
                <li className="list-group-item">Google Maps API</li>
                <li className="list-group-item">Spotify API</li>
                <li className="list-group-item">Maybe Gracenote API</li>
                <li className="list-group-item">Maybe Echo Nest API</li>
                <li className="list-group-item">...</li>
              </ul>
            </div>
          </div>
        </div>

     </div>

      <div id="landing-team">
        <h3>Made by these guys:</h3>
        <ul>
          <li><strong>D</strong>an Weissbard</li>
          <li><strong>J</strong>onathan Brandwein</li>
          <li><strong>R</strong>avish Rawal</li>
          <li><strong>C</strong>olin FitzGerald</li>
        </ul>
      </div>

    </div>
  );
};

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    venueCount: () => {
      dispatch(fetchVenueCount());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
