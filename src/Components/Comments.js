import React from "react";
import Comment from "./Comment";

const Comments = ({ comments }) => {
  const keys = Object.keys(comments);
  return (
    <div className="mt-5">
      {keys.map(key => {
        return <Comment c={comments[key]} key={key} />;
      })}
    </div>
  );
};

export default Comments;
