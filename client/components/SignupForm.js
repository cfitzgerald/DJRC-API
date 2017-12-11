import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignupForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }
    handleSubmit(event) {
        event.preventDefault();
        const { email, firstName, lastName, password } = this.state;
        this.setState({ email: '', firstName: '', lastName: '', password: '' });
    }
    componentDidMount() {
        // console.log("componentDidMount: SignupForm");
    }
    render() {
        const { handleSubmit, handleChange } = this;
        const { email, firstName, lastName, password } = this.state;

        return (
            <div className="row">
                <div id="signup-form-container" className="col-md-12">
                    <p id="signup-lead" className="text-center">Create a free account!</p>
                    <form id="signup-form" className="card" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="firstName"
                                        onChange={handleChange}
                                        placeholder="First name..."
                                        type="text"
                                        value={firstName} />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="lastName"
                                        onChange={handleChange}
                                        placeholder="Last name..."
                                        type="text"
                                        value={lastName} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="Email address..."
                                        type="text"
                                        value={email} />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="password"
                                        onChange={handleChange}
                                        placeholder="Set a password..."
                                        type="password"
                                        value={password} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12 text-center">
                                <button
                                    className="btn btn-outline-primary btn-md text-center"
                                    id="signup-button"
                                    type="submit">Create account</button>
                            </div>
                        </div>
                    </form>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
