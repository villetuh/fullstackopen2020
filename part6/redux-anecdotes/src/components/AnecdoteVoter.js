import React from 'react';
import { useDispatch } from 'react-redux';
import { voteOnAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteVoter = (props) => {
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);

    dispatch(voteOnAnecdote(anecdote));

    dispatch(setNotification(`voted for '${props.anecdote.content}'`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <button onClick={() => vote(props.anecdote)}>vote</button>
  );
};

export default AnecdoteVoter;
