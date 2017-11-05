import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { logoutUser } from '../store';


const Landing = (props) => {

  return (
    <div id="landing-header" className="container">
      <h1 id="landing-title" className="text-center">BarCast</h1>
      <p id="landing-lead" className="text-center">A curated suggestion engine to find local bars playing the genre of music you want to hear right now.</p>
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
