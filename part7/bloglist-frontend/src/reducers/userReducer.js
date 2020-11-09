const userReducer = (state = { user: null, userId: '' }, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.data;
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

export default userReducer;
