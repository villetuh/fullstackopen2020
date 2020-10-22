import React from 'react';
import { connect } from 'react-redux';
import AnecdoteFilter from './AnecdoteFilter';
import AnecdoteVoter from './AnecdoteVoter';

const AnecdoteList = (props) => {
  return (
    <div>
      <AnecdoteFilter />
      {props.anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <AnecdoteVoter anecdote={anecdote} />
          </div>
        </div>))
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
                  .sort((a, b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : 0),
    filter: state.filter
  };
};

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList);

export default ConnectedAnecdotes;
