import React from 'react'
import { Redirect } from 'react-router-dom';
import {withAuthConsumer} from '../../contexts/AuthStore'
import authService from '../../services/AuthService'
import NavBar from '../misc/NavBar';



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
  description: (value) => {
    let message;
    if (!value) {
      message = 'Description is required';
    }
    return message;
  }
}

class ProfileEdit extends React.Component {
  state = {
    user: {
        name:'',
        city:'',
        description: '',
        email: '',
        password: '',
        avatarURL: 'http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png',
        avatar: ''
    },
    errors: {},
    touch: {}
  }

  handleChange = (event) => {
    const { name, value, files } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: files && files[0] ? files[0] : value
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
      authService.updateProfile(this.state.user)
        .then(
          (user) => this.setState({ user: {...this.state.user, ...user} }),
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


  componentDidMount() {
    authService.getProfile()
      .then(
          (user) => this.setState({ user: {...this.state, ...user} }),
          (error) => console.error(error)
        )
  }

  render() {
    const { errors, user, touch } =  this.state;

    return (
      <div className="box mx-auto">
        <div className="row">
          <div className="col-6">
            <form id="profile-form" className="mt-4" onSubmit={this.handleSubmit}>
            
            <div className="col-6 pt-4">
              <label htmlFor="avatar" className="avatar"><img src={user.avatar ? URL.createObjectURL(user.avatar) : user.avatarURL} className="rounded-circle mb-3" alt="Cinque Terre" width="304" height="236" /></label>
              <input type="file" id="avatar" name="avatar" onChange={this.handleChange} />
          </div>
            <div className="form-group">
                <label>Username</label>
                <input type='text' className={`form-control ${touch.name && errors.name ? 'is-invalid' : ''}`} name="name" onChange={this.handleChange} onBlur={this.handleBlur} value={user.name} />
                <div className="invalid-feedback">{ errors.name }</div>
              </div>
            <div className="form-group">
                <label>City</label>
                <input type='text' className={`form-control ${touch.city && errors.city ? 'is-invalid' : ''}`} name="city" onChange={this.handleChange} onBlur={this.handleBlur} value={user.city} />
                <div className="invalid-feedback">{ errors.city }</div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type='text' className={`form-control ${touch.description && errors.description ? 'is-invalid' : ''}`} name="description" onChange={this.handleChange} onBlur={this.handleBlur} value={user.description} />
                <div className="invalid-feedback">{ errors.description }</div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={user.email} disabled/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} />
                <div className="invalid-feedback">{ errors.password }</div>
              </div>
              <button className="btn btn-primary" form="profile-form" type="submit" disabled={!this.isValid()}>Update profile</button>

            </form>
          </div>
     
        </div>

        <NavBar />
      </div>
    );
  }
}

export default withAuthConsumer(ProfileEdit)