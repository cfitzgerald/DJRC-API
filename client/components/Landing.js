import React from 'react';

const Landing = () => {
    return (
        <div>

            <div id="landing-header" className="container-fluid text-center">

                <div className="col-sm-12">
                    <h1 id="landing-title">BarCast</h1>
                    <p id="landing-lead">A curated suggestion app for finding bars near you playing the genre of music you want to hear right now.</p>
                </div>

                <hr className="landing-hr-yellow" />
                <hr className="landing-hr-pink" />
                <hr className="landing-hr-blue" />

            </div>

            <div id="landing-body" className="container">

                <div className="container features">
                    <div className="row">

                        <div className="col-sm-3">
                            <h4>The <strong>App</strong>...</h4>
                        </div>

                        <div className="col-sm-9">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Find out what's playing at <strong>375+</strong> local bars!</li>
                                <li className="list-group-item"><p>Already out on the town and looking for a bar with a particular vibe? BarCast wants to help you answer the question: <em>"Where to next?"</em></p> <p>Start by picking a music genre that fits <em>your</em> vibe right now, and get a map view of bars near you playing songs from that genre. Check out the bar's profile for more info, and then get walking directions from your current location.</p></li>
                                <li className="list-group-item"><p>Own or manage a bar?</p> <p>Create and verify a free BarCast account, link to the Spotify account you use for playing music at the bar, and attract new customers to your bar!</p></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <hr className="landing-hr-gray" />

                <div className="container features">
                    <div className="row">

                        <div className="col-sm-3">
                            <h4>The <strong>Stack</strong>...</h4>
                        </div>

                        <div className="col-sm-9">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Node.js</li>
                                <li className="list-group-item">Express</li>
                                <li className="list-group-item">React Native</li>
                                <li className="list-group-item">React</li>
                                <li className="list-group-item">Redux</li>
                                <li className="list-group-item">Sequelize + PostgreSQL</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <hr className="landing-hr-gray" />

                <div className="container features">
                    <div className="row">

                        <div className="col-sm-3">
                            <h4>The <strong>Libraries</strong>...</h4>
                        </div>

                        <div className="col-sm-9">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Webpack + Babel</li>
                                <li className="list-group-item">JSON Web Token</li>
                                <li className="list-group-item">Passport</li>
                                <li className="list-group-item">bcrypt</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <hr className="landing-hr-gray" />

                <div className="container features">
                    <div className="row">

                        <div className="col-sm-3">
                            <h4>The <strong>APIs</strong>...</h4>
                        </div>

                        <div className="col-sm-9">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Google Maps API</li>
                                <li className="list-group-item">Spotify API</li>
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
