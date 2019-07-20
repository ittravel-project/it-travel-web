import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Post extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        post: [],
    };
  }
    
  handleDelete = (e) => {
    e.preventDefault()
    this.props.onDeletePost(this.props.post.id)
  }
 
  render(){
    const { post, isDelete, isMessage } = this.props


    const classes = makeStyles({
      card: {
        minWidth: 100,
      }
    });
    return (
      <div className=""> 
        <Card className="activityFeedCard ">
        <CardContent>
          <Typography className="cardTitle" color="textSecondary" gutterBottom>
          {post && post.title}
          </Typography>
          <Link className="card-title" to={post && `/posts/${post.id}/comments`}><img  src={post && post.attachment} alt="" className="card-title-img"></img></Link>           
            <Typography variant="body2" component="p">
          {!isMessage && (   
            <ReactMarkdown
              source={post && post.message}
              escapeHtml={false}
            />
            )}
          </Typography>
        </CardContent>
        <CardActions>
        {isDelete && (  
          <Button color="secondary" className={classes.button} size="small" onClick={this.handleDelete}>Delete</Button>            
          )}
            
        </CardActions>
      </Card>  
    </div>
 )
  }
  
}

export default Post