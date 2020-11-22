import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div>
      <h3>comments</h3>
      {
        comments.map((comment, index) =>
          <div key={index}>
            {comment}
          </div>)
      }
    </div>
  );
};

export default Comments;
