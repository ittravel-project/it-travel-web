import React from 'react'
import {withAuthConsumer} from '../../contexts/AuthStore'
import AuthService from '../../services/AuthService'
import NavBar from '../misc/NavBar';
import Post from '../posts/Post';
import PostService from '../../services/PostService';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const defaultPic = 'http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png'

class Profile extends React.Component {
  state = {
    user: {
        name:'',
        city:'',
        description: '',
        email: '',
        password: '',
        avatarURL: '',
        avatar: '',
        descriptionPlaceholder: 'Write something about yourself'
    },
    posts: []
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  fetchPosts = () => {
    PostService.getPosts({ creater: this.props.user.id }).then(
      response => {
        this.setState({ posts: response.data })
      }
    )
  }

  componentDidMount() {
    AuthService.getProfile()
    .then(
      (user) => this.setState({ user: {...this.state, ...user} }),
      (error) => console.error(error)
    ) 
    this.fetchPosts()
  }

  render() {
    const { user } =  this.state;


    const classes = makeStyles({
      card: {
        minWidth: 100,
      }
    });

    return (
      <div className="box mx-auto Profile">
        <div className="col-12 pt-4 text-center profileInfo">
            <div className="pl-3">
              <label htmlFor="avatar"><img src={user.avatarURL || defaultPic} className="rounded-circle mb-3" alt="Cinque Terre" width="200" height="150"/></label>
            </div>
              <Link to="/profile/edit" className="btn btn-light  shadow profileEditButton">Edit Profile</Link>
          <div>
            <h1 className="shadow"><b>Username:</b>{user.name} </h1>
          </div>
          <div>
            <h1 className="shadow"><b>City:</b> {user.city}</h1>
          </div>
          <div>
            <h1 className="shadow"><b>Description:</b> {user.description}</h1>
          </div>
        </div>
        <div className="col-12 pt-2 text-center ActivityFeedTitle">
          <h2>Activity Feed</h2>
      </div>
        <div className="col-12 pt-2 text-center ActivityFeed"> 

            {this.state.posts.map((post, i) => (
                 <Card className="activityFeedCard ">
                 <CardContent>
                   <Typography className="cardTitle" color="textSecondary" gutterBottom>
                   {post && post.title}
                   </Typography>
                   <Link className="card-title" to={post && `/posts/${post.id}/comments`}><img  src={post && post.attachment} alt="" className="card-title-img"></img></Link>           
                     <Typography variant="body2" component="p">
                   </Typography>
                 </CardContent>
                 <CardActions>
                     <Button color="secondary" className={classes.button} size="small">
                     Delete
                     </Button>                   
                 </CardActions>
               </Card>
              ))}  
            
          </div>
          <NavBar />
      </div>
    );
  }
}

export default withAuthConsumer(Profile)