import React, { Fragment } from 'react';
import AuthService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/Person';
import SignOutIcon from '@material-ui/icons/ExitToApp';


class NavBar extends React.Component{
 
  handleLogout=() => {
    AuthService.logout()
      .then(() => this.props.onUserChange(null))
  } 

  render(){
    const classes = makeStyles({
      root: {
        width: 500,
        height: 200,
        
      },
      navStyle: {
        textDecoration: "none",
        marginTop: "15px"
      }
    });

    return(
      <Fragment>
        <BottomNavigation
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} href="/home" className={classes.navStyle} />
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} href="/profile" className={classes.navStyle} />
          <BottomNavigationAction label="Sign Out" icon={<SignOutIcon />} onClick={this.handleLogout} />
        </BottomNavigation> 
      </Fragment>
  )
  }
    
}

export default withAuthConsumer(NavBar)