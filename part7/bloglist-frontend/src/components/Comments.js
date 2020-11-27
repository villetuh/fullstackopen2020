import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addComment } from '../reducers/blogReducer';

const SmallerTitle = styled.h3`
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
`;

const AddCommentForm = styled.div`
  margin: 10px 2px 20px 2px;
`;

const CommentButton = styled.button`
  background: ${props => props.primary ? 'teal' : 'white'};
  color: ${props => props.primary ? 'white' : 'teal'};
  margin: 2px;
  padding: 4px 6px;
  font-size: small;
  border-style: solid;
  border-color: teal;
  border-radius: 4px;
  border-width: 1px;
`;

const Input = styled.input`
  padding: 4px 8px;
`;

const Comment = styled.div`
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  box-shadow: 0px 1px 3px 0px;
  border-radius: 2px;
`;

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
      <SmallerTitle>Comments</SmallerTitle>
      <AddCommentForm>
        <form onSubmit={submitCommentForm}>
          <Input type='text' name='comment' />
          <CommentButton type="submit">Add comment</CommentButton>
        </form>
      </AddCommentForm>
      {
        comments.map((comment, index) =>
          <Comment key={index}>
            {comment}
          </Comment>)
      }
    </div>
  );
};

export default Comments;
