import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import authService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore'

// eslint-disable-next-line 
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const validations = {
  email: (value) => {
    let message;
    if (!value) {
      message = 'Email is required';
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Invalid email pattern';
    }
    return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = 'Password is required';
    }
    return message;
  }
}

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
    errors: {},
    touch: {},
    isAuthenticated: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      authService.authenticate(this.state.user)
        .then(
          (user) => this.setState({ isAuthenticated: true }, () => {
            this.props.onUserChange(user)
          }),
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                email: !errors && message
              }
            })
          }
        )
    }
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  render() {
    const { isAuthenticated, errors, user, touch } = this.state;
    if (isAuthenticated) {
      return (<Redirect to="/home" />)
    }

    return (
      <div className="container mt-5 login-container">
        <Link to="/"><i className="fa fa-chevron-left"></i></Link>
        <div className="row justify-content-md-center">
          <div className="col-md-4 login">
            <h3 className="login-title">Welcome Traveler  <i className="fa fa-globe"></i></h3>
            <form id="register-form" className="mt-4" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text login-icons"><i className="fa fa-envelope"></i></div>
                  </div>
                  <input type="email" name="email" className={`shadow form-control ${touch.email && errors.email ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.email} placeholder="Email" />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text login-icons"><i className="fa fa-lock"></i></div>
                  </div>
                  <input type="password" name="password" className={`shadow form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} placeholder="Password" />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
              </div>
              <div className="col-6 login-button">
                <button className="btn btn-primary shadow" form="register-form" type="submit" disabled={!this.isValid()}>Log in</button>
              </div>
            </form>
            <hr />
            <a href="http://localhost:3001/authenticate/google" className="btn btn-block btn-danger shadow"><i className="fa fa-google"></i>  Login with Google</a>
            <a href="http://localhost:3001/authenticate/facebook" className="btn btn-block btn-primary shadow"><i className="fa fa-facebook-f"></i> Login with Facebook</a>
            <p className="text-center">Not registered? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(Login)

