import React from 'react'
import CommentForm from './CommentForm';
import CommentList from './CommentList';

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
       

    componentDidMount() {
        fetch("http://localhost:3000")
          .then(res => res.json())
          .then(res => {
            this.setState({
              comments: res,
              loading: false
            });
          })
          .catch(error => this.setState({
            error: "Something went wrong while submitting form.",
          }));
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
                        <CommentForm addComment={this.addComment} />
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