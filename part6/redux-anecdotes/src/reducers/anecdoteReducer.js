import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data ];
    case 'INIT_ANECDOTES':
      return action.data;
    case 'VOTE': {
      const id = action.data.id;
      const anecdote = state.find(anecdote => anecdote.id === id);
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id === id
                          ? updatedAnecdote
                          : anecdote);
    }
    default:
      return state;
  }
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
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

export const voteOnAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

export default anecdoteReducer;
