import React from 'react'
import { Redirect } from 'react-router-dom';
import {withAuthConsumer} from '../../contexts/AuthStore'
import authService from '../../services/AuthService'
import NavBar from '../misc/NavBar';

const defaultPic = 'http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png'


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
        avatarURL: '',
        avatar: ''
    },
    errors: {},
    goToProfile: false,
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
          (user) => this.setState({ user: {...this.state.user, ...user}, goToProfile: true }),
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

    if (this.state.goToProfile) {
        return <Redirect to='/profile' />
    }

    return (
      <div className="box mx-auto ProfileEdit">
        <div className="text-center profileContainer">
          <div className="col-9 ml-5 ">
            <form id="profile-form" className="mt-3 profileEditForm" onSubmit={this.handleSubmit}>
            
            <div className="col-6 pt-1">
              <label htmlFor="avatar" ><img src={user.avatar ? URL.createObjectURL(user.avatar) : defaultPic} className="rounded-circle mb-3 " alt="Cinque Terre" width="200" height="150" /></label>
              <input type="file" id="avatar" name="avatar" onChange={this.handleChange}  />
          </div>
            <div className="form-group mt-3 formSpacing">
                <label>Username</label>
                <input type='text' className={`shadow form-control ${touch.name && errors.name ? 'is-invalid' : ''}`} name="name" onChange={this.handleChange} onBlur={this.handleBlur} value={user.name} />
                <div className="invalid-feedback">{ errors.name }</div>
              </div>
            <div className="form-group formSpacing">
                <label>City</label>
                <input type='text' className={`shadow form-control ${touch.city && errors.city ? 'is-invalid' : ''}`} name="city" onChange={this.handleChange} onBlur={this.handleBlur} value={user.city} />
                <div className="invalid-feedback">{ errors.city }</div>
              </div>
              <div className="form-group formSpacing">
                <label>Description</label>
                <input type='text' className={`shadow form-control ${touch.description && errors.description ? 'is-invalid' : ''}`} name="description" onChange={this.handleChange} onBlur={this.handleBlur} placeholder="Write something about yourself" value={user.description} />
                <div className="invalid-feedback">{ errors.description }</div>
              </div>
              <div className="form-group formSpacing">
                <label>Email</label>
                <input type="email" name="email" className="shadow form-control" value={user.email} disabled/>
              </div>
              <div className="form-group formSpacing">
                <label>Password</label>
                <input type="password" name="password" className={`shadow form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} />
                <div className="invalid-feedback">{ errors.password }</div>
              </div>
              <button className="btn btn-primary p-1 mt-3 shadow" form="profile-form" type="submit" disabled={!this.isValid()}>Update profile</button>

            </form>
          </div>
     
        </div>

        <NavBar />
      </div>
    );
  }
}

export default withAuthConsumer(ProfileEdit)