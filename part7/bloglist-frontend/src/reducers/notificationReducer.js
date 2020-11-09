const initialState = { type: '', text: '' };

var currentTimeoutId;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'REMOVE_NOTIFICATION':
      return { type: '', text: '' };
    default:
      return state;
  }
};

export const setNotification = (notification, displayTimeInSeconds = 2) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    });

    if (currentTimeoutId !== undefined) {
      clearTimeout(currentTimeoutId);
      currentTimeoutId = undefined;
    }

    currentTimeoutId = setTimeout(() => dispatch({ type: 'REMOVE_NOTIFICATION' }), displayTimeInSeconds * 1000);
  };
};

export default notificationReducer;
