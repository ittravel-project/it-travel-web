import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

class UserGridList extends React.Component {
    state = {
        users: []
      }
    
      fetchUsers = () => {
        AuthService.getUser().then(
          response => {
            this.setState({ users: response.data })
          }
        )      
      }
    
      componentDidMount() {
        this.fetchUsers()
      }
    
    render(){
        const classes = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 500,
            height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        }));
        
        return (
            <div className={classes.root}>
              <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                </GridListTile>
                {this.state.users
                  .sort ((a, b) => a.name.localeCompare(b.name))
                    .map(user => (
                  <GridListTile key={user.img}>
                    <img src={user.avatar ? URL.createObjectURL(user.avatar) : user.avatarURL} alt={user.title} />
                    <GridListTileBar
                      title={user.name}
                      subtitle={<span>{user.city}</span>}
                      actionIcon={
                            <IconButton className={classes.icon}>
                                <Link className="card-title" to={`/profile/${user.id}`}>
                                  <InfoIcon />                                 
                              </Link> 

                            </IconButton>

                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          );
    }

  
}


export default UserGridList