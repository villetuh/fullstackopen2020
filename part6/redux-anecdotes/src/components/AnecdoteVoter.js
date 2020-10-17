import React from 'react';
import { useDispatch } from 'react-redux';
import { voteOnAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteVoter = (props) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteOnAnecdote(id));

    dispatch(setNotification(`voted for '${props.title}'`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <button onClick={() => vote(props.id)}>vote</button>
  );
};

export default AnecdoteVoter;
