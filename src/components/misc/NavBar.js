import React, { Fragment } from 'react';
import AuthService from '../../services/AuthService';
import { NavLink } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';


class NavBar extends React.Component{
  handleLogout=() => {
    AuthService.logout()
      .then(() => this.props.onUserChange(null))
  } 

  render(){
    return(
      <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link active" to="/home"><i className="fa fa-home"></i></NavLink>
            <NavLink   className="nav-item nav-link active" to="/profile"><i className="fa fa-user"></i></NavLink>
            <i className="fa fa-sign-out btn-logout nav-item nav-link active" onClick={this.handleLogout}></i>
          </div>
        </div>
      </nav>
      </Fragment>
  )
  }
    
}

export default withAuthConsumer(NavBar)