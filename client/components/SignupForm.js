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
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  onSubmit(event){
    event.preventDefault();
    const { location, cart } = this.props;
    const { email, password } = this.state;
    this.setState({name: '', email: '', password: ''});
  }

  componentDidMount(){
    console.log("componentDidMount: SignupForm");
  }

  render() {

    const { onSubmit, onChange } = this;
    const { email, firstName, lastName, password } = this.state;

    return (
      <div className="row">
        <div className="col-md-12">
          <form id="signup-form" className="card" onSubmit={onSubmit}>

            <div className="form-row">
              <div className="form-group col-md-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    name="firstName"
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
                    placeholder="Set a password..."
                    type="password"
                    value={password} />
                </div>
              </div>
            </div>

            <button name="signup" className="btn btn-outline-info btn-md">Create account</button>

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
