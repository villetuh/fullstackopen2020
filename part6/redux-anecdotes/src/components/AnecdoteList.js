import React from 'react';
import { useSelector } from 'react-redux';
import AnecdoteVoter from './AnecdoteVoter';

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : 0));

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <AnecdoteVoter id={anecdote.id} />
          </div>
        </div>))
      }
    </div>
  );
};

export default AnecdoteList;
