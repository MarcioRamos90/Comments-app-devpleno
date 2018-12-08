import React from "react";

const Comment = ({ c }) => {
  return (
    <ul class="list-group">
      <li class="list-group-item shadow-lg p-3 mb-3 bg-white rounded">
        <div>comentário: {c.comment}</div>
        <div>email: {c.email || "null"}</div>
      </li>
    </ul>
  );
};

export default Comment;
