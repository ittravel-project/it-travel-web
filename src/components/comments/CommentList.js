import React from "react";
import Comment from "./Comment";

const CommentList = (props) => {

  return (
    <div className="CommentList">
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{props.comments.length}</span>{" "}
        Comment{props.comments.length > 1 ? "s" : ""}
      </h5>

      {props.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList