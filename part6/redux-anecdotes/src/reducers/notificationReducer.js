const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'REMOVE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const setNotification = (notification, displayTimeInSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    });

    setTimeout(() => dispatch({ type: 'REMOVE_NOTIFICATION' }), displayTimeInSeconds * 1000);
  };
};

export default notificationReducer;
