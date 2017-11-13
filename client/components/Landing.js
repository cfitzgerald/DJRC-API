import React from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import SignupForm from './SignupForm';

const Landing = () => {

  return (
    <div id="landing-container" className="container">

      <div id="landing-header">
        <h1 id="landing-title" className="text-center">BarCast</h1>
        <p id="landing-lead" className="text-center">A curated suggestion engine to find local bars playing the genre of music you want to hear right now.</p>
      </div>

      <div className="card border-dark mb-3" style={{maxWidth: 20 + 'rem'}}>
        <div className="card-header">Header</div>
        <div className="card-body text-dark">
          <h4 className="card-title">Secondary card title</h4>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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

const mapDispatchToProps = () => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
