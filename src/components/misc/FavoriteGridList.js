import React, { Component, Fragment } from 'react'
import PostList from '../posts/PostList';
import Favorites from '../auth/Favorites';
import PostService from '../../services/PostService';



class FavoriteGridList extends Component {
  state = {
    favoritePosts: [],
    posts: [],
  }

  addToFavorite = (post) => {
    this.setState({
      favoritePosts: [post, ...this.state.favoritePosts]
    })
  }

//   componentDidMount() {
//     PostService.getPosts()
//       .then(
//         posts => this.setState({ posts: posts }),
//         error => console.error(error)
//       )
//   }

  render() {

    return (
      <Fragment>
    
        <div className="row">
          <div className="col-9 p-4 bg-light border-right rounded">
            <PostList addToFavorite={this.addToFavorite} />
          </div>

          <div className="col-3 p-4">
            <Favorites posts={this.state.favoritePosts} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FavoriteGridList