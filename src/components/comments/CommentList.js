import React from "react";
import Comment from "./Comment";

const CommentList = (props) => {
    console.log(props)
  return (
    <div className="CommentList">
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{props.comments.length}</span>{" "}
        Comment{props.comments.length > 1 ? "s" : ""}
      </h5>

      {/* {props.comments.length === 0 (
        <div className="alert text-center alert-info">
          Be the first to comment
        </div>
      ) }  */}

      {props.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList