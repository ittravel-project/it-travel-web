import React from 'react'
import Post from './Post'
import PostService from '../../services/PostService';
import ReactMarkdown from 'react-markdown'


class PostDetail extends React.Component {
    state = {
        post: {},
    }

    fetchPosts = () => {
        PostService.getPosts().then(
            response => {
                const posts = response.data;
                const post = posts.filter(post => post.id === this.props.match.params.postId)
                this.setState({ post: post[0] })
            }
        )
    }

    componentDidMount () {
        this.fetchPosts()
    }

    render(){
        return (
            <article className="PostDetail">
                 <header className="CommentBase-header">
                    <h1 className='CommentBase-title'> 
                        Welcome Traveler
                    </h1>
                    <img src={this.state.post.attachment} alt='logo' />
                    <p>{this.state.post.city}</p>
                    <ReactMarkdown
                    source={this.state.post.message}
                    escapeHtml={false}
                    />
                </header>
            </article>
        )
    }
}


export default PostDetail