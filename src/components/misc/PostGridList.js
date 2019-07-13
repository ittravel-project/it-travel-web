import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import PostService from '../../services/PostService'
import { Link } from 'react-router-dom';

class PostGridList extends React.Component {
    state = {
        posts: []
      }
    
      fetchPosts = () => {
        PostService.getPosts().then(
          response => {
            this.setState({ posts: response.data })
          }
        )
      }
    
      componentDidMount() {
        this.fetchPosts()
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
                {this.state.posts.map(post => (
                  <GridListTile key={post.attachment}>
                    <img src={post.attachment} alt={post.title} />
                    <GridListTileBar
                      title={post.title}
                      subtitle={<span>by: {post.creater}</span>}
                      actionIcon={
                            <IconButton aria-label={`info about ${post.title}`} className={classes.icon}>
                                <Link className="card-title" to={`/posts/${post.id}/comments`}>
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


export default PostGridList