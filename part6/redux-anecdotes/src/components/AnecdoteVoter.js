import React from 'react';
import { useDispatch } from 'react-redux';
import { voteOnAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteVoter = (props) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteOnAnecdote(id));
  };

  return (
    <button onClick={() => vote(props.id)}>vote</button>
  );
};

export default AnecdoteVoter;
