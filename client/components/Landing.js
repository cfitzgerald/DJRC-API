import React from 'react';

const Landing = () => {

  return (
    <div>

      <div id="landing-header" className="container-fluid text-center">

        <div className="col-sm-12">
          <h1 id="landing-title">BarCast</h1>
          <p id="landing-lead">A curated suggestion engine to find local bars playing the genre of music you want to hear right now.</p>
        </div>

        <hr className="landing-hr-yellow" />
        <hr className="landing-hr-pink" />
        <hr className="landing-hr-blue" />

      </div>

      <div id="landing-body" className="container">

        <div id="features" className="container">
          <div className="row">

            <div className="col-sm-4">
              <h4>Why use it...</h4>
            </div>

            <div className="col-sm-8">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">We've got so many venues!</li>
                <li className="list-group-item">For users...</li>
                <li className="list-group-item">For venue owners...</li>
              </ul>
            </div>

          </div>
        </div>

        <hr className="landing-hr-gray" />

        <div id="tech" className="container">
          <div className="row">

            <div className="col-sm-4">
              <h4>Technologies/APIs</h4>
            </div>

            <div className="col-sm-8">
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

      <div id="landing-footer" className="container-fluid text-center">

        <hr className="landing-hr-yellow" />
        <hr className="landing-hr-pink" />
        <hr className="landing-hr-blue" />

        <div id="team" className="container">

          <ul className="list-group list-group-flush">
            <li><strong>D</strong>an Weissbard</li>
            <li><strong>J</strong>onathan Brandwein</li>
            <li><strong>R</strong>avish Rawal</li>
            <li><strong>C</strong>olin FitzGerald</li>
          </ul>

        </div>
      </div>

    </div>
  );
};

export default Landing;
