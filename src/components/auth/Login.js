import React from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/AuthService';
import {withAuthConsumer} from '../../contexts/AuthStore'

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

class Login extends React.Component{
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
              (user) => this.setState({ isAuthenticated: true }, ()=>{
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
        const { isAuthenticated, errors, user, touch } =  this.state;
        if (isAuthenticated) {
          return (<Redirect to="/home" />)
        }
    
        return (
          <div className="box mx-auto">
            <div className="row">
              <div className="col-6">
                <h3>Welcome Traveler</h3>
                <form id="register-form" className="mt-4" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.email} />
                    <div className="invalid-feedback">{ errors.email }</div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} />
                    <div className="invalid-feedback">{ errors.password }</div>
                  </div>
                </form>
              </div>
              <div className="col-6">
                <button className="btn btn-primary" form="register-form" type="submit" disabled={!this.isValid()}>Log in</button>
              </div>
            </div>
          </div>
        );
      }
}

export default withAuthConsumer(Login) 

