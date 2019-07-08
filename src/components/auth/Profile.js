import React from 'react'
// import { Redirect } from 'react-router-dom';
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

class Profile extends React.Component {
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

  // handleChange = (event) => {
  //   const { name, value, files } = event.target;
  //   this.setState({
  //     user: {
  //       ...this.state.user,
  //       [name]: files && files[0] ? files[0] : value
  //     },
  //     errors: {
  //       ...this.state.errors,
  //       [name]: validations[name] && validations[name](value)
  //     }
  //   })
  // }

  // handleBlur = (event) => {
  //   const { name } = event.target;
  //   this.setState({
  //     touch: {
  //       ...this.state.touch,
  //       [name]: true
  //     }
  //   })
  // }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (this.isValid()) {
  //     authService.updateProfile(this.state.user)
  //       .then(
  //         (user) => this.setState({ user: {...this.state.user, ...user} }),
  //         (error) => {
  //           const { message, errors } = error.response.data;
  //           this.setState({
  //             errors: {
  //               ...this.state.errors,
  //               ...errors,
  //               email: !errors && message
  //             }
  //           })
  //         }
  //       )
  //   }
  // }

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
       <div className='Home-image'>
          <img src='https://img.jakpost.net/c/2018/01/11/2018_01_11_38768_1515668901._large.jpg' alt="" width='420px' height='200px'/>
        </div>
        <div className="col-6 pt-4 ">
            <div class="image-cropper">
              <label htmlFor="avatar" className="avatar"><img src={user.avatar ? URL.createObjectURL(user.avatar) : user.avatarURL} className="rounded mb-3 profile-pic" alt="Cinque Terre" /></label>
            </div>
          <div>
            <h1>Username</h1>
            <p>{user.name}</p>
          </div>
          <div>
            <h1>City</h1>
            <p>{user.city}</p>
          </div>
          <div>
            <h1>Description</h1>
            <p>{user.description}</p>
          </div>
        </div>
        <div>
            <h1>Activity Feed</h1>
            <div className="card">
              <img className="card-img-top" src="..." alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src="..." alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src="..." alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src="..." alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <NavBar />
      </div>
    );
  }
}

export default withAuthConsumer(Profile)