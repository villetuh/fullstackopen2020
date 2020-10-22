import React from 'react';
import { connect } from 'react-redux';
import { voteOnAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteVoter = (props) => {
  const vote = (anecdote) => {
    console.log('vote', anecdote.id);

    props.voteOnAnecdote(anecdote);

    props.setNotification(`voted for '${props.anecdote.content}'`, 5);
  };

  return (
    <button onClick={() => vote(props.anecdote)}>vote</button>
  );
};

const mapDispatchToProps = {
  voteOnAnecdote,
  setNotification
};

const ConnectedAnecdoteVoter = connect(null, mapDispatchToProps)(AnecdoteVoter);

export default ConnectedAnecdoteVoter;
