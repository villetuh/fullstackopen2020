import userService from '../services/users';

const userReducer = (state = { users: [], user: null, userId: '' }, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return {
        users: action.data,
        user: state.user,
        userId: state.userId
      };
    case 'SET_CURRENT_USER':
      return {
        users: state.users,
        user: action.data.user,
        userId: action.data.userId
      };
    default:
      return state;
  }
};

export const setCurrentUser = (userId, user) => {
  return {
    type: 'SET_CURRENT_USER',
    data: {
      user: user,
      userId: userId
    }
  };
};

export const clearCurrentUser = () => {
  return {
    type: 'SET_CURRENT_USER',
    data: {
      user: null,
      userId: ''
    }
  };
};

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: users
    });
  };
};

export default userReducer;
