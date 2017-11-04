import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { logoutUser } from '../redux';


function Navbar(props) {

  return (
    <div className="container">
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">BarCast</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Something <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">Something Else <span className="sr-only"></span></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);