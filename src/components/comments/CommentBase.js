import React from 'react'
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CommentService from '../../services/CommentService';


class CommentBase extends React.Component{
    constructor(props){
        super(props);

        this.state={
            comments:[]
        };

        this.addComment = this.addComment.bind(this);
    }
       
    addComment(comment) {
        this.setState({
        comments: [comment, ...this.state.comments]
        });
    }
       
    fetchPosts = () => {
        CommentService.getComments(this.props.match.params.postId).then(
            response => {
            this.setState({ comments: response.data })
            }
        )
    }
    
    componentDidMount() {
    this.fetchPosts()
    }


    render(){
        // const {comments} = this.state
        return(
            <div className="CommentBase container bg-light shadow">
                <header className="CommentBase-header">
                    <img src="https://nevadahumanesociety.org/wp-content/uploads/2018/08/NHS-Slider-03-1024x731.jpg" alt='logo' />
                    <h1 className='CommentBase-title'> 
                        Welcome 
                    </h1>
                </header>
                <div className='row'>
                    <div className='col-4 pt-3 border-right'>
                        <h6>Comment on Post</h6>
                        <CommentForm {...this.props} addComment={this.addComment} />
                    </div>
                    <div className='col-8 pt-3 bg-white'>
                        <CommentList comments={this.state.comments} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentBase