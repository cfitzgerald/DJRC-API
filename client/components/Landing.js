import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { logoutUser } from '../store';


const Landing = (props) => {

  return (
    <div className="container">
      <h1>BarCast</h1>
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
