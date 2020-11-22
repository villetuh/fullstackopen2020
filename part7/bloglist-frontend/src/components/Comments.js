import React from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../reducers/blogReducer';

const Comments = ({ blog, comments }) => {

  const dispatch = useDispatch();

  const submitCommentForm = (event) => {
    event.preventDefault();

    if (!event.target.elements.comment.value) {
      return;
    }
    dispatch(addComment(blog, event.target.elements.comment.value));
  };
  return (
    <div>
      <h3>comments</h3>
      <div>
        <form onSubmit={submitCommentForm}>
          <input type='text' name='comment' />
          <button type="submit">add comment</button>
        </form>
      </div>
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
