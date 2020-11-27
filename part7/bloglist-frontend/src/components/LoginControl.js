import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import blogService from '../services/blogs';
import commentsService from '../services/comments';
import loginService from '../services/login';

import { setNotification } from '../reducers/notificationReducer';
import { clearCurrentUser, setCurrentUser } from '../reducers/userReducer';

import Login from './Login';
import Logout from './Logout';

const LoginControl = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.user);

  const loggedInUserStorageKey = 'loggedInBloglistUser';

  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem(loggedInUserStorageKey);
    if (storedUserJSON === null) {
      return;
    }

    const user = JSON.parse(storedUserJSON);
    const userId = JSON.parse(atob(user.token.split('.')[1])).id;
    dispatch(setCurrentUser(userId, user));

    blogService.setToken(user.token);
    commentsService.setToken(user.token);
  }, [dispatch]);

  const loginUser = async (username, password) => {
    let success = false;
    try {
      const user = await loginService.login({ username, password });
      const userId = JSON.parse(atob(user.token.split('.')[1])).id;
      dispatch(setCurrentUser(userId, user));

      blogService.setToken(user.token);
      commentsService.setToken(user.token);

      window.localStorage.setItem(loggedInUserStorageKey, JSON.stringify(user));

      success = true;
    } catch (exception) {
      dispatch(setNotification({ type: 'error', text: 'wrong username or password' }));
      console.log('Wrong credentials');
    }

    return success;
  };

  const handleLogout = () => {
    window.localStorage.removeItem(loggedInUserStorageKey);
    dispatch(clearCurrentUser());

    blogService.setToken('');
    commentsService.setToken('');
    dispatch(setNotification({ type: 'info', text: 'successfully logged out' }));
  };

  return (
    <span>
      { currentUser === null
        ? <Login loginUser={loginUser} />
        : <Logout name={currentUser.name} handleLogout={handleLogout} />
      }
    </span>
  );
};

export default LoginControl;
