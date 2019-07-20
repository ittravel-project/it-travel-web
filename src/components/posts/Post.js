import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

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
    const { post, isDelete } = this.props

    return (
   <div className="card mb-4" style={{ maxWidth: 600, maxHeight: 750}}>
     <img style={{ maxWidth: 100, maxHeight: 100}} width='25%' src={post && post.attachment} className="card-img-top" alt="post" />

     <div className="card-body">
        <Link className="card-title" to={post && `/posts/${post.id}/comments`}>{post && post.title}</Link>
        <ReactMarkdown
          source={post && post.message}
          escapeHtml={false}
        />

        {isDelete && (  
          <button className="btn btn-danger btn-sm" onClick={this.handleDelete}>Delete</button>
        )}
       
     </div>

   </div>
 )
  }
  
}

export default Post