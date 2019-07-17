import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

const Post = ({ post, onDeletePost }) => {
 const handleDelete = () => onDeletePost(post.id)
 

 return (
   <div className="card mb-4" style={{ maxWidth: 600, maxHeight: 750}}>
     <img style={{ maxWidth: 100, maxHeight: 100}} width='25%' src={post && post.attachment} className="card-img-top" alt="post" />

     <div className="card-body">
        <Link className="card-title" to={post && `/posts/${post.id}/comments`}>{post && post.title}</Link>
        <ReactMarkdown
          source={post && post.message}
          escapeHtml={false}
        />

       <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
     </div>

   </div>
 )
}

export default Post