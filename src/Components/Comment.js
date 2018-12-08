import React from "react";

const Comment = ({ c }) => {
  return (
    <div>
      <div>comentário: {c.comment}</div>
      <div>email: {c.email || "null"}</div>
      <hr />
    </div>
  );
};

export default Comment;
