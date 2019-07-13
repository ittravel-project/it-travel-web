import React from 'react'
import {withAuthConsumer} from '../../contexts/AuthStore'
import authService from '../../services/AuthService'

class User extends React.Component {
  state = {
    user: {
        name:'',
        city:'',
        description: '',
        email: '',
        password: '',
        avatarURL: 'http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png',
        avatar: ''
    }
  }

  componentDidMount() {
    authService.getProfile()
      .then(
          (user) => this.setState({ user: {...this.state, ...user} }),
          (error) => console.error(error)
        )
  }

  render() {
    const { user } =  this.state;

    return (
      <div>
      <div className="card" style={{ maxWidth: 400, maxHeight: 400}}>
        <img className="card-img-top" src={user.avatar ? URL.createObjectURL(user.avatar) : user.avatarURL}  alt="Card image cap" style={{ maxWidth: 100, maxHeight: 100}} />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">{user.city}</p>
          <p className="card-text">{user.description}</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    );
  }
}

export default withAuthConsumer(User)