import React from 'react'
import AuthService from '../../services/AuthService'
import User from './User'


class UserList extends React.Component {
  state = {
    users: []
  }

  fetchUsers = () => {
    AuthService.getUserList().then(
      response => {
        this.setState({ users: response.data })
      }
    )
  }

  componentDidMount() {
    this.fetchUsers()
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

export default UserList