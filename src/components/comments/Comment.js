import React from "react";
import moment from 'moment'


const Comment = (props) => {
  const { name, text, time } = props.comment;

  return (
    <div className="media mb-3">
      <img
        className="mr-3 bg-light rounded"
        src={`https://api.adorable.io/avatars/48/${name && name.toLowerCase()}@adorable.io.png`}
        alt={name} width="15%"
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border commentTextBox">
        <small className="float-right text-muted">{moment((time)).startOf("min").fromNow()}</small>
        <h1 className="mt-0 mb-1 text-muted">{name}</h1>
        {text}
      </div>
    </div>
  );
}

export default Comment