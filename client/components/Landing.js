import React from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import SignupForm from './SignupForm';

const Landing = (props) => {

  return (
    <div id="landing-container" className="container">
      <div id="landing-header">
        <h1 id="landing-title" className="text-center">BarCast</h1>
        <p id="landing-lead" className="text-center">A curated suggestion engine to find local bars playing the genre of music you want to hear right now.</p>
      </div>
      <SignupForm />
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
