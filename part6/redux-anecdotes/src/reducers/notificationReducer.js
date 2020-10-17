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

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  };
};

export default notificationReducer;
