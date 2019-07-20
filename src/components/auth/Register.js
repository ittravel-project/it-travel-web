import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import authService from '../../services/AuthService'

// eslint-disable-next-line 
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'Name is required';
    }
    return message;
  },
  city: (value) => {
    let message;
    if (!value) {
      message = 'City is required';
    }
    return message;
  },
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

class Register extends Component {
  state = {
    user: {
      name:'',
      city:'',
      email: '',
      password: '',
    },
    errors: {},
    touch: {},
    isRegistered: false
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
      authService.register(this.state.user)
        .then(
          (user) => this.setState({ isRegistered: true }),
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
    const { isRegistered, errors, user, touch } =  this.state;
    if (isRegistered) {
      return (<Redirect to="/login" />)
    }

    return (
      <div className="container mt-5 login-container">
        <Link to="/"><i className="fa fa-chevron-left"></i></Link>
        <div className="row justify-content-md-center">
          <div className="col-xs-12 col-sm-12 col-md-4 login">
            <h3 className="register-title">Let's Start Traveling   <i className="fa fa-bicycle"></i></h3>
            <form id="register-form" className="mt-4" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text register-icons"><i className="fa fa-user"></i></div>
                  </div>
                  <input type="text" name="name" className={`shadow form-control ${touch.name && errors.name ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.name} placeholder="Username" />
                  <div className="invalid-feedback">{ errors.name }</div>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                      <div className="input-group-text register-icons"><i className="fa fa-map"></i></div>
                  </div>
                  <input type="city" name="city" className={`shadow form-control ${touch.city && errors.city ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.city} placeholder="City" />
                  <div className="invalid-feedback">{ errors.city }</div>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text register-icons"><i className="fa fa-envelope"></i></div>
                  </div>
                  <input type="email" name="email" className={`shadow form-control ${touch.email && errors.email ? 'is-invalid' : ''}`}  onChange={this.handleChange} onBlur={this.handleBlur} value={user.email} placeholder="Email"/>
                  <div className="invalid-feedback">{ errors.email }</div>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text register-icons"><i className="fa fa-lock"></i></div>
                  </div>
                  <input type="password" name="password" className={`shadow form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} placeholder="Password" />
                  <div className="invalid-feedback">{ errors.password }</div>
                </div>
              </div>
              <div className="col-6 register-button">
                <button className="btn btn-primary shadow" form="register-form" type="submit" disabled={!this.isValid()}>Create Account</button>
              </div>
            </form>
            <hr />
            <p className="text-center">Already registered? <Link to="/login">Log In</Link></p>
          </div>       
        </div>
      </div>
    );
  }
}

export default Register