import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data ];
    case 'INIT_ANECDOTES':
      return action.data;
    case 'UPDATE_ANECDOTE': {
      return state.map(anecdote => anecdote.id === action.data.id
                          ? action.data
                          : anecdote);
    }
    default:
      return state;
  }
};

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export const voteOnAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: updatedAnecdote
    });
  };
};

export default anecdoteReducer;
