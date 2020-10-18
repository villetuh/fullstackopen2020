import React from 'react';
import { useDispatch } from 'react-redux';

import anecdoteService from '../services/anecdotes';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.create(content);
    dispatch(createAnecdote(newAnecdote));

    dispatch(setNotification(`added new anecdote: ${content}`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
