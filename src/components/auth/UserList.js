import React from 'react'
import AuthService from '../../services/AuthService'
import User from './User'
import {withAuthConsumer} from '../../contexts/AuthStore'
import authService from '../../services/AuthService'



class UserList extends React.Component {
  state = {
    users: []
  }


  componentDidMount() {
    authService.getProfileList(this.state.users)
      .then(
          (user) => this.setState({ users: {...this.state, ...user} }),
          (error) => console.error(error)
        )
  }

  render () {
    return (
      <div className="UserList">
        {this.state.users.map((user, i) => (
          <User user={user} key={i} />
        ))}
      </div>
    )
  }
}

export default withAuthConsumer(UserList)