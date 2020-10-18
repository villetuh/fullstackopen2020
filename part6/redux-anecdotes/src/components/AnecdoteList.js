import React from 'react';
import { useSelector } from 'react-redux';
import AnecdoteFilter from './AnecdoteFilter';
import AnecdoteVoter from './AnecdoteVoter';

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state =>
    state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : 0));

  return (
    <div>
      <AnecdoteFilter />
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <AnecdoteVoter id={anecdote.id} title={anecdote.content} />
          </div>
        </div>))
      }
    </div>
  );
};

export default AnecdoteList;
